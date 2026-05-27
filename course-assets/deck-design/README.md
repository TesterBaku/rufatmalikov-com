# Course deck design assets

Reference materials for the course slide decks, kept here so they're always handy
(not served — this folder is outside `public/` and `src/`).

- `brand-spec.md`, `DESIGN-MANIFEST.json`, `DESIGN-HANDOFF.md` — the design system
  for the decks (produced with the Open Design project; "AI with Rufat" brand tokens).
- `mpjq1q34-logo.png` — brand logo.

**Where the decks live:** the served, self-contained deck HTML lives under
`public/course/decks/<name>/index.html` (e.g. `vscode-install`). New decks are
templated off the existing VS Code deck for a consistent look; the Open Design
project is the fallback when a fresh design is needed.
