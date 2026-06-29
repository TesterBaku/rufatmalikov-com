---
title: CSS seçiciləri
description: CSS seçiciləri üçün sadə dildə istinad — elementlər, siniflər, id-lər, atributlar, kombinatorlar və psevdo-siniflər — üstəlik Playwright-in əlavə etdiyi seçici mühərrikləri.
sidebar:
  order: 5
---

**CSS seçicisi** səhifədəki bir və ya bir neçə elementə işarə edən bir şablondur. CSS elementləri *stilizə etmək* üçün icad edilib ("hər `.btn`-i mavi et"), amma məhz eyni şablonlar Playwright-in `page.locator()`-unun elementləri tapma üsuludur. Kurs CSS seçicilərini son çarə kimi istifadə edir (`getByRole` və onun yoldaşlarından sonra), ona görə də onları rahat oxumaq faydalıdır.

Aşağıdakı hər nümunə kursun məşq tətbiqi olan **TestMarket Lab**-dan götürülmüş real seçicidir.

## Dörd əsas seçici

| Seçici | Nəyə uyğun gəlir | Real nümunə |
|---|---|---|
| `tag` | həmin növün hər elementi | `button`, `input`, `tr` |
| `.class` | həmin sinfə malik elementlər | `.product-card`, `.alert` |
| `#id` | həmin id-yə malik tək element | `#email`, `#shipping_name` |
| `[attr=val]` | həmin atribut dəyərinə malik elementlər | `[type="submit"]` |

```javascript
page.locator('button')          // səhifədəki hər <button>
page.locator('.product-card')   // class="product-card" olan hər element
page.locator('#email')          // id="email" olan element
page.locator('[name="quantity"]') // name="quantity" olan hər element
```

**id unikaldır** — bir səhifədə yalnız bir `#email` olmalıdır. **Sinif paylaşılır** — `.product-card` mağaza səhifəsindəki hər məhsula uyğun gəlir. Məhz bu fərq id seçicisini sabit, sinif seçicisini isə tez-tez bir neçə elementə uyğun gələn edir (strict-mode tələsi, [Modul 2](/az/course/module-2/)-də əhatə olunub).

## Bir elementdə seçiciləri birləşdirmək

Eyni elementdə *hamısını* tələb etmək üçün seçiciləri **boşluq olmadan** yığ:

```javascript
// type="submit" də olan bir <input>
page.locator('input[type="submit"]')

// class="table-row" da olan bir <tr>
page.locator('tr.table-row')

// HƏR İKİ sinfə malik element (TestMarket-in uğur flash-ı)
page.locator('.alert.alert-success')
```

`.alert.alert-success` "həm `alert`, **həm də** `alert-success` sinfinə malik" deməkdir — hər ikisi eyni `<div>`-də. Diqqət et ki, aralarında boşluq yoxdur.

## Atribut seçiciləri

`[attr="value"]`-dən əlavə, mövcudluğa və ya qismən dəyərə görə uyğunlaşa bilərsən:

| Şablon | Nəyə uyğun gəlir |
|---|---|
| `[disabled]` | atribut ümumiyyətlə mövcuddur (hər hansı dəyər) |
| `[name="quantity"]` | dəqiq dəyər |
| `[href^="/products"]` | dəyər `/products` ilə **başlayır** |
| `[href$=".pdf"]` | dəyər `.pdf` ilə **bitir** |
| `[class*="badge"]` | dəyər `badge` **ehtiva edir** |

```javascript
// TestMarket-in səbət miqdar daxiletməsi
page.locator('input[name="quantity"]')

// Admin sifarişlər cədvəlindəki status açılan siyahısı
page.locator('select[name="status"]')

// Test id ilə işarələnmiş istənilən element
page.locator('[data-testid="product-card"]')
```

`[data-testid="…"]` sadəcə bir atribut seçicisidir — buna görə `getByTestId('product-card')` və `locator('[data-testid="product-card"]')` eyni elementi tapır.

## Kombinatorlar — elementlər arasındakı əlaqələr

Kombinatorlar iki elementin DOM ağacında necə əlaqəli olduğunu təsvir edir.

| Kombinator | Adı | Mənası |
|---|---|---|
| `A B` (boşluq) | nəsil | `A`-nın içində istənilən yerdə bir `B` |
| `A > B` | uşaq | `A`-nın **birbaşa** uşağı olan bir `B` |
| `A + B` | qonşu qardaş | `A`-dan dərhal sonra gələn `B` |
| `A ~ B` | ümumi qardaş | `A`-dan sonra gələn istənilən `B`, eyni valideyn |

```javascript
// Nəsil: cədvəl gövdəsinin içindəki istənilən <tr> (TestMarket admin cədvəlləri)
page.locator('table tbody tr')

// Uşaq: .login-form-un birbaşa uşağı olan bir <button>
page.locator('.login-form > button')

// Nəsil: məhsul kartının içindəki qiymət <p>-si
page.locator('.product-card .price')
```

Ən çox istifadə edəcəyin **boşluqdur** (nəsil): `.cart-table .table-row` "`.cart-table`-ın içində istənilən yerdə olan hər `.table-row`" deməkdir.

## Psevdo-siniflər

Psevdo-siniflər atributa görə deyil, **vəziyyət və ya mövqeyə** görə uyğunlaşır.

| Psevdo-sinif | Nəyə uyğun gəlir |
|---|---|
| `:first-child` | valideyninin ilk uşağı olan element |
| `:last-child` | son uşaq |
| `:nth-child(2)` | 2-ci uşaq (CSS-də 1-dən başlayır) |
| `:hover`, `:checked`, `:disabled` | interaktiv vəziyyətə görə |

```javascript
// Birinci sıranın ikinci xanası — diqqət et, CSS 1-dən sayır
page.locator('tr.table-row:first-child td:nth-child(2)')
```

:::caution
CSS `:nth-child(2)` **1-dən başlayır**, amma Playwright-in `.nth(1)`-i **0-dan başlayır**. `td:nth-child(2)` və `.locator('td').nth(1)` eyni xanaya işarə edir. Mövqe əsaslı seçicilər kövrəkdir — mümkün olduqda məzmuna görə uyğunlaşdır ([Modul 2](/az/course/module-2/)-ə bax).
:::

## Spesifiklik (hansı qayda qalib gəlir)

Seçicilər rəqabət etdikdə **daha spesifik** olan qalib gəlir. Təxmini sıralama, zəifdən güclüyə:

1. tag (`button`) — ən zəif
2. sinif / atribut / psevdo-sinif (`.btn`, `[type=submit]`, `:first-child`)
3. id (`#email`) — ən güclü

*Test* üçün bu, stilizasiyaya görə daha az əhəmiyyət daşıyır — Playwright hansı qaydanın "qalib gəldiyinə" əhəmiyyət vermir, sadəcə uyğunluqları tapır. Amma bu, niyə `#email`-in ən dəqiq hook, xalis tag-ın isə ən az dəqiq olduğunu izah edir.

## Playwright-in CSS üzərinə əlavə etdikləri

Playwright standart CSS-i, **üstəlik** xalis CSS-də olmayan bir neçə seçici mühərrikini və psevdo-sinfini başa düşür. Onları birbaşa `locator()` sətrinə qarışdıra bilərsən:

| Genişlənmə | Nə edir |
|---|---|
| `:has-text("Add to Cart")` | mətni (ya da nəslinin mətni) sətri ehtiva edən element |
| `:visible` | yalnız həqiqətən render olunan/görünən elementlər |
| `text="Log In"` | **mətn** mühərriki — görünən mətnə görə uyğunlaşma |
| `css=.product-card` | **CSS** mühərrikini açıq məcbur et |
| `xpath=//button` | CSS əvəzinə **XPath** ifadəsi istifadə et |
| `:near()`, `:right-of()`, `:below()` | **layout** seçiciləri — ekran mövqeyinə görə uyğunlaşma |
| `>>` / `pierce/` | **Shadow DOM** sərhədini keç |

```javascript
// CSS genişlənməsi: "Add to Cart" mətnini ehtiva edən düymə
page.locator('button:has-text("Add to Cart")')

// Yalnız görünən flash mesajı
page.locator('.alert:visible')

// Layout: "Email" label-ının sağındakı daxiletmə
page.locator('input:right-of(:text("Email"))')
```

Bunlar rahatlıqlardır. Əksər elementlər üçün kurs sənə əvəzində **`getByRole` / `getByLabel` / `getByText` API**-ni üstün tutmağı öyrədir — o, xalis seçicilərdən daha oxunaqlı və davamlıdır. Hər birinə nə vaxt müraciət edəcəyini **[Modul 2 — Lokatorlar](/az/course/module-2/)**-da gör.

## Sürətli istinad

```text
button              hər <button>
.product-card       class="product-card"
#email              id="email"
[name="quantity"]   atribut bərabərdir
tr.table-row        <tr> VƏ class="table-row"  (boşluq yox)
.alert.alert-success bir elementdə iki sinif  (boşluq yox)
table tbody tr      nəsil  (boşluq)
.login-form > button birbaşa uşaq
td:nth-child(2)     2-ci xana (CSS 1-dən sayır)
:has-text("…")      Playwright: mətni ehtiva edir
text="…"  xpath=…   Playwright: digər mühərriklər
```
