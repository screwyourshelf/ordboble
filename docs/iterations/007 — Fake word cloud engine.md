# Iteration 007 — Fake Word Cloud Engine

## Goal

Create a lightweight fake word cloud composition system.

This is not a real layout algorithm. The goal is to make the word cloud easier to reuse, tune and evolve while keeping the current organic visual feeling.

The fake engine should support reusable cloud compositions for future screens such as:
- landing hero
- presentation mode
- editor preview
- share/waiting screen

---

# Scope

## In Scope

- Extract hardcoded word positioning from `WordCloudHero.svelte`
- Create reusable composition data
- Create a small fake composition helper/system
- Support multiple predefined cloud compositions
- Keep `WordCluster` responsible for rendering
- Keep `WordCloudHero` focused on layout and storytelling
- Improve maintainability of word cloud mock data
- Preserve or improve the current visual feeling
- Verify app starts and type-checks correctly

## Out of Scope

Do NOT:
- implement real layout algorithms
- implement physics
- implement random runtime layout
- implement realtime
- implement backend
- implement canvas/WebGL
- add animation libraries
- add routing
- add editor controls
- add shape picker UI
- add export/print

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

The fake word cloud should feel:
- organic
- clustered
- layered
- alive
- expressive
- visually rich

Avoid:
- rigid grids
- evenly spaced words
- random-looking chaos
- flat composition
- visual regression from iteration 006

---

# Expected Files

## Modify

- `apps/web/src/lib/components/word-cloud/WordCloudHero.svelte`
- `apps/web/src/lib/components/word-cloud/WordCluster.svelte`
- `apps/web/src/lib/types/word-cloud.ts`

## Create

- `apps/web/src/lib/word-cloud/compositions.ts`
- `apps/web/src/lib/word-cloud/cloud-presets.ts`

Optional:
- `apps/web/src/lib/word-cloud/composition-utils.ts`

---

# Requirements

## Composition Data

Create reusable named compositions.

At minimum support:
- `hero`
- `presentation`
- `compact`

Each composition should define:
- words
- position
- size
- color
- rotation
- variant
- depth
- glow intensity
- animation delay

---

# Composition Presets

Create reusable preset metadata for:
- hero composition
- presentation composition
- compact composition

Presets may include:
- name
- description
- density
- visual intent

Keep this simple.

---

# WordCluster

WordCluster should accept composition data and render it.

It should remain:
- lightweight
- presentational
- reusable

Do not add layout-generation logic inside the component.

---

# WordCloudHero

WordCloudHero should:
- import the hero composition
- render it using WordCluster
- no longer own all word placement data directly

It may still own:
- hero copy
- CTA layout
- decorative hero-only elements

---

# Technical Constraints

- Svelte 5
- TypeScript
- Tailwind-first
- No new dependencies
- No runtime randomization
- No backend calls
- No canvas/WebGL

---

# Architect Output

**Plan (minimal):**

- Extend `word-cloud.ts` with `CompositionId` union and `WordCloudComposition` interface
- Create `lib/word-cloud/compositions.ts` — static word data for `hero`, `presentation`, `compact`
- Create `lib/word-cloud/cloud-presets.ts` — preset metadata (name, description, density, intent)
- Update `WordCloudHero.svelte` — import `heroComposition`, remove inline word array
- `WordCluster.svelte` — no changes needed (already purely presentational)

**Files affected:**
- MODIFY: `apps/web/src/lib/types/word-cloud.ts`
- CREATE: `apps/web/src/lib/word-cloud/compositions.ts`
- CREATE: `apps/web/src/lib/word-cloud/cloud-presets.ts`
- MODIFY: `apps/web/src/lib/components/word-cloud/WordCloudHero.svelte`

---

# Developer Output

**Implemented:**

- `word-cloud.ts`: Added `CompositionId = 'hero' | 'presentation' | 'compact'` and `WordCloudComposition` interface
- `lib/word-cloud/compositions.ts`: Three static compositions
  - `heroComposition` — exact 20-word layout from iteration 006 (no visual change)
  - `presentationComposition` — 12 words, xl tokens, wide spread for large screens
  - `compactComposition` — 8 words, tight cluster for previews
  - `compositions` record for lookup by id
- `lib/word-cloud/cloud-presets.ts`: `CloudPreset` interface, `cloudPresets` array, `getPreset()` helper
- `WordCloudHero.svelte`: Removed 40-line inline word array, imports `heroComposition` instead

**Build:** ✓ 120 modules, no errors

---

# Tester Output

TBD

---

# Reviewer Output

**Type safety:** ✓
- All compositions typed as `WordCloudComposition`
- `CompositionId` union prevents magic strings
- `CloudDensity` union on preset metadata
- No `any`, no loose strings

**Scope adherence:** ✓
- No new dependencies
- No randomization
- No runtime layout generation
- No canvas/WebGL
- No changes to `WordCluster` (already presentational)
- No visual regression — `heroComposition.words` is byte-for-byte identical to the removed inline array

**Consistency:** ✓
- Data lives in `lib/word-cloud/` (data layer), separate from `lib/components/word-cloud/` (UI layer)
- `WordCloudHero` now focuses on layout/storytelling only
- `WordCluster` remains purely presentational — accepts `words` prop, renders tokens
- All three compositions follow the same ring/depth/variant pattern

**Minor notes:**
- `compositions` record export supports future dynamic lookup (e.g. route params, props)
- `getPreset()` returns `undefined` on unknown id — safe, no throw

**Verdict:** ✓ Pass — implementation matches scope, types are sound, visual output is preserved.

---

# Gatekeeper Decision

TBD