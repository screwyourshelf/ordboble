import env from '../config/env'
import { getClientId } from './client-id'

export type SubmitWordsResult =
  | { ok: true; accepted: string[] }
  | { ok: false; error: string }

/**
 * Submit words for a cloud.
 *
 * If apiBaseUrl is not configured, returns a fake success immediately
 * so the prototype continues to work without a backend.
 */
export async function submitWords(
  cloudId: string,
  words: string[],
): Promise<SubmitWordsResult> {
  if (!env.apiBaseUrl) {
    // Prototype fallback — no backend configured
    return { ok: true, accepted: words }
  }

  const clientId = getClientId()

  let response: Response
  try {
    response = await fetch(`${env.apiBaseUrl}/api/clouds/${cloudId}/words`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, words }),
    })
  } catch {
    return { ok: false, error: 'Kunne ikke nå serveren. Sjekk nettforbindelsen.' }
  }

  if (!response.ok) {
    let message = 'Noe gikk galt. Prøv igjen.'
    try {
      const body = await response.json() as { error?: { message?: string } }
      if (body?.error?.message) message = body.error.message
    } catch { /* ignore */ }
    return { ok: false, error: message }
  }

  try {
    const body = await response.json() as { ok: boolean; data: Array<{ word: string }> }
    const accepted = body.data.map((w) => w.word)
    // If all words were duplicates, data is empty — show the submitted words anyway
    return { ok: true, accepted: accepted.length > 0 ? accepted : words }
  } catch {
    return { ok: false, error: 'Ugyldig svar fra server.' }
  }
}
