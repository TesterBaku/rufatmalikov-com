---
title: DOM & HTML basics
description: A plain-language reference for HTML and the DOM — tags, attributes, text, parent/child structure, id vs class, and the semantic elements and roles that power getByRole and accessibility testing.
sidebar:
  order: 8
---

Every page Playwright tests is built from **HTML**, and the browser turns that HTML into a live tree called the **DOM**. Locators, roles, and accessibility checks all operate on that tree — so a clear picture of it makes the rest of the course click. No prior front-end experience needed.

## HTML: tags, attributes, text

An HTML **element** is written with a **tag**. Most come in pairs — an opening tag and a closing tag — with content in between:

```html
<button type="submit" id="login-btn">Log In</button>
```

That single element has three kinds of information:

- **Tag name** — `button`. It says *what kind* of element this is.
- **Attributes** — `type="submit"` and `id="login-btn"`. Name/value pairs that configure the element.
- **Text content** — `Log In`. The human-readable text inside it.

This is the exact Log In button from **TestMarket Lab**, and every locator strategy reads off one of those three parts: `getByRole('button', { name: 'Log In' })` uses the tag + text; `page.locator('#login-btn')` uses an attribute.

## The DOM: a tree of elements

When the browser loads HTML, it parses it into the **DOM** (Document Object Model) — a tree where every element is a **node**, nested inside its parent:

```html
<form class="login-form">
  <label for="email">Email</label>
  <input id="email" name="email">
  <button type="submit">Log In</button>
</form>
```

Here the `<form>` is the **parent**; the `<label>`, `<input>`, and `<button>` are its **children** (and siblings of each other). "The DOM" just means this live, in-memory tree — and it can change after load as JavaScript adds or removes nodes, which is why Playwright re-queries the tree on every action instead of trusting a stale snapshot.

This parent/child structure is exactly what **chained locators** and CSS **combinators** navigate:

```javascript
// "the button inside the login form" — parent → child
page.locator('.login-form').getByRole('button', { name: 'Log In' })
```

## `id` vs `class`

Two attributes show up everywhere, and the difference matters for testing:

| | `id` | `class` |
|---|---|---|
| Uniqueness | **one per page** | **shared by many** |
| HTML | `<input id="email">` | `<div class="product-card">` |
| CSS selector | `#email` | `.product-card` |
| As a locator | precise — matches one | matches *every* card |

Because an `id` is unique, `#email` is a precise, stable hook. Because a `class` is shared, `.product-card` matches every product on the shop page — useful for "all products," but a strict-mode trap when you mean just one (see [Module 2](/en/course/module-2/)).

## Semantic elements and roles

HTML elements carry **meaning**, not just appearance. A `<button>` *is* a button to the browser and to a screen reader; a `<nav>` *is* a navigation region. Choosing the meaningful ("semantic") tag is what makes a page accessible — and testable by role.

| Semantic element | Implicit role | What it means |
|---|---|---|
| `<button>` | `button` | a clickable action |
| `<a href>` | `link` | navigation to a URL |
| `<nav>` | `navigation` | a set of nav links |
| `<h1>`–`<h6>` | `heading` | a section title |
| `<input type="text">` | `textbox` | a text field |
| `<input type="checkbox">` | `checkbox` | a toggle |
| `<main>`, `<header>`, `<footer>` | `main` / `banner` / `contentinfo` | page landmarks |

Each element has an **implicit ARIA role** — the category assistive technology announces it as. This is the bridge to two course skills:

- **`getByRole`** ([Module 2](/en/course/module-2/)) finds elements by that role and their accessible name: `getByRole('button', { name: 'Log In' })`.
- **Accessibility testing** ([Module 11](/en/course/module-11/)) uses tools like **axe** to flag elements that lack a proper role or accessible name — e.g. a clickable `<div>` that should have been a `<button>`, or an `<img>` with no `alt`.

The **accessible name** is the label a screen reader reads for an element — usually its visible text (`<button>Log In</button>`), or an attribute when there's no text (`<img alt="Company logo">`, `<button aria-label="Close">×</button>`). `getByRole('…', { name })` matches on exactly that.

## Why this matters for testing

Semantic HTML and testability are the same goal. When the app uses a real `<button>` with clear text:

- a screen-reader user hears "Log In, button,"
- `getByRole('button', { name: 'Log In' })` finds it,
- and an axe audit passes.

When it uses a styled `<div>` with no role, all three break. That's why the course prefers role-based locators: a test that's hard to write by role is often a sign the markup has an accessibility problem worth fixing.

## Quick reference

```text
<tag attr="value">text</tag>   element = tag + attributes + text
tag name      what kind of element it is
attribute     name="value" pair that configures it
text content  the readable text inside
DOM           the live tree the browser builds from HTML
parent/child  nesting — what chained locators navigate
id            unique per page   → #id, precise locator
class         shared by many    → .class, matches many
role          what an element IS (button, link, heading)
accessible name  the label a screen reader reads
```
