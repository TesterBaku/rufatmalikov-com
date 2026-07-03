---
title: İstinad
description: QA və testerlər üçün sadə dildə istinad materialı — API-lər nədir, HTTP necə işləyir və hər HTTP status kodu nə deməkdir.
sidebar:
  order: 1
---

Kursun istinad etdiyi, amma sıfırdan izah etməyə dayanmadığı anlayışlar üçün qısa, sadə dildə istinad səhifələri. Düzgün əsaslandırmaq istədiyiniz bir termin ortaya çıxanda bunları oxuyun — heç bir əvvəlcədən backend biliyi tələb olunmur.

## Səhifələr

- **[API nədir?](/az/reference/apis/)** — klientlər, serverlər, REST, endpoint-lər və JSON, testerlər üçün izah edilmiş.
- **[HTTP əsasları](/az/reference/http/)** — sorğu və cavabın quruluşu: metodlar, URL-lər, başlıqlar və gövdələr.
- **[HTTP status kodları](/az/reference/http-status-codes/)** — `200`, `201`, `400`, `401`, `404`, `500` və qalanları əslində nə deməkdir, tam istinad cədvəli ilə.
- **[CSS seçiciləri](/az/reference/css-selectors/)** — elementlər, siniflər, id-lər, atributlar, kombinatorlar və Playwright-in əlavə etdiyi seçici mühərrikləri.
- **[Müntəzəm ifadələr](/az/reference/regex/)** — literallar, lövbərlər, simvol sinifləri, kvantifikatorlar, qruplar və bayraqlar, kursun real `toHaveURL(/…/)` şablonlarına əsaslanır.
- **[Git və GitHub əsasları](/az/reference/git-github/)** — repozitoriyalar, staging sahəsi, commit-lər, branch-lar, remote-lar, pull request-lər və `.gitignore`, kursun artıq işlətdiyi əmrlərlə.
- **[DOM və HTML əsasları](/az/reference/dom-html/)** — teqlər, atributlar, element ağacı, id vs class və `getByRole` ilə əlçatımlılıq testinin arxasındakı semantik elementlər və rollar.
- **[Cookie-lər və sessiyalar](/az/reference/cookies-sessions/)** — brauzer necə sistemə daxil qalır, `HttpOnly` nə deməkdir və `storageState` ilə necə əlaqəlidir.
- **[Əlçatımlılıq, ARIA və WCAG](/az/reference/accessibility/)** — POUR prinsipləri, ARIA atributları və axe-core-un tutduğu pozuntular.
- **[Komanda sətri və npm](/az/reference/command-line-npm/)** — terminal, Node, `package.json`, `npm install` və `npx` — kursun işlətdiyi əmrlər.
- **[SQL əsasları](/az/reference/sql-basics/)** — test verilənlər bazasını oxumaq üçün `SELECT`, `WHERE`, `JOIN`, aqreqatlar və parametrləşdirilmiş sorğular, TestMarket Lab-ın real sxeminə əsaslanır.
- **[Docker əsasları](/az/reference/docker/)** — image-lər, konteynerlər, `docker run`, portlar və env dəyişənləri, Compose və GitHub Actions servis konteyneri — testlərin üçün real verilənlər bazasını necə qaldırmaq.

## Bu harada yerləşir

Hər səhifə ən çox istinad etdiyi modulu dəstəkləyir:

- **Komanda sətri və npm** → **[Modul 0 — quraşdırma](/az/course/module-0/)**.
- **CSS seçiciləri** və **DOM və HTML** → **[Modul 2 — Lokatorlar](/az/course/module-2/)**.
- **Müntəzəm ifadələr** → assertion modulları (**[Modul 4](/az/course/module-4/)** və ətrafı).
- **API-lər / HTTP / status kodları** → **[Modul 9 — API testi və şəbəkə](/az/course/module-9/)**.
- **Cookie-lər və sessiyalar** → **[Modul 10 — Autentifikasiya](/az/course/module-10/)**.
- **Əlçatımlılıq, ARIA və WCAG** → **[Modul 11 — əlçatımlılıq testi](/az/course/module-11/)**.
- **Git və GitHub** → **[Modul 12 — CI](/az/course/module-12/)**.
- **SQL əsasları** → Playwright və Python SDET kurslarına gələn **Database verification** modulları.
- **Docker əsasları** → həmin **Database verification** modulları və **[Modul 12 — CI, Docker, hesabatlar](/az/course/module-12/)**.

Düzgün əsaslandırmaq istədiyiniz bir termin ortaya çıxanda bunları oxuyun — heç bir əvvəlcədən backend və ya front-end biliyi tələb olunmur.
