---
title: Projects
description: Projects I build and share — starting with an SDET/QA interview trainer.
---

Projects I'm building and sharing. Each gets its own write-up as it grows.

## SDET Interview Trainer

A practice app for QA and SDET interview prep. I'm getting ready for interviews and wanted a helper I could use anywhere — at my desk or on the go — so I built one and opened it up for anyone in the same spot.

**What's inside:**

- **Daily Practice** — a focused daily plan mixing coding, SQL, Playwright/Selenium, API/CI/AWS, and strategy questions
- **Coding Gym** — QA-focused tasks to build coding confidence in Python and Java
- **Mock Interview** — type an answer, reveal a model answer, and self-rate against a checklist
- **Progress tracking** — completion metrics and a "weak topics" view across ~250 items

For now it runs without a backend, so it's quick to use on desktop or mobile. It's an early proof of concept — a starting point I'll keep building on.

[Open the trainer →](https://sdet-interview-trainer.vercel.app/) · [View the code →](https://github.com/TesterBaku/sdet-interview-trainer)

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

## BrauzerLab — interactive Playwright trainer

A free, browser-based Playwright course in Azerbaijani: 50 hands-on missions with an in-browser editor and a custom validation engine that gives instant feedback. Live now.

[Launch BrauzerLab →](https://brauzerlab.rufatmalikov.com) · [More about it →](/en/playwright/)

Want to collaborate? [rufat@rufatmalikov.com](mailto:rufat@rufatmalikov.com)
