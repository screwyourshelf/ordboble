# Iteration 013 — Cloudflare Pages Deployment

## Goal

Deploy the current frontend prototype to Cloudflare Pages.

The goal is to get a public preview URL for the Ordboble frontend and verify that the current prototype application works correctly outside local development.

This iteration is deployment-focused only.

---

# Scope

## In Scope

- Prepare frontend for Cloudflare Pages deployment
- Verify production build works
- Configure Cloudflare Pages settings
- Connect GitHub repository manually via Cloudflare UI
- Verify deployed application loads correctly
- Verify prototype navigation works in deployed environment
- Document deployment settings and findings

## Out of Scope

Do NOT:
- add backend
- add Cloudflare Workers
- add D1
- add SSE
- add authentication
- add routing
- redesign UI
- add new frontend features
- add deployment overengineering
- add CI/CD complexity
- add custom domains yet

---

# Deployment Target

Platform:
- Cloudflare Pages

Repository:
- `screwyourshelf/ordboble`

Frontend location:
- `apps/web`

---

# Expected Cloudflare Pages Configuration

## Framework Preset

```text
Vite
```

## Root Directory

```text
apps/web
```

## Build Command

```text
pnpm run build
```

## Build Output Directory

```text
dist
```

---

# Requirements

Before deployment:
- local `pnpm run build` must pass
- latest code committed
- latest code pushed to GitHub

After deployment:
- Cloudflare build succeeds
- deployed URL loads successfully
- prototype navigation works
- all major prototype screens render correctly

---

# Manual Steps

These steps are performed manually in Cloudflare UI:

1. Create new Cloudflare Pages project
2. Connect GitHub repository
3. Select:
   - repository: `screwyourshelf/ordboble`
4. Configure:
   - Framework preset: `Vite`
   - Root directory: `apps/web`
   - Build command: `pnpm run build`
   - Build output directory: `dist`
5. Deploy

---

# Documentation

Update this iteration document with:
- Cloudflare Pages project name
- deployment URL
- final build settings used
- any deployment issues encountered
- any fixes required for production build

Do NOT store:
- secrets
- tokens
- credentials

---

# Architect Output

## Build status

`pnpm run build` from `apps/web` passes cleanly: 152 modules, 515ms, zero errors, zero warnings.

Output:
- `dist/index.html` (0.45 kB)
- `dist/assets/index-*.css` (40.83 kB)
- `dist/assets/index-*.js` (85.95 kB)
- `dist/favicon.svg` (9.5 kB)

## Risk assessment

| Risk | Severity | Status |
|---|---|---|
| No root `package.json` — build must run from `apps/web` | High | ✅ Mitigated: set Root Directory = `apps/web` |
| `dist/` in `.gitignore` | Expected | ✅ Correct — Cloudflare builds fresh |
| `pnpm-lock.yaml` lockfile v6.0 | Low | ✅ Supported |
| SPA with no server-side routing | None | ✅ Single `index.html`, no 404 risk |
| No environment variables needed | None | ✅ Frontend-only, all static |

## Required Cloudflare Pages settings

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Root directory | `apps/web` |
| Build command | `pnpm run build` |
| Build output directory | `dist` |

## No code changes needed

Build is clean. No `vite.config.ts` changes, no `base` path, no env files, no `_redirects`.

---

# Developer Output

Production build passes with zero errors. No code changes required.

Verified:
1. `pnpm run build` from `apps/web` — ✅ clean, 515ms
2. `tsc --noEmit` — ✅ zero errors
3. `dist/` output contains all expected files

---

# Tester Output

TBD

---

# Reviewer Output

## Build clean ✅

`pnpm run build` exits 0. Output verified: `index.html`, CSS bundle, JS bundle, `favicon.svg` all non-empty.

## No scope creep ✅

Zero code changes. No Workers, CI/CD, `_redirects`, env files, routing library added.

## Root directory risk addressed ✅

Architect correctly identified that Cloudflare must target `apps/web`. No root `package.json` exists — this is the critical config.

## SPA correctness ✅

No client-side routing. Single `index.html`. No 404 risk.

## Ready for manual Cloudflare Pages deployment ✅

---

# Gatekeeper Decision

TBD