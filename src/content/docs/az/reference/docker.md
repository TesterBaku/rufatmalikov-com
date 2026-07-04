---
title: Docker əsasları
description: Testerlər üçün sadə dildə Docker istinadı — image-lər, konteynerlər, docker run, portlar və env dəyişənləri, Compose və GitHub Actions servis konteyneri — DB-yoxlama modullarının qaldırdığı Postgres verilənlər bazasına əsaslanır.
sidebar:
  order: 13
---

Gec-tez bir test işi səndən "verilənlər bazasını Docker-də qaldırmağı" istəyəcək və ya bir CI faylında `services:` bloku görəcəksən — bunun nə demək olduğunu bilmək kömək edir. **Docker** bir proqramı işləməsi üçün lazım olan hər şeylə — dəqiq versiya, kitabxanaları, konfiqurasiyası — birlikdə bir **konteynerə** (container) qablaşdırır və bu konteyner sənin noutbukunda, komanda yoldaşının maşınında və CI serverində eyni cür davranır. Daha "mənimkində işləyir" yoxdur.

Tester üçün bu, konkret və təkrarlanan problemi həll edir: testlərinin qarşısında işləmək üçün **real verilənlər bazası** lazımdır və hər dəfə — həm lokalda, həm CI-də — *təzə, eyni* birini istəyirsən, üstəlik hər maşında Postgres-i əllə quraşdırmadan. Bir əmr məhz bunu verir. Bu səhifə testerin əslində işlətdiyi Docker-in sadə dildə turudur və **Database verification** modullarının qaldırdığı Postgres verilənlər bazasına əsaslanır.

## Docker-i quraşdırmaq

Bu səhifədəki hər hansı əmr işləməzdən əvvəl maşınında Docker olmalıdır. Nə quraşdırdığın OS-dən asılıdır, amma hər biri sənə eyni `docker` əmrini verir:

- **Windows və macOS — Docker Desktop.** Onu [docker.com](https://www.docker.com/products/docker-desktop/)-dan endir, quraşdır və işə sal. Desktop lazım olan hər şeyi qablaşdırır: mühərriki (engine), `docker` CLI-ni və Compose-u. Windows-da WSL 2 backend-ində işləyir — Docker Desktop bunu sənin üçün qurur və birdəfəlik yenidən başlatma lazımdırsa xəbərdarlıq edir. Konteynerlərdən istifadə edərkən tətbiqi açıq saxla; mühərrik məhz odur.
- **Linux — Docker Engine.** Mühərriki distribusiyanın paket menecerindən (Docker-in quraşdırma sənədlərində hər distro üçün kopyala-yapışdır bloku var) və ya Docker-in rahatlıq skripti ilə quraşdır. Compose daxili `docker compose` plagini kimi gəlir. İşə salınacaq Desktop tətbiqi yoxdur — mühərrik arxa plan servisi kimi işləyir.

Sonra işlədiyini təsdiqlə — bu iki əmr Docker-in "hello world"-udur:

```bash
docker --version           # quraşdırılmış versiyanı çap edir, məsələn Docker version 29.2.0
docker run hello-world     # kiçik bir image endirir, işlədir və uğur mesajı çap edir
```

`docker run hello-world` öz salamını çap edirsə, quraşdırman qaydasındadır və aşağıdakı hər əmr işləyəcək. Docker Desktop-un standart parametrləri bu kurs üçün kifayətdir — konfiqurasiya ediləsi bir şey yoxdur.

## Konteyner əslində nədir

Konteyner işləyən bir proqram üstəgəl onun bütün mühitidir və maşınının qalan hissəsindən təcrid olunub. Bir yük konteynerini təsəvvür et: içində nə olursa olsun, xarici tərəf hər kran və gəminin işləyə biləcəyi standart formadadır. Postgres konteyneri Postgres-i və asılılıqlarını daşıyır; sənin maşınının isə yalnız Docker-i işlətməsi kifayətdir, Postgres quraşdırmaq lazım deyil.

Başlanğıcdan mənimsəməli iki vərdiş:

- **Konteyner birdəfəlikdir.** Birini qaldırırsan, istifadə edirsən, atırsan və növbəti dəfə eynisini qaldırırsan. Məhz bu atılan xüsusiyyət testləri təkrarlanabilən edir.
- **Maşınına heç nə sızmır.** Verilənlər bazası konteynerin içində yaşayır, OS-də deyil. Konteyneri sil və o yox olur — arxa planda işləyən heç bir artıq servis qalmır.

## Image-lər vs konteynerlər

Bu iki söz daim qarışdırılır və fərq önəmlidir:

- **Image** (obraz) plandır — yalnız oxunan bir paket, məsələn `postgres:16-alpine`. Onu bir dəfə endirirsən.
- **Konteyner** image-in işləyən nüsxəsidir. Bir image-dən çoxlu konteyner qaldıra bilərsən.

`:16-alpine` hissəsi **teqdir** (tag) — versiya. Teqi bərkitmək (`postgres:16-alpine`, çılpaq `postgres` yox) o deməkdir ki, hamı — sən, komandan, CI — *eyni* verilənlər bazası versiyasını işlədir, beləcə lokalda keçən test CI-dəki versiya fərqi ucbatından batmaz. `alpine` sadəcə kiçik, yığcam bazadır, ona görə endirmə yüngüldür.

```bash
docker pull postgres:16-alpine   # image-i endir (Docker bunu ilk işə salışda avtomatik da edir)
```

## `docker run` — quruluşu

Ən çox yazacağın əmr budur. Budur, DB modullarının işlətdiyi dəqiq verilənlər bazasını qaldırır:

```bash
docker run -d --name testmarket-db \
  -e POSTGRES_USER=testuser \
  -e POSTGRES_PASSWORD=testpass \
  -e POSTGRES_DB=testmarket \
  -p 5432:5432 \
  postgres:16-alpine
```

Bayraq-bayraq oxunuşu:

| Hissə | Mənası |
|---|---|
| `-d` | **Detached** — arxa planda işlət və terminalını geri qaytar. |
| `--name testmarket-db` | Sonra istinad edə bilməyin üçün dostcasına ad (təsadüfi id əvəzinə). |
| `-e KEY=value` | Konteynerə ötürülən **mühit dəyişəni** (environment variable). Postgres istifadəçi, parol və ilkin verilənlər bazasını qurmaq üçün bunları oxuyur. |
| `-p 5432:5432` | **Portu dərc et** — `host:container` uyğunlaşdır. Sol rəqəm *sənin* maşınındakı port; sağ rəqəm konteynerin *içindəki* port. İndi `localhost:5432` verilənlər bazasına çatır. |
| `postgres:16-alpine` | İşlədiləcək **image** (həmişə sonuncu). |

Maşınında `5432` portu artıq tutulubsa (məsələn, mövcud Postgres), sadəcə **sol** tərəfi dəyiş: `-p 55432:5432` konteyneri eyni saxlayır və ona `localhost:55432`-də çatırsan.

:::caution[`-e`-dəki kimlik məlumatları yalnız birdəfəlik test bazaları üçündür]
`-e POSTGRES_PASSWORD=…` ilə parol ötürmək lokal, birdəfəlik test verilənlər bazası üçün normaldır. Real bir şey üçün kimlik məlumatları əmr sətrindən və ya commit edilmiş fayldan yox, secret-lərdən gəlir — istənilən digər parolla eyni qayda.
:::

## İşləyən konteynerlə danışmaq

Qalxandan sonra bir neçə əmr demək olar hər şeyi əhatə edir:

```bash
docker ps                    # işləyən konteynerləri siyahıla
docker logs testmarket-db    # onun çıxışını gör (başlanğıc, xətalar)
docker exec -it testmarket-db psql -U testuser -d testmarket   # onun içində shell/psql aç
docker stop testmarket-db    # dayandır
docker rm testmarket-db      # sil (dayandırılmış olmalıdır, ya da -f işlət)
```

`docker ps` nəyin işlədiyini və ən önəmlisi port uyğunlaşmasını göstərir:

```
NAMES           IMAGE                STATUS         PORTS
testmarket-db   postgres:16-alpine   Up 3 seconds   0.0.0.0:5432->5432/tcp
```

Nəsə qoşula bilmirsə, ilk baxacağın yer `docker logs`-dur — sağlam Postgres `database system is ready to accept connections` ilə bitir. `docker exec` isə konteynerin *içində* bir əmr işlədir: verilənlərə əllə baxmaq üçün `psql` açmağa əlverişlidir, tam olaraq [SQL əsasları](/az/reference/sql-basics/) istinadında göstərildiyi kimi.

## Konteynerlər birdəfəlikdir (və məsələ də elə budur)

Konteyneri dayandırıb sil, verilənləri də onunla gedir. **Test** verilənlər bazası üçün bu, qüsur deyil, xüsusiyyətdir — hər işə salış eyni, boş vəziyyətdən başlayır, beləcə testlər əvvəlki işə salışdan qalanlarla korlana bilməz. Bu, kursun onsuz da öyrətdiyi `reset` vərdişinin konteyner səviyyəsindəki variantıdır.

Verilənlərin yenidən başlatmadan sonra *sağ qalmasını* istədikdə — test yox, üzərində işlədiyin verilənlər bazası — **volume** qoş: o, faylları konteynerdən kənarda, maşınında saxlayır:

```bash
docker run -d --name testmarket-db \
  -e POSTGRES_PASSWORD=testpass \
  -p 5432:5432 \
  -v testmarket-data:/var/lib/postgresql/data \
  postgres:16-alpine
```

`-v name:/path` adlandırılmış volume-u Postgres-in verilənləri saxladığı qovluğa uyğunlaşdırır. İndi konteyneri `docker rm` et, verilənlər növbəti üçün hələ də oradadır. Test verilənlər bazaları üçün adətən volume-u qəsdən *buraxırsan* — təmiz başlanğıc *istəyirsən*.

## Eyni anda çoxlu servis: Docker Compose

Real sistemlər bir konteynerdən çoxdur — bir tətbiq **və** onun verilənlər bazası, bəlkə keş də. **Compose** onların hamısını bir `docker-compose.yml` faylında təsvir edir və bir əmrlə birlikdə qaldırır. Budur iki servisli nümunə: bir Postgres verilənlər bazası və verilənlər bazasının hazır olmasını gözləyib sonra ona verilən yükləyən birdəfəlik `seed` addımı.

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
      POSTGRES_DB: testmarket
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testuser -d testmarket"]
      interval: 3s
      timeout: 3s
      retries: 10

  seed:
    image: postgres:16-alpine
    depends_on:
      db:
        condition: service_healthy
    environment:
      PGPASSWORD: testpass
    command: >
      psql -h db -U testuser -d testmarket
      -c "CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name TEXT);
          INSERT INTO products (name) VALUES ('Wireless Mouse');
          SELECT count(*) FROM products;"
```

```bash
docker compose up      # hər şeyi qaldır (detach üçün -d əlavə et)
docker compose ps      # bu layihənin konteynerlərini siyahıla
docker compose down    # dayandır və sil (volume-ları da atmaq üçün -v əlavə et)
```

Burada üç ideya haqqını verir və hər üçü CI-də də ortaya çıxır:

- **Servis adı host adıdır.** `seed` addımı `-h db` ilə qoşulur — Compose şəbəkəsinin içində hər servis öz adı ilə əlçatandır. IP ünvanı yoxdur.
- **`healthcheck`** Docker-ə verilənlər bazasının həqiqətən *hazır* olduğunu (sadəcə qalxmış yox) necə biləcəyini deyir — burada `pg_isready` işlədərək.
- **`depends_on: condition: service_healthy`** `seed`-i `db` öz healthcheck-indən keçənə qədər gözlədir, beləcə heç vaxt çox erkən qoşulmağa cəhd etmir. Bu başlama-sırası problemi CI-də flaky verilənlər bazası testlərinin ən çox rast gəlinən səbəbidir.

## CI-də Docker

Bütün bunların testerə önəm verməsinin səbəbi: CI testlərini verilənlər bazası olmayan təmiz bir maşında işlədir — ona görə CI işə salış üçün birini konteynerdə qaldırır. **GitHub Actions** buna **servis konteyneri** deyir və bu, `docker run` ilə eyni ideyadır, YAML kimi yazılıb:

```yaml
# .github/workflows/tests.yml (parça)
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testmarket
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U testuser -d testmarket"
          --health-interval 3s --health-timeout 3s --health-retries 10
    steps:
      - uses: actions/checkout@v4
      # ... asılılıqları quraşdır, sonra testləri localhost:5432-yə qarşı işlət
```

Onu yuxarıdakı `docker run` ilə müqayisə et: eyni image, eyni `env` (`-e` bayraqları), eyni port, eyni healthcheck. Birini oxuya bildikdə, digərini də oxuya bilərsən. [CI modulu](/az/course/module-12/) hər test işə salışına öz təzə verilənlər bazasını məhz belə verir.

## Bunu testdə istifadə etmək

Nəticə sadədir: konteyner testinə məlum ünvanda real verilənlər bazası verir və oradan sonrası artıq bildiyin SQL-dir.

```bash
# 1. birdəfəlik verilənlər bazası qaldır
docker run -d --name testmarket-db -e POSTGRES_PASSWORD=testpass -p 5432:5432 postgres:16-alpine
# 2. testlərini işlət — onlar localhost:5432-yə qoşulur
# 3. sök-at
docker rm -f testmarket-db
```

Testdən qoşulmaq — və qoşulandan sonra işlədəcəyin yoxlamalar — Python SDET və [Playwright](/az/course/) kurslarındakı **Database verification** modullarının mövzusudur. [SQL əsasları](/az/reference/sql-basics/) istinadı sorğuları əhatə edir; bu səhifə isə onları yönəldəcəyin verilənlər bazasını əldə etməyi.
