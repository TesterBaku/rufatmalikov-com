# CLAUDE.md

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 3. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes -- don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests -- then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management

1. **Plan First:** Write plan to tasks/todo.md with checkable items
2. **Verify Plan:** Check in before starting implementation
3. **Track Progress:** Mark items complete as you go
4. **Explain Changes:** High-level summary at each step
5. **Document Results:** Add review section to tasks/todo.md
6. **Capture Lessons:** Update tasks/lessons.md after corrections

---

## Core Principles

- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact:** Only touch what's necessary. No side effects with new bugs.

---

## Tooling & Extensions

As the project grows, you may add **skills, MCP servers, and subagents** to streamline tasks we run repeatedly (e.g. visual verification, design review, content workflows).

- **Always get approval first.** Propose the addition — what it is, why it helps, what it touches — and wait for a yes before installing or wiring it in.
- **Same rule for project dependencies.** Don't add packages to `package.json` without approval (e.g. the `playwright` devDependency added for screenshot verification).
- **Keep the toolchain lean.** Prefer existing tools; add a new one only when a task recurs and the tool clearly pays for itself.

---

## Operating Model

Work here is orchestrated by Opus and executed by cheaper models:

- **Opus — orchestrator / architect / senior engineer.** Planning, architecture, strategy, design decisions, code review and integration, and communication with Rufat. Decisive and root-cause oriented; keeps process ceremony proportional to the change.
- **Sonnet — implementer.** Delegated development and non-trivial, multi-step research, run via subagents.
- **Haiku — assistant.** Simple or cheap research, lookups, and mechanical tasks, run via subagents.

Delegate any task that can be delegated; reserve Opus for high-leverage thinking. Trivial one-off edits don't need a subagent. Always review delegated output before integrating (trust but verify).

---

## Development Workflow

**Branch + PR, never push to `main` directly.** `main` is protected and auto-deploys to `rufatmalikov.com` via Cloudflare Pages. Every change ships through a PR that the maintainer (Rufat) merges.

### The loop

1. **Branch** off `main` — `feat/…`, `fix/…`, `chore/…`, or `content/…`.
2. **Make the change**, then locally: `npm run typecheck` and `npm run test:e2e` (and for visual/UI work, review a screenshot of the page — a local `tasks/shot.mjs` helper exists for this; note `tasks/` is gitignored, so it and any notes under it are machine-local, not in the repo).
3. **Push** the branch — the `pre-push` hook runs `npm run build` first, so a broken build never leaves the machine.
4. **Open a PR** against `main`. This triggers:
   - **CI** (`.github/workflows/ci.yml`) — typecheck + Playwright e2e; **must pass** to merge.
   - **Cloudflare** — a preview deployment URL for the branch.
   - **GitHub Copilot** — its automated PR review comments.
5. **Independent local review** — run an independent code review (the `code-review` skill or a separate code-reviewer agent, *not* the author) against the PR diff.
6. **Address everything** — fix all independent-review findings **and** verify + address every GitHub Copilot comment. Push fixes, which re-runs CI.
7. **Repeat 5–6** until the independent reviewer approves and CI is green.
8. **Rufat merges.** Cloudflare deploys `main` to production.

### Adding a project (Projects page)

- Edit **both** locales: `src/content/docs/en/projects/index.md` and `src/content/docs/az/projects/index.md`.
- Match the existing entry format: `## Title — descriptor`, a short intro, a `**What's inside:**` bullet list, then links.
- **Verify features from the repo/code, never infer from names or descriptions** — this has caused inaccurate copy before. Describe only what's confirmed; flag AI/LLM features as optional if that's what they are.
- Update the e2e `expectedOrder` in `tests/e2e/site.spec.ts` if the Projects ordering changes.

### Verify checklist (before requesting merge)

- [ ] `npm run typecheck` clean
- [ ] `npm run test:e2e` green
- [ ] For UI changes: screenshot reviewed (light + dark)
- [ ] Independent review approved; all Copilot comments resolved
- [ ] No secrets, build output, or `tasks/` scratch committed
