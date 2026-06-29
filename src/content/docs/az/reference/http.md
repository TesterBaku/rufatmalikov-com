---
title: HTTP əsasları
description: Testerlər üçün HTTP necə işləyir — sorğu və cavabın quruluşu, HTTP metodları, başlıqlar və məlumatın hara getdiyi (path, query, gövdə).
sidebar:
  order: 3
---

**HTTP** (HyperText Transfer Protocol) klientlərin və serverlərin veb üzərində danışmaq üçün istifadə etdiyi dildir. Səhifə yüklənəndə, forma göndəriləndə və ya [API](/az/reference/apis/) çağırılanda — hər dəfə bir HTTP **sorğusu** gedir və bir HTTP **cavabı** gəlir. Hər birinin hissələrini başa düşmək API testinin böyük hissəsidir.

## Sorğunun quruluşu

HTTP sorğusunun dörd hissəsi var:

```
POST /api/products HTTP/1.1            ← metod + path
Host: localhost:3000                   ← başlıqlar
Content-Type: application/json
                                       ← boş sətir
{ "name": "Keyboard", "price": 49.99 } ← gövdə
```

1. **Metod** — fel: nə etmək istədiyiniz (`GET`, `POST`, …). Aşağıya baxın.
2. **URL / path** — hansı resurs: `/api/products`.
3. **Başlıqlar** — sorğu haqqında metadata (format, autentifikasiya və s.).
4. **Gövdə** — göndərdiyiniz məlumat (yalnız yaradan və ya yeniləyən metodlar üçün).

## Cavabın quruluşu

Server üç hissə ilə cavab verir:

```
HTTP/1.1 201 Created                   ← status kodu
Content-Type: application/json         ← başlıqlar
                                       ← boş sətir
{ "id": 7, "name": "Keyboard" }        ← gövdə
```

1. **Status kodu** — necə getdiyini bildirən 3 rəqəmli ədəd (`200` OK, `404` Not Found, …). Bunun öz səhifəsi var: **[HTTP status kodları](/az/reference/http-status-codes/)**.
2. **Başlıqlar** — cavab haqqında metadata.
3. **Gövdə** — istədiyiniz məlumat (adətən [JSON](/az/reference/apis/)).

Testdə hər ikisinin üzərində iddia qurursunuz: **status** (doğru şəkildə uğurlu oldumu?) və **gövdə** (məlumat düzgündürmü?).

## HTTP metodları

Metod sorğunun felidir. Daim istifadə edəcəyiniz beşi:

| Metod | Məqsəd | Gövdəsi var? | Nümunə |
|---|---|---|---|
| `GET` | Resursu **oxu** | Yox | `GET /api/products` |
| `POST` | Yeni resurs **yarat** | Bəli | `POST /api/products` |
| `PUT` | Mövcud resursu **əvəz et** | Bəli | `PUT /api/products/1` |
| `PATCH` | Resursu **qismən yenilə** | Bəli | `PATCH /api/products/1` |
| `DELETE` | Resursu **sil** | Adətən yox | `DELETE /api/products/1` |

İki faydalı xüsusiyyət:

- **Təhlükəsiz (safe)** — metod yalnız oxuyur, heç nə dəyişmir. `GET` təhlükəsizdir.
- **İdempotent** — onu təkrar-təkrar çağırmaq bir dəfə çağırmaqla eyni nəticəni verir. `GET`, `PUT` və `DELETE` idempotentdir; `POST` deyil (iki dəfə çağırın, iki şey yaranar).

## Başlıqlar

Başlıqlar açar/dəyər metadatadır. Tez-tez görəcəyiniz bir neçəsi:

| Başlıq | Mənası |
|---|---|
| `Content-Type: application/json` | "Göndərdiyim gövdə JSON-dur." |
| `Accept: application/json` | "Zəhmət olmasa JSON ilə cavab ver." |
| `Authorization: Bearer <token>` | "Budur mənim kimlik məlumatım." |
| `Set-Cookie: connect.sid=...` | Serverin klientə kuki verməsi (məs., sessiya). |
| `Cookie: connect.sid=...` | Klientin növbəti sorğuda kukini geri göndərməsi. |

Playwright kimi alətlər JSON gövdə ötürəndə `Content-Type: application/json`-u sizin üçün avtomatik təyin edir.

## Məlumat hara gedir: path, query və gövdə

Sorğu məlumatı daşıya biləcəyi üç yer var — hansının hansı olduğunu bilmək çoxlu qarışıqlığın qarşısını alır:

- **Path parametri** — resursu *identifikasiya edən* URL hissəsi: `GET /api/products/1`-dəki `1`.
- **Query sətri** — URL-in sonundakı `?açar=dəyər` cütləri, oxumanı *filtrləmək və ya sıralamaq* üçün: `GET /api/products?category=electronics&search=mouse`.
- **Gövdə** — məlumatı *yaratmaq və ya dəyişmək* üçün `POST`/`PUT`/`PATCH` ilə göndərilən JSON yük: `{ "name": "Keyboard", "price": 49.99 }`.

Qayda: URL ilə **oxuyun** (path + query), gövdə ilə **yazın**.

## Tam gediş-gəliş

TestMarket Lab-a qarşı məhsul yaratmaq, başdan-sona:

**Sorğu**

```
POST /api/products
Content-Type: application/json

{ "name": "Keyboard", "price": 49.99, "category": "electronics" }
```

**Cavab**

```
201 Created
Content-Type: application/json

{ "id": 7, "name": "Keyboard", "price": 49.99, "category": "electronics", "stock": 0 }
```

Klient məhsul yaratmağı istədi (`POST` + gövdə); server onu yaratdı, `201 Created` cavabını verdi və yeni resursu — təyin etdiyi `id` daxil olmaqla — geri qaytardı. Test status-un `201` olduğunu və gövdənin `id` ilə düzgün `name` ehtiva etdiyini yoxlayardı.

Növbəti: **[HTTP status kodları](/az/reference/http-status-codes/)** — həmin `201`-in və bütün digər kodların tam mənası.
