# Backlog

- Add lightweight i18n strategy before real screens: avoid hardcoded visible UI text, support nb/en, default locale from domain or env.
- Consider replacing inline fake session copy with shared mock data before routes are introduced.
- Revisit realtime architecture before beta: current SSE implementation polls D1 per connection and may be limited by Worker stream lifetime. Consider robust reconnect, last-event-id support, or Durable Objects if true broadcast/presence is needed.
- Add CORS headers to Worker before deployed frontend calls API from another origin.
- Replace VITE_CLOUD_ID dev override with URL/session routing.
