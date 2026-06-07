# Iteration 004 — Typography and Motion Foundation

## Goal

Establish reusable typography and motion foundations for Ordboble.

Create consistent text styles, gradient text helpers, glow utilities and lightweight motion patterns that future screens can reuse.

---

# Scope

## In Scope

- Create reusable typography components:
  - DisplayTitle
  - SectionTitle
  - BodyText
  - Eyebrow
- Create reusable visual utility components:
  - GlowOrb
  - GradientText
- Create lightweight motion utility classes
- Create reusable transition helpers in CSS
- Update `App.svelte` with a typography/motion preview
- Reuse existing design tokens and layout primitives
- Keep implementation lightweight
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
- add complex motion systems
- introduce new visual direction

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

Typography and motion should feel:
- expressive
- soft
- polished
- modern
- lightweight
- playful

Avoid:
- heavy animations
- distracting motion
- overly formal typography
- inconsistent text hierarchy
- random transition durations

---

# Expected Files

## Modify

- `apps/web/src/app.css`
- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/components/ui/DisplayTitle.svelte`
- `apps/web/src/lib/components/ui/SectionTitle.svelte`
- `apps/web/src/lib/components/ui/BodyText.svelte`
- `apps/web/src/lib/components/ui/Eyebrow.svelte`
- `apps/web/src/lib/components/ui/GradientText.svelte`
- `apps/web/src/lib/components/ui/GlowOrb.svelte`

---

# Requirements

## Typography

### DisplayTitle
Large expressive hero title.

Should support:
- gradient mode
- centered mode

### SectionTitle
Reusable section heading.

Should support:
- default size
- compact size

### BodyText
Reusable body text.

Should support:
- default
- muted

### Eyebrow
Small uppercase section label.

Should support:
- default styling
- accent styling

---

# GradientText

Reusable gradient text wrapper.

Should support:
- playful gradient
- calm gradient

Use existing gradient tokens.

---

# GlowOrb

Reusable decorative glow element.

Should support:
- size variants
- color variants
- blur/glow styling

Should be decorative only.

---

# Motion

Add lightweight reusable motion utilities.

Examples:
- transition-soft
- hover-lift
- hover-glow
- float-subtle

Motion should remain:
- subtle
- lightweight
- reusable

Avoid:
- complex animation systems
- animation libraries
- aggressive movement

---

# Architect Output

**Plan:** Create 6 reusable components + motion utilities in `app.css`. Zero new dependencies. Reuse all existing tokens.

Components:
- `DisplayTitle` — h1, supports `gradient` + `centered` props
- `SectionTitle` — h2, supports `compact` prop
- `BodyText` — p, supports `muted` prop
- `Eyebrow` — p, supports `accent` prop
- `GradientText` — span, supports `playful` | `calm` variants
- `GlowOrb` — decorative div, supports `size` + `color` props

Motion additions to `app.css`: `.transition-soft`, `.hover-lift`, `.hover-glow`, `.float-subtle`, `.animate-fade-in`

Token reuse: `--gradient-logo`, `--gradient-hero`, `--shadow-glow`, `--color-primary/accent/warm/muted/text-soft`

---

# Developer Output

Created files:
- `src/lib/components/ui/DisplayTitle.svelte`
- `src/lib/components/ui/SectionTitle.svelte`
- `src/lib/components/ui/BodyText.svelte`
- `src/lib/components/ui/Eyebrow.svelte`
- `src/lib/components/ui/GradientText.svelte`
- `src/lib/components/ui/GlowOrb.svelte`

Modified files:
- `src/app.css` — added `@keyframes float-subtle`, `@keyframes fade-in`, and 5 motion utility classes in `@layer utilities`
- `src/App.svelte` — added Typography Preview and Motion Preview sections using all new components

Build: ✅ 125 modules, 0 errors

---

# Tester Output

N/A — no tester role required for medium task.

---

# Reviewer Output

- Scope: ✅ Exactly 6 components, no extras. No routing/backend/animation libraries.
- Svelte 5: ✅ All components use `$props()` rune + typed `interface Props`
- TypeScript: ✅ Full prop typing on all components
- Tailwind-first: ✅ Zero inline styles, all token-based utilities
- Token reuse: ✅ No new colors or gradients. All from existing `@theme` + `:root`
- Motion: ✅ Subtle (4s float, 0.4s fade, 200ms hover). No libraries.
- Typography hierarchy: ✅ DisplayTitle → SectionTitle → BodyText → Eyebrow — clear and consistent
- Visual consistency: ✅ No new visual direction introduced
- Build: ✅ Passes

---

# Gatekeeper Decision

TBD