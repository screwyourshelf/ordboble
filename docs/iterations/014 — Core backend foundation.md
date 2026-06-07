# Iteration 014 — Core Backend Foundation

## Goal

Establish the first real backend layer: D1 schema, core API routes, word submission, and supporting helpers.

---

# Scope

## In Scope

- D1 migration (schema)
- D1 binding in wrangler config
- API routes:
  - POST /api/clouds
  - GET /api/clouds/:id
  - POST /api/clouds/:id/words
  - GET /api/clouds/:id/words
- JSON response helper
- Error helper
- Word normalization
- ID and join code generation
- Minimal data-access structure
- Update shared API contracts to match real API

## Out of Scope

- SSE / realtime
- Frontend integration
- Auth
- Rate limiting
- Moderation
- QR code
- Export
- Complex abstractions
- Speculative architecture

---

# Files Created / Modified

| File | Action |
|---|---|
| `apps/worker/migrations/0001_init.sql` | Created — D1 schema |
| `apps/worker/wrangler.jsonc` | Modified — D1 binding + migrations_dir |
| `apps/worker/src/types.ts` | Created — Env interface |
| `apps/worker/src/db/schema.ts` | Created — D1 row types |
| `apps/worker/src/lib/id.ts` | Created — generateId, generateJoinCode |
| `apps/worker/src/lib/normalize.ts` | Created — normalizeWord |
| `apps/worker/src/lib/response.ts` | Created — json, notFound, badRequest, internalError, expired |
| `apps/worker/src/routes/clouds.ts` | Created — POST + GET /api/clouds |
| `apps/worker/src/routes/words.ts` | Created — POST + GET /api/clouds/:id/words |
| `apps/worker/src/index.ts` | Modified — routing, Env type |
| `packages/shared/src/api/sessions.ts` | Modified — added joinCode, maxWordsPerClient, liveEnabled |
| `packages/shared/src/api/words.ts` | Modified — added clientId, normalizedWord, renamed sessionId to cloudId |

---

# Architect Output

## Plan

The worker had a minimal skeleton. No D1 binding, no routes beyond health.
Built out a flat, readable file structure:

```
apps/worker/
  migrations/
    0001_init.sql
  src/
    types.ts
    db/schema.ts
    lib/id.ts
    lib/normalize.ts
    lib/response.ts
    routes/clouds.ts
    routes/words.ts
    index.ts
```

Route dispatch handled by simple regex matching in index.ts — no router dependency.
D1 accessed directly via prepared statements — no ORM.

## Risks

- No pnpm workspace configured: worker cannot import from `@ordboble/shared` at build time. Types defined locally in worker and kept manually in sync with shared contracts.
- `database_id` is a placeholder UUID. Must be replaced with real Cloudflare D1 database UUID before remote deploy.
- UNIQUE constraint violations for duplicate word submissions detected by error message string match — acceptable for D1/SQLite.

---

# Developer Output

## D1 Schema

`word_clouds`: id, title, prompt, language, join_code (UNIQUE), expires_at, max_words_per_client, live_enabled, created_at

`word_submissions`: id, word_cloud_id (FK), client_id, word, normalized_word, created_at
- UNIQUE (word_cloud_id, client_id, normalized_word)
- INDEX on word_cloud_id

## Helpers

- `generateId()` — crypto.randomUUID()
- `generateJoinCode()` — 6-char code from unambiguous charset (no O/0/I/1)
- `normalizeWord()` — lowercase, strip non-letter/non-number, collapse whitespace
- `json()`, `notFound()`, `badRequest()`, `internalError()`, `expired()` — typed JSON responses

## Business rules implemented

- POST /api/clouds: validates title, generates id + joinCode, inserts row, returns 201
- GET /api/clouds/:id: returns cloud metadata, 404 if missing
- POST /api/clouds/:id/words: validates clientId + words array, checks expiry, enforces maxWordsPerClient, normalizes words, silently skips duplicate normalized words per client, returns accepted words
- GET /api/clouds/:id/words: 404 if cloud missing, returns all submissions ordered by created_at

---

# Tester Output

## Type-check

```
npx tsc --noEmit  ->  no errors
```

## D1 Migration

```
# Local
npx wrangler d1 migrations apply DB --local
-> 0001_init.sql  (4 commands executed successfully)

# Remote
pnpm exec wrangler d1 create ordboble-db
-> database_id: c0c25458-fea4-455d-9416-baacde83d326 (region EEUR)

pnpm exec wrangler d1 migrations apply ordboble-db --remote
-> 0001_init.sql  (4 commands in 1.19ms)
```

## Endpoint tests (wrangler dev --local --port 8787)

| Test | Result |
|---|---|
| GET /health | 200 ok |
| POST /api/clouds (valid) | 201, returns id + joinCode |
| GET /api/clouds/:id | 200, correct metadata |
| POST /api/clouds/:id/words (3 words, new client) | 201, 3 words accepted |
| POST /api/clouds/:id/words (same client again) | 400 max words reached |
| POST /api/clouds/:id/words (duplicate normalized word) | silently skipped, others accepted |
| GET /api/clouds/:id/words | 200, all persisted words returned |
| GET /api/clouds/does-not-exist | 404 not_found |
| POST /api/clouds (missing title) | 400 title is required |
| POST /api/clouds/:id/words (missing clientId) | 400 clientId is required |

All tests passed.

---

# Reviewer Output

**Simplicity:** Implementation is flat and readable. No router, no ORM, no framework. Each concern has its own small file. Route dispatch is a handful of regex matches in index.ts.

**API shape:** Matches the spec. Request/response types mirror updated shared contracts. Error envelope is consistent (`{ok:false, error:{code,message}}`).

**D1 usage:** Prepared statements only. No string interpolation in queries. Schema constraints (UNIQUE, FK, INDEX) are in the migration, not in application code.

**Scope:** No frontend changes. No SSE. No auth. No rate limiting. Strictly within iteration scope.

**Minor notes:**
- `migrations_dir` was initially placed at wrangler config top level (causes warning in wrangler v3). Fixed to live inside the `d1_databases` entry.
- Shared types cannot be imported into the worker without a workspace resolver. Local types kept intentionally in sync with shared package — no divergence at time of writing.

---

# Gatekeeper Decision

**APPROVED**

Core backend foundation is complete and verified. All four endpoints behave correctly. Schema is minimal and correct. Helpers are focused. No scope creep.

**Follow-up items for future iterations:**

1. ~~Create real D1 database and replace placeholder `database_id`~~ — done (`c0c25458-fea4-455d-9416-baacde83d326`, region EEUR)
2. ~~Run `wrangler d1 migrations apply DB --remote`~~ — done (4 commands, 1.19ms)
3. Configure pnpm workspace so worker can import from `@ordboble/shared` directly
4. Connect frontend to backend (separate iteration)
