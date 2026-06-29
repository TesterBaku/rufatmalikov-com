---
title: Müntəzəm ifadələr
description: Müntəzəm ifadələr üçün sadə dildə istinad — literallar, lövbərlər, simvol sinifləri, kvantifikatorlar, qruplar və bayraqlar — Playwright kursunun əslində istifadə etdiyi şablonlara əsaslanır.
sidebar:
  order: 6
---

**Müntəzəm ifadə** (regex) mətni uyğunlaşdırmaq üçün bir şablondur. "Bu sətir dəqiq `/orders/42`-ə bərabərdirmi?" soruşmaq əvəzinə regex sənə "bu sətir `/orders/` və sonra *hansısa rəqəm* kimi görünürmü?" soruşmağa imkan verir. Kurs URL və mətn yoxlamaları üçün regex-ə daim əsaslanır, məsələn Modul 3-dən bu:

```javascript
await expect(page).toHaveURL(/\/orders\/\d+/);
```

Bu belə oxunur: "URL `/orders/` və sonra bir və ya daha çox rəqəm ehtiva edir" — yəni id-ni sərt kodlaşdırmadan `/orders/1`, `/orders/42` və ya `/orders/9999` üçün keçir. Bu səhifə belə bir şablonun hər hissəsini izah edir.

## `/…/` ayırıcısı

JavaScript-də regex dırnaqlar arasında deyil, **irəli kəsmələr** arasında yazılır:

```javascript
/login/        // "login" mətnini uyğunlaşdıran regex
'login'        // adi sətir — regex DEYİL
```

Playwright-in uyğunlaşdırıcıları (`toHaveURL`, `toHaveText`, `getByText`, `filter`, `waitForURL`) **ya** sətir (dəqiq/alt-sətir uyğunluğu), **ya da** regex (şablon uyğunluğu) qəbul edir. Kəsmələr "bu bir şablondur" siqnalını verir.

## Literallar və nöqtə

Regex-dəki əksər simvollar özlərini uyğunlaşdırır — bunlar **literallardır**. `/cart/` `cart` mətnini uyğunlaşdırır. Yeganə ümumi istisna *istənilən tək simvolu* uyğunlaşdıran **nöqtə** `.`-dir:

```javascript
/c.t/    // "cat", "cut", "c9t" uyğun gəlir — c və t arasında istənilən simvol
```

## Lövbərlər — `^` və `$`

Standart olaraq regex sətrin **istənilən yerində** uyğunlaşır. Lövbərlər onu kənara bərkidir:

| Lövbər | Mənası |
|---|---|
| `^` | sətrin başlanğıcı |
| `$` | sətrin sonu |

```javascript
/\/admin/      // URL /admin EHTİVA EDİR  (istənilən yerdə)
/^https/       // sətir https İLƏ BAŞLAYIR
/\/checkout$/  // sətir /checkout İLƏ BİTİR
```

Bu, niyə `toHaveURL(/\/orders\/\d+/)`-in `http://localhost:3000/orders/42` kimi tam URL-də keçdiyini izah edir — lövbərsiz, ona sadəcə şablonu sətirdə *haradasa* tapmaq lazımdır.

## Simvol sinifləri

Simvol sinfi bir dəstdən **bir simvolu** uyğunlaşdırır.

| Sinif | Nəyə uyğun gəlir |
|---|---|
| `\d` | rəqəm `0–9` |
| `\w` | söz simvolu: hərf, rəqəm və ya `_` |
| `\s` | boşluq (space, tab, yeni sətir) |
| `[abc]` | `a`, `b`, `c`-dən hər hansı biri |
| `[a-z]` | istənilən kiçik hərf (diapazon) |
| `[^0-9]` | rəqəm **olmayan** istənilən simvol (`[]` içində `^` inkar edir) |

```javascript
/\/orders\/\d+/   // /orders/ sonra rəqəmlər — kursun sifariş-id şablonu
/[?&]search=/     // search=-dən əvvəl ? VƏ YA &  (sorğu sətri uyğunluğu, Modul 4)
```

## Kvantifikatorlar — neçə dəfə

Kvantifikatorlar **əvvəlki** elementin neçə dəfə təkrarlana biləcəyini deyir.

| Kvantifikator | Mənası |
|---|---|
| `*` | sıfır və ya daha çox |
| `+` | bir və ya daha çox |
| `?` | sıfır və ya bir (ixtiyari) |
| `{3}` | dəqiq 3 |
| `{2,5}` | 2 ilə 5 arasında |

```javascript
/\d+/      // bir və ya daha çox rəqəm  → "42", "9999"
/colou?r/  // "color" VƏ YA "colour"    → u ixtiyaridir
/\d{4}/    // dəqiq dörd rəqəm           → il, poçt indeksi
```

`/\/orders\/\d+/`-də `\d`-dən sonrakı `+` istənilən uzunluqda id-ni uyğunlaşdırmağa imkan verən şeydir.

## Eskeyp — xüsusi simvolları hərfi mənada uyğunlaşdırmaq

Xüsusi mənalı simvollar (`. / \ + * ? ( ) [ ] { } ^ $ |`) onları hərfi mənada uyğunlaşdırmaq üçün backslash ilə **eskeyp** edilməlidir. URL şablonlarında kəsmə çox vacibdir:

```javascript
/\/orders\//   // "/orders/" hərfi mətnini uyğunlaşdırır
//             // hər \/ eskeyp edilmiş irəli kəsmədir
```

`\/` hərfi `/`-dir; `\.` hərfi nöqtədir; `\\` hərfi backslash-dır. Backslash olmadan `.` istənilən simvolu uyğunlaşdırar və `/` regex-i tez bağlayar.

## Qruplar və alternasiya

- **`( … )`** şablonun bir hissəsini qruplaşdırır ki, kvantifikator və ya alternasiya bütün qrupa tətbiq olunsun.
- **`|`** "və ya" deməkdir.

```javascript
/(cat|dog)s?/     // "cat", "cats", "dog" və ya "dogs"
/(\d{1,3}\.){3}\d{1,3}/  // dörd nöqtə ilə ayrılmış rəqəm qrupu (IP forması)
```

## Bayraqlar

Bağlayan kəsmədən **sonra** gələn hərf bütün şablonun davranışını dəyişir.

| Bayraq | Effekt |
|---|---|
| `i` | hərfə həssas **deyil** (case-**i**nsensitive) |
| `g` | **q**lobal — yalnız birincini deyil, bütün uyğunluqları tap |
| `m` | **çox**sətirli — `^`/`$` hər sətri uyğunlaşdırır |

```javascript
page.getByText(/login/i)                       // "Login", "LOGIN", "login" — Modul 2
await expect(page.locator('.result')).toHaveText(/success/i)   // Modul 5
await expect(page.locator('#search')).toHaveValue(/widget/i)   // Modul 4
```

`i` bayrağı testlərdə ən çox istifadə edəcəyindir — o, yoxlamaları UI-dakı böyük/kiçik hərf dəyişikliklərindən qoruyur.

## Kurs regex-i harada istifadə edir

| Şablon | Harada | Niyə regex |
|---|---|---|
| `toHaveURL(/\/orders\/\d+/)` | Modul 3, 4, 5, 7 | sifariş id-si dinamikdir |
| `toHaveURL(/[?&]search=Wireless/)` | Modul 4, 5 | sorğu parametrini istənilən mövqedə uyğunlaşdır |
| `not.toHaveURL(/\/admin/)` | Modul 4 | bir sahəyə çatmadığını yoxla |
| `getByText(/login/i)` | Modul 2 | hərfə həssas olmayan mətn uyğunluğu |
| `filter({ hasText: /…/ })` | Modul 2 | dəsti mətn şablonu ilə daralt |

:::tip
`toHaveURL`, `toHaveText`, `getByText`, `filter` və `waitForURL` — hamısı **sətir və ya regex** qəbul edir. Dəqiq dəyəri biləndə sətir istifadə et; hər hansı hissəsi dinamik olan kimi (id, zaman damğası, sorğu dəyəri) və ya hərfə həssaslıq istəyəndə regex-ə müraciət et.
:::

## Sürətli istinad

```text
/abc/        "abc" hərfi mətni
.            istənilən bir simvol
^   $        sətrin başlanğıcı / sonu
\d \w \s     rəqəm / söz simvolu / boşluq
[abc] [a-z]  dəstdən / diapazondan bir simvol
[^0-9]       dəstdə OLMAYAN
*  +  ?      sıfır+ / bir+ / ixtiyari
{3} {2,5}    dəqiq 3 / 2 ilə 5 arasında
\/  \.       eskeyp edilmiş / və ya .
( ) |        qrup / VƏ YA
/…/i  /…/g   hərfə həssas olmayan / qlobal bayraq
```
