# Iteration 001 — Setup Tailwind and Clean Vite

## Goal

Prepare the frontend foundation for Ordboble.

Remove default Vite demo content and establish a clean minimal frontend structure with Tailwind CSS.

---

# Scope

## In Scope

- Install Tailwind CSS
- Configure Tailwind for Svelte + Vite
- Remove default Vite demo content
- Create minimal clean app shell
- Establish initial folder structure
- Verify app starts correctly
- Keep implementation lightweight

## Out of Scope

Do NOT:
- build actual app screens
- implement backend
- implement realtime
- add routing
- add animation libraries
- add UI component libraries
- add state libraries
- add authentication
- redesign architecture

---

# Architect Output

## Analysis

Current state is a standard Vite + Svelte 5 template with no Tailwind and no project-specific structure.

## Approach

Use **Tailwind CSS v4** via `@tailwindcss/vite`. No `tailwind.config.js` or `postcss.config.js` needed — v4 configures via CSS.

## Impacted Files

**Modify:**
- `apps/web/package.json` — add `tailwindcss`, `@tailwindcss/vite` as devDependencies (via install)
- `apps/web/vite.config.ts` — add `tailwindcss()` plugin before `svelte()`
- `apps/web/src/app.css` — replace entirely with `@import "tailwindcss";`
- `apps/web/src/App.svelte` — replace with minimal clean app shell (centered app name, no demo content)
- `apps/web/index.html` — update title from `web` to `Ordboble`

**Delete (demo-only):**
- `apps/web/src/lib/Counter.svelte`
- `apps/web/src/assets/hero.png`
- `apps/web/src/assets/svelte.svg`
- `apps/web/src/assets/vite.svg`
- `apps/web/public/icons.svg`

**Create (lib folder structure with `.gitkeep`):**
- `apps/web/src/lib/components/ui/`
- `apps/web/src/lib/components/word-cloud/`
- `apps/web/src/lib/components/layout/`
- `apps/web/src/lib/services/`
- `apps/web/src/lib/stores/`
- `apps/web/src/lib/types/`
- `apps/web/src/lib/utils/`

## Constraints

- No new visual patterns beyond Tailwind utility defaults
- No new dependencies beyond `tailwindcss` and `@tailwindcss/vite`
- App shell is a minimal proof-of-concept — not a real screen
- Preserve `public/favicon.svg`

---

# Developer Output

## Changes Made

**Installed:**
- `tailwindcss@4.3.0` (devDependency)
- `@tailwindcss/vite@4.3.0` (devDependency)

**Modified:**
- `apps/web/vite.config.ts` — added `tailwindcss()` plugin before `svelte()`
- `apps/web/index.html` — updated title to `Ordboble`
- `apps/web/src/app.css` — replaced entirely with `@import "tailwindcss";`
- `apps/web/src/App.svelte` — replaced with minimal centered shell using Tailwind classes

**Deleted:**
- `apps/web/src/lib/Counter.svelte`
- `apps/web/src/assets/hero.png`
- `apps/web/src/assets/svelte.svg`
- `apps/web/src/assets/vite.svg`
- `apps/web/public/icons.svg`

**Created (lib structure with `.gitkeep`):**
- `apps/web/src/lib/components/ui/`
- `apps/web/src/lib/components/word-cloud/`
- `apps/web/src/lib/components/layout/`
- `apps/web/src/lib/services/`
- `apps/web/src/lib/stores/`
- `apps/web/src/lib/types/`
- `apps/web/src/lib/utils/`

## Verification

- `pnpm check`: 0 errors, 0 warnings
- `npx vite`: dev server starts cleanly at http://localhost:5173/

---

# Tester Output

TBD

---

# Reviewer Output

## Review

**Scope:** Correct. Only what the Architect specified was implemented. No extra features, no routing, no UI framework, no state library.

**Tailwind setup:** Correct. Uses Tailwind v4 via `@tailwindcss/vite` — no `tailwind.config.js` or `postcss.config.js` needed. Import is `@import "tailwindcss";` as per v4 convention.

**Demo cleanup:** Complete. All Vite demo files removed (`Counter.svelte`, logo assets, `icons.svg`).

**App shell:** Minimal and correct. Uses only Tailwind utility classes, no custom CSS, no new visual patterns introduced.

**Lib structure:** Matches the structure defined in `docs/02-frontend-guidelines.md` exactly.

**Type safety:** `svelte-check` + `tsc` pass with 0 errors and 0 warnings.

**No regressions:** `favicon.svg` preserved. `main.ts` and `index.html` structure unchanged except title.

## Verdict

APPROVED. Iteration 001 is complete.

---

# Gatekeeper Decision

TBD