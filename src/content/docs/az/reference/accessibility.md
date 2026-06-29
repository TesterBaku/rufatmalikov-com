---
title: Əlçatımlılıq, ARIA və WCAG
description: Veb əlçatımlılığı üçün sadə dildə istinad — WCAG və ARIA nədir, POUR prinsipləri və Modul 11-də axe-core-un tutduğu pozuntular.
sidebar:
  order: 10
---

**Əlçatımlılıq** (çox vaxt **a11y** kimi qısaldılır — "a", 11 hərf, "y") hər kəsin istifadə edə biləcəyi səhifələr qurmaq deməkdir, o cümlədən ekran oxuyucusu, yalnız klaviatura ilə və ya zəif görmə ilə naviqasiya edənlər. Bu həm də test məsələsidir: [Modul 11](/az/course/module-11/) `@axe-core/playwright` ilə avtomatik əlçatımlılıq auditi işlədir. Bu səhifə həmin auditin arxasındakı lüğəti izah edir.

O, **[DOM və HTML istinadı](/az/reference/dom-html/)** üzərində qurulur — rollar və əlçatan adlar orada izah olunub; bu səhifə standartları (WCAG), atributları (ARIA) və alətlərin nəyi yoxladığını əhatə edir.

## WCAG və POUR prinsipləri

**WCAG** (Web Content Accessibility Guidelines) əlçatımlı veb məzmunu üçün beynəlxalq standartdır. Onun qaydaları dörd prinsip — **POUR** — altında təşkil olunub:

| Prinsip | Mənası | Pozuntu nümunəsi |
|---|---|---|
| **P**erceivable (qavranıla bilən) | istifadəçilər məzmunu qavraya bilir | `alt` mətni olmayan şəkil |
| **O**perable (idarə oluna bilən) | istifadəçilər UI-ı idarə edə bilir | klaviatura ilə çatmaq mümkün olmayan element |
| **U**nderstandable (anlaşıla bilən) | məzmun və idarəetmə məntiqlidir | label-i olmayan form sahəsi |
| **R**obust (möhkəm) | köməkçi texnologiya ilə işləyir | rolu olmayan xüsusi vidjet |

WCAG-in həmçinin **uyğunluq səviyyələri** var — **A** (minimum), **AA** (ümumi hüquqi/sənaye hədəfi) və **AAA** (ən sərt). Əksər komandalar **AA**-ya hədəflənir.

## ARIA — boşluqları doldurmaq

Xalis HTML artıq məna daşıyır: `<button>` pulsuz `button` roluna malikdir ([DOM istinadına](/az/reference/dom-html/) bax). **ARIA** (Accessible Rich Internet Applications) native HTML-in ifadə edə bilmədiyi hallar üçün əlavə atributlar toplusudur — xüsusi vidjetlər, dinamik yeniləmələr və ya görünən mətni olmayan bir şeyi adlandırmaq.

| Atribut | Nə edir |
|---|---|
| `role="…"` | teq edə bilmədikdə elementin nə olduğunu bildirir (`role="dialog"`) |
| `aria-label="Close"` | görünən mətn olmadıqda əlçatan ad verir |
| `aria-labelledby="id"` | elementi başqa elementin mətni ilə adlandırır |
| `aria-describedby="id"` | əlavə təsviri mətnə işarə edir (məs. ipucu) |
| `aria-hidden="true"` | dekorativ məzmunu köməkçi texnologiyadan gizlədir |
| `aria-expanded`, `aria-checked` | vidjetin cari vəziyyətini ifşa edir |

:::caution
**ARIA-nın birinci qaydası: ARIA istifadə etmə.** Native `<button>` hər dəfə `<div role="button">`-dan üstündür — real elementlər klaviatura davranışı və vəziyyəti pulsuz gətirir. ARIA-ya yalnız heç bir semantik element uyğun gəlmədikdə müraciət et. *ARIA olmaması pis ARIA-dan yaxşıdır*, çünki yanlış rol ekran oxuyucusunu aktiv şəkildə çaşdırır.
:::

## axe-core nəyi tutur

[Modul 11](/az/course/module-11/) səhifəni skan etmək və `violations` massivi qaytarmaq üçün `new AxeBuilder({ page }).analyze()` istifadə edir. Hər pozuntunun pozulmuş qaydanı adlandıran bir `id`-si var. Ən çox avtomatik tutulan pozuntular:

| axe qaydası `id` | Problem |
|---|---|
| `color-contrast` | mətn fonuna qarşı çox solğun (Qavranıla bilən pozuntusu) |
| `image-alt` | `alt` atributu olmayan `<img>` |
| `label` | əlaqəli label-i olmayan form sahəsi |
| `link-name` / `button-name` | əlçatan adı olmayan link və ya düymə |
| `document-title` | səhifənin `<title>`-i yoxdur |
| `html-has-lang` | `<html>` elementinin `lang` atributu yoxdur |

```javascript
import AxeBuilder from '@axe-core/playwright';

test('home page has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);   // sıfır pozuntu
});
```

## Avtomatlaşdırma nəyi edə bilər və nəyi edə bilməz

axe kimi avtomatik alətlər WCAG problemlərinin təxminən **30–40%**-ni tutur — mexaniki olanları (kontrast, çatışmayan `alt`, çatışmayan label-lar). Onlar `alt` mətninin *mənalı* olub-olmadığını, tab sırasının *məntiqli* olub-olmadığını və ya ekran oxuyucusu təcrübəsinin əslində məntiqli olub-olmadığını **mühakimə edə bilmir**. Bunlar klaviatura və ekran oxuyucusu ilə əl ilə test tələb edir. axe-in keçməsi "tam əlçatımlı" deyil, "açıq maşın-aşkarlana bilən pozuntu yoxdur" deməkdir.

## Sürətli istinad

```text
a11y           əlçatımlılıq (a + 11 hərf + y)
WCAG           standart; uyğunluq səviyyələri A / AA / AAA (AA hədəflə)
POUR           Perceivable, Operable, Understandable, Robust
role           elementin nə olduğu (native HTML üstün tut; ARIA yalnız lazım olanda)
aria-label     görünən mətn olmadıqda əlçatan ad
aria-labelledby / -describedby   başqa element ilə adlandır / təsvir et
aria-hidden    dekorativ məzmunu köməkçi texnologiyadan gizlət
axe qayda id-ləri   color-contrast, image-alt, label, link-name, button-name
AxeBuilder     new AxeBuilder({ page }).analyze() → violations (Modul 11)
qeyd           avtomatlaşdırma ~30–40% tutur; qalanı əl ilə test tələb edir
```
