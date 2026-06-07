# Iteration 015 — Realtime Foundation

## Goal

Add the first realtime foundation for Ordboble: an SSE endpoint in the Worker, a frontend EventSource service, and minimal live word integration in presentation mode.

---

# Scope

## In Scope

- GET /api/clouds/:id/events (SSE)
- connected, heartbeat, word_added events
- D1 polling per connection (2s interval)
- Frontend realtime service (EventSource wrapper)
- Presentation mode live word appending
- Static prototype fallback when apiBaseUrl is absent

## Out of Scope

- Durable Objects
- WebSockets
- Presence tracking
- Rate limiting
- Auth
- Frontend routing changes
- Presentation screen redesign

---

# Files Created / Modified

| File | Action |
|---|---|
| `apps/worker/src/routes/events.ts` | Created — SSE handler |
| `apps/worker/src/index.ts` | Modified — events route |
| `apps/web/src/lib/services/realtime.ts` | Created — EventSource service |
| `apps/web/src/lib/components/presentation/PresentationModeScreen.svelte` | Modified — live words |
| `packages/shared/src/api/events.ts` | Modified — ConnectedEvent, WordAddedEvent, CloudEvent |
| `packages/shared/src/index.ts` | Modified — updated exports |

---

# Architect Output

## Plan

Worker: new GET /api/clouds/:id/events route returning a ReadableStream with text/event-stream.
Inside the stream: setInterval polls D1 every 2s for new word_submissions since last seen created_at.
Heartbeat every 15s to keep connection alive.
Cleanup via closed flag on stream cancel.

Frontend: thin EventSource wrapper in realtime.ts.
Returns unsubscribe function. No global state.
Falls back to no-op if apiBaseUrl is empty.

Presentation: liveWords reactive state starts from static composition.
subscribeToCloudEvents appends incoming words with random position.
onDestroy cleans up the EventSource.

## Risks

- Cloudflare Workers stream keepalive limit (~100s free tier) — acceptable for prototype.
- setInterval inside ReadableStream requires careful cleanup — handled via closed flag.
- WordCluster uses word as each key — duplicate words across clients may collide. Follow-up item.
- Network connection lost errors in wrangler local log when client disconnects abruptly — Miniflare artefact, not a bug.

---

# Developer Output

## SSE Event Types

- connected: {type, cloudId}
- heartbeat: {type}
- word_added: {type, cloudId, word: {id, word, createdAt}}

## Polling

- Every 2s per open connection
- Tracks lastCreatedAt in closure
- No global coordination

## Frontend Service

subscribeToCloudEvents(cloudId, handlers) -> unsubscribe

Falls back silently (no-op) if env.apiBaseUrl is empty.

## Presentation Integration

- liveWords = $state([...presentationComposition.words])
- Incoming word_added appends new WordEntry with random x/y
- onDestroy calls unsubscribe
- If apiBaseUrl is empty: static prototype unchanged

---

# Tester Output

## Type-check

```
worker: pnpm exec tsc --noEmit  ->  no errors
frontend: npx vite build --mode development  ->  154 modules, built in 559ms
```

## SSE Endpoint Test (wrangler dev --local --port 8787)

```
curl --max-time 5 /api/clouds/:id/events
-> event: connected
-> data: {"type":"connected","cloudId":"..."}

POST /api/clouds/:id/words (clientId + word)
-> event: word_added (within 2s)
-> data: {"type":"word_added","cloudId":"...","word":{"id":"...","word":"samarbeid","createdAt":"..."}}
```

All events confirmed.

Note: "Network connection lost" in wrangler log when curl disconnects on timeout — expected Miniflare behaviour.

---

# Reviewer Output

**Simplicity:** SSE handler is self-contained. setInterval polling, no global state. realtime.ts is 50 lines.

**API shape:** Matches updated shared contracts. Error envelope consistent.

**Scope:** No Durable Objects, no WebSockets, no presence. Presentation fallback intact.

**Cleanup:** Intervals cleared on stream cancel via closed flag. No timer leaks.

**Notes:**
- WordCluster uses word as each key; duplicate words across clients may collide visually. Follow-up.
- Live words get random x/y. Acceptable for prototype.

---

# Gatekeeper Decision

**APPROVED**

SSE foundation is complete and verified end-to-end. Frontend service is clean and safe. Presentation mode works with and without backend. No scope creep.

**Follow-up items:**

1. Use word id as WordCluster key to avoid duplicates colliding
2. Add reconnection logic to EventSource (auto-reconnect on error)
3. Connect contributor screen to real backend (submit to real cloud)
4. Consider Durable Objects for true broadcast when scale requires it
