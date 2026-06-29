---
title: Reference
description: Plain-language reference material for QA and testers — what APIs are, how HTTP works, and what every HTTP status code means.
sidebar:
  order: 1
---

Short, plain-language reference pages for the concepts the course leans on but doesn't slow down to explain from scratch. Read them when a term shows up that you'd like grounded properly — no prior backend knowledge assumed.

## Pages

- **[What is an API?](/en/reference/apis/)** — clients, servers, REST, endpoints, and JSON, explained for testers.
- **[HTTP fundamentals](/en/reference/http/)** — the anatomy of a request and a response: methods, URLs, headers, and bodies.
- **[HTTP status codes](/en/reference/http-status-codes/)** — what `200`, `201`, `400`, `401`, `404`, `500` and the rest actually mean, with a full reference table.
- **[CSS selectors](/en/reference/css-selectors/)** — elements, classes, ids, attributes, combinators, and the selector engines Playwright layers on top.
- **[Regular expressions](/en/reference/regex/)** — literals, anchors, character classes, quantifiers, groups, and flags, grounded in the course's real `toHaveURL(/…/)` patterns.
- **[Git & GitHub basics](/en/reference/git-github/)** — repositories, the staging area, commits, branches, remotes, pull requests, and `.gitignore`, using the commands the course already runs.
- **[DOM & HTML basics](/en/reference/dom-html/)** — tags, attributes, the element tree, id vs class, and the semantic elements and roles behind `getByRole` and accessibility testing.

## Where this fits

Each page backs up the module that leans on it hardest:

- **APIs / HTTP / status codes** → **[Module 9 — API testing & networking](/en/course/module-9/)**.
- **CSS selectors** and **DOM & HTML** → **[Module 2 — Locators](/en/course/module-2/)** (and accessibility in **[Module 11](/en/course/module-11/)**).
- **Regular expressions** → the assertion modules (**[Module 4](/en/course/module-4/)** and around it).
- **Git & GitHub** → **[Module 12 — CI](/en/course/module-12/)**.

Read them whenever a term shows up that you'd like grounded properly — no prior backend or front-end knowledge assumed.
