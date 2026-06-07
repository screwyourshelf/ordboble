import type { ScreenId } from '../types/app'

export interface ParsedRoute {
  screen: ScreenId
  sessionId: string | null
}

/**
 * Parse a URL pathname into a screen + optional session ID.
 *
 * Routes:
 *   /                → landing
 *   /join/:id        → contributor
 *   /share/:id       → share
 *   /present/:id     → presentation
 *   /edit/:id        → editor
 *
 * Unknown paths fall back to landing.
 */
export function parseRoute(pathname: string): ParsedRoute {
  const join = pathname.match(/^\/join\/([^/]+)\/?$/)
  if (join) return { screen: 'contributor', sessionId: join[1] }

  const share = pathname.match(/^\/share\/([^/]+)\/?$/)
  if (share) return { screen: 'share', sessionId: share[1] }

  const present = pathname.match(/^\/present\/([^/]+)\/?$/)
  if (present) return { screen: 'presentation', sessionId: present[1] }

  const edit = pathname.match(/^\/edit\/([^/]+)\/?$/)
  if (edit) return { screen: 'editor', sessionId: edit[1] }

  return { screen: 'landing', sessionId: null }
}
