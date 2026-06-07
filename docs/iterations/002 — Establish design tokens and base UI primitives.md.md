# Iteration 002 — Establish Design Tokens and Base UI Primitives

## Goal

Establish the first reusable frontend design foundation for Ordboble.

Create semantic design tokens and a small set of base UI primitives that future screens can build on.

---

# Scope

## In Scope

- Define initial design tokens using CSS variables
- Keep Tailwind-first styling
- Create base UI primitives:
  - Button
  - Card
  - Badge
  - TextInput
- Create a small visual component preview in `App.svelte`
- Keep the preview minimal and clearly non-final
- Use existing visual references as inspiration
- Keep components reusable and simple
- Verify app starts correctly

## Out of Scope

Do NOT:
- build real app screens
- add routing
- add backend
- add realtime
- add UI component libraries
- add animation libraries
- add state libraries
- implement word cloud layout engine
- implement export/print
- over-polish the demo preview

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

The UI should feel:
- playful
- colorful
- polished
- soft
- lightweight

Avoid:
- corporate/admin UI
- flat grey styling
- random one-off styles
- visual drift

---

# Expected Files

## Modify

- `apps/web/src/app.css`
- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/components/ui/Button.svelte`
- `apps/web/src/lib/components/ui/Card.svelte`
- `apps/web/src/lib/components/ui/Badge.svelte`
- `apps/web/src/lib/components/ui/TextInput.svelte`

Optional, only if useful:
- `apps/web/src/lib/design/tokens.ts`

---

# Requirements

## Design Tokens

Create semantic CSS variables for:
- background
- surface
- surface elevated
- text
- muted text
- primary
- accent
- success
- warning
- radius card
- radius pill
- shadow soft
- shadow glow
- gradient playful
- gradient calm

Tokens should be generic and reusable.

## Components

### Button
Support variants:
- primary
- secondary
- ghost

Support sizes:
- sm
- md
- lg

### Card
Support:
- default card
- elevated card

### Badge
Support:
- neutral
- accent
- success

### TextInput
Support:
- label
- placeholder
- helper text

---

# Architect Output

## Analysis

Current state after iteration 001: Tailwind v4 installed, minimal `App.svelte`, lib structure in place. No tokens, no components.

## Token Strategy

Use Tailwind v4 `@theme` block to define semantic design tokens that generate Tailwind utility classes directly.

- `--color-*` → `bg-*` / `text-*` / `border-*` utilities
- `--radius-card` / `--radius-pill` → `rounded-card` / `rounded-pill` (avoids overriding built-ins)
- `--shadow-soft` / `--shadow-glow` → `shadow-soft` / `shadow-glow`
- Complex gradients go in `:root` only, applied via `[background:var(--gradient-button)]` arbitrary values

## Visual Direction

Sourced from `apps/web/references/`:
- Deep dark bg: `#070816` + radial purple/pink hero gradient
- Glass surfaces: `rgba(17, 20, 42, 0.78)` + `backdrop-blur`
- Button gradient: `linear-gradient(135deg, #ff7a2f, #ff4fa3 52%, #7c3cff)`
- Primary: `#7c3cff` · Accent: `#ff4fa3` · Warm: `#ff7a2f` · Success: `#20d07a` · Warning: `#ffca3a`
- Radius card: `2rem` · Radius pill: `999px`
- Shadow soft: `0 22px 70px rgba(0,0,0,.34)` · Shadow glow: pink + purple radials

## Component Design (Svelte 5 + TypeScript)

- All components use `$props()` with typed interfaces
- `children: Snippet` for slot content via `{@render children()}`
- `$bindable()` for `TextInput.value`
- Tailwind-only styling — no `<style>` blocks
- No spreading of unknown rest props (keep it simple)

## Files

**Modify:**
- `apps/web/src/app.css` — add `@theme`, `:root` gradients, `@layer base` body styles
- `apps/web/src/App.svelte` — component preview (non-final)

**Create:**
- `apps/web/src/lib/components/ui/Button.svelte`
- `apps/web/src/lib/components/ui/Card.svelte`
- `apps/web/src/lib/components/ui/Badge.svelte`
- `apps/web/src/lib/components/ui/TextInput.svelte`

---

# Developer Output

## Changes Made

**Modified:**
- `apps/web/src/app.css` — added `@theme` block with design tokens, `:root` gradient vars, `@layer base` body styles
- `apps/web/src/App.svelte` — component preview (Buttons, Badges, TextInput, Cards — all variants)

**Created:**
- `apps/web/src/lib/components/ui/Button.svelte` — variants: primary/secondary/ghost; sizes: sm/md/lg; disabled support
- `apps/web/src/lib/components/ui/Card.svelte` — default + elevated prop
- `apps/web/src/lib/components/ui/Badge.svelte` — variants: neutral/accent/success
- `apps/web/src/lib/components/ui/TextInput.svelte` — label, placeholder, helperText, bindable value

## Design Tokens Added

**`@theme` (Tailwind utilities):** `bg-surface`, `bg-primary`, `bg-accent`, `bg-warm`, `bg-success`, `bg-warning`, `text-text`, `text-text-soft`, `text-muted`, `border-border`, `border-border-strong`, `rounded-card`, `rounded-pill`, `shadow-soft`, `shadow-glow`

**`:root` (raw CSS vars):** `--gradient-button`, `--gradient-hero`, `--gradient-logo`

## Verification

- `pnpm check`: 0 errors, 0 warnings
- `vite build`: ✓ 113 modules, built in 296ms, no errors

---

# Tester Output

TBD

---

# Reviewer Output

## Review

**Scope:** Correct. Exactly the four components specified (Button, Card, Badge, TextInput). No routing, no backend, no UI framework, no state library added.

**Design tokens:** Match the visual references faithfully. Color palette (primary/accent/warm/success/warning), radius (card/pill), and shadows (soft/glow) are all sourced from `ordboble_component_reference.html`. Gradient tokens correctly kept in `:root` (not `@theme`) and referenced via arbitrary Tailwind values.

**Tailwind v4 correctness:** `@theme` block is syntactically correct. Token naming avoids conflicts with Tailwind built-ins (no override of `rounded-sm/md/lg`; uses `rounded-card` / `rounded-pill` instead).

**Svelte 5 correctness:** All components use `$props()`, typed interfaces, `Snippet` for children, `{@render children()}`. `$bindable()` used correctly in TextInput. No legacy slot syntax.

**TypeScript:** All props typed. No `any`. `svelte-check` passes with 0 errors.

**Consistency:** All four components share the same radius/shadow/color vocabulary. No visual drift.

**App.svelte:** Correctly used as a non-final preview only. Shows all variants and sizes.

**Build:** Clean — 0 errors, 296ms build time, 4.6KB CSS gzipped.

## Verdict

APPROVED. Iteration 002 is complete.

---

# Gatekeeper Decision

TBD