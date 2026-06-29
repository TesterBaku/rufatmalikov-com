---
title: Git və GitHub əsasları
description: Git və GitHub üçün sadə dildə istinad — repozitoriyalar, staging sahəsi, commit-lər, branch-lar, remote-lar, pull request-lər və .gitignore — kursun artıq işlətdiyi dəqiq əmrlərlə.
sidebar:
  order: 7
---

**Git** versiya nəzarəti alətidir: layihənin zaman içində anlıq görüntülərini qeyd edir ki, nəyin dəyişdiyini görə, səhvləri geri ala və başqaları ilə yan-yana işləyə biləsən. **GitHub** isə Git repozitoriyalarını onlayn saxlayan vebsaytdır — kursun məşq tətbiqi orada yerləşir və CI testlərini orada işlədir. Bu səhifə kursun artıq istifadə etdiyi bir neçə əmri izah edir ki, onlar sehr kimi görünməsin.

## Repozitoriyalar — `clone` və `init`

**Repozitoriya** ("repo") Git-in izlədiyi layihə qovluğudur. Onu iki yolla əldə edirsən:

```bash
# Mövcud GitHub repo-sunu maşınına kopyala — kurs tətbiq üçün bunu edir
git clone https://github.com/TesterBaku/testmarket-lab.git

# Ya da artıq sahib olduğun qovluğu yeni repo-ya çevir
git init
```

`git clone` artıq Modul 2 və Modul 12-də **TestMarket Lab**-ı yükləmək üçün işlətdiyindir.

## Üç sahə: working tree → staging → commit

Bu, əsas zehni modeldir. Dəyişiklik üç yerdən keçir:

1. **Working tree** — fayllarının diskdə hazırkı vəziyyəti (redaktə edilib, amma hələ qeyd olunmayıb).
2. **Staging sahəsi** ("index") — növbəti anlıq görüntüyə getməsi üçün *işarələdiyin* dəyişikliklər.
3. **Commit tarixçəsi** — daimi anlıq görüntülər, hər biri bir mesajla.

```bash
git status            # nə dəyişib və nə staged-dir
git add .             # BÜTÜN dəyişiklikləri stage et (ya da: git add yol/fayl)
git commit -m "Add Playwright CI workflow"   # anlıq görüntü qeyd et
```

Həmin `git add .` və `git commit -m "…"` sətirləri məhz Modul 12-nin CI workflow-unu saxlamaq üçün işlətdiyidir. `-m`-dən sonrakı mesaj bir sətirdə *nəyin və niyə dəyişdiyini* deməlidir.

## Branch-lar

**Branch** müstəqil iş xəttidir. Branch yaradırsan, üzərində sərbəst commit edirsən və hazır olanda onu geri birləşdirirsən — əsas xətti (adətən `main` adlanır) pozmadan.

```bash
git branch feature/login-tests     # branch yarat
git switch feature/login-tests     # ona keç  (köhnə sintaksis: git checkout)
git switch -c feature/login-tests  # bir addımda yarat VƏ keç
```

Branch-lar ucuzdur və işləməyin normal yoludur: hər funksiya və ya düzəliş üçün bir branch.

## Remote-lar — `push` və `pull`

**Remote** repo-nun başqa yerdə (GitHub-da) saxlanılan nüsxəsidir. Standart remote `origin` adlanır.

```bash
git push origin main      # commit-lərini GitHub-a yüklə  (Modul 12 bununla bitir)
git pull                  # başqalarının push etdiyi commit-ləri yüklə
git remote -v             # bu repo-nun işarələdiyi remote URL-ləri göstər
```

`git push` CI-ı işə salan şeydir: Modul 12-də workflow-un **hər push-da** işləyir, çünki GitHub yeni commit-lərin gəldiyini görür.

## Pull request-lər

**Pull request** (PR) Git əmri deyil, GitHub funksiyasıdır. Branch-ı push edirsən, sonra onu `main`-ə birləşdirməyi xahiş edən PR açırsan. PR komanda yoldaşlarının diff-i nəzərdən keçirdiyi və heç nə birləşmədən əvvəl CI-ın keçdi/keçmədi məlumatı verdiyi yerdir. Modul 13-ün CI-ı məhz buna görə **hər push və pull request-də** işləyir — pozulmuş kod `main`-ə çatmır.

## `.gitignore` — Git-in heç vaxt izləməməli olduğu fayllar

**`.gitignore`** faylı Git-in nəzərə almamalı olduğu yolları sadalayır. Bu kursda iki giriş vacibdir:

```text
node_modules/    # yüklənmiş asılılıqlar — nəhəng və `npm install` ilə bərpa olunan
auth/            # saxlanılan login sessiyaları (storageState) — real sessiya cookie-ləri
```

- **`node_modules/`** istisna edilir, çünki o nəhəngdir və hər kəs onu `package.json`-dan `npm install` ilə yenidən yarada bilər.
- **`auth/`** istisna edilir, çünki Playwright-in `storageState` faylları canlı sessiya cookie-ləri saxlayır — onları commit etmək kimlik məlumatlarını sızdırardı. Modul 13 bunu yoxlama maddəsinə çevirir: *"`auth/` `.gitignore`-dadır."*

Əsas qayda: heç vaxt sirləri, kimlik məlumatlarını və ya build-in yenidən yarada biləcəyi heç nəyi commit etmə.

## Bunların hamısı kursda necə uyğunlaşır

| Əmr | Harada istifadə edirsən |
|---|---|
| `git clone …testmarket-lab.git` | Modul 2 və 12 — məşq tətbiqini al |
| `git add .` → `git commit -m "…"` | Modul 12 — CI workflow-unu saxla |
| `git push origin main` | Modul 12 — yüklə, bu da CI-ı işə salır |
| push / pull request | Modul 12 və 13 — CI nəyin üzərində işləyir |
| `.gitignore` (`auth/`, `node_modules/`) | Modul 13 — sessiyaları və asılılıqları repo-dan kənarda saxla |

## Sürətli istinad

```text
git clone <url>         remote repo-nu yerli kopyala
git init                yeni repo başlat
git status              nə dəyişib / nə staged-dir
git add .               bütün dəyişiklikləri stage et
git commit -m "msg"     anlıq görüntü qeyd et
git switch -c <branch>  branch yarat + keç
git push origin main    commit-ləri yüklə (CI-ı işə salır)
git pull                başqalarının commit-lərini yüklə
git remote -v           remote URL-ləri göstər
.gitignore              Git-in izləməməli olduğu yollar
```
