---
title: DOM və HTML əsasları
description: HTML və DOM üçün sadə dildə istinad — teqlər, atributlar, mətn, valideyn/uşaq strukturu, id vs class və getByRole ilə əlçatımlılıq testini gücləndirən semantik elementlər və rollar.
sidebar:
  order: 8
---

Playwright-in test etdiyi hər səhifə **HTML**-dən qurulur və brauzer həmin HTML-i **DOM** adlanan canlı ağaca çevirir. Lokatorlar, rollar və əlçatımlılıq yoxlamaları — hamısı həmin ağac üzərində işləyir, ona görə də onun aydın təsəvvürü kursun qalanını yerinə oturdur. Heç bir əvvəlcədən front-end təcrübəsi lazım deyil.

## HTML: teqlər, atributlar, mətn

HTML **elementi** bir **teq** ilə yazılır. Əksəriyyəti cüt gəlir — açan teq və bağlayan teq — arasında məzmunla:

```html
<button type="submit" id="login-btn">Log In</button>
```

Bu tək elementin üç növ məlumatı var:

- **Teq adı** — `button`. Bu elementin *hansı növ* olduğunu deyir.
- **Atributlar** — `type="submit"` və `id="login-btn"`. Elementi konfiqurasiya edən ad/dəyər cütləri.
- **Mətn məzmunu** — `Log In`. İçindəki insan-oxunaqlı mətn.

Bu, **TestMarket Lab**-dan məhz Log In düyməsidir və hər lokator strategiyası həmin üç hissədən birini oxuyur: `getByRole('button', { name: 'Log In' })` teq + mətni istifadə edir; `page.locator('#login-btn')` bir atributu istifadə edir.

## DOM: elementlər ağacı

Brauzer HTML-i yüklədikdə onu **DOM**-a (Document Object Model) parçalayır — hər elementin valideyninin içində yerləşən bir **node** olduğu ağac:

```html
<form class="login-form">
  <label for="email">Email</label>
  <input id="email" name="email">
  <button type="submit">Log In</button>
</form>
```

Burada `<form>` **valideyn**dir; `<label>`, `<input>` və `<button>` onun **uşaqlarıdır** (və bir-birinin qardaşlarıdır). "DOM" sadəcə bu canlı, yaddaşdakı ağac deməkdir — və yükləndikdən sonra JavaScript node əlavə və ya silərək onu dəyişə bilər, məhz buna görə Playwright köhnə anlıq görüntüyə güvənmək əvəzinə hər əməliyyatda ağacı yenidən sorğulayır.

Bu valideyn/uşaq strukturu məhz **zəncirvari lokatorların** və CSS **kombinatorlarının** keçdiyidir:

```javascript
// "login formasının içindəki düymə" — valideyn → uşaq
page.locator('.login-form').getByRole('button', { name: 'Log In' })
```

## `id` vs `class`

İki atribut hər yerdə görünür və fərq test üçün vacibdir:

| | `id` | `class` |
|---|---|---|
| Unikallıq | **səhifədə bir** | **çoxları tərəfindən paylaşılır** |
| HTML | `<input id="email">` | `<div class="product-card">` |
| CSS seçicisi | `#email` | `.product-card` |
| Lokator kimi | dəqiq — birini uyğunlaşdırır | *hər* kartı uyğunlaşdırır |

`id` unikal olduğu üçün `#email` dəqiq, sabit hook-dur. `class` paylaşıldığı üçün `.product-card` mağaza səhifəsindəki hər məhsulu uyğunlaşdırır — "bütün məhsullar" üçün faydalıdır, amma yalnız birini nəzərdə tutanda strict-mode tələsidir ([Modul 2](/az/course/module-2/)-ə bax).

## Semantik elementlər və rollar

HTML elementləri yalnız görünüş deyil, **məna** daşıyır. `<button>` brauzer və ekran oxuyucusu üçün bir düymə *kimidir*; `<nav>` naviqasiya bölgəsi *kimidir*. Mənalı ("semantik") teqi seçmək səhifəni əlçatımlı — və rola görə test edilə bilən — edən şeydir.

| Semantik element | Gizli rol | Nə deməkdir |
|---|---|---|
| `<button>` | `button` | klikləyən bir əməliyyat |
| `<a href>` | `link` | URL-ə naviqasiya |
| `<nav>` | `navigation` | nav linklərinin dəsti |
| `<h1>`–`<h6>` | `heading` | bölmə başlığı |
| `<input type="text">` | `textbox` | mətn sahəsi |
| `<input type="checkbox">` | `checkbox` | açar |
| `<main>`, `<header>`, `<footer>` | `main` / `banner` / `contentinfo` | səhifə landmark-ları |

Hər elementin **gizli ARIA rolu** var — köməkçi texnologiyanın onu səsləndirdiyi kateqoriya. Bu, iki kurs bacarığına körpüdür:

- **`getByRole`** ([Modul 2](/az/course/module-2/)) elementləri həmin rola və əlçatan adına görə tapır: `getByRole('button', { name: 'Log In' })`.
- **Əlçatımlılıq testi** ([Modul 11](/az/course/module-11/)) **axe** kimi alətlərlə düzgün rolu və ya əlçatan adı olmayan elementləri işarələyir — məsələn `<button>` olmalı klikləyən `<div>`, ya da `alt`-ı olmayan `<img>`.

**Əlçatan ad** ekran oxuyucusunun element üçün oxuduğu etiketdir — adətən onun görünən mətni (`<button>Log In</button>`), ya da mətn olmayanda bir atribut (`<img alt="Company logo">`, `<button aria-label="Close">×</button>`). `getByRole('…', { name })` məhz ona görə uyğunlaşır.

## Bu test üçün niyə vacibdir

Semantik HTML və test edilə bilənlik eyni məqsəddir. Tətbiq aydın mətnli real `<button>` istifadə etdikdə:

- ekran oxuyucusu istifadəçisi "Log In, düymə" eşidir,
- `getByRole('button', { name: 'Log In' })` onu tapır,
- və axe auditi keçir.

Rolu olmayan stilizə edilmiş `<div>` istifadə etdikdə hər üçü pozulur. Məhz buna görə kurs rol əsaslı lokatorları üstün tutur: rola görə yazmaq çətin olan test çox vaxt markup-ın düzəltməyə dəyər əlçatımlılıq probleminin əlamətidir.

## Sürətli istinad

```text
<tag attr="value">text</tag>   element = teq + atributlar + mətn
teq adı       hansı növ element olduğu
atribut       onu konfiqurasiya edən name="value" cütü
mətn məzmunu  içindəki oxunaqlı mətn
DOM           brauzerin HTML-dən qurduğu canlı ağac
valideyn/uşaq yuvalanma — zəncirvari lokatorların keçdiyi
id            səhifədə unikal  → #id, dəqiq lokator
class         çoxları paylaşır → .class, çoxunu uyğunlaşdırır
rol           elementin NƏ olduğu (düymə, link, başlıq)
əlçatan ad    ekran oxuyucusunun oxuduğu etiket
```
