# Iteration 017 — Session Customization Foundation

## Goal

Establish the first real session customization system for Ordboble.

This iteration moves themes/shapes from prototype/editor concepts into the real deployed session flow.

The goal is to let a host configure how a session feels visually and have that customization affect:
- share
- contributor
- presentation

without introducing a large settings architecture.

This is the foundation for:
- calm/minimal presentation modes
- playful/event themes
- classroom/workshop variants
- future persistence/export

---

# Scope

## In Scope

- Real session theme selection
- Real session shape selection
- Persist selected theme/shape in D1
- Load theme/shape in presentation/share/contributor
- Introduce calm/minimal theme variants
- Introduce presentation style refinement
- Keep customization lightweight and preset-based
- Reuse existing ThemePicker and ShapePicker
- Reuse existing theme/shape type system

## Out of Scope

Do NOT:
- build full theme editor
- add custom colors/fonts
- add animation editors
- add account/profile persistence
- redesign app structure
- add authentication
- add export
- add media uploads
- add per-user preferences

---

# Requirements

## Session-Level Theme Persistence

When a session is created:
- it should store:
  - themeId
  - shapeId

Defaults:
- current playful theme
- current default shape

Persist in D1.

Theme/shape should be returned from:
- create cloud API
- get cloud API

---

# Theme Presets

Introduce at least:

## Playful
Current colorful/glowy style.

## Calm
More subdued/professional.

Expected differences:
- reduced glow
- softer gradients
- less saturated colors
- calmer motion
- more whitespace/breathing room

Do NOT redesign components individually.
Theme should flow through existing token/theme system.

Optional:
- Dark
- Classroom
- Focus

Only if simple.

---

# Shape System

Connect existing shape system to real session data.

Presentation should render based on selected shape preset.

Keep implementation lightweight:
- circle
- soft blob
- rounded cloud
etc.

No heavy rendering engine.

---

# Editor / Session Configuration

Host should be able to:
- choose theme
- choose shape

Simplest acceptable:
- add controls to existing editor/customization flow
- add lightweight customization section during session creation

Avoid large settings pages.

---

# Session Flow Integration

Theme/shape should affect:
- presentation
- share screen
- contributor screen (subtly)

When loading a real session:
- UI should reflect persisted theme/shape

Fallback prototype behavior should still work.

---

# Technical Constraints

- Svelte 5
- TypeScript
- existing architecture
- reuse current theme/shape systems
- no new state management architecture
- no routing rewrite
- no auth system
- no new dependencies unless clearly justified

---

# Expected Files

Likely:
- D1 migration
- worker cloud routes
- shared session types
- theme/shape types
- EditorScreen.svelte
- PresentationModeScreen.svelte
- ShareScreen.svelte
- ContributorMobileScreen.svelte
- WordCluster.svelte

Only touch files required for session customization flow.

---

# Migration

Add:
- theme_id
- shape_id

to sessions/clouds table.

Provide safe defaults.

Migration must work against existing deployed DB.

---

# Verification

Verify:
- session create stores theme/shape
- get cloud returns theme/shape
- deployed frontend reflects selected theme
- calm theme visibly differs from playful
- fallback prototype still works
- frontend builds/type-checks
- worker migrations apply cleanly

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