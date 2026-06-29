---
title: What is an API?
description: A plain-language introduction to APIs for testers — clients and servers, REST, endpoints, requests and responses, and JSON.
sidebar:
  order: 2
---

An **API** (Application Programming Interface) is the way one program talks to another. When your browser shows a list of products, it didn't invent that list — it **asked a server for it** and the server answered. The API is the agreed set of questions you're allowed to ask and the shape of the answers you get back.

## The restaurant analogy

Think of a restaurant:

- **You** are the client — you want something.
- The **kitchen** is the server — it has the food and does the work.
- The **menu** is the API — it lists exactly what you can order and how.
- The **waiter** carries your order to the kitchen and brings the food back.

You don't walk into the kitchen and cook. You order from the menu, and you get back exactly what the menu promised. An API is that menu: a contract that says "ask me in this format, and I'll respond in that format."

## Client and server

- A **client** makes requests. A browser, a mobile app, a Playwright test, or a tool like `curl` are all clients.
- A **server** receives requests, does the work (reads a database, checks a password, saves an order), and sends a **response** back.

Every API interaction is one **request** from a client and one **response** from a server. That back-and-forth is the whole game.

## REST APIs and endpoints

Most web APIs you'll meet are **REST** APIs. The idea is simple: the server exposes **resources** (products, users, orders) at **URLs**, and you act on them with standard [HTTP methods](/en/reference/http/) (get, create, update, delete).

A specific URL you can call is an **endpoint**. For the course's practice app, **TestMarket Lab**, the endpoints look like this:

| Endpoint | What it does |
|---|---|
| `GET /api/products` | List all products |
| `GET /api/products/1` | Get the product with id `1` |
| `POST /api/products` | Create a new product |
| `GET /api/orders` | List all orders |
| `POST /api/auth/login` | Check an email + password |

The same resource (`/api/products`) behaves differently depending on the **method**: `GET` reads it, `POST` creates one. That pairing of *URL + method* is the core of REST.

## JSON — the language of the answer

APIs need a format both sides understand. The common one is **JSON** (JavaScript Object Notation) — plain text built from key/value pairs, arrays, and nested objects.

A response from `GET /api/products/1` might look like:

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "price": 29.99,
  "category": "electronics",
  "stock": 50
}
```

And a list (`GET /api/products`) is a JSON **array** of those objects:

```json
[
  { "id": 1, "name": "Wireless Mouse", "price": 29.99 },
  { "id": 2, "name": "Mechanical Keyboard", "price": 89.99 }
]
```

JSON is just text. Your test reads it, picks out the fields it cares about, and asserts on them.

## Why testers care about APIs

You can test an app entirely through its UI — clicking, typing, waiting for pages. But hitting the API directly is often **better**:

- **Speed** — an API call answers in milliseconds; a UI flow takes seconds.
- **Precision** — you test one endpoint in isolation, not the whole stack at once.
- **Setup** — you can create the data a UI test needs (a product, an order) over the API in one fast call, instead of clicking through forms.

A common professional pattern: **set up** state through the API (fast), then **verify** it through the UI (the real user experience). That's exactly what [Module 9](/en/course/module-9/) teaches.

## Key terms

- **API** — the contract for how programs talk to each other.
- **Client / server** — who asks (client) and who answers (server).
- **Endpoint** — a specific URL you can call.
- **Request / response** — one question, one answer.
- **REST** — a style where resources live at URLs and you act on them with HTTP methods.
- **JSON** — the text format most API responses use.

Next: **[HTTP fundamentals](/en/reference/http/)** — exactly what a request and a response are made of.
