---
title: Layihələr
description: Qurub paylaşdığım layihələr — QA təlim alətləri, AI-dəstəkli təhsil tətbiqləri və müştəri vebsaytları.
---

Qurub paylaşdığım layihələr, təyinatına görə qruplaşdırılıb. Hər biri inkişaf etdikcə öz yazısını alacaq.

## QA və test alətləri

### BrauzerLab — interaktiv Playwright məşqçisi

İngilis və Azərbaycan dillərində pulsuz, brauzer əsaslı Playwright kursu. Brauzerdaxili redaktorda real Playwright (JavaScript/TypeScript) kodu yazırsınız, simulyasiya olunmuş səhifənin reaksiyasını görürsünüz və dərhal keç/keçmə rəyi alırsınız — quraşdırma tələb olunmur. Tapşırıqları və yoxlama mühərrikini sıfırdan qurmuşam. O, [Playwright kursunun](/az/course/) praktiki məşq yoldaşıdır.

**İçərisində nə var:**

- **7 mərhələli modul üzrə 100 praktiki tapşırıq**
- **Lokatorlar** — rol, mətn, label, test-id, filter və mövqe selektorları (Shadow DOM və dinamik id-lər daxil)
- **Əməliyyatlar və avtomatik gözləmə** — klik, yazı, formalar, drag-and-drop və flaky `sleep` olmadan etibarlı gözləmələr
- **İddialar və ciddi rejim** — avtomatik gözləyən `expect` və qeyri-müəyyən lokatorların təmiz həlli
- **Şəbəkə müdaxiləsi** — `page.route` ilə sorğuları bloklamaq, mock etmək və əvəzləmək
- **Brauzerdaxili redaktor** — CodeMirror əsaslı, dərhal rəy üçün xüsusi yoxlama mühərriki ilə

İngilis və Azərbaycan dillərində mövcuddur.

[BrauzerLab-ı aç →](https://brauzerlab.rufatmalikov.com/az/) · [Ətraflı →](/az/playwright/)

### TestMarket Lab — test etdiyin tətbiq

Kurslar boyu test dəstlərinin qarşısında işlədiyi hədəf kimi qurulmuş kiçik, lakin real bir e-ticarət veb tətbiqi. Məhsul kataloqu, səbət, ödəniş və sifarişlər, müştəri və admin autentifikasiyası, həmçinin REST API-si var — üstəlik testlərin oxunaqlı və təkrarlana bilən qalması üçün qəsdən qoyulmuş sabit test qarmaqları. Onu klonlayır, yerli işlədir və həm [Playwright kursunda](/az/course/), həm də [SDET-lər üçün Python](/az/python-sdet/)-da avtomatlaşdırırsan.

**İçərisində nə var:**

- **Real stek** — Express, EJS və SQLite (better-sqlite3), beş cədvəlli sxem (istifadəçilər, məhsullar, səbət, sifarişlər, sifariş elementləri) və real xarici açarlarla.
- **Test üçün qurulub** — sabit `data-testid` selektorları, deterministik datanı yenidən əkən `POST /api/reset` endpoint-i və test-data qurulumu üçün API marşrutları (`POST /api/orders`).
- **Əlçatanlıq və UI vəziyyətləri** — əlçatan mobil naviqasiya, üstəlik yüklənmə, boş, xəta və validasiya vəziyyətləri — real avtomatlaşdırmanın idarə etməli olduğu hallar.
- **İki kurs, bir tətbiq** — JavaScript Playwright kursu və Python SDET kursu üçün ortaq məşq hədəfi, beləcə bacarıqlar birbaşa köçürülür.

Node.js (Express + better-sqlite3) ilə qurulub.

[Koda bax →](https://github.com/TesterBaku/testmarket-lab)

### SDET Interview Trainer

QA və ya SDET müsahibələrinə hazırlaşırsan? Bu, məhz bunun üçün qurduğum məşq tətbiqidir. İstər masamda, istərsə də yolda — istənilən yerdə istifadə edə biləcəyim bir köməkçi istəyirdim, ona görə də onu qurdum və eyni vəziyyətdə olan hər kəs üçün açıq etdim.

*Qeyd: tətbiqin interfeysi hazırda ingilis dilindədir.*

**İçərisində nə var:**

- **Gündəlik məşq** — kodlaşdırma, SQL, Playwright/Selenium, API/CI/AWS və strategiya suallarını birləşdirən fokuslanmış gündəlik plan
- **Coding Gym** — Python, Java, SQL və TypeScript-də kodlaşdırma inamı qazanmaq üçün QA yönümlü tapşırıqlar
- **Mock müsahibə** — cavab yaz, model cavabı aç və yoxlama siyahısına görə özünü qiymətləndir
- **Qulaqla öyrən (Commute Mode)** — hər mövzu audio kimi: müsahibə tələlərini səsli danışan iki aparıcılı podkast, üstəgəl güclü cavabları nümayiş etdirən mock-müsahibə raundu. Onları növbəyə qoy, ardıcıl səslənsin — 18 mövzunun hamısı üzrə ekransız hazırlıq: yolda, idmanda və ya gəzintidə
- **Cheat sheet-lər və quizlər** — 18 istinad səhifəsi (Playwright, Selenium, SQL, Docker, Kubernetes, Python, Java və s.), hər biri öz çoxvariantlı quizi və dərhal geribildirimi ilə — 40 suallıq mock imtahanı olan Claude Certified Architect trekini də əhatə edir
- **Tərəqqi izləməsi** — 525 məşq elementi üzrə tamamlanma göstəriciləri və "zəif mövzular" baxışı
- **Quraşdırıla bilən və oflayn** — onu telefonun və ya masaüstünün ana ekranına native tətbiq kimi əlavə et; servis işçisi əsas ekranları bağlantı olmadan da işlək saxlayır

Giriş və ya quraşdırma tələb olunmur — brauzerdə işləyir və masaüstündə və ya mobil cihazda native tətbiq kimi quraşdırılır. Sürətli bir konsepsiya sübutu kimi başlayan bu tətbiq indi kifayət qədər tam bir hazırlıq dəstinə çevrilib və üzərində qurmağa davam edirəm. Sıfırdan hazırlaşırsansa, [Playwright kursu](/az/course/) və [SDET-lər üçün Python](/az/python-sdet/) ilə yaxşı uyğunlaşır.

[Məşqçini aç →](https://sdet-interview-trainer.vercel.app/) · [Koda bax →](https://github.com/TesterBaku/sdet-interview-trainer)

## Təhsil tətbiqləri

### İmtahan Köməkçisi — Azərbaycandakı şagirdlər üçün imtahan hazırlığı

Azərbaycandakı şagirdlər üçün pulsuz, brauzer əsaslı təhsil tətbiqi. Fənn seçirsiniz, qısa dərsləri oxuyursunuz, sonra dərhal qiymətləndirən və hər səhvi izah edən pilləli testlərlə məşq edirsiniz — quraşdırma yoxdur, brauzerdə işləyir. Bir məzmun-bilən tətbiq eyni koddan 41 bölməni (5–11-ci sinif, abituriyent və rus bölməsi) təqdim edir və hər riyaziyyat cavabı avtomatik cavab-yoxlayıcısı ilə yoxlanılır.

**İçərisində nə var:**

- **41 bölmə** — 5–11-ci sinif, abituriyent və rus bölməsi; riyaziyyat, elmlər, dillər və ədəbiyyat
- **5-ci sinif riyaziyyatı** — 8 fəsil üzrə 57 mövzu, **1 710 sual**, rus dilində
- **9-cu sinif buraxılış riyaziyyatı** — 11 fəsil üzrə 38 mövzu, **1 140 sual**, ayrıca DİM formatında tam məşq imtahanı
- **Pilləli testlər** — asan / orta / çətin / qarışıq, hər səhv üçün rəylə
- **Yoxlanmış cavablar** — deterministik cavab-yoxlayıcısı hər riyaziyyat sualını yayımdan əvvəl təsdiqləyir

TypeScript və Next.js ilə qurulub (statik export).

[İmtahan Köməkçisini aç →](https://exam.rufatmalikov.com/) · [Ətraflı →](/az/exam-helper/)

### Study Quiz — kurs materiallarından imtahan hazırlığı

İtaliyada proqram mühəndisliyi üzrə magistr təhsili alan bacım oğlu üçün qurduğum lokal imtahan-hazırlıq köməkçisi. O, mühazirə slaydları və laboratoriya materiallarından faydalı məşq testləri yaratmaq üçün NotebookLM-i sınamış, lakin istədiyi nəticəni ala bilməmişdi — ona görə də mən materialları parse edib bunu edən bir alət qurdum. Tamamilə onun kompüterində işləyir və istənilən kursa uyğunlaşdıra biləcəyi bir şablon kimi istifadə oluna bilər.

**İçərisində nə var:**

- **Sənəd təhlili** — kurs qovluğundakı PowerPoint (`.pptx`), Word (`.docx`) və PDF mühazirə/laboratoriya fayllarından strukturlaşdırılmış məzmun çıxarır
- **Təkrar xülasələri** — əlaqəli mühazirə və laboratoriyalar arasında çarpaz istinadlarla qısa mövzu xülasələri
- **Test yaratma** — deterministik, mövzuya yönəlmiş çoxseçimli suallar, defolt olaraq tamamilə oflayn
- **Opsional LLM rejimi** — daha zəngin suallar üçün OpenAI-uyğun endpoint qoşun; uğursuzluq halında avtomatik olaraq lokal yaratmaya keçir
- **Lokal veb interfeys** — testləri brauzerdə həll edin; nəticələri istəyə görə CSV-yə saxlayın

Python ilə qurulub.

[Koda bax →](https://github.com/TesterBaku/softeng-study-quiz)

### Quiz Formatter — PDF-dən viktorina hazırlayan köməkçi

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

[Necə istifadə olunduğunu izlə →](https://youtu.be/qLmmXnKrZoI) · [Koda bax →](https://github.com/TesterBaku/unec-quiz-formatter)

### 5-ci sinif riyaziyyatı — interaktiv dərslər və testlər

Riyaziyyat və rus dili müəllimi olan (texniki olmayan) bacım üçün qurduğum müstəqil riyaziyyat tətbiqi. O — və ya şagirdləri — tətbiqi yükləyib, arxivdən çıxarıb bir cüt kliklə başlada bilər; terminal lazım deyil. 5-ci sinif riyaziyyat kurrikulumunu rus dilində əhatə edir.

Bu, [İmtahan Köməkçisi](/az/exam-helper/)-nin 5-ci sinif riyaziyyat bölməsinin **yüklənə bilən sələfidir** — eyni məzmun, brauzer əvəzinə müəllimin öz kompüterində oflayn işləməsi üçün paketlənib.

**İçərisində nə var:**

- **8 fəsil üzrə 57 dərs** — vizual nümunələrlə izahlar
- **Pilləli testlər** — asan / orta / çətin / qarışıq, hər səhv üçün rəylə
- **1 710 sual** — hər dərsdə hər pillə üçün 10 sual, hər sessiyada təsadüfi
- **Texniki olmayan istifadə üçün** — başlamaq üçün bir cüt klik; skript ilk işə salındıqda lazım olanı quraşdırır, sonra brauzerdə açılır
- **Test olunub** — quiz məntiqi üçün unit testlər və brauzer (end-to-end) testləri

TypeScript və Next.js ilə qurulub (Docker-a hazır).

[Koda bax →](https://github.com/TesterBaku/math-teacher-prototype)

## Müştəri vebsaytları

### Universal Appliances Repair — müştəri vebsaytı

Orange County, Kaliforniyada yerləşən Universal Appliances Repair adlı məişət texnikası təmiri xidməti üçün qurduğum statik marketinq vebsaytı. Sayt canlı işləyir və sevdiyim test-və-avtomatlaşdırma iş axınını nümayiş etdirir: hər dəyişiklik avtomatik yoxlamalarla qorunan PR vasitəsilə yayımlanır.

**İçərisində nə var:**

- **Çoxsəhifəli marketinq saytı** — ana səhifə, xidmətlər, haqqında, əlaqə, FAQ, rəylər və bloq (əl ilə qurulmuş HTML + Tailwind CSS, freymvork yoxdur, build addımı yoxdur)
- **Avtomatlaşdırılmış testlər** — daxili keçid yoxlayıcısı və hər birləşmədən əvvəl keçməli olan Puppeteer vizual skrinşot testləri
- **PR ilə qorunan iş axını** — Husky pre-push hook-ları; `master`-a birbaşa commit yoxdur
- **Avtomatlaşdırılmış SEO məzmunu** — Claude Code agenti tam dövrü işlədir (araşdırma → JSON-LD schema ilə yazı → avtomatik keçid + vizual testlər → PR → review → merge → deploy), beləcə işə salanda yeni lokal SEO məqalələri cədvəl üzrə avtomatik dərc oluna bilir; indiyədək 40+ canlı məqalə, üstəlik dövri SEO auditi öz düzəliş PR-ini açır

HTML + Tailwind CSS ilə qurulub.

[Sayta bax →](https://fixappliancesfast.com/) · [Koda bax →](https://github.com/TesterBaku/appliance-repair-website)

### RMC Tow — yedək xidməti vebsaytı

Corona və Inland Empire (Kaliforniya) bölgəsində fəaliyyət göstərən RMC Tow LLC yedək və yol kənarı yardım biznesi üçün qurub təhvil verdiyim kiçik statik marketinq saytı.

**İçərisində nə var:**

- **Dörd səhifə** — ana səhifə, xidmətlər, haqqında, əlaqə — statik HTML ilə əl ilə qurulub
- **Konversiyaya yönəlik** — qabarıq "zəng et" düyməsi və aydın xidmət bölgüsü (təcili yedəkləmə, flatbed daşıma, yol kənarı yardım)
- **Mobil-uyğun + SEO əsasları** — `tel:` keçidləri, sitemap və `robots.txt` ilə lokal axtarışa hazır

[Sayta bax →](https://www.rmctow.com/)

Birgə işləmək istəyirsiniz? [rufat@rufatmalikov.com](mailto:rufat@rufatmalikov.com)
