import type { Env } from '../types.js';
import type { WordCloudRow } from '../db/schema.js';
import { generateId, generateJoinCode } from '../lib/id.js';
import { json, notFound, badRequest, internalError } from '../lib/response.js';

// Request/response types mirror packages/shared/src/api/sessions.ts
type CreateCloudRequest = {
  title: string;
  prompt?: string;
  language?: string;
  maxWordsPerClient?: number;
  liveEnabled?: boolean;
  themeId?: string;
  shapeId?: string;
};

type CloudResponse = {
  id: string;
  title: string;
  prompt?: string;
  language: string;
  joinCode: string;
  maxWordsPerClient: number;
  liveEnabled: boolean;
  createdAt: string;
  expiresAt?: string;
  themeId: string;
  shapeId: string;
};

function rowToResponse(row: WordCloudRow): CloudResponse {
  return {
    id: row.id,
    title: row.title,
    ...(row.prompt !== null ? { prompt: row.prompt } : {}),
    language: row.language,
    joinCode: row.join_code,
    maxWordsPerClient: row.max_words_per_client,
    liveEnabled: row.live_enabled === 1,
    createdAt: row.created_at,
    ...(row.expires_at !== null ? { expiresAt: row.expires_at } : {}),
    themeId: row.theme_id ?? 'playful',
    shapeId: row.shape_id ?? 'freeform',
  };
}

export async function createCloud(request: Request, env: Env): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  const req = body as CreateCloudRequest;

  if (!req.title || typeof req.title !== 'string' || req.title.trim() === '') {
    return badRequest('title is required');
  }

  const id = generateId();
  const joinCode = generateJoinCode();
  const now = new Date().toISOString();
  const title = req.title.trim();
  const prompt = req.prompt?.trim() ?? null;
  const language = req.language ?? 'no';
  const maxWordsPerClient = typeof req.maxWordsPerClient === 'number' ? req.maxWordsPerClient : 5;
  const liveEnabled = req.liveEnabled !== false;
  const themeId = typeof req.themeId === 'string' && req.themeId.trim() ? req.themeId.trim() : 'playful';
  const shapeId = typeof req.shapeId === 'string' && req.shapeId.trim() ? req.shapeId.trim() : 'freeform';

  try {
    await env.DB.prepare(
      `INSERT INTO word_clouds
         (id, title, prompt, language, join_code, expires_at, max_words_per_client, live_enabled, created_at, theme_id, shape_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(id, title, prompt, language, joinCode, null, maxWordsPerClient, liveEnabled ? 1 : 0, now, themeId, shapeId)
      .run();
  } catch {
    return internalError('Failed to create cloud');
  }

  const row: WordCloudRow = {
    id,
    title,
    prompt,
    language,
    join_code: joinCode,
    expires_at: null,
    max_words_per_client: maxWordsPerClient,
    live_enabled: liveEnabled ? 1 : 0,
    created_at: now,
    theme_id: themeId,
    shape_id: shapeId,
  };

  return json({ ok: true, data: rowToResponse(row) }, 201);
}

export async function getCloud(cloudId: string, env: Env): Promise<Response> {
  let row: WordCloudRow | null;
  try {
    row = await env.DB.prepare('SELECT * FROM word_clouds WHERE id = ?')
      .bind(cloudId)
      .first<WordCloudRow>();
  } catch {
    return internalError();
  }

  if (!row) {
    return notFound('Cloud not found');
  }

  return json({ ok: true, data: rowToResponse(row) });
}
