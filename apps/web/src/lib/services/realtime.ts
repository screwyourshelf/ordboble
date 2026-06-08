import env from '../config/env'

export type WordAddedHandler = (payload: {
  id: string
  word: string
  createdAt: string
}) => void

export type RealtimeHandlers = {
  onWordAdded: WordAddedHandler
  onConnected?: () => void
  onHeartbeat?: () => void
  onError?: (event: Event) => void
  /** Called when the SSE connection drops and EventSource is reconnecting. */
  onReconnecting?: () => void
}

/**
 * Subscribe to live word events for a cloud.
 * Returns an unsubscribe function — call it to close the connection.
 *
 * Falls back silently (returns no-op) if apiBaseUrl is not configured.
 */
export function subscribeToCloudEvents(
  cloudId: string,
  handlers: RealtimeHandlers,
): () => void {
  if (!env.apiBaseUrl) {
    return () => { /* no-op: no backend configured */ }
  }

  const url = `${env.apiBaseUrl}/api/clouds/${cloudId}/events`
  const es = new EventSource(url)

  es.addEventListener('connected', () => {
    handlers.onConnected?.()
  })

  es.addEventListener('heartbeat', () => {
    handlers.onHeartbeat?.()
  })

  es.addEventListener('word_added', (e: MessageEvent) => {
    try {
      const data = JSON.parse(e.data)
      if (data?.word) {
        handlers.onWordAdded(data.word)
      }
    } catch {
      // malformed event — skip
    }
  })

  es.onerror = (e) => {
    // EventSource reconnects automatically — call onReconnecting to let
    // the caller show a subtle indicator. Suppress console spam.
    handlers.onReconnecting?.()
    handlers.onError?.(e)
  }

  return () => {
    es.close()
  }
}
