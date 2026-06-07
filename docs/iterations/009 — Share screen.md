# Iteration 009 — Share Screen

## Goal

Create the first host-facing share screen prototype.

This screen is shown after creating a word cloud session and helps the host:
- share the session
- display a QR code
- copy the join link
- open presentation mode

This is still frontend-only and uses fake/static session data.

---

# Scope

## In Scope

- Create a host-facing share screen
- Add QR placeholder area
- Add fake join link
- Add copy-link interaction (frontend-only)
- Add “open presentation” CTA
- Add small session summary information
- Add playful visual atmosphere
- Keep implementation mobile-friendly but desktop-capable
- Reuse existing design system and primitives
- Verify app starts and type-checks correctly

## Out of Scope

Do NOT:
- generate real QR codes
- implement routing
- implement backend
- implement realtime
- implement actual clipboard persistence beyond browser API
- implement session management
- implement authentication
- add export functionality
- add animation libraries
- add state libraries

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

The share screen should feel:
- exciting
- inviting
- presentation-ready
- polished
- social
- lightweight

Avoid:
- technical dashboard feeling
- dense settings UI
- boring admin layout
- large empty spaces

---

# Expected Files

## Modify

- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/components/share/ShareScreen.svelte`
- `apps/web/src/lib/components/share/QRCodePlaceholder.svelte`
- `apps/web/src/lib/components/share/JoinLinkCard.svelte`
- `apps/web/src/lib/components/share/PresentationLaunchCard.svelte`

Optional:
- `apps/web/src/lib/types/share.ts`

---

# Requirements

## ShareScreen

Should include:
- session title
- prompt/question
- QR area
- join link area
- presentation CTA
- session status badge
- playful visual atmosphere

Use fake static session data.

---

# QRCodePlaceholder

Should:
- visually resemble a QR area
- use decorative fake QR styling
- include helper text like:
  “Scan to join”

Do NOT generate real QR codes yet.

---

# JoinLinkCard

Should:
- display fake share URL
- support copy button
- show temporary copied state
- use browser clipboard API only

No backend.

---

# PresentationLaunchCard

Should:
- show presentation mode CTA
- visually feel exciting/fullscreen-ready
- include supportive helper text

No routing yet.

---

# UX Rules

The host should quickly understand:
1. how to invite people
2. where participants join
3. how to open presentation mode

The screen should feel:
- lightweight
- obvious
- presentation-focused

Avoid:
- unnecessary settings
- advanced controls
- configuration overload

---

# Technical Constraints

- Svelte 5
- TypeScript
- Tailwind-first
- frontend-only
- no new dependencies
- no routing
- no backend calls

---

# Architect Output

## Plan

**Files to create:**
- `apps/web/src/lib/types/share.ts` — `ShareSession` interface
- `apps/web/src/lib/components/share/QRCodePlaceholder.svelte`
- `apps/web/src/lib/components/share/JoinLinkCard.svelte`
- `apps/web/src/lib/components/share/PresentationLaunchCard.svelte`
- `apps/web/src/lib/components/share/ShareScreen.svelte`

**Files to modify:**
- `apps/web/src/App.svelte` — swap ContributorMobileScreen → ShareScreen

**Layout strategy:**
- Mobile: stacked (QR → JoinLink → PresentationCTA)
- Desktop: 2-col grid — left: [QR card + JoinLink]; right: PresentationLaunchCard (full height)

**Fake session data:** static `ShareSession` object — no backend, no state libraries

**Reuse:** `PageShell`, `Container`, `Card`, `Button`, `Badge`, `Eyebrow`, `GradientText`, `GlowOrb`

**No new dependencies. No routing. No backend.**

---

# Developer Output

## Implemented

**`types/share.ts`**
- `ShareSession` interface: `title`, `prompt`, `joinCode`, `joinUrl`, `participantCount`

**`QRCodePlaceholder.svelte`**
- SVG 176×176px, 21×21 fake QR grid at 8px/cell
- Three finder patterns (top-left, top-right, bottom-left) with correct inner cutouts
- ~75 hardcoded data modules for a convincing visual
- "Scan for å bli med" label with sub-label
- `role="img"` + `aria-label` for accessibility

**`JoinLinkCard.svelte`**
- Displays fake join URL in a monospace truncated field
- Copy button using `navigator.clipboard.writeText()`
- `$state(false)` for `copied`, auto-resets after 2 seconds via `setTimeout`
- Success/primary color transition on copied state

**`PresentationLaunchCard.svelte`**
- Card with `shadow-glow`, gradient tint overlay (`--gradient-button` at 7% opacity), radial purple glow
- Fullscreen expand SVG icon in a circular badge
- "Start presentasjon" title via `GradientText`
- Helper text + primary `Button` size="lg"
- `min-h-72` to feel substantial on mobile; fills full height in desktop grid

**`ShareScreen.svelte`**
- Uses `PageShell class="relative overflow-hidden"` for glow containment
- GlowOrb accent (top-right) + primary (bottom-left) for atmosphere
- `Container variant="wide"` + `animate-fade-in`
- Header: `Eyebrow`, `Badge success` (participant count), `Badge neutral` (join code), `GradientText` title, prompt
- Grid: `grid-cols-1 lg:grid-cols-2 gap-6`
  - Left: `Card elevated` wrapping `QRCodePlaceholder` + `JoinLinkCard`
  - Right: `PresentationLaunchCard`

**`App.svelte`**
- Updated import comment and component to `ShareScreen`

**Build:** ✅ 0 TypeScript errors, 0 bundle errors (122 modules, 48KB JS, 31KB CSS)

---

# Tester Output

TBD

---

# Reviewer Output

## UX Clarity ✅

The three host tasks are immediately clear:
1. **Invite people** — QR card is the first thing visible, prominent in its own elevated card
2. **Where people join** — JoinLinkCard sits directly below QR with URL + one-tap copy
3. **Open presentation** — PresentationLaunchCard is visually distinct, gradient-tinted, with a large primary CTA — impossible to miss

No settings, no admin controls, no technical clutter.

## Scope Adherence ✅

- No routing, no backend, no auth, no real QR generation, no export, no animation/state libraries
- No new npm dependencies added
- Clipboard API only (browser-native)
- All new files are in `/share/` — no unrelated areas touched
- Fake static session data only

## Visual Consistency ✅

- Uses existing tokens: `--gradient-button`, `--gradient-logo`, `--color-primary`, `--color-accent`, `--color-success`, `--shadow-glow`, `--shadow-soft`, `--radius-card`
- Reuses components: `PageShell`, `Container`, `Card`, `Button`, `Badge`, `Eyebrow`, `GradientText`, `GlowOrb`
- `animate-fade-in` matches existing motion convention
- Atmosphere (GlowOrbs, gradient overlays) matches tone of contributor and hero screens
- `overflow-hidden` + `relative` correctly contains orbs (same pattern as ContributorMobileScreen)

## Minor Notes

- `PresentationLaunchCard` button has no `onclick` — intentional, no routing in scope
- Participant count is static (12) — intentional fake data
- The card is `min-h-72` on mobile; on desktop the grid's implicit height-stretch makes it fill the left column height naturally

## Verdict: ✅ Approved — Ready

---

# Gatekeeper Decision

TBD