---
title: Cookie-lər və sessiyalar
description: Cookie-lər və sessiyalar üçün sadə dildə istinad — brauzer necə sistemə daxil qalır, HttpOnly nə deməkdir və bunların hamısı Playwright-in storageState-i ilə necə əlaqəlidir.
sidebar:
  order: 9
---

HTTP **vəziyyətsizdir** (stateless) — hər sorğu öz-özünə dayanır və server sonuncunu xatırlamır. Bəs sayt səhifə yükləmələri arasında sənin sistemə daxil olduğunu necə yadda saxlayır? **Cookie-lər** və **sessiyalar**. Bu səhifə hər ikisini izah edir, sonra onları [Modul 10](/az/course/module-10/)-dakı `storageState` texnikası ilə əlaqələndirir — "HttpOnly cookie-ləri saxlamaq olmaz" mifinin niyə yanlış olduğu da daxil.

## Cookie nədir

**Cookie** serverin brauzerdən saxlamasını və həmin sayta hər gələcək sorğuda geri göndərməsini istədiyi kiçik `name=value` cütüdür. Server onu cavab başlığı ilə təyin edir:

```http
Set-Cookie: connect.sid=s%3Aabc123...; HttpOnly; Path=/
```

Bundan sonra brauzer onu avtomatik olaraq hər sorğuya əlavə edir:

```http
Cookie: connect.sid=s%3Aabc123...
```

Bu gediş-gəliş səni sistemə daxil saxlayan şeydir: cookie brauzerin daşıdığı **kimlik sübutudur** ki, sən hər səhifədə parolunu yenidən daxil etməyəsən.

## Cookie atributları

Cookie davranışını idarə edən bayraqlar daşıyır:

| Atribut | Mənası |
|---|---|
| `HttpOnly` | Səhifədəki JavaScript onu **oxuya bilmir** (`document.cookie` onu görmür) — XSS-ə qarşı təhlükəsizlik tədbiri |
| `Secure` | yalnız HTTPS üzərində göndərilir |
| `SameSite` | cross-site sorğularda göndərilib-göndərilməyəcəyini məhdudlaşdırır (CSRF müdafiəsi) |
| `Expires` / `Max-Age` | nə vaxt silinməli; bunlar olmadan brauzer bağlananda ölən **sessiya cookie-sidir** |
| `Path` / `Domain` | cookie hansı URL-lərə göndərilir |

`HttpOnly` testdə insanları çaşdıran bayraqdır — bu barədə aşağıda.

## Sessiya nədir

**Cookie** brauzerdə kiçik bir dəyər saxlayır. **Sessiya** isə əsl məlumatı **serverdə** saxlayır. Onlar birlikdə işləyir:

1. Sistemə daxil olursan. Server öz yaddaşında **sessiya** (kim olduğunun qeydini) yaradır və ona bir id verir.
2. Server həmin id-ni cookie kimi geri göndərir — məlumatını deyil, yalnız açarı göndərir.
3. Hər sonrakı sorğuda brauzer cookie-ni göndərir; server sessiyanı id-sinə görə tapır və sənin olduğunu bilir.

Yəni cookie sadəcə **alış biletidir**; qiymətli əşyalar piştaxtanın arxasında (serverdə) qalır. **TestMarket Lab** məhz belə işləyir: cookie-si **`connect.sid`** adlanan və **`HttpOnly`** işarələnmiş `express-session` istifadə edir.

## Cookie-lər vs token-lar (digər yanaşma)

Bəzi tətbiqlər server tərəfli sessiyaları atlayır və əvəzinə login-dən sonra brauzerə `localStorage`-də saxlanılan **token** (çox vaxt JWT) verir. Brauzer onu hər sorğuda, adətən `Authorization` başlığında göndərir. Fərq bir sətirdə:

- **Sessiya cookie-si:** server səni xatırlayır; cookie sadəcə açardır. (TestMarket Lab)
- **Token:** token-ın özü kimliyini daşıyır; server heç nə xatırlamır.

Hər ikisi "tətbiqin səni sistemə daxil saxlama üsuludur" — sadəcə vəziyyəti fərqli yerlərə qoyurlar.

## Bu `storageState` ilə necə əlaqəlidir

[Modul 10](/az/course/module-10/) sənə **bir dəfə** sistemə daxil olub həmin autentifikasiya olunmuş vəziyyəti `storageState` ilə yenidən istifadə etməyi öyrədir; o, brauzerin cookie-lərini + `localStorage`-ini JSON fayla seriallaşdırır.

Ümumi bir mif deyir ki, `connect.sid` `HttpOnly` olduğu üçün `storageState` sessiya tətbiqlərini idarə edə bilməz. **Bu yanlışdır.** Çaşqınlıq `document.cookie`-dən gəlir — səhifə JavaScript-i həqiqətən `HttpOnly` cookie-ni oxuya bilmir. Amma `storageState` `document.cookie`-dən istifadə etmir; o, brauzerin öz **cookie qabını** DevTools protokolu ilə oxuyur, ona görə *hər* cookie-ni, `HttpOnly` olanları da daxil, ələ keçirir. TestMarket login-dən sonra `storageState`-i saxla və fayl həqiqətən `connect.sid` ehtiva edəcək.

:::caution
Əsl məhdudiyyət HttpOnly deyil — **köhnəlmədir** (staleness). Sessiya cookie-si yalnız server tərəfli yaddaşa bir *açardır*. Server yenidən başlasa, sessiya bitsə və ya istifadəçi çıxsa, dünənki saxlanmış fayl heç nəyə autentifikasiya etmir. Düzəliş `storageState`-dən qaçmaq deyil, **vəziyyəti hər işləmənin əvvəlində yenidən yaratmaqdır** (setup layihəsi bunu edir). [Modul 10](/az/course/module-10/)-a bax.
:::

## Sürətli istinad

```text
cookie         brauzerin saxladığı və hər sorğuda yenidən göndərdiyi name=value
Set-Cookie     serverin onu təyin etdiyi cavab başlığı
HttpOnly       JS oxuya bilmir (document.cookie kor) — amma cookie qabında hələ var
Secure         yalnız HTTPS
SameSite       cross-site göndərmə qaydası (CSRF müdafiəsi)
sessiya cookie Expires yox → brauzer bağlananda ölür
sessiya        server tərəfli qeyd; cookie yalnız id-sini saxlayır (açar)
token (JWT)    kimliyi dəyərin özü daşıyır, çox vaxt localStorage-də
storageState   Playwright JSON: cookie-lər + localStorage — HttpOnly-ni də tutur
```
