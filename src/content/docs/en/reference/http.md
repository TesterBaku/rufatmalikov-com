---
title: HTTP fundamentals
description: How HTTP works, for testers — the anatomy of a request and a response, HTTP methods, headers, and where data goes (path, query, body).
sidebar:
  order: 3
---

**HTTP** (HyperText Transfer Protocol) is the language clients and servers use to talk over the web. Every time a page loads, a form submits, or an [API](/en/reference/apis/) is called, an HTTP **request** goes out and an HTTP **response** comes back. Understanding the parts of each is most of what API testing requires.

## Anatomy of a request

An HTTP request has four parts:

```
POST /api/products HTTP/1.1            ← method + path
Host: localhost:3000                   ← headers
Content-Type: application/json
                                       ← blank line
{ "name": "Keyboard", "price": 49.99 } ← body
```

1. **Method** — the verb: what you want to do (`GET`, `POST`, …). See below.
2. **URL / path** — which resource: `/api/products`.
3. **Headers** — metadata about the request (format, authentication, etc.).
4. **Body** — the data you're sending (only for methods that create or update).

## Anatomy of a response

The server answers with three parts:

```
HTTP/1.1 201 Created                   ← status code
Content-Type: application/json         ← headers
                                       ← blank line
{ "id": 7, "name": "Keyboard" }        ← body
```

1. **Status code** — a 3-digit number saying how it went (`200` OK, `404` Not Found, …). This gets its own page: **[HTTP status codes](/en/reference/http-status-codes/)**.
2. **Headers** — metadata about the response.
3. **Body** — the data you asked for (usually [JSON](/en/reference/apis/)).

In a test you assert on both: **the status** (did it succeed the right way?) and **the body** (is the data correct?).

## HTTP methods

The method is the verb of the request. The five you'll use constantly:

| Method | Purpose | Has a body? | Example |
|---|---|---|---|
| `GET` | **Read** a resource | No | `GET /api/products` |
| `POST` | **Create** a new resource | Yes | `POST /api/products` |
| `PUT` | **Replace** an existing resource | Yes | `PUT /api/products/1` |
| `PATCH` | **Partially update** a resource | Yes | `PATCH /api/products/1` |
| `DELETE` | **Remove** a resource | Usually no | `DELETE /api/products/1` |

Two useful properties:

- **Safe** — the method only reads, changing nothing. `GET` is safe.
- **Idempotent** — calling it repeatedly has the same effect as calling it once. `GET`, `PUT`, and `DELETE` are idempotent; `POST` is not (call it twice, create two things).

## Headers

Headers are key/value metadata. A few you'll see often:

| Header | Meaning |
|---|---|
| `Content-Type: application/json` | "The body I'm sending is JSON." |
| `Accept: application/json` | "Please answer in JSON." |
| `Authorization: Bearer <token>` | "Here's my credential." |
| `Set-Cookie: connect.sid=...` | The server giving the client a cookie (e.g. a session). |
| `Cookie: connect.sid=...` | The client sending a cookie back on the next request. |

Tools like Playwright set `Content-Type: application/json` for you automatically when you pass a JSON body.

## Where data goes: path, query, and body

There are three places a request can carry data — knowing which is which prevents a lot of confusion:

- **Path parameter** — part of the URL that *identifies* a resource: the `1` in `GET /api/products/1`.
- **Query string** — `?key=value` pairs at the end of the URL, used to *filter or sort* a read: `GET /api/products?category=electronics&search=mouse`.
- **Body** — the JSON payload sent with `POST`/`PUT`/`PATCH` to *create or change* data: `{ "name": "Keyboard", "price": 49.99 }`.

Rule of thumb: **read** with the URL (path + query), **write** with the body.

## A full round trip

Creating a product against TestMarket Lab, end to end:

**Request**

```
POST /api/products
Content-Type: application/json

{ "name": "Keyboard", "price": 49.99, "category": "electronics" }
```

**Response**

```
201 Created
Content-Type: application/json

{ "id": 7, "name": "Keyboard", "price": 49.99, "category": "electronics", "stock": 0 }
```

The client asked to create a product (`POST` + body); the server created it, answered `201 Created`, and returned the new resource — including the `id` it assigned. A test would assert the status is `201` and that the body has an `id` and the right `name`.

Next: **[HTTP status codes](/en/reference/http-status-codes/)** — the full meaning of that `201`, and every other code.
