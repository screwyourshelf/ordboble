# Iteration 012 — Navigation and App Structure Foundation

## Goal

Connect the existing prototype screens into a single frontend app structure.

Until now, `App.svelte` has been temporarily swapped between isolated prototypes. This iteration should create a simple navigation and screen structure so all current prototypes can be previewed from one place.

This is still frontend-only and uses fake/static state.

---

# Scope

## In Scope

- Create simple app-level screen navigation
- Create a screen registry for existing prototype screens
- Create reusable app shell/navigation components
- Allow switching between:
  - Landing
  - Contributor
  - Share
  - Presentation
  - Editor
- Keep navigation frontend-only
- Keep state local
- Keep implementation lightweight
- Preserve all existing prototype screens
- Make `App.svelte` the app composition root
- Verify app starts and type-checks correctly

## Out of Scope

Do NOT:
- add routing library
- add URL-based routing
- add backend
- add realtime
- add persistence
- add authentication
- add app-wide stores
- add complex state management
- redesign existing screens
- modify screen internals unless strictly necessary

---

# Design Direction

Follow:
- `docs/02-frontend-guidelines.md`
- `docs/03-design-guidelines.md`
- `apps/web/references/`

Navigation should feel:
- lightweight
- playful
- non-intrusive
- prototype-friendly

Avoid:
- admin dashboard navigation
- heavy sidebar layout
- complex menus
- routing complexity

---

# Expected Files

## Modify

- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/app/AppShell.svelte`
- `apps/web/src/lib/app/ScreenSwitcher.svelte`
- `apps/web/src/lib/app/screens.ts`
- `apps/web/src/lib/types/app.ts`

Optional:
- `apps/web/src/lib/app/PrototypeNav.svelte`

---

# Requirements

## AppShell

Should provide:
- app-level wrapper
- lightweight top/bottom prototype navigation
- active screen state
- content slot/render area

It should not own product logic.

---

# ScreenSwitcher

Should render the currently selected screen.

Supported screens:
- landing
- contributor
- share
- presentation
- editor

Use existing components:
- `WordCloudHero`
- `ContributorMobileScreen`
- `ShareScreen`
- `PresentationModeScreen`
- `EditorScreen`

---

# Screen Registry

Create a typed screen registry.

Each screen should have:
- id
- label
- description
- component reference if practical

Use explicit union types.

---

# Navigation UX

Navigation should:
- make it easy to preview all prototype screens
- be clearly temporary/prototype navigation
- not feel like final product navigation
- not dominate presentation/editor screens

If needed, use a compact floating navigation pattern.

---

# Technical Constraints

- Svelte 5
- TypeScript
- Tailwind-first
- frontend-only
- local state only
- no new dependencies
- no routing library
- no backend calls

---

# Architect Output

## Layout decision: floating pill nav

Presentation and Editor are full-viewport immersive screens. A sidebar or top bar would break them.
Solution: compact floating pill nav — fixed bottom-center, semi-transparent, `z-[100]`. Small enough not to intrude, obvious enough to find.

## Component tree
```
App.svelte
  └── AppShell (owns currentScreen $state)
        ├── ScreenSwitcher (renders active screen via {#if} chain)
        └── PrototypeNav (fixed floating pill bar, bottom-center)
```

## Files
- **Create** `lib/types/app.ts` — ScreenId union type, ScreenMeta interface
- **Create** `lib/app/screens.ts` — typed screen registry array
- **Create** `lib/app/ScreenSwitcher.svelte` — {#if} chain over all 5 screens
- **Create** `lib/app/PrototypeNav.svelte` — floating pill nav
- **Create** `lib/app/AppShell.svelte` — composition root, owns $state
- **Modify** `src/App.svelte` — renders AppShell only

## ScreenSwitcher strategy
`{#if}` chain — statically analysable, no dynamic imports, no `svelte:component`. Readable and safe.

## Constraints confirmed
- No routing, no URL state, no stores
- Zero changes to existing screen internals
- Default screen: `landing`

---

# Developer Output

## Created files

- `apps/web/src/lib/types/app.ts` — `ScreenId` union, `ScreenMeta` interface
- `apps/web/src/lib/app/screens.ts` — 5-entry typed screen registry
- `apps/web/src/lib/app/ScreenSwitcher.svelte` — `{#if}` chain rendering active screen
- `apps/web/src/lib/app/PrototypeNav.svelte` — floating pill nav, emoji+label, gradient active state
- `apps/web/src/lib/app/AppShell.svelte` — composition root, `$state('landing')`

## Modified files

- `apps/web/src/App.svelte` — now only renders `<AppShell />`

## Notes

- `tsc --noEmit` passes with zero errors
- All screen internals untouched
- State lives exclusively in `AppShell.$state`
- Nav labels hidden on mobile (emoji only) — compact on small screens
- Default screen: `landing`

---

# Tester Output

TBD

---

# Reviewer Output

## Scope adherence ✅

All required files created. No routing library, no URL state, no stores, no backend. State local to `AppShell` only. Zero screen internals modified.

## App structure ✅

`App.svelte` is a clean composition root (2 lines). `AppShell` owns state and delegates rendering. `ScreenSwitcher` uses `{#if}` chain — statically analysable, correct Svelte 5 pattern.

## Navigation UX ✅

Floating pill bar: fixed bottom-center, `z-[100]`, `backdrop-blur-xl`. Does not intrude on presentation or editor. Active tab uses existing `--gradient-button` token. Emoji-only on mobile (compact). Clearly prototype-style, not final product nav.

## Type safety ✅

`ScreenId` is an explicit union type. `ScreenMeta` covers all fields. `screens.ts` is typed. All props typed in all new components.

## Visual consistency ✅

Reuses `--gradient-button`, `--color-muted`, `--color-text-soft`, `border-white/12`, `rounded-pill` from existing design tokens. No new visual patterns introduced.

## Technical ✅

Svelte 5, TypeScript, Tailwind-first. `tsc --noEmit` zero errors.

## Minor observations (non-blocking)

- `PrototypeNav` floats over `EditorScreen` side panel on mobile — intentional prototype behaviour, `z-[100]` is correct for prototype nav.

---

# Gatekeeper Decision

TBD