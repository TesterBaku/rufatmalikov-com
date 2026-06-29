---
title: CSS selectors
description: A plain-language reference for CSS selectors — elements, classes, ids, attributes, combinators, and pseudo-classes — plus the selector engines Playwright layers on top.
sidebar:
  order: 5
---

A **CSS selector** is a pattern that points at one or more elements on a page. CSS was invented to *style* elements ("make every `.btn` blue"), but the exact same patterns are how Playwright's `page.locator()` finds elements to test. The course uses CSS selectors as a fallback (after `getByRole` and friends), so it helps to read them fluently.

Every example below is a real selector from **TestMarket Lab**, the course's practice app.

## The four basic selectors

| Selector | Matches | Real example |
|---|---|---|
| `tag` | every element of that type | `button`, `input`, `tr` |
| `.class` | elements with that class | `.product-card`, `.alert` |
| `#id` | the one element with that id | `#email`, `#shipping_name` |
| `[attr=val]` | elements with that attribute value | `[type="submit"]` |

```javascript
page.locator('button')          // every <button> on the page
page.locator('.product-card')   // every element with class="product-card"
page.locator('#email')          // the element with id="email"
page.locator('[name="quantity"]') // every element with name="quantity"
```

An **id is unique** — one page should have only one `#email`. A **class is shared** — `.product-card` matches every product on the shop page. That difference is exactly why an id selector is stable and a class selector often matches many elements (a strict-mode trap covered in [Module 2](/en/course/module-2/)).

## Combining selectors on one element

Stack selectors with **no space** to require *all* of them on the same element:

```javascript
// An <input> that also has type="submit"
page.locator('input[type="submit"]')

// A <tr> that also has class="table-row"
page.locator('tr.table-row')

// An element with BOTH classes (TestMarket's success flash)
page.locator('.alert.alert-success')
```

`.alert.alert-success` means "has class `alert` **and** class `alert-success`" — both on the same `<div>`. Note there is no space between them.

## Attribute selectors

Beyond `[attr="value"]`, you can match on presence or partial values:

| Pattern | Matches |
|---|---|
| `[disabled]` | the attribute exists at all (any value) |
| `[name="quantity"]` | exact value |
| `[href^="/products"]` | value **starts with** `/products` |
| `[href$=".pdf"]` | value **ends with** `.pdf` |
| `[class*="badge"]` | value **contains** `badge` |

```javascript
// TestMarket's cart quantity input
page.locator('input[name="quantity"]')

// The order-status dropdown in the admin orders table
page.locator('select[name="status"]')

// Anything tagged with a test id
page.locator('[data-testid="product-card"]')
```

`[data-testid="…"]` is just an attribute selector — which is why `getByTestId('product-card')` and `locator('[data-testid="product-card"]')` find the same element.

## Combinators — relationships between elements

Combinators describe how two elements relate in the DOM tree.

| Combinator | Name | Means |
|---|---|---|
| `A B` (space) | descendant | a `B` anywhere inside an `A` |
| `A > B` | child | a `B` that is a **direct** child of `A` |
| `A + B` | adjacent sibling | the `B` immediately after an `A` |
| `A ~ B` | general sibling | any `B` after an `A`, same parent |

```javascript
// Descendant: any <tr> inside the table body (TestMarket admin tables)
page.locator('table tbody tr')

// Child: a <button> that is a direct child of .login-form
page.locator('.login-form > button')

// Descendant: the price <p> inside a product card
page.locator('.product-card .price')
```

The **space** (descendant) is the one you'll use most: `.cart-table .table-row` means "every `.table-row` somewhere inside `.cart-table`."

## Pseudo-classes

Pseudo-classes match by **state or position** rather than by attribute.

| Pseudo-class | Matches |
|---|---|
| `:first-child` | element that is the first child of its parent |
| `:last-child` | the last child |
| `:nth-child(2)` | the 2nd child (1-indexed in CSS) |
| `:hover`, `:checked`, `:disabled` | by interactive state |

```javascript
// The second cell of the first row — note CSS counts from 1
page.locator('tr.table-row:first-child td:nth-child(2)')
```

:::caution
CSS `:nth-child(2)` is **1-indexed**, but Playwright's `.nth(1)` is **0-indexed**. `td:nth-child(2)` and `.locator('td').nth(1)` point at the same cell. Position-based selectors are fragile — prefer matching by content where you can (see [Module 2](/en/course/module-2/)).
:::

## Specificity (which rule wins)

When selectors compete, the **more specific** one wins. The rough ranking, weakest to strongest:

1. tag (`button`) — weakest
2. class / attribute / pseudo-class (`.btn`, `[type=submit]`, `:first-child`)
3. id (`#email`) — strongest

For *testing* this matters less than for styling — Playwright doesn't care which rule "wins," it just finds matches. But it explains why `#email` is the most precise hook and a bare tag is the least.

## What Playwright layers on top of CSS

Playwright understands standard CSS **plus** several selector engines and pseudo-classes that plain CSS doesn't have. You can mix them right into a `locator()` string:

| Extension | What it does |
|---|---|
| `:has-text("Add to Cart")` | element whose text (or a descendant's) contains the string |
| `:visible` | only elements actually rendered/visible |
| `text="Log In"` | the **text** engine — match by visible text |
| `css=.product-card` | force the **CSS** engine explicitly |
| `xpath=//button` | use an **XPath** expression instead of CSS |
| `:near()`, `:right-of()`, `:below()` | **layout** selectors — match by on-screen position |
| `>>` / `pierce/` | cross a **Shadow DOM** boundary |

```javascript
// CSS extension: a button that contains the text "Add to Cart"
page.locator('button:has-text("Add to Cart")')

// Only the visible flash message
page.locator('.alert:visible')

// Layout: the input just to the right of the "Email" label
page.locator('input:right-of(:text("Email"))')
```

These are conveniences. For most elements the course teaches you to prefer the **`getByRole` / `getByLabel` / `getByText` API** instead — it's more readable and resilient than raw selectors. See **[Module 2 — Locators](/en/course/module-2/)** for when to reach for each.

## Quick reference

```text
button              every <button>
.product-card       class="product-card"
#email              id="email"
[name="quantity"]   attribute equals
tr.table-row        <tr> AND class="table-row"  (no space)
.alert.alert-success two classes on one element  (no space)
table tbody tr      descendant  (space)
.login-form > button direct child
td:nth-child(2)     2nd cell (CSS counts from 1)
:has-text("…")      Playwright: contains text
text="…"  xpath=…   Playwright: other engines
```
