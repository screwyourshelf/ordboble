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

Optional:
- [ ] 015.1 — Presence and participant tracking
- [ ] 015.2 — Rate limiting and abuse protection

---

# Product Features

- [ ] 016 — Sharing and export features
  - QR sharing flow
  - Export implementation

- [ ] 017 — Session customization
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

- [ ] 018 — Product polish
  - Mobile polish
  - Presentation polish
  - Accessibility pass
  - Performance optimization
  - Motion polish
  - Empty/loading/error states

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