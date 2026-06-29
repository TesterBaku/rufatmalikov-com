---
title: HTTP status kodları
description: Testerlər üçün HTTP status kodları istinadı — hər sinifin mənası, ən çox görəcəyiniz kodlar və onları Playwright-da necə yoxlamaq.
sidebar:
  order: 4
---

Hər HTTP [cavabı](/az/reference/http/) necə getdiyini bildirən 3 rəqəmli **status kodu** ilə başlayır. Tester kimi bu çox vaxt ilk yoxladığınız şeydir — düzgün status endpoint-in necə davrandığının ən sürətli siqnalıdır. Bu səhifə istinaddır: sinifləri gözdən keçirin, sonra cədvəlləri əlinizin altında saxlayın.

## Beş sinif

İlk rəqəm kateqoriyanı bildirir:

| Aralıq | Sinif | Bir sətirdə mənası |
|---|---|---|
| `1xx` | İnformasiya | "Aldım, hələ işləyirəm." (testlərdə nadir) |
| `2xx` | **Uğur** | "İşlədi." |
| `3xx` | Yönləndirmə | "Başqa yerə bax." |
| `4xx` | **Klient xətası** | "*Sən* yanlış nəsə göndərdin." |
| `5xx` | **Server xətası** | "*Mən* sındım." |

Ən çox yoxladığınız ikisi **2xx** (nəzərdə tutduğunuz kimi işlədi) və **4xx** (tətbiq yanlış girişi düzgün rədd etdi). Testdə `5xx` adətən real xəta deməkdir.

## Ən çox görəcəyiniz kodlar

Yalnız bir neçəsini əzbərləyəcəksinizsə, bunları əzbərləyin:

| Kod | Ad | Nə zaman görürsünüz |
|---|---|---|
| `200` | OK | Uğurlu `GET` (və ya məlumat qaytaran istənilən sorğu). |
| `201` | Created | `POST` resursu uğurla yaratdı. |
| `204` | No Content | Uğur, amma qaytarılacaq gövdə yoxdur (çox vaxt `DELETE`). |
| `301` / `302` | Moved / Found | Başqa URL-ə yönləndirmə. |
| `400` | Bad Request | Giriş səhv formada idi və ya doğrulamadan keçmədi. |
| `401` | Unauthorized | Daxil olmamısınız / etibarlı kimlik məlumatı yoxdur. |
| `403` | Forbidden | Daxil olmusunuz, amma bunu etməyə icazəniz yoxdur. |
| `404` | Not Found | Resurs mövcud deyil. |
| `409` | Conflict | Cari vəziyyətlə toqquşur (məs., təkrar email). |
| `422` | Unprocessable Entity | Sintaktik düzgün, amma semantik etibarsız. |
| `500` | Internal Server Error | Server idarə olunmayan xəta atdı. |

### 401 vs 403 — klassik qarışıqlıq

- **`401` Unauthorized** = *"Sən kimsən?"* — autentifikasiya olunmamısınız. Əvvəlcə daxil olun.
- **`403` Forbidden** = *"Kim olduğunu bilirəm, və xeyr."* — autentifikasiya olunmusunuz, amma icazəniz yoxdur.

Sistemdən çıxmış istifadəçi admin səhifəsinə girəndə `401` alır; daxil olmuş **müştəri** yalnız-admin API-yə girəndə `403` alır.

## 2xx — Uğur

| Kod | Ad | Qeydlər |
|---|---|---|
| `200` | OK | Standart uğur. Gövdə nəticəni saxlayır. |
| `201` | Created | Yeni resurs yaradıldı; gövdə adətən yeni resursdur, bəzən `Location` başlığı ilə. |
| `202` | Accepted | Sorğu qəbul edildi, amma emal sonra baş verir (asinxron işlər). |
| `204` | No Content | Boş gövdə ilə uğur. `DELETE` və bəzi `PUT`-lar üçün adidir. |

## 3xx — Yönləndirmə

| Kod | Ad | Qeydlər |
|---|---|---|
| `301` | Moved Permanently | Resurs həmişəlik yeni URL-də yaşayır — linklərinizi yeniləyin. |
| `302` | Found | Müvəqqəti yönləndirmə. Forma `POST`-undan sonra tətbiqlər çox vaxt buraya yönləndirir. |
| `304` | Not Modified | Keşlənmiş nüsxəniz hələ təzədir; server gövdə göndərmədi. |
| `307` / `308` | Temporary / Permanent Redirect | `302`/`301` kimi, amma metod dəyişməməlidir. |

> Bir çox brauzer/test klienti yönləndirmələri avtomatik **izləyir**, ona görə aradakı `3xx`-i fərq etmədən son səhifəyə düşə bilərsiniz. Məsələn, TestMarket Lab uğurlu girişdən sonra və ödənişdən sonra yönləndirir.

## 4xx — Klient xətaları (sən yanlış nəsə göndərdin)

| Kod | Ad | Qeydlər |
|---|---|---|
| `400` | Bad Request | Səhv formalı sorğu və ya doğrulama uğursuzluğu (məs., çatışmayan tələb olunan sahə). |
| `401` | Unauthorized | Autentifikasiya olunmayıb — kimlik məlumatı çatışmır/etibarsızdır. |
| `403` | Forbidden | Autentifikasiya olunub, amma icazə yoxdur. |
| `404` | Not Found | Bu URL-də belə resurs yoxdur. |
| `405` | Method Not Allowed | URL mövcuddur, amma bu metod üçün deyil (məs., yalnız `GET` olan yerdə `DELETE`). |
| `409` | Conflict | Cari vəziyyətlə toqquşur — təkrar email, versiya münaqişəsi. |
| `422` | Unprocessable Entity | Düzgün formalı, amma semantik etibarsız; doğrulama-ağırlıqlı API-lərdə adidir. |
| `429` | Too Many Requests | Sürət məhdudiyyəti — çox sürətli çox sorğu göndərmisiniz. |

## 5xx — Server xətaları (server sındı)

| Kod | Ad | Qeydlər |
|---|---|---|
| `500` | Internal Server Error | Serverdə idarə olunmayan istisna. Testlərdə adətən bildirilməli real xətadır. |
| `502` | Bad Gateway | Proxy/gateway yuxarı serverdən etibarsız cavab aldı. |
| `503` | Service Unavailable | Server işləmir və ya həddən artıq yüklənib (deploy, texniki xidmət). |
| `504` | Gateway Timeout | Yuxarı server vaxtında cavab vermədi. |

## TestMarket Lab onları necə istifadə edir

Məşq tətbiqi bunları təmiz şəkildə uyğunlaşdırır — iddialar yazanda faydalıdır:

| Əməliyyat | Status |
|---|---|
| `GET /api/products` | `200` |
| `POST /api/products` (etibarlı) | `201` |
| `POST /api/products` (ad/qiymət çatışmır) | `400` |
| `POST /api/auth/login` (yanlış parol) | `401` |
| `POST /api/auth/register` (email artıq mövcuddur) | `409` |
| `GET /api/products/99999` (belə id yoxdur) | `404` |
| `POST /api/orders` (boş `items`) | `400` |

## Playwright-da status kodlarını yoxlamaq

Playwright-ın cavab obyekti status-u birbaşa təqdim edir:

```ts
const res = await request.post('/api/products', {
  data: { name: 'Keyboard', price: 49.99 },
});

expect(res.status()).toBe(201);   // dəqiq kod
expect(res.ok()).toBeTruthy();    // istənilən 2xx üçün true
```

Həmişə **status-u və gövdəni** birlikdə yoxlayın — sınıq endpoint içəridə xəta mesajı ilə `200` qaytara bilər və tək status bunu tutmaz:

```ts
const res = await request.get('/api/products/1');
expect(res.status()).toBe(200);
const body = await res.json();
expect(body).toHaveProperty('id', 1);
```

Bu, **[Modul 9](/az/course/module-9/)** boyu istifadə olunan məhz həmin nümunədir.
