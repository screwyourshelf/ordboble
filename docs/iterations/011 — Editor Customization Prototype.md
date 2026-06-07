# Iteration 011 — Editor Customization Prototype

## Goal

Create the first host-facing editor/customization prototype.

This screen allows the host to visually customize the word cloud before presenting, downloading or printing.

The experience should feel like a lightweight creative studio:
- playful
- visual
- polished
- spacious
- Canva-inspired
- easy to understand

This is still frontend-only and uses fake/static state.

---

# Scope

## In Scope

- Create editor/customization screen prototype
- Add large live preview area
- Add theme picker UI
- Add shape picker UI
- Add typography/style controls
- Add export action area
- Use fake local state only
- Reuse existing word cloud compositions
- Reuse existing UI primitives, layout components and design tokens
- Keep implementation frontend-only
- Verify app starts and type-checks correctly

## Out of Scope

Do NOT:
- implement real export
- implement real print
- implement real shape masks
- implement backend
- implement realtime
- implement routing
- implement persistence
- add drag/drop
- add canvas/WebGL
- add animation libraries
- add state libraries
- add UI component libraries

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

The editor should feel:
- creative
- visual
- playful
- polished
- lightweight
- not technical

Avoid:
- admin dashboard feeling
- dense settings panels
- boring form UI
- too many small controls
- generic SaaS layout

---

# Expected Files

## Modify

- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/components/editor/EditorScreen.svelte`
- `apps/web/src/lib/components/editor/EditorPreview.svelte`
- `apps/web/src/lib/components/editor/ThemePicker.svelte`
- `apps/web/src/lib/components/editor/ShapePicker.svelte`
- `apps/web/src/lib/components/editor/StyleControls.svelte`
- `apps/web/src/lib/components/editor/ExportPanel.svelte`

Optional:
- `apps/web/src/lib/types/editor.ts`

---

# Requirements

## EditorScreen

Should include:
- large preview area
- side panel or bottom panel with controls
- theme picker
- shape picker
- style controls
- export panel
- fake static session title/prompt

Desktop should feel studio-like.
Mobile should stack cleanly.

---

# EditorPreview

Should show:
- word cloud preview
- existing composition
- selected theme reflected visually if simple
- selected shape label or visual hint

No real shape masking yet.

---

# ThemePicker

Should support fake themes:
- Playful
- Calm
- Dark
- Celebration

Selecting a theme updates local state only.

---

# ShapePicker

Should support fake shapes:
- Freeform
- Circle
- Heart
- Star

Selecting a shape updates local state only.

No real shape algorithm yet.

---

# StyleControls

Should include simple fake controls:
- density
- word size
- glow

Use local state only.
No persistence.

---

# ExportPanel

Should show action buttons:
- PNG
- SVG
- PDF
- Print

No real export yet.

Buttons may be disabled or show “Coming later”.

---

# UX Rules

The host should quickly understand:
1. preview is the main focus
2. themes and shapes are visual choices
3. export options exist but are not functional yet

The editor should feel like a creative tool, not a settings page.

---

# Technical Constraints

- Svelte 5
- TypeScript
- Tailwind-first
- frontend-only
- no new dependencies
- no routing
- no backend calls
- no real export

---

# Architect Output

## Layout
- Desktop: `grid-cols-[1fr_300px]` — large preview (dominant, ~70% width) + side panel (300px)
- Mobile: single column — preview (min 280px) on top, panel scrolls below

## Component tree
```
EditorScreen                       ← root, owns all $state
  ├── header (Eyebrow + GradientText title + prompt)
  ├── EditorPreview                 ← word cloud + themed bg tint + shape badge
  └── Card (side panel, scrollable)
        ├── ThemePicker             ← 4 gradient swatches: Playful/Calm/Dark/Fест
        ├── ShapePicker             ← 4 icon+label pills: Fritt/Sirkel/Hjerte/Stjerne
        ├── StyleControls           ← 3 toggle groups: Density/Word Size/Glow
        └── ExportPanel             ← 4 disabled buttons (PNG/SVG/PDF/Print)
```

## Files
- **Create** `lib/types/editor.ts` — EditorTheme, EditorShape, EditorStyle, EditorState
- **Create** `lib/components/editor/ThemePicker.svelte`
- **Create** `lib/components/editor/ShapePicker.svelte`
- **Create** `lib/components/editor/StyleControls.svelte`
- **Create** `lib/components/editor/ExportPanel.svelte`
- **Create** `lib/components/editor/EditorPreview.svelte`
- **Create** `lib/components/editor/EditorScreen.svelte`
- **Modify** `src/App.svelte`

## State strategy
All state in `EditorScreen` via `$state`. Props + callbacks passed down. No stores.

## Theme visual differentiation
Theme selection changes preview container background radial gradient only — no recomposition. Visual signal sufficient for prototype.

## Reuse
`WordCluster` + `heroComposition`, `GlowOrb`, `FloatingParticle`, `Card`, `Button`, `Eyebrow`, `GradientText`

---

# Developer Output

## Created files

- `apps/web/src/lib/types/editor.ts` — EditorTheme, EditorShape, EditorStyle, EditorState types
- `apps/web/src/lib/components/editor/ThemePicker.svelte` — 4 gradient swatch cards, selected ring+glow
- `apps/web/src/lib/components/editor/ShapePicker.svelte` — 4 icon+label pill buttons
- `apps/web/src/lib/components/editor/StyleControls.svelte` — 3 toggle groups (density/wordSize/glow)
- `apps/web/src/lib/components/editor/ExportPanel.svelte` — 4 disabled buttons with footnote
- `apps/web/src/lib/components/editor/EditorPreview.svelte` — themed word cloud preview + shape badge
- `apps/web/src/lib/components/editor/EditorScreen.svelte` — root layout + all state

## Modified files

- `apps/web/src/App.svelte` — updated import to EditorScreen

## Notes

- `tsc --noEmit` passes with zero errors
- All state in `EditorScreen.$state` — no stores, no persistence
- Theme selection changes `EditorPreview` background radial gradient only
- Export buttons are all `disabled` — no onClick, no fake logging
- `heroComposition` used for preview (richest visual for small preview area)

---

# Tester Output

TBD

---

# Reviewer Output

## Scope adherence ✅

All 6 required components created. No backend, routing, real export, drag/drop, canvas, localStorage, or new dependencies. State is local only.

## Editor UX ✅

Preview is the dominant element — takes ~70% of desktop width, full height. Side panel is compact (300px), scrollable. Hierarchy is clear: preview first, controls secondary.

## Creative tool feel ✅

ThemePicker uses colored gradient swatches (Canva-style) not dropdown/radio. ShapePicker uses icon+label pills. StyleControls use toggle groups with distinct accent colors per category. No dense form UI, no settings-page feel.

## Visual feedback ✅

Selected theme: ring + glow + scale on swatch + preview background tint changes. Selected shape: highlighted pill + shape badge in preview bottom-left. Selected style: highlighted toggle with category accent color.

## Visual consistency ✅

Reuses `GlowOrb`, `WordCluster`, `FloatingParticle`, `Card`, `GradientText`, `Eyebrow`. Design tokens used throughout. No new colors or visual patterns introduced.

## Technical ✅

Svelte 5 (`$state`, `$props`), TypeScript, Tailwind-first. `tsc --noEmit` zero errors.

## Minor observations (non-blocking)

- Mobile side panel requires vertical scroll to reach ExportPanel — expected for prototype scope, stacking is clean.

---

# Gatekeeper Decision

TBD