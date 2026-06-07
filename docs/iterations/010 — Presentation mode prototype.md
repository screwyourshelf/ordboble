# Iteration 010 — Presentation Mode Prototype

## Goal

Create the first fullscreen-friendly presentation mode prototype.

This screen is for the host to show the live word cloud on a projector, TV or shared screen.

The experience should feel:
- immersive
- cinematic
- alive
- colorful
- presentation-ready
- magical

This is still frontend-only and uses fake/static word cloud data.

---

# Scope

## In Scope

- Create presentation mode screen prototype
- Use existing fake word cloud composition data
- Use the `presentation` composition from iteration 007
- Create fullscreen-friendly layout
- Create large immersive word cloud area
- Add minimal presentation chrome
- Add fake participant count
- Add fake QR/join code area
- Add ambient visual atmosphere
- Keep implementation frontend-only
- Verify app starts and type-checks correctly

## Out of Scope

Do NOT:
- implement real fullscreen browser API
- implement backend
- implement realtime
- implement routing
- implement real QR generation
- add live data fetching
- add animation libraries
- add state libraries
- add editor controls
- add export/print

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

Presentation mode should feel:
- cinematic
- spacious
- dramatic
- immersive
- alive
- projector-friendly

Avoid:
- admin UI
- dense controls
- small text
- complex settings
- dashboard feeling
- too much chrome

---

# Expected Files

## Modify

- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/components/presentation/PresentationModeScreen.svelte`
- `apps/web/src/lib/components/presentation/PresentationChrome.svelte`
- `apps/web/src/lib/components/presentation/PresentationJoinCard.svelte`
- `apps/web/src/lib/components/presentation/ParticipantCounter.svelte`

Optional:
- `apps/web/src/lib/types/presentation.ts`

---

# Requirements

## PresentationModeScreen

Should include:
- large word cloud visual
- dark cinematic background
- ambient glow/orbs/particles
- minimal top/bottom chrome
- fake session title/prompt
- fake participant count
- fake join code or QR placeholder

Use fake static session data.

---

# PresentationChrome

Should provide minimal presentation UI.

Should include:
- session title
- prompt/question
- small status badge
- fake fullscreen control

No real fullscreen API yet.

---

# ParticipantCounter

Should show:
- participant count
- friendly live indicator

No realtime.

---

# PresentationJoinCard

Should show:
- join code
- fake QR placeholder or QR-like visual
- short join instruction

No real QR generation.

---

# Word Cloud

Use:
- existing `presentation` composition
- existing `WordCluster`
- existing token system

The word cloud should:
- dominate the screen
- feel alive
- feel large and readable from distance
- have strong glow and depth

---

# Technical Constraints

- Svelte 5
- TypeScript
- Tailwind-first
- frontend-only
- no new dependencies
- no routing
- no backend calls
- no real fullscreen API

---

# Architect Output

## Plan

### Component tree
```
PresentationModeScreen          ← root, holds static PresentationSession data
  ├── Atmospheric background (GlowOrb × 4, radial gradients, FloatingParticle × 10)
  ├── WordCluster (presentationComposition) — dominates screen center
  ├── PresentationChrome (top: title + prompt + badge + ParticipantCounter + fake fullscreen btn)
  └── Bottom bar: wordmark + PresentationJoinCard
```

### Files
- **Create** `lib/types/presentation.ts` — PresentationSession type
- **Create** `lib/components/presentation/ParticipantCounter.svelte`
- **Create** `lib/components/presentation/PresentationJoinCard.svelte`
- **Create** `lib/components/presentation/PresentationChrome.svelte`
- **Create** `lib/components/presentation/PresentationModeScreen.svelte`
- **Modify** `src/App.svelte`

### Reuse
- `WordCluster` + `presentationComposition` for the word cloud
- `FloatingParticle`, `GlowOrb` for atmosphere
- `Badge`, `GradientText`, `QRCodePlaceholder` for chrome/join card

### Constraints
- No real fullscreen API — icon-only toggle
- No routing, no backend, no new deps
- Static fake session data only

---

# Developer Output

## Created files

- `apps/web/src/lib/types/presentation.ts` — PresentationSession interface
- `apps/web/src/lib/components/presentation/ParticipantCounter.svelte` — pulsing dot + count
- `apps/web/src/lib/components/presentation/PresentationJoinCard.svelte` — join code + scaled QR
- `apps/web/src/lib/components/presentation/PresentationChrome.svelte` — top chrome bar
- `apps/web/src/lib/components/presentation/PresentationModeScreen.svelte` — root screen

## Modified files

- `apps/web/src/App.svelte` — updated import to PresentationModeScreen

## Notes

- `tsc --noEmit` passes with zero errors
- Fullscreen button toggles expand/compress icon only — no real browser API
- `PresentationJoinCard` scales `QRCodePlaceholder` with `scale-[0.6]` (no size prop available)
- All data is static, no backend calls

---

# Tester Output

TBD

---

# Reviewer Output

## Scope adherence ✅

All 4 required components created. No backend, routing, animation libs, real fullscreen API, or new dependencies introduced. Static fake data only.

## Presentation UX ✅

Word cloud occupies ~77% of viewport (top: 5%, bottom: 18%). `presentationComposition` (12-word, large-token, airy) used. Cinematic dark background with layered radial atmosphere. 10 ambient `FloatingParticle` instances add life and movement.

## Chrome quality ✅

Top bar gradient-faded into transparent, shows: session title (gradient), prompt, Live badge, participant counter (pulsing dot), fake fullscreen icon button. Bottom bar gradient-faded with wordmark + join card. No dashboard clutter or dense controls.

## Visual consistency ✅

Existing tokens, color palette, `GlowOrb`, `FloatingParticle`, `Badge`, `GradientText`, and `QRCodePlaceholder` reused correctly. No visual drift from established design system.

## Technical ✅

Svelte 5 (`$props`, `$state`), TypeScript, Tailwind-first. `tsc --noEmit` zero errors.

## Minor observations (non-blocking)

- `PresentationJoinCard` uses `scale-[0.6]` workaround to downsize `QRCodePlaceholder` since it has no size prop. Acceptable for prototype.

---

# Gatekeeper Decision

TBD