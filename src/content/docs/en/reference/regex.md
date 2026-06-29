---
title: Regular expressions
description: A plain-language reference for regular expressions — literals, anchors, character classes, quantifiers, groups, and flags — grounded in the patterns the Playwright course actually uses.
sidebar:
  order: 6
---

A **regular expression** (regex) is a pattern for matching text. Instead of asking "is this string exactly equal to `/orders/42`?" a regex lets you ask "does this string look like `/orders/` followed by *some number*?" The course leans on regex constantly for URL and text assertions, like this one from Module 3:

```javascript
await expect(page).toHaveURL(/\/orders\/\d+/);
```

That reads: "the URL contains `/orders/` followed by one or more digits" — so it passes for `/orders/1`, `/orders/42`, or `/orders/9999` without you hard-coding the id. This page explains every piece of a pattern like that.

## The `/…/` delimiter

In JavaScript a regex is written between **forward slashes**, not quotes:

```javascript
/login/        // a regex that matches the text "login"
'login'        // a plain string — NOT a regex
```

Playwright's matchers (`toHaveURL`, `toHaveText`, `getByText`, `filter`, `waitForURL`) accept **either** a string (exact/substring match) **or** a regex (pattern match). The slashes are how you signal "this is a pattern."

## Literals and the dot

Most characters in a regex match themselves — these are **literals**. `/cart/` matches the text `cart`. The one common exception is the **dot** `.`, which matches *any single character*:

```javascript
/c.t/    // matches "cat", "cut", "c9t" — any char between c and t
```

## Anchors — `^` and `$`

By default a regex matches **anywhere** inside the string. Anchors pin it to an edge:

| Anchor | Means |
|---|---|
| `^` | start of the string |
| `$` | end of the string |

```javascript
/\/admin/      // URL CONTAINS /admin  (anywhere)
/^https/       // string STARTS WITH https
/\/checkout$/  // string ENDS WITH /checkout
```

This is why `toHaveURL(/\/orders\/\d+/)` passes on a full URL like `http://localhost:3000/orders/42` — without anchors, it only needs to find the pattern *somewhere* in the string.

## Character classes

A character class matches **one character** out of a set.

| Class | Matches |
|---|---|
| `\d` | a digit `0–9` |
| `\w` | a word character: letter, digit, or `_` |
| `\s` | whitespace (space, tab, newline) |
| `[abc]` | any one of `a`, `b`, `c` |
| `[a-z]` | any lowercase letter (a range) |
| `[^0-9]` | any character that is **not** a digit (`^` inside `[]` negates) |

```javascript
/\/orders\/\d+/   // /orders/ then digits  — the course's order-id pattern
/[?&]search=/     // a ? OR & before search=  (query-string matching, Module 4)
```

## Quantifiers — how many

Quantifiers say how many times the **preceding** item may repeat.

| Quantifier | Means |
|---|---|
| `*` | zero or more |
| `+` | one or more |
| `?` | zero or one (optional) |
| `{3}` | exactly 3 |
| `{2,5}` | between 2 and 5 |

```javascript
/\d+/      // one or more digits      → "42", "9999"
/colou?r/  // "color" OR "colour"     → the u is optional
/\d{4}/    // exactly four digits     → a year, a zip code
```

In `/\/orders\/\d+/`, the `+` after `\d` is what lets it match an id of any length.

## Escaping — matching special characters literally

Characters with a special meaning (`. / \ + * ? ( ) [ ] { } ^ $ |`) must be **escaped** with a backslash to match them literally. The slash matters a lot in URL patterns:

```javascript
/\/orders\//   // matches the literal text "/orders/"
//             // every \/ is an escaped forward slash
```

`\/` is a literal `/`; `\.` is a literal dot; `\\` is a literal backslash. Without the backslash, `.` would match any character and `/` would close the regex early.

## Groups and alternation

- **`( … )`** groups part of a pattern so a quantifier or alternation applies to the whole group.
- **`|`** means "or".

```javascript
/(cat|dog)s?/     // "cat", "cats", "dog", or "dogs"
/(\d{1,3}\.){3}\d{1,3}/  // four dot-separated number groups (an IP shape)
```

## Flags

A letter **after** the closing slash changes how the whole pattern behaves.

| Flag | Effect |
|---|---|
| `i` | case-**i**nsensitive |
| `g` | **g**lobal — find all matches, not just the first |
| `m` | **m**ultiline — `^`/`$` match each line |

```javascript
page.getByText(/login/i)                       // "Login", "LOGIN", "login" — Module 2
await expect(page.locator('.result')).toHaveText(/success/i)   // Module 5
await expect(page.locator('#search')).toHaveValue(/widget/i)   // Module 4
```

The `i` flag is the one you'll use most in tests — it makes assertions survive capitalization changes in the UI.

## Where the course uses regex

| Pattern | Where | Why a regex |
|---|---|---|
| `toHaveURL(/\/orders\/\d+/)` | Modules 3, 4, 5, 7 | the order id is dynamic |
| `toHaveURL(/[?&]search=Wireless/)` | Modules 4, 5 | match a query param in any position |
| `not.toHaveURL(/\/admin/)` | Module 4 | assert you did **not** reach an area |
| `getByText(/login/i)` | Module 2 | case-insensitive text match |
| `filter({ hasText: /…/ })` | Module 2 | narrow a set by a text pattern |

:::tip
`toHaveURL`, `toHaveText`, `getByText`, `filter`, and `waitForURL` all take a **string or a regex**. Use a string when you know the exact value; reach for a regex the moment any part of it is dynamic (an id, a timestamp, a query value) or you want case-insensitivity.
:::

## Quick reference

```text
/abc/        literal text "abc"
.            any one character
^   $        start / end of string
\d \w \s     digit / word char / whitespace
[abc] [a-z]  one char from a set / range
[^0-9]       NOT in the set
*  +  ?      zero+ / one+ / optional
{3} {2,5}    exactly 3 / between 2 and 5
\/  \.       escaped literal / or .
( ) |        group / OR
/…/i  /…/g   case-insensitive / global flag
```
