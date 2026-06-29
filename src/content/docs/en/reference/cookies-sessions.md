---
title: Cookies & sessions
description: A plain-language reference for cookies and sessions — how a browser stays logged in, what HttpOnly means, and how it all connects to Playwright's storageState.
sidebar:
  order: 9
---

HTTP is **stateless** — each request stands alone, and the server has no memory of the last one. So how does a site remember you're logged in across page loads? **Cookies** and **sessions**. This page explains both, then connects them to the `storageState` technique in [Module 10](/en/course/module-10/) — including why the "HttpOnly cookies can't be saved" myth is wrong.

## What a cookie is

A **cookie** is a small `name=value` pair the server asks the browser to store and send back on every future request to that site. The server sets one with a response header:

```http
Set-Cookie: connect.sid=s%3Aabc123...; HttpOnly; Path=/
```

From then on, the browser automatically attaches it to each request:

```http
Cookie: connect.sid=s%3Aabc123...
```

That round-trip is what keeps you logged in: the cookie is the **proof of identity** the browser carries so you don't re-enter your password on every page.

## Cookie attributes

A cookie carries flags that control how it behaves:

| Attribute | Means |
|---|---|
| `HttpOnly` | JavaScript on the page **cannot** read it (`document.cookie` won't see it) — a security measure against XSS |
| `Secure` | only sent over HTTPS |
| `SameSite` | restricts whether it's sent on cross-site requests (CSRF defence) |
| `Expires` / `Max-Age` | when it should be deleted; without these it's a **session cookie** that dies when the browser closes |
| `Path` / `Domain` | which URLs the cookie is sent to |

`HttpOnly` is the one that trips people up in testing — more on that below.

## What a session is

A **cookie** stores a tiny value in the browser. A **session** stores the real data on the **server**. They work together:

1. You log in. The server creates a **session** (a record of who you are) in its own storage and gives it an id.
2. The server sends that id back as a cookie — it does **not** send your data, just the key.
3. On each later request the browser sends the cookie; the server looks up the session by its id and knows it's you.

So the cookie is just a **claim ticket**; the valuables stay behind the counter (on the server). This is exactly how **TestMarket Lab** works: it uses `express-session`, whose cookie is named **`connect.sid`** and is flagged **`HttpOnly`**.

## Cookies vs tokens (the other approach)

Some apps skip server-side sessions and instead hand the browser a **token** (often a JWT) after login, stored in `localStorage`. The browser sends it on each request, usually in an `Authorization` header. The difference in one line:

- **Session cookie:** the server remembers you; the cookie is just a key. (TestMarket Lab)
- **Token:** the token itself carries your identity; the server remembers nothing.

Both are "how the app keeps you logged in" — they just put the state in different places.

## How this connects to `storageState`

[Module 10](/en/course/module-10/) teaches you to log in **once** and reuse that authenticated state with `storageState`, which serialises the browser's cookies + `localStorage` to a JSON file.

A common myth says `storageState` can't handle session apps because `connect.sid` is `HttpOnly`. **That's false.** The confusion comes from `document.cookie` — page JavaScript genuinely can't read an `HttpOnly` cookie. But `storageState` doesn't use `document.cookie`; it reads the browser's own **cookie jar** through the DevTools protocol, so it captures *every* cookie, `HttpOnly` ones included. Save `storageState` after a TestMarket login and the file really does contain `connect.sid`.

:::caution
The real limit isn't HttpOnly — it's **staleness**. A session cookie is only a *key* into server-side storage. If the server restarts, the session expires, or the user logs out, yesterday's saved file authenticates to nothing. The fix is to **regenerate the state fresh at the start of each run** (a setup project does this), not to avoid `storageState`. See [Module 10](/en/course/module-10/).
:::

## Quick reference

```text
cookie         name=value the browser stores and resends each request
Set-Cookie     response header the server uses to set one
HttpOnly       JS can't read it (document.cookie blind) — but the cookie jar still has it
Secure         HTTPS-only
SameSite       cross-site sending rule (CSRF defence)
session cookie no Expires → dies when the browser closes
session        server-side record; the cookie holds only its id (a key)
token (JWT)    identity carried by the value itself, often in localStorage
storageState   Playwright JSON of cookies + localStorage — captures HttpOnly too
```
