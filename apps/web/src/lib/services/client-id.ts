const STORAGE_KEY = 'ordboble.clientId'

/**
 * Returns a stable client ID for this browser.
 * Persisted in localStorage; falls back to a temporary random ID if unavailable.
 */
export function getClientId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored

    const id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
    return id
  } catch {
    // localStorage unavailable (private mode, SSR, etc.)
    return crypto.randomUUID()
  }
}
