---
title: SQL basics
description: A plain-language reference for reading a test database with SQL — SELECT, WHERE, JOIN, aggregates, and parameterized queries — grounded in TestMarket Lab's real schema, so you can verify the persisted side effect of an action.
sidebar:
  order: 12
---

Most tests check what the app *says* — the response body, the page. A more senior check is what the app **persisted**: after you place an order, is there really a row in the database with the right total and the right line items? That's the maturity leap — *"the UI said success, but did it save correctly?"* — and answering it means reading the database with **SQL** (Structured Query Language).

This page is a plain-language tour of the SQL a tester actually uses, grounded in **TestMarket Lab**'s real database. You don't need prior database experience.

Two habits to adopt from the first query, because they're the difference between a safe test and a liability:

- **Read to verify, write only to arrange.** Use `SELECT` to check what the app stored. Reserve writes (`INSERT`/`UPDATE`/`DELETE`) for *setting up* test data, and reset between tests (TestMarket Lab's `POST /api/reset` reseeds for you).
- **Always parameterize.** Never build a query by gluing strings together. The [Parameterized queries](#parameterized-queries-the-one-rule) section shows why.

## The database you'll query

TestMarket Lab stores everything in **one SQLite file** — `data/testmarket.db`. SQLite is a database that's just a file, so there's no server to run; a test opens the file, queries it, and closes it. The schema is five tables:

| Table | Holds | Key constraints |
|---|---|---|
| `users` | accounts | `email` **UNIQUE**; `role` is `customer` or `admin` |
| `products` | catalog | `slug` **UNIQUE**; `price` ≥ 0; `stock` ≥ 0 |
| `cart_items` | a session's cart | `quantity` > 0; `product_id` → `products` |
| `orders` | placed orders | `status` ∈ (pending, confirmed, shipped, delivered, cancelled); `total` stored |
| `order_items` | the lines of an order | `order_id` → `orders`; `product_id` → `products` |

The seed data (what a fresh reset gives you) is **15 products** across three categories, **2 users** (`customer@test.io`, `admin@test.io`), and **one sample order** with three line items. Every result below is from that seeded state.

## SELECT, WHERE, ORDER BY

A `SELECT` reads rows. You pick **columns**, the **table**, an optional **filter** (`WHERE`), and an optional **sort** (`ORDER BY`):

```sql
SELECT name, price
FROM products
WHERE category = 'electronics'
ORDER BY price DESC;
```

Against the seed data that returns the 7 electronics, most expensive first:

| name | price |
|---|---|
| Noise Cancelling Headphones | 199.99 |
| Portable SSD 1TB | 109.99 |
| Mechanical Keyboard | 89.99 |
| Webcam 1080p | 59.99 |
| Bluetooth Speaker | 44.99 |
| USB-C Hub | 34.99 |
| Wireless Mouse | 29.99 |

The pieces:

- **`SELECT name, price`** — the columns you want (`SELECT *` returns every column).
- **`WHERE category = 'electronics'`** — keep only matching rows. Combine conditions with `AND` / `OR`; other operators are `!=`, `<`, `>`, `<=`, `>=`, `LIKE` (text pattern, `%` = any run of characters), and `IN (…)`.
- **`ORDER BY price DESC`** — sort; `DESC` = high→low, `ASC` (the default) = low→high.

## Parameterized queries (the one rule)

When a value in a query comes from a variable — a slug, an email, an id — it goes in as a **parameter**, marked with a `?` placeholder, *never* pasted into the string. The database driver fills the placeholder safely:

```sql
SELECT id, name, stock FROM products WHERE slug = ?;
```

```javascript
// JavaScript — better-sqlite3 (the Playwright course)
const row = db.prepare(
  'SELECT id, name, stock FROM products WHERE slug = ?'
).get('wireless-mouse');
// -> { id: 1, name: 'Wireless Mouse', stock: 50 }
```

```python
# Python — sqlite3, standard library (the Python SDET course)
row = con.execute(
    "SELECT id, name, stock FROM products WHERE slug = ?",
    ("wireless-mouse",),
).fetchone()
# -> (1, 'Wireless Mouse', 50)
```

:::caution[Never concatenate values into SQL]
`"… WHERE slug = '" + slug + "'"` is a bug waiting to happen: a value containing a quote breaks the query, and a hostile value can rewrite it entirely (**SQL injection**). The `?` placeholder is not a style preference — it's the safe habit you model from lesson one. Same rule everywhere; only the driver changes.
:::

## JOIN — following the relationships

The interesting checks span tables. An order's lines live in `order_items`, linked to `orders` by `order_id`. A **JOIN** stitches them back together on that key:

```sql
SELECT o.id, o.status, o.total,
       oi.product_name, oi.price, oi.quantity
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.id = ?;
```

For the seed order that returns one row **per line item**, each carrying the order's own columns too:

| id | status | total | product_name | price | quantity |
|---|---|---|---|---|---|
| 1 | delivered | 124.97 | Wireless Mouse | 29.99 | 1 |
| 1 | delivered | 124.97 | Mechanical Keyboard | 89.99 | 1 |
| 1 | delivered | 124.97 | Desk Organizer | 24.99 | 1 |

This is the **killer verification**: place an order through the UI or `POST /api/orders`, then assert the persisted truth — the `orders` row has the expected `status`, and the `order_items` rows hold exactly the products and quantities you added.

A JOIN can chain further. To reach each line's **category**, join on to `products`:

```sql
SELECT oi.product_name, p.category, oi.quantity
FROM order_items oi
JOIN products p ON p.id = oi.product_id
WHERE oi.order_id = ?;
```

| product_name | category | quantity |
|---|---|---|
| Wireless Mouse | electronics | 1 |
| Mechanical Keyboard | electronics | 1 |
| Desk Organizer | accessories | 1 |

The `o`/`oi`/`p` are **table aliases** — short names so `oi.order_id` reads clearly. `ON oi.order_id = o.id` is the **join condition**: which row matches which.

:::note[`total` is a stored value, not a live calculation]
`orders.total` is a column the app *wrote* when the order was placed, and `order_items.price` is the price *snapshotted* at purchase time. They aren't recomputed on read — so verify `total` against what you expect the app to have saved, rather than assuming it equals the sum of the current item prices. (The seed order's `total` is just demo data and won't add up to its lines — a useful reminder of exactly this.)
:::

## COUNT and aggregates

Aggregate functions collapse many rows into a summary. Pair them with `GROUP BY` to summarize *per group*:

```sql
SELECT category, COUNT(*) AS n, ROUND(AVG(price), 2) AS avg_price
FROM products
GROUP BY category
ORDER BY n DESC;
```

| category | n | avg_price |
|---|---|---|
| electronics | 7 | 81.42 |
| accessories | 6 | 30.49 |
| furniture | 2 | 264.99 |

- **`COUNT(*)`** — how many rows. **`SUM(col)`**, **`AVG(col)`**, **`MIN`**, **`MAX`** do the obvious.
- **`AS n`** — an **alias** renaming the result column so you can read it back by name.
- **`GROUP BY category`** — one summary row per distinct category. Without it, the aggregate covers the whole table.

The most common test use is a plain count for a "how many?" assertion:

```sql
SELECT COUNT(*) AS item_count FROM order_items WHERE order_id = ?;   -- -> 3
SELECT SUM(stock) AS total_stock FROM products WHERE category = ?;   -- 'electronics' -> 285
```

## How foreign keys shape what you verify

A **foreign key** (FK) ties a row to its parent — `order_items.order_id` must point at a real `orders` row. Each FK also declares what happens when the parent is deleted, and that changes what you'll find:

- **`ON DELETE CASCADE`** — children go with the parent. Delete an `orders` row and its `order_items` vanish too. So after deleting an order, verifying "no `order_items` remain for that order" should return **0 rows**.
- **`ON DELETE SET NULL`** — the link is nulled but the child survives. Delete a `products` row and each `order_items.product_id` that referenced it becomes `NULL` — but `order_items.product_name` (a copied snapshot) stays. So an old order still shows *what* was bought even after the product is gone.

Knowing the FK rules tells you which assertions are even *possible* — whether a deleted parent should leave orphans, empty results, or nulled references.

## Using this in a test

The shape is always the same, in either language: **connect → parameterized `SELECT` → assert → close.** Prefer the app's public API when it already exposes the truth you need; drop to a direct SQL query when it doesn't — an internal column the API never returns, or a persisted side effect with no endpoint. Querying the database couples your test to the schema, so do it deliberately, and keep it **read-mostly**.

The **Database verification** modules coming to the Playwright and Python SDET courses put this to work end to end — placing an order, then proving it persisted with a JOIN like the one above.
