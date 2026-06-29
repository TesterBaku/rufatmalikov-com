---
title: Accessibility, ARIA & WCAG
description: A plain-language reference for web accessibility — what WCAG and ARIA are, the POUR principles, and the violations axe-core catches in Module 11.
sidebar:
  order: 10
---

**Accessibility** (often shortened to **a11y** — "a", 11 letters, "y") means building pages everyone can use, including people who navigate with a screen reader, a keyboard only, or with low vision. It's also a testing concern: [Module 11](/en/course/module-11/) runs an automated accessibility audit with `@axe-core/playwright`. This page explains the vocabulary behind that audit.

It builds on the **[DOM & HTML reference](/en/reference/dom-html/)** — roles and accessible names are explained there; this page covers the standards (WCAG), the attributes (ARIA), and what the tooling checks.

## WCAG and the POUR principles

**WCAG** (Web Content Accessibility Guidelines) is the international standard for accessible web content. Its rules are organised under four principles — **POUR**:

| Principle | Means | Example failure |
|---|---|---|
| **P**erceivable | users can perceive the content | an image with no `alt` text |
| **O**perable | users can operate the UI | a control you can't reach with the keyboard |
| **U**nderstandable | content and operation make sense | a form field with no label |
| **R**obust | works with assistive tech | a custom widget with no role |

WCAG also has **conformance levels** — **A** (minimum), **AA** (the common legal/industry target), and **AAA** (strictest). Most teams aim for **AA**.

## ARIA — filling the gaps

Plain HTML already carries meaning: a `<button>` has the `button` role for free (see the [DOM reference](/en/reference/dom-html/)). **ARIA** (Accessible Rich Internet Applications) is a set of extra attributes for the cases native HTML can't express — custom widgets, dynamic updates, or labelling something that has no visible text.

| Attribute | Does |
|---|---|
| `role="…"` | declares what an element is when the tag can't (`role="dialog"`) |
| `aria-label="Close"` | gives an accessible name when there's no visible text |
| `aria-labelledby="id"` | names an element using another element's text |
| `aria-describedby="id"` | points to extra descriptive text (e.g. a hint) |
| `aria-hidden="true"` | hides decorative content from assistive tech |
| `aria-expanded`, `aria-checked` | expose a widget's current state |

:::caution
**The first rule of ARIA: don't use ARIA.** A native `<button>` beats `<div role="button">` every time — real elements come with keyboard behaviour and state for free. Reach for ARIA only when no semantic element fits. *No ARIA is better than bad ARIA*, because a wrong role actively misleads a screen reader.
:::

## What axe-core catches

[Module 11](/en/course/module-11/) uses `new AxeBuilder({ page }).analyze()` to scan a page and return a `violations` array. Each violation has an `id` naming the broken rule. The most common automatically-caught failures:

| axe rule `id` | The problem |
|---|---|
| `color-contrast` | text too faint against its background (a Perceivable failure) |
| `image-alt` | an `<img>` with no `alt` attribute |
| `label` | a form field with no associated label |
| `link-name` / `button-name` | a link or button with no accessible name |
| `document-title` | the page has no `<title>` |
| `html-has-lang` | the `<html>` element has no `lang` attribute |

```javascript
import AxeBuilder from '@axe-core/playwright';

test('home page has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);   // zero violations
});
```

## What automation can and can't do

Automated tools like axe catch roughly **30–40%** of WCAG issues — the mechanical ones (contrast, missing `alt`, missing labels). They **cannot** judge whether your `alt` text is *meaningful*, whether the tab order is *logical*, or whether a screen-reader experience actually makes sense. Those need manual testing with a keyboard and a screen reader. An axe pass means "no obvious machine-detectable failures," not "fully accessible."

## Quick reference

```text
a11y           accessibility (a + 11 letters + y)
WCAG           the standard; conformance levels A / AA / AAA (aim AA)
POUR           Perceivable, Operable, Understandable, Robust
role           what an element is (prefer native HTML; ARIA only when needed)
aria-label     accessible name when there's no visible text
aria-labelledby / -describedby   name / describe via another element
aria-hidden    hide decorative content from assistive tech
axe rule ids   color-contrast, image-alt, label, link-name, button-name
AxeBuilder     new AxeBuilder({ page }).analyze() → violations (Module 11)
caveat         automation catches ~30–40%; the rest needs manual testing
```
