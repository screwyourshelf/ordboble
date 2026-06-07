# Iteration 008 — Contributor Mobile Screen

## Goal

Create the first mobile-first contributor screen prototype.

This screen is for people who open a shared link or scan a QR code and submit words from their phone.

The experience should be:
- extremely simple
- touch-friendly
- playful
- fast
- clear
- joyful

This is frontend-only and uses fake local state.

---

# Scope

## In Scope

- Create a contributor mobile screen prototype
- Add a simple prompt/question view
- Add one or more word input fields
- Add “add another word” behavior using local component state
- Add fake submit behavior
- Add playful success/confirmation state
- Reuse existing UI primitives and design tokens
- Keep the screen mobile-first
- Keep implementation frontend-only
- Verify app starts and type-checks correctly

## Out of Scope

Do NOT:
- implement backend
- implement realtime
- add routing
- persist submitted words
- add authentication
- add QR scanning
- add session loading
- add validation beyond simple empty input handling
- add animation libraries
- add state libraries
- implement real API calls

---

# Design Direction

Follow:
- `docs/03-design-guidelines.md`
- `apps/web/references/`

The contributor screen should feel:
- simple
- friendly
- colorful
- lightweight
- mobile-native
- joyful

Avoid:
- admin UI
- dense forms
- desktop-first layout
- technical details
- unnecessary settings

---

# Expected Files

## Modify

- `apps/web/src/App.svelte`

## Create

- `apps/web/src/lib/components/contributor/ContributorMobileScreen.svelte`
- `apps/web/src/lib/components/contributor/WordInputList.svelte`
- `apps/web/src/lib/components/contributor/SuccessConfirmation.svelte`

Optional:
- `apps/web/src/lib/types/contributor.ts`

---

# Requirements

## ContributorMobileScreen

Should show:
- session title
- prompt/question
- short helper text
- word input area
- submit button
- playful visual atmosphere
- success state after submit

Use fake static session data.

Example:
- title: “Team workshop”
- prompt: “Hva forbinder du med godt samarbeid?”

---

# WordInputList

Should support:
- at least one input
- adding another word
- max 3 words in prototype
- local state only
- simple empty input handling

No complex validation.

---

# SuccessConfirmation

Should show:
- friendly thank-you message
- submitted words summary
- playful success visual
- button to add more words again

No backend behavior.

---

# UX Rules

Contributor flow:
1. read question
2. type word
3. optionally add another word
4. submit
5. see friendly confirmation

The contributor should not see:
- editor controls
- export controls
- admin settings
- technical session details

---

# Technical Constraints

- Svelte 5
- TypeScript
- Tailwind-first
- local state only
- no new dependencies
- no backend calls
- no routing

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