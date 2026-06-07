# Iteration 003 — Layout Foundation

## Goal

Establish reusable layout components for Ordboble.

These components should provide consistent page structure, spacing and responsive layout patterns for future screens.

---

# Scope

## In Scope

- Create reusable layout components:
  - PageShell
  - Container
  - Section
  - SplitHeroLayout
  - FloatingToolbar
  - PreviewFrame
- Update `App.svelte` to show a simple layout preview
- Reuse existing UI primitives from iteration 002
- Reuse existing design tokens
- Keep implementation lightweight
- Keep layout responsive
- Verify app starts and type-checks correctly

## Out of Scope

Do NOT:
- build real app screens
- add routing
- add backend
- add realtime
- add animation libraries
- add UI component libraries
- add state libraries
- implement word cloud engine
- implement QR generation
- implement export/print
- introduce new design direction

---

# Design Direction

Follow:
- `docs/02-frontend-guidelines.md`
- `docs/03-design-guidelines.md`
- `apps/web/references/`

The layout should feel:
- spacious
- playful
- polished
- responsive
- presentation-friendly

Avoid:
- dense dashboard layouts
- rigid enterprise structure
- duplicated layout patterns
- random spacing values

---

# Expected Files

## Modify

- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/components/layout/PageShell.svelte`
- `apps/web/src/lib/components/layout/Container.svelte`
- `apps/web/src/lib/components/layout/Section.svelte`
- `apps/web/src/lib/components/layout/SplitHeroLayout.svelte`
- `apps/web/src/lib/components/layout/FloatingToolbar.svelte`
- `apps/web/src/lib/components/layout/PreviewFrame.svelte`

---

# Requirements

## PageShell

Purpose:
Provide the outer application background and minimum page height.

Should support:
- default dark playful background
- optional class passthrough

## Container

Purpose:
Provide consistent max-width and horizontal padding.

Should support:
- default width
- wide width
- narrow width

## Section

Purpose:
Provide consistent vertical spacing between page sections.

Should support:
- default spacing
- compact spacing
- spacious spacing

## SplitHeroLayout

Purpose:
Reusable two-column hero layout.

Should support:
- text/content area
- visual/preview area
- responsive stacking on mobile

## FloatingToolbar

Purpose:
Reusable floating action toolbar.

Should support:
- horizontal actions
- glass surface styling
- responsive wrapping

## PreviewFrame

Purpose:
Reusable framed preview area for visual mockups.

Should support:
- title
- optional eyebrow text
- glass/elevated styling
- slot content

---

# Architect Output

## Summary

Establish 6 reusable layout primitives. No new design tokens. No new dependencies. Reuse all existing surface/border/gradient/radius tokens from iteration 002.

## Component Decisions

### PageShell
- Outer `<div>` with `min-h-svh` and `[background:var(--gradient-hero)]`
- Accepts optional `class` passthrough
- Wraps all page content

### Container
- `mx-auto w-full px-4 sm:px-6 lg:px-8`
- `variant` prop: `default` → `max-w-3xl`, `wide` → `max-w-6xl`, `narrow` → `max-w-xl`
- Accepts optional `class` passthrough

### Section
- Vertical rhythm wrapper
- `spacing` prop: `default` → `py-16`, `compact` → `py-8`, `spacious` → `py-24`
- Accepts optional `class` passthrough

### SplitHeroLayout
- Two named snippets: `content` (left) and `visual` (right)
- `grid md:grid-cols-2 gap-12 items-center` — stacks to single column on mobile
- No internal padding — let parent Container/Section control that

### FloatingToolbar
- Glass surface: `bg-surface/80 backdrop-blur-xl border border-border rounded-pill`
- `flex flex-wrap items-center gap-3 px-5 py-3`
- Accepts `children` snippet — caller composes actions
- `class` passthrough for positioning

### PreviewFrame
- Glass card: `rounded-card bg-surface backdrop-blur-xl border border-border shadow-glow`
- Props: `title: string`, `eyebrow?: string`
- Header renders eyebrow + title above slot content
- `children` snippet for inner content
- Consistent padding: `p-6`

## App.svelte Plan

Replace current flat preview with structured layout demo:
- `PageShell` wraps everything
- `Container` (default) centers content
- `Section` (spacious) for hero area
- `SplitHeroLayout`: left = headline + Button group + Badge; right = `PreviewFrame` with mock word cloud placeholder
- Below hero: `Section` (default) with a `FloatingToolbar` demo showing Button actions
- Retain existing Card/Button/Badge/TextInput where useful to show integration

## File Impact

New:
- `src/lib/components/layout/PageShell.svelte`
- `src/lib/components/layout/Container.svelte`
- `src/lib/components/layout/Section.svelte`
- `src/lib/components/layout/SplitHeroLayout.svelte`
- `src/lib/components/layout/FloatingToolbar.svelte`
- `src/lib/components/layout/PreviewFrame.svelte`

Modified:
- `src/App.svelte`

---

# Developer Output

## Files Created

### `src/lib/components/layout/PageShell.svelte`
Outer wrapper with `min-h-svh` and `[background:var(--gradient-hero)]`. Accepts `class` passthrough and `children` snippet.

### `src/lib/components/layout/Container.svelte`
Max-width centering wrapper. `variant` prop: `default` (max-w-3xl), `wide` (max-w-6xl), `narrow` (max-w-xl). Responsive horizontal padding via `px-4 sm:px-6 lg:px-8`. Accepts `class` passthrough.

### `src/lib/components/layout/Section.svelte`
Semantic `<section>` element for vertical rhythm. `spacing` prop: `default` (py-16), `compact` (py-8), `spacious` (py-24). Accepts `class` passthrough.

### `src/lib/components/layout/SplitHeroLayout.svelte`
Two named snippets: `content` and `visual`. Uses `grid md:grid-cols-2 gap-12 items-center`. Stacks single-column on mobile. No internal padding — parent controls spacing.

### `src/lib/components/layout/FloatingToolbar.svelte`
Glass surface strip: `bg-surface/80 backdrop-blur-xl border border-border rounded-pill shadow-soft`. `flex flex-wrap items-center gap-3 px-5 py-3`. Accepts `children` snippet and `class` passthrough for positioning flexibility.

### `src/lib/components/layout/PreviewFrame.svelte`
Glass card: `rounded-card bg-surface backdrop-blur-xl border border-border shadow-glow`. Props: `title: string`, `eyebrow?: string`. Renders eyebrow label + title above `children` slot. Padding `p-6`.

## Files Modified

### `src/App.svelte`
Replaced flat preview with structured layout demo:
- `PageShell` wraps full page
- Hero: `Section (spacious)` > `Container (wide)` > `SplitHeroLayout`
  - Left: brand headline with gradient logo text, description, Button group, Badges
  - Right: `PreviewFrame` with mock word cloud (CSS-only text layout using existing color tokens)
- `Section (compact)`: `FloatingToolbar` demo with 4 Button actions
- `Section (default)` > `Container (default)`: all existing UI primitives (Card, Button, Badge, TextInput) retained

## Reuse

- All color tokens from `app.css` (`--color-primary`, `--color-accent`, `--color-warm`, `--color-success`, `--color-muted`, `--color-text-soft`)
- Gradient tokens: `--gradient-hero` (PageShell bg), `--gradient-logo` (headline text)
- Surface/border tokens: `bg-surface`, `border-border`, `border-border-strong`
- Radius tokens: `rounded-card`, `rounded-pill`
- Shadow tokens: `shadow-soft`, `shadow-glow`
- No new tokens, no new dependencies, no new CSS

## Type Check

`npx tsc --noEmit` — zero errors.

---

# Tester Output

TBD

---

# Reviewer Output

## Scope Adherence

- ✅ All 6 required layout components created
- ✅ Only `App.svelte` modified — no other existing files touched
- ✅ No routing, no backend, no animation libraries, no state libraries
- ✅ No word cloud engine, no QR flow, no export logic

## Svelte 5 Compliance

- ✅ All components use `$props()` with TypeScript `interface Props`
- ✅ Named snippets (`content`, `visual`) used correctly in `SplitHeroLayout`
- ✅ `{@render ...()}` pattern consistent across all components

## TypeScript

- ✅ `interface Props` defined in every component
- ✅ `tsc --noEmit` — zero errors

## Design Token Reuse

- ✅ No new CSS variables introduced
- ✅ Surface tokens: `bg-surface`, `border-border`, `rounded-card`, `rounded-pill`, `shadow-soft`, `shadow-glow`
- ✅ Gradient tokens: `[background:var(--gradient-hero)]` in PageShell, `[background:var(--gradient-logo)]` in hero headline
- ✅ Color tokens: `text-primary`, `text-accent`, `text-warm`, `text-success`, `text-muted`, `text-text-soft` — all from `app.css`

## Visual Consistency

- ✅ PreviewFrame eyebrow label uses identical pattern to Card labels in existing demos
- ✅ PreviewFrame glass styling (`rounded-card bg-surface backdrop-blur-xl border border-border shadow-glow`) consistent with `Card elevated`
- ✅ FloatingToolbar glass surface consistent with Card/surface token usage
- ✅ No visual drift detected

## Responsiveness

- ✅ Container: `px-4 sm:px-6 lg:px-8` responsive horizontal padding
- ✅ SplitHeroLayout: stacks single-column on mobile via `md:grid-cols-2`
- ✅ FloatingToolbar: wraps with `flex-wrap`

## App.svelte

- ✅ Remains a simple preview/demo — no real app screens
- ✅ All existing UI primitives (Button, Card, Badge, TextInput) retained and integrated
- ✅ Layout structure demonstrates all 6 new components in context

## Minor Notes

- The mock word cloud in `App.svelte` uses `style="transform: rotate(...)"` for demo decoration. Acceptable — purely presentational, no logic or external dependencies. Tailwind has no shorthand for these specific arbitrary rotation values.

## Verdict

**PASS** — Implementation is on-scope, type-safe, visually consistent with existing tokens and primitives, and respects the design direction. No issues require remediation.

---

# Gatekeeper Decision

TBD