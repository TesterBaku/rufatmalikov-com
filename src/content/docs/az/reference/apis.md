---
title: API nədir?
description: Testerlər üçün API-lərə sadə dildə giriş — klientlər və serverlər, REST, endpoint-lər, sorğular və cavablar, və JSON.
sidebar:
  order: 2
---

**API** (Application Programming Interface — Tətbiq Proqramlaşdırma İnterfeysi) bir proqramın başqa bir proqramla danışma üsuludur. Brauzeriniz məhsulların siyahısını göstərəndə həmin siyahını özü uydurmur — onu **serverdən soruşur** və server cavab verir. API soruşa biləcəyiniz sualların razılaşdırılmış toplusu və geri aldığınız cavabların formasıdır.

## Restoran bənzətməsi

Bir restoran təsəvvür edin:

- **Siz** klientsiniz — nəsə istəyirsiniz.
- **Mətbəx** serverdir — yeməyi var və işi görür.
- **Menyu** API-dir — nə sifariş edə biləcəyinizi və necə edəcəyinizi dəqiq sadalayır.
- **Ofisiant** sifarişinizi mətbəxə aparır və yeməyi geri gətirir.

Mətbəxə girib yemək bişirmirsiniz. Menyudan sifariş verirsiniz və menyunun vəd etdiyini dəqiq geri alırsınız. API məhz həmin menyudur: "məndən bu formatda soruş, mən də o formatda cavab verim" deyən bir müqavilə.

## Klient və server

- **Klient** sorğu göndərir. Brauzer, mobil tətbiq, Playwright testi və ya `curl` kimi alət — hamısı klientdir.
- **Server** sorğunu qəbul edir, işi görür (verilənlər bazasını oxuyur, parolu yoxlayır, sifarişi saxlayır) və geri **cavab** göndərir.

Hər API qarşılıqlı əlaqəsi klientdən bir **sorğu** və serverdən bir **cavabdır**. Bütün məsələ məhz bu gediş-gəlişdir.

## REST API-lər və endpoint-lər

Qarşılaşacağınız əksər veb API-lər **REST** API-lərdir. İdeya sadədir: server **resursları** (məhsullar, istifadəçilər, sifarişlər) **URL-lərdə** təqdim edir və siz onlara standart [HTTP metodları](/az/reference/http/) (oxu, yarat, yenilə, sil) ilə təsir edirsiniz.

Çağıra biləcəyiniz konkret URL **endpoint**-dir. Kursun məşq tətbiqi **TestMarket Lab** üçün endpoint-lər belə görünür:

| Endpoint | Nə edir |
|---|---|
| `GET /api/products` | Bütün məhsulları sadalayır |
| `GET /api/products/1` | `1` id-li məhsulu gətirir |
| `POST /api/products` | Yeni məhsul yaradır |
| `GET /api/orders` | Bütün sifarişləri sadalayır |
| `POST /api/auth/login` | Email + parolu yoxlayır |

Eyni resurs (`/api/products`) **metoddan** asılı olaraq fərqli davranır: `GET` onu oxuyur, `POST` yeni yaradır. *URL + metod* cütlüyü REST-in özəyidir.

## JSON — cavabın dili

API-lərə hər iki tərəfin başa düşdüyü bir format lazımdır. Geniş yayılmış olanı **JSON**-dur (JavaScript Object Notation) — açar/dəyər cütlərindən, massivlərdən və iç-içə obyektlərdən qurulan adi mətn.

`GET /api/products/1`-dən gələn cavab belə görünə bilər:

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "price": 29.99,
  "category": "electronics",
  "stock": 50
}
```

Siyahı isə (`GET /api/products`) həmin obyektlərin JSON **massividir**:

```json
[
  { "id": 1, "name": "Wireless Mouse", "price": 29.99 },
  { "id": 2, "name": "Mechanical Keyboard", "price": 89.99 }
]
```

JSON sadəcə mətndir. Testiniz onu oxuyur, maraqlandığı sahələri seçir və onların üzərində iddia qurur.

## Testerlər niyə API-lərə əhəmiyyət verir

Tətbiqi tamamilə UI vasitəsilə test edə bilərsiniz — kliklər, yazmaq, səhifələri gözləmək. Amma API-yə birbaşa müraciət etmək çox vaxt **daha yaxşıdır**:

- **Sürət** — API çağırışı millisaniyələrlə cavab verir; UI axını saniyələr çəkir.
- **Dəqiqlik** — bütün yığını birdən yox, bir endpoint-i ayrıca test edirsiniz.
- **Quraşdırma** — UI testinə lazım olan məlumatı (məhsul, sifariş) formalardan keçmək əvəzinə bir sürətli API çağırışı ilə yarada bilərsiniz.

Geniş yayılmış peşəkar nümunə: vəziyyəti API vasitəsilə **qurun** (sürətli), sonra UI vasitəsilə **yoxlayın** (real istifadəçi təcrübəsi). [Modul 9](/az/course/module-9/)-un öyrətdiyi məhz budur.

## Əsas terminlər

- **API** — proqramların bir-biri ilə necə danışdığının müqaviləsi.
- **Klient / server** — kim soruşur (klient) və kim cavab verir (server).
- **Endpoint** — çağıra biləcəyiniz konkret URL.
- **Sorğu / cavab** — bir sual, bir cavab.
- **REST** — resursların URL-lərdə yaşadığı və onlara HTTP metodları ilə təsir etdiyiniz üslub.
- **JSON** — əksər API cavablarının istifadə etdiyi mətn formatı.

Növbəti: **[HTTP əsasları](/az/reference/http/)** — sorğu və cavabın tam olaraq nədən ibarət olduğu.
