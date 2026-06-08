# Backlog

## Active

- Add lightweight i18n strategy before real screens: avoid hardcoded visible UI text, support nb/en, default locale from domain or env.
- Revisit realtime architecture before beta: current SSE implementation polls D1 per connection and may be limited by Worker stream lifetime. Consider robust reconnect, last-event-id support, or Durable Objects if true broadcast/presence is needed.
- Fix Svelte 5 reactive warning pattern: replace const effectiveId = sessionId ?? ... with $derived where sessionId props are used in ContributorMobileScreen, PresentationModeScreen and ShareScreen.
- Add calm/minimal presentation themes so host can switch between colorful playful mode and quieter professional mode.
- Hide prototype/developer navigation in production builds.
- Define lightweight host vs participant navigation flow before beta.

## Done / superseded

- Consider replacing inline fake session copy with shared mock data before routes are introduced.
- Add CORS headers to Worker before deployed frontend calls API from another origin.
- Replace VITE_CLOUD_ID dev override with URL/session routing.