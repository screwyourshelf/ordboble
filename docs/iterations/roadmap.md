# Iteration 016.1 — Routing and Session URL Flow

## Goal

Add minimal frontend routing based on URL paths so Ordboble can use real shareable session URLs.

This iteration should replace the temporary prototype screen switcher as the primary navigation mechanism and allow screens to load the correct cloud/session from the URL.

The goal is to support:

```text
/                  landing
/join/:id          contributor screen
/share/:id         share screen
/present/:id       presentation screen
/edit/:id          editor screen
```

This is the foundation for real sharing and QR flow.

---

# Scope

## In Scope

- Add lightweight frontend route parsing using `window.location`
- Support session ID in URL path
- Update screen rendering based on current route
- Pass route session ID into relevant screens
- Keep prototype navigation available only as dev/preview aid if useful
- Replace `VITE_CLOUD_ID` dependency with route ID where available
- Preserve fallback prototype behavior
- Verify Cloudflare Pages SPA fallback if needed
- Keep implementation frontend-only
- Verify frontend builds and type-checks

## Out of Scope

Do NOT:
- add routing library
- add SvelteKit
- add backend endpoints
- change D1 schema
- redesign screens
- implement QR generation
- implement auth
- implement admin links
- implement full session loading UX
- implement export
- add new dependencies

---

# Routes

Support these routes:

```text
/                  Landing
/join/:id          Contributor
/share/:id         Share
/present/:id       Presentation
/edit/:id          Editor
```

If route is unknown:
- show landing
- or show simple not-found fallback

Keep it simple.

---

# Session ID Behavior

Screens that need a cloud/session ID should receive it from the route.

Priority:

```text
route session id
→ env.cloudId
→ mockSession.id
```

This preserves prototype fallback behavior.

---

# Cloudflare Pages SPA Fallback

Because this is a Vite SPA, direct navigation to `/join/:id` or `/present/:id` must work on Cloudflare Pages.

Add if needed:

```text
apps/web/public/_redirects
```

with:

```text
/* /index.html 200
```

Only add this if not already present.

---

# Expected Files

## Modify

Likely:
- `apps/web/src/lib/app/AppShell.svelte`
- `apps/web/src/lib/app/ScreenSwitcher.svelte`
- `apps/web/src/lib/app/screens.ts`
- `apps/web/src/lib/types/app.ts`
- `apps/web/src/lib/components/contributor/ContributorMobileScreen.svelte`
- `apps/web/src/lib/components/share/ShareScreen.svelte`
- `apps/web/src/lib/components/presentation/PresentationModeScreen.svelte`
- `apps/web/src/lib/components/editor/EditorScreen.svelte`

## Create

Likely:
- `apps/web/src/lib/app/routes.ts`
- `apps/web/public/_redirects`

Only create what is actually needed.

---

# Requirements

## Route Parser

Create a small typed route parser.

It should return:
- screen id
- optional session id

Use explicit types.

No routing library.

---

# AppShell

AppShell should:
- determine initial route from `window.location.pathname`
- render the matching screen
- allow prototype nav to update current screen without full reload if still kept
- keep implementation simple

---

# ScreenSwitcher

ScreenSwitcher should:
- accept active screen id
- accept optional session id
- pass session id to screens that need it

---

# Screen Components

Contributor, Share, Presentation and Editor should:
- accept optional `cloudId` or `sessionId` prop
- use route-provided ID if present
- fall back to existing env/mock behavior

Do not redesign these screens.

---

# Technical Constraints

- Svelte 5
- TypeScript
- Vite SPA
- no new dependencies
- no routing library
- no SvelteKit
- no backend changes
- no UI redesign

---

# Verification

Verify:
- frontend type-checks
- frontend builds
- `/` renders landing
- `/join/test-id` renders contributor using `test-id`
- `/share/test-id` renders share screen
- `/present/test-id` renders presentation using `test-id`
- `/edit/test-id` renders editor
- direct route load works with SPA fallback

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