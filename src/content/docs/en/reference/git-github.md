---
title: Git & GitHub basics
description: A plain-language reference for Git and GitHub — repositories, the staging area, commits, branches, remotes, pull requests, and .gitignore — using the exact commands the course already runs.
sidebar:
  order: 7
---

**Git** is a version-control tool: it records snapshots of your project over time so you can see what changed, undo mistakes, and work alongside other people. **GitHub** is a website that hosts Git repositories online — it's where the course's practice app lives and where CI runs your tests. This page explains the handful of commands the course already uses, so they stop feeling like magic.

## Repositories — `clone` and `init`

A **repository** ("repo") is a project folder that Git is tracking. You get one in two ways:

```bash
# Copy an existing GitHub repo to your machine — the course does this for the app
git clone https://github.com/TesterBaku/testmarket-lab.git

# Or turn a folder you already have into a new repo
git init
```

`git clone` is the one you've already run in Module 2 and Module 12 to download **TestMarket Lab**.

## The three areas: working tree → staging → commit

This is the core mental model. A change moves through three places:

1. **Working tree** — your files as they are right now on disk (edited, but not yet recorded).
2. **Staging area** ("index") — changes you've *marked* to go into the next snapshot.
3. **Commit history** — permanent snapshots, each with a message.

```bash
git status            # what's changed and what's staged
git add .             # stage ALL changes (or: git add path/to/file)
git commit -m "Add Playwright CI workflow"   # record a snapshot
```

Those `git add .` and `git commit -m "…"` lines are exactly what Module 12 runs to save the CI workflow. The message after `-m` should say *what changed and why* in one line.

## Branches

A **branch** is an independent line of work. You make a branch, commit freely on it, and merge it back when it's ready — without disturbing the main line (usually called `main`).

```bash
git branch feature/login-tests     # create a branch
git switch feature/login-tests     # move onto it  (older syntax: git checkout)
git switch -c feature/login-tests  # create AND switch in one step
```

Branches are cheap and the normal way to work: one branch per feature or fix.

## Remotes — `push` and `pull`

A **remote** is a copy of the repo hosted elsewhere (on GitHub). The default remote is named `origin`.

```bash
git push origin main      # upload your commits to GitHub  (Module 12 ends with this)
git pull                  # download commits others have pushed
git remote -v             # show the remote URLs this repo points at
```

`git push` is what triggers CI: in Module 12 your workflow runs **on every push** because GitHub sees the new commits arrive.

## Pull requests

A **pull request** (PR) is a GitHub feature, not a Git command. You push a branch, then open a PR asking to merge it into `main`. The PR is where teammates review the diff and where CI reports pass/fail before anything merges. Module 13's CI runs **on every push and pull request** for exactly this reason — no broken code reaches `main`.

## `.gitignore` — files Git should never track

A **`.gitignore`** file lists paths Git should ignore. Two entries matter in this course:

```text
node_modules/    # downloaded dependencies — huge, and rebuildable with `npm install`
auth/            # saved login sessions (storageState) — contain real session cookies
```

- **`node_modules/`** is excluded because it's enormous and anyone can regenerate it from `package.json` with `npm install`.
- **`auth/`** is excluded because Playwright's `storageState` files hold live session cookies — committing them would leak credentials. Module 13 makes this a checklist item: *"`auth/` is in `.gitignore`."*

The rule of thumb: never commit secrets, credentials, or anything a build can regenerate.

## How it all fits in the course

| Command | Where you use it |
|---|---|
| `git clone …testmarket-lab.git` | Modules 2 & 12 — get the practice app |
| `git add .` → `git commit -m "…"` | Module 12 — save the CI workflow |
| `git push origin main` | Module 12 — upload, which triggers CI |
| push / pull request | Modules 12 & 13 — what CI runs on |
| `.gitignore` (`auth/`, `node_modules/`) | Module 13 — keep sessions and deps out of the repo |

## Quick reference

```text
git clone <url>         copy a remote repo locally
git init                start a new repo
git status              what changed / what's staged
git add .               stage all changes
git commit -m "msg"     record a snapshot
git switch -c <branch>  create + move to a branch
git push origin main    upload commits (triggers CI)
git pull                download others' commits
git remote -v           show remote URLs
.gitignore              paths Git must not track
```
