---
title: Projects
description: Projects I build and share — QA training tools, AI-assisted study apps, and client websites.
---

Projects I'm building and sharing. Each gets its own write-up as it grows.

## BrauzerLab — interactive Playwright trainer

A free, browser-based Playwright course, available in English and Azerbaijani. You write real Playwright (JavaScript/TypeScript) in an in-browser editor, watch a simulated page react, and get instant pass/fail feedback — no install, no setup. I built the missions and the validation engine from scratch.

**What's inside:**

- **50 hands-on missions** across 7 progressive modules
- **Locators** — roles, text, labels, test-ids, filters, and positional selectors (including Shadow DOM and dynamic IDs)
- **Actions & auto-waiting** — clicks, typing, forms, drag-and-drop, plus reliable waits without flaky `sleep`
- **Assertions & strict mode** — auto-waiting `expect` and clean handling of ambiguous locators
- **Network interception** — block, mock, and stub requests with `page.route`
- **In-browser editor** — CodeMirror-based, with a custom validation engine for instant feedback

Available in English and Azerbaijani.

[Launch BrauzerLab →](https://brauzerlab.rufatmalikov.com/en/) · [More about it →](/en/playwright/)

## Exam Helper — exam prep for students in Azerbaijan

A free, browser-based study app for students in Azerbaijan. Pick a subject, read short lessons, then practise with tiered quizzes that grade instantly and explain every mistake — no install, runs in the browser. One bank-aware app serves two subjects from the same code, and every math answer is verified by an automatic answer-checker.

**What's inside:**

- **Grade 5 Mathematics** — 57 topics across 8 chapters, **1,710 questions**, taught in Russian
- **Grade 9 buraxılış prep** — exam-style math practice in Azerbaijani across 10 topics, tuned for the exit exam
- **Tiered quizzes** — easy / medium / hard / mixed, with per-mistake feedback
- **Retry-wrong & progress** — re-run only the questions you missed and track your score
- **Verified answers** — a deterministic answer-checker validates every math item before it ships

Built with TypeScript and Next.js (static export).

[Open Exam Helper →](https://exam.rufatmalikov.com/) · [More about it →](/en/exam-helper/) · [View the code →](https://github.com/TesterBaku/az-exam-helper)

## Universal Appliances Repair — client website

A static marketing website I built for Universal Appliances Repair, an appliance repair service in Orange County, CA. It's live in production and shows the testing-and-automation workflow I enjoy: every change ships through a PR gated by automated checks.

**What's inside:**

- **Multi-page marketing site** — home, services, about, contact, FAQ, testimonials, and a blog (hand-built HTML + Tailwind CSS, no framework, no build step)
- **Automated tests** — an internal link checker and Puppeteer visual screenshot tests that must pass before any merge
- **PR-gated workflow** — Husky pre-push hooks; no direct commits to `master`
- **Automated SEO content** — Claude Code routines research, write, and publish 3 new local-SEO articles every Mon/Wed/Fri, plus a quarterly SEO audit that opens a fix-up PR

Built with HTML + Tailwind CSS.

[Visit the site →](https://fixappliancesfast.com/) · [View the code →](https://github.com/TesterBaku/appliance-repair-website)

## SDET Interview Trainer

A practice app for QA and SDET interview prep. I'm getting ready for interviews and wanted a helper I could use anywhere — at my desk or on the go — so I built one and opened it up for anyone in the same spot.

**What's inside:**

- **Daily Practice** — a focused daily plan mixing coding, SQL, Playwright/Selenium, API/CI/AWS, and strategy questions
- **Coding Gym** — QA-focused tasks to build coding confidence in Python and Java
- **Mock Interview** — type an answer, reveal a model answer, and self-rate against a checklist
- **Progress tracking** — completion metrics and a "weak topics" view across ~250 items

For now it runs without a backend, so it's quick to use on desktop or mobile. It's an early proof of concept — a starting point I'll keep building on.

[Open the trainer →](https://sdet-interview-trainer.vercel.app/) · [View the code →](https://github.com/TesterBaku/sdet-interview-trainer)

## Study Quiz — exam prep from course materials

A local exam-prep helper I built for my nephew, a software-engineering master's student in Italy. He'd tried NotebookLM to turn his lecture slides and lab handouts into useful practice quizzes and couldn't get there — so I parsed the study materials and built a tool that does. It runs entirely on his machine and works as a blueprint he can adapt to any course.

**What's inside:**

- **Document parsing** — pulls structured content from PowerPoint (`.pptx`), Word (`.docx`), and PDF lecture/lab files in a course folder
- **Revision summaries** — short topic recaps with cross-references between related lectures and labs
- **Quiz generation** — deterministic, topic-focused multiple-choice questions, fully offline by default
- **Optional LLM mode** — plug in an OpenAI-compatible endpoint for richer questions, with automatic fallback to local generation
- **Local web UI** — take quizzes in the browser; optionally save results to CSV

Built with Python.

[View the code →](https://github.com/TesterBaku/softeng-study-quiz)

## Grade 5 Math — interactive lessons & quizzes

A self-contained math app I built for my sister, a (non-technical) math and Russian-language tutor. She — or her students — can download it, unzip, and start it with a double-click; no command line. It covers the Grade 5 mathematics curriculum, in Russian.

**What's inside:**

- **57 lessons across 8 chapters** — explanations with visual examples
- **Tiered quizzes** — easy / medium / hard / mixed, with per-mistake feedback
- **1,710 questions** — 10 per tier per lesson, randomised each session
- **Made for non-technical use** — double-click to launch; the script installs what it needs on first run, then opens in the browser
- **Tested** — unit tests for the quiz logic plus end-to-end browser tests

Built with TypeScript and Next.js (Docker-ready).

[View the code →](https://github.com/TesterBaku/math-teacher-prototype)

## Quiz Formatter — PDF-to-quiz study helper

A study helper I built for my niece, a student at UNEC (Azerbaijan) who studies in Russian — so the app is in Russian. Her course materials arrive as PDFs of questions with an answer key; this tool turns them into practice quizzes.

It's tuned to the specific layout of those UNEC course PDFs — a study tool for that format rather than a general-purpose PDF parser, so other document layouts may need adjusting.

**What's inside:**

- **PDF parsing** — pulls questions and answer choices straight out of the course PDF
- **Configurable quizzes** — randomized quizzes with a chosen number of questions (`--count`)
- **Instant grading** — checks your answers and explains mistakes using the answer key embedded in the PDF
- **Saved results** — keeps your attempt history between sessions
- **Runs anywhere** — a terminal, a local web UI, or a standalone Windows `.exe`

Built with Python.

[Watch the how-to video →](https://youtu.be/qLmmXnKrZoI) · [View the code →](https://github.com/TesterBaku/quiz_formatter_with_chatgpt)

## RMC Tow — towing company website

A small static marketing site I built and handed off for RMC Tow LLC, a towing and roadside-assistance business serving Corona and the Inland Empire, CA.

**What's inside:**

- **Four pages** — home, services, about, contact — hand-built in static HTML
- **Conversion-focused** — prominent click-to-call CTA and a clear services breakdown (emergency towing, flatbed transport, roadside assistance)
- **Mobile-friendly + SEO basics** — `tel:` links, sitemap, and `robots.txt`, ready to rank locally

[Visit the site →](https://www.rmctow.com/)

Want to collaborate? [rufat@rufatmalikov.com](mailto:rufat@rufatmalikov.com)
