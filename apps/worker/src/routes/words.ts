import type { Env } from '../types.js';
import type { WordCloudRow, WordSubmissionRow } from '../db/schema.js';
import { generateId } from '../lib/id.js';
import { normalizeWord } from '../lib/normalize.js';
import { json, notFound, badRequest, internalError, expired } from '../lib/response.js';

// Request/response types mirror packages/shared/src/api/words.ts
type SubmitWordsRequest = {
  clientId: string;
  words: string[];
};

type WordResponse = {
  id: string;
  cloudId: string;
  clientId: string;
  word: string;
  normalizedWord: string;
  createdAt: string;
};

function rowToWordResponse(row: WordSubmissionRow): WordResponse {
  return {
    id: row.id,
    cloudId: row.word_cloud_id,
    clientId: row.client_id,
    word: row.word,
    normalizedWord: row.normalized_word,
    createdAt: row.created_at,
  };
}

export async function submitWords(cloudId: string, request: Request, env: Env): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  const req = body as SubmitWordsRequest;

  if (!req.clientId || typeof req.clientId !== 'string' || req.clientId.trim() === '') {
    return badRequest('clientId is required');
  }

  if (!Array.isArray(req.words) || req.words.length === 0) {
    return badRequest('words must be a non-empty array');
  }

  let cloud: WordCloudRow | null;
  try {
    cloud = await env.DB.prepare('SELECT * FROM word_clouds WHERE id = ?')
      .bind(cloudId)
      .first<WordCloudRow>();
  } catch {
    return internalError();
  }

  if (!cloud) {
    return notFound('Cloud not found');
  }

  if (cloud.expires_at !== null && new Date(cloud.expires_at) < new Date()) {
    return expired();
  }

  const clientId = req.clientId.trim();
  const now = new Date().toISOString();

  let existingCount: number;
  try {
    const result = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM word_submissions WHERE word_cloud_id = ? AND client_id = ?'
    )
      .bind(cloudId, clientId)
      .first<{ count: number }>();
    existingCount = result?.count ?? 0;
  } catch {
    return internalError();
  }

  const remaining = cloud.max_words_per_client - existingCount;
  if (remaining <= 0) {
    return badRequest(`Max words per client (${cloud.max_words_per_client}) already reached`);
  }

  const wordsToProcess = req.words.slice(0, remaining);
  const accepted: WordResponse[] = [];

  for (const rawWord of wordsToProcess) {
    if (typeof rawWord !== 'string') continue;
    const word = rawWord.trim();
    if (!word) continue;
    const normalizedWordValue = normalizeWord(word);
    if (!normalizedWordValue) continue;

    const id = generateId();
    try {
      await env.DB.prepare(
        `INSERT INTO word_submissions (id, word_cloud_id, client_id, word, normalized_word, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
        .bind(id, cloudId, clientId, word, normalizedWordValue, now)
        .run();

      accepted.push({ id, cloudId, clientId, word, normalizedWord: normalizedWordValue, createdAt: now });
    } catch (err: unknown) {
      // Skip silently on UNIQUE constraint violations (same client, same normalized word).
      const message = err instanceof Error ? err.message : String(err);
      if (!message.toUpperCase().includes('UNIQUE')) {
        return internalError();
      }
    }
  }

  return json({ ok: true, data: accepted }, 201);
}

export async function getWords(cloudId: string, env: Env): Promise<Response> {
  let cloud: WordCloudRow | null;
  try {
    cloud = await env.DB.prepare('SELECT id FROM word_clouds WHERE id = ?')
      .bind(cloudId)
      .first<WordCloudRow>();
  } catch {
    return internalError();
  }

  if (!cloud) {
    return notFound('Cloud not found');
  }

  let rows: WordSubmissionRow[];
  try {
    const result = await env.DB.prepare(
      'SELECT * FROM word_submissions WHERE word_cloud_id = ? ORDER BY created_at ASC'
    )
      .bind(cloudId)
      .all<WordSubmissionRow>();
    rows = result.results;
  } catch {
    return internalError();
  }

  return json({ ok: true, data: rows.map(rowToWordResponse) });
}
