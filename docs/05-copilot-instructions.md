# Copilot Instructions

## Project

This project is Ordboble.

Ordboble is a playful collaborative word cloud web app.

The product should feel:
- lightweight
- fast
- colorful
- playful
- polished
- alive

The word cloud is the hero element.

---

# Primary Goal

Help build the app step by step.

Do not try to build everything at once.

Follow the project documentation in `docs/`.

Read these files before making major changes:
- `docs/00-overview.md`
- `docs/01-stack.md`
- `docs/02-frontend-guidelines.md`
- `docs/03-design-guidelines.md`
- `docs/04-backend-plan.md`

---

# Current Development Strategy

Build in phases:

1. Project foundation
2. Frontend structure
3. Design system
4. Static screens with mock data
5. Word cloud visual engine
6. Backend and realtime
7. Export and presentation polish

Do not skip ahead.

---

# General Rules

Prefer:
- simple code
- readable code
- small components
- explicit structure
- reusable building blocks
- minimal dependencies

Avoid:
- overengineering
- premature abstractions
- large components
- duplicated styling
- unnecessary packages
- backend implementation before frontend foundation

---

# Frontend Rules

Use:
- Svelte 5
- Vite
- TypeScript
- Tailwind CSS

Do not use:
- React
- Next.js
- large UI frameworks
- unnecessary state libraries

Components should be:
- small
- focused
- reusable
- easy to understand

---

# Styling Rules

Use Tailwind CSS consistently.

Prefer:
- semantic design tokens
- reusable utility patterns
- consistent spacing
- consistent typography
- shared component styles

Avoid:
- random hardcoded colors
- random spacing values
- inline styles except for dynamic values
- mixing unrelated styling approaches

---

# Design Rules

The visual style should be:
- playful but polished
- colorful
- expressive
- modern
- soft
- friendly
- alive

Use:
- gradients
- rounded cards
- soft shadows
- glow effects
- floating shapes
- subtle animations
- large typography

Avoid:
- enterprise UI
- admin dashboard feeling
- grey corporate layouts
- dense forms

---

# Word Cloud Rules

The word cloud should feel:
- organic
- clustered
- layered
- dynamic
- alive

Use:
- one large central word
- surrounding words
- varied sizes
- varied rotations
- varied colors
- overlapping layers
- soft glow
- particles/confetti where appropriate

Avoid:
- rigid grids
- words in straight rows
- evenly spaced pills
- static boring layouts

---

# State Rules

Keep state local unless it must be shared.

Use Svelte stores only for:
- shared UI state
- word cloud state
- future session/live state

Avoid global state for simple component behavior.

---

# Backend Rules

Do not implement backend until explicitly asked.

Planned backend:
- Cloudflare Workers
- Cloudflare D1
- SSE

Do not introduce:
- custom server hosting
- authentication
- payment
- complex permissions
- WebSockets
unless explicitly requested.

---

# File Organization Rules

Use this structure for frontend code:

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

Keep files small and focused.

---

# AI Behavior Rules

When generating code:
- explain assumptions briefly
- make incremental changes
- keep existing structure
- avoid changing unrelated files
- avoid introducing new dependencies without asking
- prefer clarity over cleverness
- follow the docs

When unsure:
- choose the simplest solution
- ask before making large architectural changes