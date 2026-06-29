---
title: Komanda sətri və npm
description: Terminal, Node.js, npm və npx üçün sadə dildə istinad — kursun asılılıqları quraşdırmaq və Playwright-ı işə salmaq üçün istifadə etdiyi əmrlər.
sidebar:
  order: 11
---

Kurs hər şeyi **terminaldan** işlədir — Playwright quraşdırma, məşq tətbiqini başlatma, testləri işlətmə. Klikləmək əvəzinə əmr yazmaq tanış gəlmirsə, bu səhifə əslində ehtiyac duyduğun bir neçə əmri əhatə edir, hamısı [Modul 0](/az/course/module-0/)-dan götürülüb.

## Terminal

**Terminal** (və ya komanda sətri / shell) əmrlər yazdığın və kompüterin onları işlətdiyi mətn pəncərəsidir. Girişi gözləyən bir **prompt** görəcəksən, sonra əmr yazıb Enter basırsan. Terminal həmişə hansısa qovluğun "içindədir" — sənin **cari kataloqun** — və əksər əmrlər ona nisbətən hərəkət edir.

| Əmr | Nə edir | Qeydlər |
|---|---|---|
| `pwd` | cari kataloqu çap et | "haradayam?" (Windows PowerShell: təkbaşına `cd`) |
| `ls` | buradakı faylları sadala | Windows: `dir` |
| `cd qovluq` | qovluğa keç | `cd ..` bir səviyyə yuxarı qalxır |
| `cd testmarket-lab` | tətbiq qovluğuna gir | məhz Modul 0-ın işlətdiyi |

Çox şey əzbərləmək lazım deyil — hərəkət etmək üçün `cd` və baxmaq üçün `ls` əksərini əhatə edir.

## Node.js və npm

- **Node.js** JavaScript-i brauzerdən kənarda işlədir. Playwright bir Node proqramıdır, ona görə Node yeganə ilkin şərtdir (kurs **Node 20+** istifadə edir). Səninkini `node -v` ilə yoxla.
- **npm** (Node Package Manager) Node ilə birlikdə gəlir. Layihənin asılı olduğu kitabxanaları quraşdırır və layihənin skriptlərini işlədir.

## `package.json` və `node_modules`

Hər Node layihəsinin bir **`package.json`**-u var — layihənin **asılılıqlarını** (ehtiyac duyduğu kitabxanaları) və **skriptlərini** (adlandırılmış əmrləri) sadalayan manifest. Quraşdırdıqda npm həmin asılılıqları **`node_modules/`** qovluğuna yükləyir:

```text
playwright-course/
├── package.json     # asılılıqlar + skriptlər (bunu redaktə edirsən)
├── node_modules/    # yüklənmiş kitabxanalar (heç vaxt redaktə etmə; commit etmə)
└── tests/           # sənin .spec.ts fayllların
```

`node_modules/` nəhəngdir və tamamilə yenidən qurula biləndir, məhz buna görə `.gitignore`-da olmalıdır ([Git istinadına](/az/reference/git-github/) bax).

## `npm install`

```bash
npm install          # package.json-u oxu, hər asılılığı yüklə
npm install --save-dev @axe-core/playwright   # yeni dev asılılığı əlavə et
```

`npm install` (çox vaxt `npm i` kimi qısaldılır) layihəni klonladıqdan sonra işlətdiyin ilk şeydir — Modul 0 tətbiqi başlatmazdan əvvəl `testmarket-lab` içində onu işlədir.

## `npm run` — skriptləri işlətmək

`package.json`-da müəyyən edilmiş skriptlər `npm run <ad>` ilə işlədilir:

```bash
npm start            # `npm run start` qısaltması — Modul 0 tətbiqi başladır
npm test             # `npm run test` qısaltması
npm run reset        # TestMarket Lab: seed məlumat bazasını bərpa et
```

`start` və `test` xüsusidir — `run` açar sözü olmadan işləyir. Qalan hər şey `npm run <ad>` tələb edir.

## `npx` — quraşdırmadan işlət

**`npx`** paketin əmrini qlobal quraşdırmadan işlədir. Kurs Playwright-ı belə işlədir:

```bash
npx playwright test          # bütün test dəstini işlət
npx playwright show-report   # HTML hesabatını aç
npm init playwright@latest   # yeni Playwright layihəsi qur (Modul 0)
```

Fərq bir sətirdə: **`npm install`** layihənə kitabxana *əlavə edir*; **`npx`** lazım gələrsə onu uçuşda gətirərək əmr *işlədir*.

## Modul 0 quraşdırması, sıra ilə

```bash
cd playwright-course
npm init playwright@latest    # layihəni qur (arxa planda npx)
npx playwright test           # nümunə testləri işlət
npx playwright show-report    # nəticələrə bax

# məşq tətbiqi
cd testmarket-lab
npm install                   # onun asılılıqlarını yüklə
npm start                     # http://localhost:3000-də işlət
```

## Sürətli istinad

```text
pwd / ls / cd      haradayam / nə var / hərəkət et
node -v            Node quraşdırıldığını yoxla (20+ lazım)
package.json       layihə manifesti: asılılıqlar + skriptlər
node_modules/      yüklənmiş kitabxanalar (gitignore-da, yenidən qurulan)
npm install        bütün asılılıqları yüklə
npm install -D x   dev asılılığı əlavə et
npm start          "start" skriptini işlət
npm test           "test" skriptini işlət
npm run <ad>       hər hansı digər skripti işlət
npx <cmd>          paket əmrini quraşdırmadan işlət
npx playwright test          dəsti işlət
npx playwright show-report   HTML hesabatını aç
```
