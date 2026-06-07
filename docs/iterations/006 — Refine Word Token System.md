# Iteration 006 — Refine Word Token System

## Goal

Refine and strengthen the word token system introduced in iteration 005.

This iteration focuses on improving:
- composability
- consistency
- visual richness
- token variants
- layering behavior
- type safety

The goal is to make the word cloud system production-ready enough to support future realtime behavior.

---

# Scope

## In Scope

- Refactor and improve `WordToken`
- Improve word sizing system
- Improve color/gradient variant handling
- Improve glow behavior
- Improve layering/depth handling
- Improve responsive scaling
- Improve type safety for word variants
- Improve visual consistency across tokens
- Introduce optional decorative token effects
- Refine fake word cloud composition

## Out of Scope

Do NOT:
- implement realtime
- implement backend
- implement real layout algorithms
- add physics systems
- add animation libraries
- add canvas/WebGL
- add drag/drop
- add editor features
- redesign overall app layout

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

Word tokens should feel:
- expressive
- tactile
- energetic
- alive
- layered
- organic

The cloud should increasingly feel like:
- a living visual object
- not separate pills floating randomly

---

# Expected Files

## Modify

- `apps/web/src/App.svelte`
- `apps/web/src/lib/components/word-cloud/WordToken.svelte`
- `apps/web/src/lib/components/word-cloud/WordCluster.svelte`
- `apps/web/src/lib/components/word-cloud/WordCloudHero.svelte`
- `apps/web/src/lib/types/word-cloud.ts`

Optional:
- `apps/web/src/app.css`

## Create (optional)

- `apps/web/src/lib/components/word-cloud/WordGlow.svelte`
- `apps/web/src/lib/components/word-cloud/WordShadow.svelte`

---

# Requirements

## WordToken

Improve support for:
- visual variants
- gradients
- glow intensity
- depth/layering
- responsive sizing
- hover polish
- shadow consistency

Support:
- solid tokens
- gradient tokens
- subtle tokens
- hero tokens

Avoid:
- duplicated styling logic
- hardcoded one-off styles
- visual inconsistency

---

# Word Variants

Introduce stronger type safety for:
- token size
- token color
- token variant
- token depth

Prefer explicit union types.

Avoid:
- loose strings
- magic values

---

# Layering & Depth

The cloud should feel more dimensional.

Use:
- z-index layering
- varied opacity
- varied blur intensity
- varied glow intensity
- depth illusion

Avoid:
- flat composition
- identical visual weight
- uniform glow

---

# Composition Improvements

Improve overall cloud composition:
- tighter clustering
- more overlap
- more visual interaction between tokens
- stronger focal hierarchy

The hero token should feel clearly dominant.

---

# Motion

Keep motion:
- ambient
- subtle
- lightweight

Possible improvements:
- stagger polish
- hover polish
- subtle drift variation

Avoid:
- chaotic movement
- physics simulation
- distracting animation

---

# Technical Constraints

- Svelte 5
- TypeScript
- Tailwind-first
- No animation libraries
- No canvas/WebGL
- No backend calls

---

# Architect Output

TBD

---

# Developer Output

TBD

---

# Tester Output

TBD

---

# Reviewer Output

TBD

---

# Gatekeeper Decision

TBD