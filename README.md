# rufatmalikov.com

Personal site for Rufat Malikov — multilingual Playwright training, engineering writing, and side-project portfolio.

Built with [Astro Starlight](https://starlight.astro.build/). Deployed on Cloudflare Pages.

## Local development

```sh
npm install
npm run dev
```

Then open http://localhost:4321 — it auto-redirects to `/en/`.

## Languages

- English at `/en/...`
- Azerbaijani at `/az/...`

English is the default locale but is still prefixed (no unprefixed root) — this is intentional and makes adding Russian or Turkish later trivial.

## Content structure

```
src/content/docs/
  en/
    index.mdx           ← homepage hero
    playwright/         ← course lessons
    blog/               ← posts
    projects/           ← side-project write-ups
  az/                   ← same structure, in Azerbaijani
```

Pages don't need to be translated in lockstep — write each post in whichever language fits best. Mark untranslated pages clearly when relevant.

## Commands

| Command          | What it does                            |
| :--------------- | :-------------------------------------- |
| `npm install`    | Install dependencies                    |
| `npm run dev`    | Start dev server at `localhost:4321`    |
| `npm run build`  | Build production site to `./dist/`      |
| `npm run preview`| Preview the production build locally    |

## Deployment

Pushes to `main` auto-deploy to Cloudflare Pages once the repo is connected.
