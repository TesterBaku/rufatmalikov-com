---
title: HTTP status codes
description: A tester's reference for HTTP status codes — what each class means, the codes you'll see most, and how to assert them in Playwright.
sidebar:
  order: 4
---

Every HTTP [response](/en/reference/http/) starts with a 3-digit **status code** that says how the request went. As a tester it's often the first thing you assert — a correct status is the quickest signal that an endpoint behaved. This page is a reference: skim the classes, then keep the tables handy.

## The five classes

The first digit tells you the category:

| Range | Class | Meaning in one line |
|---|---|---|
| `1xx` | Informational | "Got it, still working." (rare in tests) |
| `2xx` | **Success** | "It worked." |
| `3xx` | Redirection | "Look somewhere else." |
| `4xx` | **Client error** | "*You* sent something wrong." |
| `5xx` | **Server error** | "*I* broke." |

The two you assert most are **2xx** (it worked the way you meant) and **4xx** (the app correctly rejected bad input). A `5xx` in a test usually means a real bug.

## The codes you'll see most

If you only memorise a handful, memorise these:

| Code | Name | When you see it |
|---|---|---|
| `200` | OK | A successful `GET` (or any request that returns data). |
| `201` | Created | A `POST` successfully created a resource. |
| `204` | No Content | Success, but there's no body to return (often a `DELETE`). |
| `301` / `302` | Moved / Found | A redirect to another URL. |
| `400` | Bad Request | The input was malformed or failed validation. |
| `401` | Unauthorized | You're not logged in / no valid credential. |
| `403` | Forbidden | You're logged in, but not allowed to do this. |
| `404` | Not Found | The resource doesn't exist. |
| `409` | Conflict | Clashes with current state (e.g. duplicate email). |
| `422` | Unprocessable Entity | Syntactically fine, but semantically invalid. |
| `500` | Internal Server Error | The server threw an unhandled error. |

### 401 vs 403 — the classic mix-up

- **`401` Unauthorized** = *"Who are you?"* — you're not authenticated. Log in first.
- **`403` Forbidden** = *"I know who you are, and no."* — you're authenticated but lack permission.

A logged-out user hitting an admin page gets `401`; a logged-in **customer** hitting an admin-only API gets `403`.

## 2xx — Success

| Code | Name | Notes |
|---|---|---|
| `200` | OK | The standard success. The body holds the result. |
| `201` | Created | A new resource was made; the body is usually the new resource, sometimes with a `Location` header. |
| `202` | Accepted | The request was accepted but processing happens later (async jobs). |
| `204` | No Content | Success with an empty body. Common for `DELETE` and some `PUT`s. |

## 3xx — Redirection

| Code | Name | Notes |
|---|---|---|
| `301` | Moved Permanently | The resource lives at a new URL for good — update your links. |
| `302` | Found | A temporary redirect. After a form `POST`, apps often redirect here. |
| `304` | Not Modified | Your cached copy is still fresh; the server sent no body. |
| `307` / `308` | Temporary / Permanent Redirect | Like `302`/`301` but the method must not change. |

> Many browser/test clients **follow** redirects automatically, so you may land on the final page without noticing the `3xx` in between. TestMarket Lab redirects after a successful login and after checkout, for example.

## 4xx — Client errors (you sent something wrong)

| Code | Name | Notes |
|---|---|---|
| `400` | Bad Request | Malformed request or failed validation (e.g. missing required field). |
| `401` | Unauthorized | Not authenticated — missing/invalid credentials. |
| `403` | Forbidden | Authenticated but not permitted. |
| `404` | Not Found | No such resource at this URL. |
| `405` | Method Not Allowed | The URL exists, but not for this method (e.g. `DELETE` where only `GET` is allowed). |
| `409` | Conflict | Clashes with current state — duplicate email, version conflict. |
| `422` | Unprocessable Entity | Well-formed but semantically invalid; common in validation-heavy APIs. |
| `429` | Too Many Requests | Rate-limited — you've sent too many requests too fast. |

## 5xx — Server errors (the server broke)

| Code | Name | Notes |
|---|---|---|
| `500` | Internal Server Error | An unhandled exception on the server. In tests, usually a real bug to report. |
| `502` | Bad Gateway | A proxy/gateway got an invalid response from an upstream server. |
| `503` | Service Unavailable | The server is down or overloaded (deploys, maintenance). |
| `504` | Gateway Timeout | An upstream server didn't respond in time. |

## How TestMarket Lab uses them

The practice app maps these cleanly — handy when you write assertions:

| Action | Status |
|---|---|
| `GET /api/products` | `200` |
| `POST /api/products` (valid) | `201` |
| `POST /api/products` (missing name/price) | `400` |
| `POST /api/auth/login` (wrong password) | `401` |
| `POST /api/auth/register` (email already exists) | `409` |
| `GET /api/products/99999` (no such id) | `404` |
| `POST /api/orders` (empty `items`) | `400` |

## Asserting status codes in Playwright

Playwright's response object exposes the status directly:

```ts
const res = await request.post('/api/products', {
  data: { name: 'Keyboard', price: 49.99 },
});

expect(res.status()).toBe(201);   // exact code
expect(res.ok()).toBeTruthy();    // true for any 2xx
```

Always assert the **status and the body** together — a broken endpoint can return `200` with an error message inside, and the status alone won't catch that:

```ts
const res = await request.get('/api/products/1');
expect(res.status()).toBe(200);
const body = await res.json();
expect(body).toHaveProperty('id', 1);
```

This is exactly the pattern used throughout **[Module 9](/en/course/module-9/)**.
