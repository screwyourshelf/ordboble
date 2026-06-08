# Ordboble — Iteration Roadmap

## Status Legend

- [ ] Not started
- [~] In progress
- [x] Done
- [>] Next

---

# Foundation

- [x] 000 — Project foundation
- [x] 001 — Setup Tailwind and clean Vite
- [x] 002 — Establish design tokens and base UI primitives
- [x] 003 — Layout foundation
- [x] 004 — Typography and motion foundation

---

# First UX Prototype

- [x] 005 — Landing page hero prototype
- [x] 006 — Word token system
  - [x] 006.1 — Refine token variants and depth

- [x] 007 — Fake word cloud engine
- [x] 008 — Contributor mobile screen
- [x] 009 — Share screen
- [x] 010 — Presentation mode prototype
- [x] 011 — Editor/customization prototype

---

# Frontend Consolidation

- [x] 012 — Navigation and app structure foundation
- [x] 012.1 — Shared mock session model
- [x] 012.2 — Theme and shape system
- [x] 012.3 — Export UI foundation
- [x] 012.4 — Frontend cleanup and consistency pass

Optional:
- [ ] 012.5 — Lightweight localization foundation
- [ ] 012.6 — Component documentation/dev playground

---

# Cloudflare & Application Foundation

- [x] 013 — Cloudflare Pages deployment
- [x] 013.1 — Frontend environment setup
- [x] 013.2 — Cloudflare Worker foundation
- [x] 013.3 — Shared API contract structure

---

# Backend & Realtime

- [x] 014 — Core backend foundation
  - D1 schema and migrations
  - Cloud/session creation API
  - Session read API
  - Word submission API

- [x] 015 — Realtime foundation
  - SSE endpoint
  - Realtime frontend integration
  - Live presentation updates

- [x] 015.1 — Connect contributor flow to backend
  - Submit real words from contributor screen
  - Use clientId
  - Handle API errors
  - Keep success state

- [x] 015.2 — End-to-end live loop verification
  - Contributor submit → D1 → SSE → Presentation update

- [x] 015.3 — API/browser integration hardening
  - CORS headers
  - EventSource reconnect behavior
  - Use stable IDs as word keys
  - Keep deployed frontend compatible with Worker API

Optional:
- [ ] 015.4 — Presence and participant tracking
- [ ] 015.5 — Rate limiting and abuse protection

---

# Product Features

- [x] 016.1 — Routing and session URL flow
- [x] 016.2 — QR sharing flow
- [x] 016.3 — Session creation flow
- [x] 016.4 — Deployed Worker and production API wiring
- [x] 016.5 — Deployed join-to-presentation live loop

- [x] 016.6 — Session experience refinement
  - Better loading states
  - Session-not-found handling
  - Reconnect UX
  - Duplicate word handling
  - Empty/error states
  - Contributor feedback polish

- [x] 016.7 — Host presentation controls
  - Fullscreen toggle
  - Pause/resume submissions
  - Freeze cloud layout
  - Reset/clear cloud
  - Hide/show presentation chrome

- [ ] 016.8 — Export implementation

---

# Session Customization

- [x] 017 — Session customization
  - Theme persistence
  - Shape rendering system
  - Presentation controls
  - Session lifecycle management

Optional:
- [ ] 017.1 — Join lobby/waiting room
- [ ] 017.2 — Multi-question sessions
- [ ] 017.3 — Audience reactions

---

# Product Polish

- [x] 018.1 — Presentation visual polish
  - Better spacing/composition
  - Refined motion intensity
  - Better cloud balance
  - Reduced visual noise
  - Theme-specific atmosphere
  - Better fullscreen feel

- [x] 018.2 — Mobile contributor polish
  - Keyboard ergonomics
  - Better submission flow
  - Improved touch spacing
  - Better success transitions
  - Safer viewport handling

- [x] 018.2.1 — Landing and Share Composition Visibility Polish
  - hero title readability
  - central word readability
  - left/right composition balance
  - glow containment
  - large-screen visual polish

- [ ] 018.3 — Empty/loading/error polish
  - Skeleton/loading states
  - Better reconnect feel
  - Nicer not-found states
  - Transitional states
  - Reduced layout jumps

- [ ] 018.4 — Motion and animation polish
  - Consistent easing
  - Motion hierarchy
  - Reduced animation clutter
  - Theme-aware animation intensity
  - Performance-friendly motion

- [ ] 018.5 — Accessibility and readability
  - Contrast pass
  - Keyboard navigation
  - Reduced motion support
  - Screen-reader basics
  - Presentation readability

- [ ] 018.6 — Performance and rendering polish
  - Reduce unnecessary rerenders
  - Optimize word rendering
  - Reduce layout thrash
  - Better SSE batching if needed
  - Mobile GPU friendliness

---

# Beta Readiness

- [ ] 019 — Beta hardening
  - Error handling and resilience
  - Analytics/events foundation
  - Security review
  - Beta deployment checklist
  - Beta readiness

---

# Notes

- Iterations may be merged, split or reordered.
- Sub-iterations should remain small and focused.
- Frontend visual consistency is prioritized over feature speed.
- Product feeling and UX clarity are prioritized early.
- Backend complexity should remain minimal unless clearly justified.
- Avoid premature architecture.
- Prefer iterative refinement over large rewrites.