---
title: Layihələr
description: Qurub paylaşdığım layihələr — QA təlim alətləri, AI-dəstəkli təhsil tətbiqləri və müştəri vebsaytları.
---

Qurub paylaşdığım layihələr. Hər biri inkişaf etdikcə öz yazısını alacaq.

## BrauzerLab — interaktiv Playwright məşqçisi

İngilis və Azərbaycan dillərində pulsuz, brauzer əsaslı Playwright kursu. Brauzerdaxili redaktorda real Playwright (JavaScript/TypeScript) kodu yazırsınız, simulyasiya olunmuş səhifənin reaksiyasını görürsünüz və dərhal keç/keçmə rəyi alırsınız — quraşdırma tələb olunmur. Tapşırıqları və yoxlama mühərrikini sıfırdan qurmuşam.

**İçərisində nə var:**

- **7 mərhələli modul üzrə 50 praktiki tapşırıq**
- **Lokatorlar** — rol, mətn, label, test-id, filter və mövqe selektorları (Shadow DOM və dinamik id-lər daxil)
- **Əməliyyatlar və avtomatik gözləmə** — klik, yazı, formalar, drag-and-drop və flaky `sleep` olmadan etibarlı gözləmələr
- **İddialar və ciddi rejim** — avtomatik gözləyən `expect` və qeyri-müəyyən lokatorların təmiz həlli
- **Şəbəkə müdaxiləsi** — `page.route` ilə sorğuları bloklamaq, mock etmək və əvəzləmək
- **Brauzerdaxili redaktor** — CodeMirror əsaslı, dərhal rəy üçün xüsusi yoxlama mühərriki ilə

İngilis və Azərbaycan dillərində mövcuddur.

[BrauzerLab-ı aç →](https://brauzerlab.rufatmalikov.com/az/) · [Ətraflı →](/az/playwright/)

## Universal Appliances Repair — müştəri vebsaytı

Orange County, Kaliforniyada yerləşən Universal Appliances Repair adlı məişət texnikası təmiri xidməti üçün qurduğum statik marketinq vebsaytı. Sayt canlı işləyir və sevdiyim test-və-avtomatlaşdırma iş axınını nümayiş etdirir: hər dəyişiklik avtomatik yoxlamalarla qorunan PR vasitəsilə yayımlanır.

**İçərisində nə var:**

- **Çoxsəhifəli marketinq saytı** — ana səhifə, xidmətlər, haqqında, əlaqə, FAQ, rəylər və bloq (əl ilə qurulmuş HTML + Tailwind CSS, freymvork yoxdur, build addımı yoxdur)
- **Avtomatlaşdırılmış testlər** — daxili keçid yoxlayıcısı və hər birləşmədən əvvəl keçməli olan Puppeteer vizual skrinşot testləri
- **PR ilə qorunan iş axını** — Husky pre-push hook-ları; `master`-a birbaşa commit yoxdur
- **Avtomatlaşdırılmış SEO məzmunu** — Claude Code rutinləri hər Bazar ertəsi/Çərşənbə/Cümə 3 yeni lokal SEO məqaləsi araşdırır, yazır və yayımlayır; üstəlik rüblük SEO auditi düzəliş PR-i açır

HTML + Tailwind CSS ilə qurulub.

[Sayta bax →](https://fixappliancesfast.com/) · [Koda bax →](https://github.com/TesterBaku/appliance-repair-website)

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

## Study Quiz — kurs materiallarından imtahan hazırlığı

İtaliyada proqram mühəndisliyi üzrə magistr təhsili alan bacım oğlu üçün qurduğum lokal imtahan-hazırlıq köməkçisi. O, mühazirə slaydları və laboratoriya materiallarından faydalı məşq testləri yaratmaq üçün NotebookLM-i sınamış, lakin istədiyi nəticəni ala bilməmişdi — ona görə də mən materialları parse edib bunu edən bir alət qurdum. Tamamilə onun kompüterində işləyir və istənilən kursa uyğunlaşdıra biləcəyi bir şablon kimi istifadə oluna bilər.

**İçərisində nə var:**

- **Sənəd təhlili** — kurs qovluğundakı PowerPoint (`.pptx`), Word (`.docx`) və PDF mühazirə/laboratoriya fayllarından strukturlaşdırılmış məzmun çıxarır
- **Təkrar xülasələri** — əlaqəli mühazirə və laboratoriyalar arasında çarpaz istinadlarla qısa mövzu xülasələri
- **Test yaratma** — deterministik, mövzuya yönəlmiş çoxseçimli suallar, defolt olaraq tamamilə oflayn
- **Opsional LLM rejimi** — daha zəngin suallar üçün OpenAI-uyğun endpoint qoşun; uğursuzluq halında avtomatik olaraq lokal yaratmaya keçir
- **Lokal veb interfeys** — testləri brauzerdə həll edin; nəticələri istəyə görə CSV-yə saxlayın

Python ilə qurulub.

[Koda bax →](https://github.com/TesterBaku/softeng-study-quiz)

## 5-ci sinif riyaziyyatı — interaktiv dərslər və testlər

Riyaziyyat və rus dili müəllimi olan (texniki olmayan) bacım üçün qurduğum müstəqil riyaziyyat tətbiqi. O — və ya şagirdləri — tətbiqi yükləyib, arxivdən çıxarıb bir cüt kliklə başlada bilər; terminal lazım deyil. 5-ci sinif riyaziyyat kurrikulumunu rus dilində əhatə edir.

**İçərisində nə var:**

- **8 fəsil üzrə 57 dərs** — vizual nümunələrlə izahlar
- **Pilləli testlər** — asan / orta / çətin / qarışıq, hər səhv üçün rəylə
- **1 710 sual** — hər dərsdə hər pillə üçün 10 sual, hər sessiyada təsadüfi
- **Texniki olmayan istifadə üçün** — başlamaq üçün bir cüt klik; skript ilk işə salındıqda lazım olanı quraşdırır, sonra brauzerdə açılır
- **Test olunub** — quiz məntiqi üçün unit testlər və brauzer (end-to-end) testləri

TypeScript və Next.js ilə qurulub (Docker-a hazır).

[Koda bax →](https://github.com/TesterBaku/math-teacher-prototype)

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

## RMC Tow — yedək xidməti vebsaytı

Corona və Inland Empire (Kaliforniya) bölgəsində fəaliyyət göstərən RMC Tow LLC yedək və yol kənarı yardım biznesi üçün qurub təhvil verdiyim kiçik statik marketinq saytı.

**İçərisində nə var:**

- **Dörd səhifə** — ana səhifə, xidmətlər, haqqında, əlaqə — statik HTML ilə əl ilə qurulub
- **Konversiyaya yönəlik** — qabarıq "zəng et" düyməsi və aydın xidmət bölgüsü (təcili yedəkləmə, flatbed daşıma, yol kənarı yardım)
- **Mobil-uyğun + SEO əsasları** — `tel:` keçidləri, sitemap və `robots.txt` ilə lokal axtarışa hazır

[Sayta bax →](https://www.rmctow.com/)

Birgə işləmək istəyirsiniz? [rufat@rufatmalikov.com](mailto:rufat@rufatmalikov.com)
