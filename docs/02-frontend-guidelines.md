# Frontend Guidelines

## Goal

Build a lightweight, fast and maintainable frontend.

The frontend should be:
- component-driven
- easy to understand
- easy to extend
- visually consistent
- responsive
- snappy

---

# Framework

Use:
- Svelte 5
- TypeScript
- Vite

Do not use:
- React
- Next.js
- large UI frameworks
- unnecessary state libraries

---

# Component Principles

Components should be:
- small
- focused
- reusable
- readable
- easy to style

Prefer composition over large components.

Avoid:
- deeply nested components
- components with too many responsibilities
- duplicated UI logic
- premature abstractions

---

# Suggested Structure

src/
  lib/
    components/
      ui/
      word-cloud/
      layout/
    services/
    stores/
    types/
    utils/

---

# Component Categories

components/ui
Reusable generic UI components.

Examples:
- Button
- Card
- Input
- Toggle
- Badge
- Panel

components/word-cloud
Word cloud specific components.

Examples:
- WordCloudPreview
- WordToken
- ShapePicker
- ThemePicker

components/layout
Shared layout components.

Examples:
- PageShell
- Header
- FloatingToolbar

---

# State

Keep state local unless it must be shared.

Use Svelte stores only for:
- shared UI state
- session state
- live word cloud state

Avoid global state for simple component-local behavior.

---

# Styling

Use Tailwind CSS.

Prefer:
- semantic utility patterns
- reusable component classes
- consistent spacing
- consistent typography

Avoid:
- random one-off styles
- inline styles except for truly dynamic values
- mixing many styling approaches

---

# Responsiveness

Design mobile-first.

Contributor pages must work especially well on phones.

Host/editor pages can be more desktop-oriented.

Presentation pages must work well on large screens/projectors.

---

## Imports

This project uses Svelte + Vite, not SvelteKit.

Do not use `$lib` imports unless an alias is explicitly configured.

Prefer relative imports for now.

---

# Performance

Keep the frontend lightweight.

Avoid:
- heavy dependencies
- unnecessary re-renders
- large animation libraries
- expensive layout calculations in normal UI

The UI should feel instant and responsive.

---

# Accessibility

Use:
- semantic HTML
- proper labels
- keyboard-friendly controls
- readable contrast
- clear focus states

Do not sacrifice usability for visual effects.

---

# AI/Copilot Rules

When generating frontend code:
- follow this structure
- create small reusable components
- avoid inventing new architecture
- avoid introducing new dependencies without reason
- keep code readable
- keep styling consistent