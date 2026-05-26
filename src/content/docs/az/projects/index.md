---
title: Layihələr
description: Qurub paylaşdığım layihələr — SDET/QA müsahibə məşqçisi ilə başlayır.
---

Qurub paylaşdığım layihələr. Hər biri inkişaf etdikcə öz yazısını alacaq.

## SDET Interview Trainer

QA və SDET müsahibələrinə hazırlıq üçün məşq tətbiqi. Müsahibələrə hazırlaşıram və istər masamda, istərsə də yolda — istənilən yerdə istifadə edə biləcəyim bir köməkçi istəyirdim, ona görə də onu qurdum və eyni vəziyyətdə olan hər kəs üçün açıq etdim.

*Qeyd: tətbiqin interfeysi hazırda ingilis dilindədir.*

**İçərisində nə var:**

- **Gündəlik məşq** — kodlaşdırma, SQL, Playwright/Selenium, API/CI/AWS və strategiya suallarını birləşdirən fokuslanmış gündəlik plan
- **Coding Gym** — Python və Java-da kodlaşdırma inamı qazanmaq üçün QA yönümlü tapşırıqlar
- **Mock müsahibə** — cavab yaz, model cavabı aç və yoxlama siyahısına görə özünü qiymətləndir
- **Tərəqqi izləməsi** — ~250 element üzrə tamamlanma göstəriciləri və "zəif mövzular" baxışı

Hələlik backend olmadan işləyir, ona görə də masaüstündə və mobil cihazda sürətlə istifadə olunur. Bu, erkən bir konsepsiya sübutudur — üzərində qurmağa davam edəcəyim başlanğıc nöqtəsi.

[Məşqçini aç →](https://sdet-interview-trainer.vercel.app/) · [Koda bax →](https://github.com/TesterBaku/sdet-interview-trainer)

## Quiz Formatter — PDF-dən viktorina hazırlayan köməkçi

Bacımqızı üçün qurduğum təhsil köməkçisi — o, UNEC-də (Azərbaycan) rus dilində təhsil alır, ona görə də tətbiq rus dilindədir. Dərs materialları cavab açarı ilə birlikdə PDF şəklində gəlir; bu alət onları məşq viktorinalarına çevirir.

Alət həmin UNEC PDF-lərinin konkret formatına uyğunlaşdırılıb — universal PDF parser deyil, məhz bu format üçün təhsil alətidir, ona görə də başqa sənəd formatları üçün düzəliş tələb edə bilər.

*Qeyd: tətbiq rus dilindədir.*

**İçərisində nə var:**

- **PDF təhlili** — sualları və cavab variantlarını birbaşa dərs PDF-indən çıxarır
- **Konfiqurasiya olunan viktorinalar** — seçilmiş sayda sualla təsadüfi viktorinalar (`--count`)
- **Dərhal qiymətləndirmə** — cavablarını yoxlayır və səhvləri PDF-ə daxil edilmiş cavab açarı əsasında izah edir
- **Saxlanan nəticələr** — cəhdlərinin tarixçəsini sessiyalar arasında saxlayır
- **Hər yerdə işləyir** — terminal, lokal veb interfeys və ya müstəqil Windows `.exe`

Python ilə qurulub.

[Necə istifadə olunduğunu izlə →](https://youtu.be/qLmmXnKrZoI) · [Koda bax →](https://github.com/TesterBaku/quiz_formatter_with_chatgpt)

## BrauzerLab — interaktiv Playwright məşqçisi

Azərbaycan dilində pulsuz, brauzer əsaslı Playwright kursu: brauzerdaxili redaktor və dərhal rəy verən xüsusi yoxlama mühərriki ilə 50 praktiki tapşırıq. Qurulub — tezliklə işə düşür.

[Ətraflı →](/az/playwright/)

Birgə işləmək istəyirsiniz? [rufat@rufatmalikov.com](mailto:rufat@rufatmalikov.com)
