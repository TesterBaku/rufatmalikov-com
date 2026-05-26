# Personal Website + Playwright Ecosystem — Plan

_Last updated: 2026-05-25. Per AGENTS.md "Plan First". Review this design before any git init / push / deploy._

## Goal

Launch **rufatmalikov.com** as a personal hub: Playwright learning (BrauzerLab), blog, projects, an about/resume presence, and the YouTube channel. Repositioned to an honest, accessible voice for people learning **QA / testing / coding / AI**. Everything free.

## Topology (decided)

```
One Cloudflare account, one domain (rufatmalikov.com, already on Cloudflare)
├── Pages project #1 → personal site (this repo)      → rufatmalikov.com
└── Pages project #2 → BrauzerLab (separate repo)      → brauzerlab.rufatmalikov.com
        connected only by links; NOT merged into one repo
```

## Decisions locked in

- [x] Site voice = "QA automation enthusiast" / accessible (not "Senior SDET")
- [x] Audience broadened to anyone learning QA / testing / coding / AI
- [x] Career-ops / job-search content removed
- [x] Course will be **free** (monetization optional/additive later: donations, sponsorship, YouTube)
- [x] BrauzerLab → its own space, deployed to `brauzerlab.rufatmalikov.com` subdomain
- [x] YouTube `@AIwithRufat` added as header social link

## Content status (done, en + az)

- [x] Home, blog, projects pages reframed
- [x] SDET Interview Trainer featured in Projects (live link + public GitHub repo)
- [x] Playwright section = BrauzerLab home (7 modules / 50 missions, AZ-first, "launching soon", no live link yet)
- [x] BrauzerLab pointer added to Projects

## Design decisions (resolved 2026-05-25)

- [x] **About page + downloadable resume PDF** (no separate formal Resume page)
- [x] **Positioning = Blend** — humble/accessible teaching voice for learning content; honest & credible (9+ yrs) on the About page
- [x] **AI through-line** — surface AI-assisted-testing + YouTube to tie the site together
- [x] **Privacy** — phone + personal Gmail stay OFF the public page; public contact = rufat@rufatmalikov.com
- [x] **Social links** — add LinkedIn + GitHub (TesterBaku) alongside YouTube
- [x] About page links: Email, LinkedIn, GitHub, YouTube, resume PDF

## Résumé — DONE (delivered as a web page, not a hosted PDF)

- [x] Trimmed contact (no phone, no personal Gmail; email = rufat@rufatmalikov.com, LinkedIn + GitHub kept)
- [x] Published as standalone page `src/pages/resume.astro` → `/resume`, with a "Print / Save as PDF" button + print CSS
- [x] Linked from About pages (en: "view & print"; az: "bax və çap et (ingiliscə)")
- Note: Word COM hung on a hidden dialog and Edge headless print-to-pdf failed on this machine, so we skipped a hosted PDF file. Visitors print-to-PDF from the page. User can still drop a Word-exported PDF in /public later if desired.

## Still open

- [ ] **Repo name + visibility** for the personal site (suggest `personal-website`, public or private)
- [ ] Optional: nudge the home hero toward the blend voice (currently pure "enthusiast")
- [ ] Visual check of `/resume` in a browser (build passes; not yet eyeballed)

## Deploy plan (AFTER design review)

### Personal site
- [ ] `git init` + `.gitignore` already good + first commit (local only)
- [ ] Create GitHub repo, `git remote add`, push
- [ ] Cloudflare Pages → Connect to Git → build `npm run build`, output `dist`
- [ ] Custom domain `rufatmalikov.com` (+ `www` redirect)

### BrauzerLab (separate repo, already git)
- [ ] Finish pre-launch: native-AZ review of Locators module, formal Lighthouse pass, final QA
- [ ] Push to GitHub (private OK) or `wrangler pages deploy`
- [ ] Cloudflare Pages project + custom domain `brauzerlab.rufatmalikov.com`
- [ ] Swap site `/playwright/` "launching soon" → real "Open the trainer" links

### Course (later)
- [ ] Build content; publish free; add to site

## Review

_(To be filled in after implementation, per AGENTS.md.)_
