---
title: SQL əsasları
description: Test verilənlər bazasını SQL ilə oxumaq üçün sadə dildə istinad — SELECT, WHERE, JOIN, aqreqatlar və parametrləşdirilmiş sorğular — TestMarket Lab-ın real sxeminə əsaslanır, beləcə bir əməliyyatın yadda saxlanılan nəticəsini yoxlaya bilərsən.
sidebar:
  order: 12
---

Əksər testlər tətbiqin *dediyini* yoxlayır — cavabın gövdəsini, səhifəni. Daha təcrübəli yoxlama isə tətbiqin **yadda saxladığıdır**: sifariş verdikdən sonra verilənlər bazasında həqiqətən düzgün cəmi və düzgün sətirləri olan bir sifariş qeydi varmı? Bax bu, kamillik sıçrayışıdır — *"UI uğur dedi, bəs düzgün yadda saxladımı?"* — və buna cavab vermək verilənlər bazasını **SQL** (Structured Query Language) ilə oxumaq deməkdir.

Bu səhifə testerin əslində istifadə etdiyi SQL-in sadə dildə turudur və **TestMarket Lab**-ın real verilənlər bazasına əsaslanır. Əvvəlcədən verilənlər bazası təcrübəsi tələb olunmur.

İlk sorğudan mənimsəməli iki vərdiş, çünki onlar təhlükəsiz test ilə problem arasındakı fərqdir:

- **Yoxlamaq üçün oxu, yalnız hazırlamaq üçün yaz.** Tətbiqin nə saxladığını yoxlamaq üçün `SELECT` istifadə et. Yazıları (`INSERT`/`UPDATE`/`DELETE`) yalnız test verilənlərini *qurmaq* üçün saxla və testlər arasında sıfırla (TestMarket Lab-ın `POST /api/reset`-i sənin üçün yenidən doldurur).
- **Həmişə parametrləşdir.** Sorğunu heç vaxt sətirləri yapışdıraraq qurma. [Parametrləşdirilmiş sorğular](#parametrləşdirilmiş-sorğular-yeganə-qayda) bölməsi səbəbini göstərir.

## Sorğulayacağın verilənlər bazası

TestMarket Lab hər şeyi **bir SQLite faylında** saxlayır — `data/testmarket.db`. SQLite sadəcə bir fayl olan verilənlər bazasıdır, ona görə işlədiləcək server yoxdur; test faylı açır, sorğulayır və bağlayır. Sxem beş cədvəldir:

| Cədvəl | Nəyi saxlayır | Əsas məhdudiyyətlər |
|---|---|---|
| `users` | hesablar | `email` **UNIQUE**; `role` — `customer` və ya `admin` |
| `products` | kataloq | `slug` **UNIQUE**; `price` ≥ 0; `stock` ≥ 0 |
| `cart_items` | sessiyanın səbəti | `quantity` > 0; `product_id` → `products` |
| `orders` | verilmiş sifarişlər | `status` ∈ (pending, confirmed, shipped, delivered, cancelled); `total` saxlanılır |
| `order_items` | sifarişin sətirləri | `order_id` → `orders`; `product_id` → `products` |

Başlanğıc (seed) verilənləri (təzə sıfırlamanın verdiyi) üç kateqoriya üzrə **15 məhsul**, **2 istifadəçi** (`customer@test.io`, `admin@test.io`) və üç sətri olan **bir nümunə sifarişdir**. Aşağıdakı hər nəticə həmin başlanğıc vəziyyətindəndir.

## SELECT, WHERE, ORDER BY

`SELECT` sətirləri oxuyur. Sən **sütunları**, **cədvəli**, istəyə bağlı **filtri** (`WHERE`) və istəyə bağlı **sıralamanı** (`ORDER BY`) seçirsən:

```sql
SELECT name, price
FROM products
WHERE category = 'electronics'
ORDER BY price DESC;
```

Başlanğıc verilənlərinə qarşı bu, 7 elektronikanı ən bahalıdan başlayaraq qaytarır:

| name | price |
|---|---|
| Noise Cancelling Headphones | 199.99 |
| Portable SSD 1TB | 109.99 |
| Mechanical Keyboard | 89.99 |
| Webcam 1080p | 59.99 |
| Bluetooth Speaker | 44.99 |
| USB-C Hub | 34.99 |
| Wireless Mouse | 29.99 |

Hissələr:

- **`SELECT name, price`** — istədiyin sütunlar (`SELECT *` hər sütunu qaytarır).
- **`WHERE category = 'electronics'`** — yalnız uyğun sətirləri saxla. Şərtləri `AND` / `OR` ilə birləşdir; digər operatorlar `!=`, `<`, `>`, `<=`, `>=`, `LIKE` (mətn şablonu, `%` = istənilən simvol ardıcıllığı) və `IN (…)`-dir.
- **`ORDER BY price DESC`** — sırala; `DESC` = böyükdən→kiçiyə, `ASC` (default) = kiçikdən→böyüyə.

## Parametrləşdirilmiş sorğular (yeganə qayda)

Sorğudakı dəyər dəyişəndən gəldikdə — slug, email, id — o, sətirin içinə yapışdırılmadan `?` yer tutucusu ilə işarələnən **parametr** kimi daxil olur. Verilənlər bazası sürücüsü yer tutucunu təhlükəsiz doldurur:

```sql
SELECT id, name, stock FROM products WHERE slug = ?;
```

```javascript
// JavaScript — better-sqlite3 (Playwright kursu)
const row = db.prepare(
  'SELECT id, name, stock FROM products WHERE slug = ?'
).get('wireless-mouse');
// -> { id: 1, name: 'Wireless Mouse', stock: 50 }
```

```python
# Python — sqlite3, standart kitabxana (Python SDET kursu)
row = con.execute(
    "SELECT id, name, stock FROM products WHERE slug = ?",
    ("wireless-mouse",),
).fetchone()
# -> (1, 'Wireless Mouse', 50)
```

:::caution[Dəyərləri heç vaxt SQL-ə birləşdirmə]
`"… WHERE slug = '" + slug + "'"` gözləyən bir problemdir: dırnaq ehtiva edən dəyər sorğunu pozur, düşmən bir dəyər isə onu tamamilə yenidən yaza bilər (**SQL injection**). `?` yer tutucusu üslub seçimi deyil — birinci dərsdən modelləşdirdiyin təhlükəsiz vərdişdir. Qayda hər yerdə eynidir; yalnız sürücü dəyişir.
:::

## JOIN — əlaqələri izləmək

Maraqlı yoxlamalar cədvəlləri əhatə edir. Sifarişin sətirləri `order_items`-də yaşayır və `orders`-a `order_id` ilə bağlıdır. **JOIN** onları həmin açar üzərində yenidən birləşdirir:

```sql
SELECT o.id, o.status, o.total,
       oi.product_name, oi.price, oi.quantity
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.id = ?;
```

Başlanğıc sifarişi üçün bu, **hər sətir üçün bir** sətir qaytarır və hər biri sifarişin öz sütunlarını da daşıyır:

| id | status | total | product_name | price | quantity |
|---|---|---|---|---|---|
| 1 | delivered | 124.97 | Wireless Mouse | 29.99 | 1 |
| 1 | delivered | 124.97 | Mechanical Keyboard | 89.99 | 1 |
| 1 | delivered | 124.97 | Desk Organizer | 24.99 | 1 |

Bu, **əsas yoxlamadır**: sifarişi UI vasitəsilə və ya `POST /api/orders` ilə ver, sonra yadda saxlanılan həqiqəti təsdiqlə — `orders` sətrinin gözlənilən `status`-u var, `order_items` sətirləri isə əlavə etdiyin məhsul və miqdarları dəqiq saxlayır.

JOIN daha da zəncirlənə bilər. Hər sətrin **kateqoriyasına** çatmaq üçün `products`-a qoşul:

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

`o`/`oi`/`p` — **cədvəl ləqəbləridir** (alias) — qısa adlar, beləcə `oi.order_id` aydın oxunur. `ON oi.order_id = o.id` isə **qoşulma şərtidir**: hansı sətrin hansına uyğun gəldiyi.

:::note[`total` saxlanılan dəyərdir, canlı hesablama deyil]
`orders.total` tətbiqin sifariş verildikdə *yazdığı* sütundur, `order_items.price` isə alış anında *anlıq götürülmüş* qiymətdir. Onlar oxunanda yenidən hesablanmır — ona görə `total`-ı cari sətir qiymətlərinin cəminə bərabər saymaq əvəzinə, tətbiqin saxladığını gözlədiyin dəyərə qarşı yoxla. (Başlanğıc sifarişinin `total`-ı sadəcə nümunə verilənidir və sətirlərinin cəminə uyğun gəlməyəcək — məhz bunun faydalı xatırlatması.)
:::

## COUNT və aqreqatlar

Aqreqat funksiyaları çoxlu sətirləri bir xülasəyə yığır. Onları `GROUP BY` ilə cütləşdirib *qrup üzrə* xülasə çıxar:

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

- **`COUNT(*)`** — neçə sətir. **`SUM(col)`**, **`AVG(col)`**, **`MIN`**, **`MAX`** aydın olanı edir.
- **`AS n`** — nəticə sütununu yenidən adlandıran **ləqəb**, beləcə onu ada görə oxuya bilərsən.
- **`GROUP BY category`** — hər fərqli kateqoriya üçün bir xülasə sətri. Onsuz aqreqat bütün cədvəli əhatə edir.

Ən çox rast gəlinən test istifadəsi "neçə?" yoxlaması üçün sadə saymadır:

```sql
SELECT COUNT(*) AS item_count FROM order_items WHERE order_id = ?;   -- -> 3
SELECT SUM(stock) AS total_stock FROM products WHERE category = ?;   -- 'electronics' -> 285
```

## Xarici açarlar nəyi yoxlaya biləcəyini formalaşdırır

**Xarici açar** (FK) sətri öz valideyninə bağlayır — `order_items.order_id` real bir `orders` sətrinə işarə etməlidir. Hər FK həmçinin valideyn silindikdə nə baş verəcəyini elan edir və bu, nə tapacağını dəyişir:

- **`ON DELETE CASCADE`** — övladlar valideynlə gedir. Bir `orders` sətrini sil və onun `order_items`-i də yox olur. Beləcə sifarişi sildikdən sonra "həmin sifariş üçün heç bir `order_items` qalmır" yoxlaması **0 sətir** qaytarmalıdır.
- **`ON DELETE SET NULL`** — bağlantı null edilir, amma övlad sağ qalır. Bir `products` sətrini sil və ona istinad edən hər `order_items.product_id` `NULL` olur — amma `order_items.product_name` (kopyalanmış anlıq şəkil) qalır. Beləcə köhnə sifariş məhsul getdikdən sonra da *nəyin* alındığını göstərir.

FK qaydalarını bilmək hansı yoxlamaların ümumiyyətlə *mümkün* olduğunu göstərir — silinmiş valideynin yetim sətirlər, boş nəticələr, yoxsa null edilmiş istinadlar buraxmalı olduğunu.

## Bunu testdə istifadə etmək

Forma hər iki dildə həmişə eynidir: **qoşul → parametrləşdirilmiş `SELECT` → yoxla → bağla.** Lazım olan həqiqəti tətbiqin ictimai API-si onsuz da təqdim edirsə, ona üstünlük ver; etmirsə — API-nin heç vaxt qaytarmadığı daxili sütun və ya endpoint-i olmayan yadda saxlanılan nəticə — birbaşa SQL sorğusuna en. Verilənlər bazasını sorğulamaq testini sxemə bağlayır, ona görə bunu qəsdən et və **əsasən oxu** rejimində saxla.

Playwright və Python SDET kurslarına gələn **Database verification** modulları bunu uçdan-uca işə salır — sifariş verib, sonra onu yuxarıdakı kimi bir JOIN ilə yadda saxlanıldığını sübut edir.
