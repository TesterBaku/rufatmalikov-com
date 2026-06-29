---
title: Command line & npm
description: A plain-language reference for the terminal, Node.js, npm, and npx — the commands the course uses to install dependencies and run Playwright.
sidebar:
  order: 11
---

The course runs everything from a **terminal** — installing Playwright, starting the practice app, running tests. If typing commands instead of clicking feels unfamiliar, this page covers the handful you actually need, all drawn from [Module 0](/en/course/module-0/).

## The terminal

A **terminal** (or command line / shell) is a text window where you type commands and the computer runs them. You'll see a **prompt** waiting for input, then you type a command and press Enter. The terminal is always "in" some folder — your **current directory** — and most commands act relative to it.

| Command | Does | Notes |
|---|---|---|
| `pwd` | print working directory | "where am I?" (Windows PowerShell: `cd` alone) |
| `ls` | list files here | Windows: `dir` |
| `cd foldername` | change into a folder | `cd ..` goes up one level |
| `cd testmarket-lab` | enter the app folder | exactly what Module 0 runs |

You don't need to memorise much — `cd` to move around and `ls` to look around cover most of it.

## Node.js and npm

- **Node.js** runs JavaScript outside the browser. Playwright is a Node program, so Node is the one prerequisite (the course uses **Node 20+**). Check yours with `node -v`.
- **npm** (Node Package Manager) ships with Node. It installs the libraries your project depends on and runs your project's scripts.

## `package.json` and `node_modules`

Every Node project has a **`package.json`** — a manifest listing the project's **dependencies** (libraries it needs) and **scripts** (named commands). When you install, npm downloads those dependencies into a **`node_modules/`** folder:

```text
playwright-course/
├── package.json     # dependencies + scripts (you edit this)
├── node_modules/    # the downloaded libraries (never edit; never commit)
└── tests/           # your .spec.ts files
```

`node_modules/` is huge and fully rebuildable, which is why it belongs in `.gitignore` (see the [Git reference](/en/reference/git-github/)).

## `npm install`

```bash
npm install          # read package.json, download every dependency
npm install --save-dev @axe-core/playwright   # add a new dev dependency
```

`npm install` (often shortened to `npm i`) is the first thing you run after cloning a project — Module 0 runs it inside `testmarket-lab` before starting the app.

## `npm run` — running scripts

Scripts defined in `package.json` are run with `npm run <name>`:

```bash
npm start            # shorthand for `npm run start` — Module 0 starts the app
npm test             # shorthand for `npm run test`
npm run reset        # TestMarket Lab: restore the seed database
```

`start` and `test` are special — they work without the `run` keyword. Everything else needs `npm run <name>`.

## `npx` — run without installing

**`npx`** runs a package's command without installing it globally. It's how the course runs Playwright:

```bash
npx playwright test          # run the whole test suite
npx playwright show-report   # open the HTML report
npm init playwright@latest   # scaffold a new Playwright project (Module 0)
```

The difference in one line: **`npm install`** *adds* a library to your project; **`npx`** *runs* a command, fetching it on the fly if needed.

## The Module 0 setup, in order

```bash
cd playwright-course
npm init playwright@latest    # scaffold the project (npx under the hood)
npx playwright test           # run the example tests
npx playwright show-report    # view results

# the practice app
cd testmarket-lab
npm install                   # download its dependencies
npm start                     # run it at http://localhost:3000
```

## Quick reference

```text
pwd / ls / cd      where am I / what's here / move around
node -v            check Node is installed (need 20+)
package.json       project manifest: dependencies + scripts
node_modules/      downloaded libraries (gitignored, rebuildable)
npm install        download all dependencies
npm install -D x   add a dev dependency
npm start          run the "start" script
npm test           run the "test" script
npm run <name>     run any other script
npx <cmd>          run a package command without installing it
npx playwright test          run the suite
npx playwright show-report   open the HTML report
```
