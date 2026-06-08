import env from '../config/env'

// Mirror of packages/shared/src/api/sessions.ts — inlined to avoid workspace dep
export type CreateCloudRequest = {
  title: string
  prompt?: string
  language?: string
  maxWordsPerClient?: number
  liveEnabled?: boolean
  themeId?: string
  shapeId?: string
}

export type CloudResponse = {
  id: string
  title: string
  prompt?: string
  language: string
  joinCode: string
  maxWordsPerClient: number
  liveEnabled: boolean
  createdAt: string
  expiresAt?: string
  themeId: string
  shapeId: string
}

export type CreateCloudResult =
  | { ok: true; data: CloudResponse }
  | { ok: false; error: string }

export type GetCloudResult =
  | { ok: true; data: CloudResponse }
  | { ok: false; error: string; notFound: boolean }

/**
 * Create a new word cloud session.
 *
 * If env.apiBaseUrl is empty, returns a prototype session without
 * calling the backend.
 */
export async function createCloud(req: CreateCloudRequest): Promise<CreateCloudResult> {
  if (!env.apiBaseUrl) {
    // Prototype / fallback mode — no backend needed
    const fakeId = `demo-${Date.now()}`
    return {
      ok: true,
      data: {
        id: fakeId,
        title: req.title,
        ...(req.prompt ? { prompt: req.prompt } : {}),
        language: req.language ?? 'nb',
        joinCode: 'DEMO',
        maxWordsPerClient: req.maxWordsPerClient ?? 5,
        liveEnabled: req.liveEnabled ?? true,
        createdAt: new Date().toISOString(),
        themeId: req.themeId ?? 'playful',
        shapeId: req.shapeId ?? 'freeform',
      },
    }
  }

  try {
    const res = await fetch(`${env.apiBaseUrl}/api/clouds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    })

    const json = (await res.json()) as CreateCloudResult

    if (!res.ok && json.ok !== false) {
      return { ok: false, error: 'Serverfeil. Prøv igjen.' }
    }

    return json
  } catch {
    return { ok: false, error: 'Nettverksfeil. Sjekk tilkoblingen og prøv igjen.' }
  }
}

/**
 * Fetch cloud metadata by ID.
 *
 * Falls back silently if apiBaseUrl is not configured.
 */
export async function getCloud(cloudId: string): Promise<GetCloudResult> {
  if (!env.apiBaseUrl) {
    return { ok: false, error: 'No backend configured', notFound: false }
  }

  try {
    const res = await fetch(`${env.apiBaseUrl}/api/clouds/${cloudId}`)
    if (res.status === 404) return { ok: false, error: 'Not found', notFound: true }
    const json = (await res.json()) as GetCloudResult
    return json
  } catch {
    return { ok: false, error: 'Nettverksfeil.', notFound: false }
  }
}
