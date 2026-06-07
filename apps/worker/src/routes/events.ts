import type { Env } from '../types.js';
import type { WordSubmissionRow } from '../db/schema.js';
import { notFound, internalError } from '../lib/response.js';

const POLL_INTERVAL_MS = 2000;
const HEARTBEAT_INTERVAL_MS = 15000;

function sseMessage(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function cloudEvents(cloudId: string, env: Env): Promise<Response> {
  // Verify cloud exists
  let exists: { id: string } | null;
  try {
    exists = await env.DB.prepare('SELECT id FROM word_clouds WHERE id = ?')
      .bind(cloudId)
      .first<{ id: string }>();
  } catch {
    return internalError();
  }

  if (!exists) {
    return notFound('Cloud not found');
  }

  let lastCreatedAt = new Date().toISOString();

  const stream = new ReadableStream({
    start(controller) {
      const encode = (chunk: string) => new TextEncoder().encode(chunk);

      // Send initial connected event
      controller.enqueue(encode(sseMessage('connected', { type: 'connected', cloudId })));

      let closed = false;

      const close = () => {
        if (!closed) {
          closed = true;
          clearInterval(pollTimer);
          clearInterval(heartbeatTimer);
          try { controller.close(); } catch { /* already closed */ }
        }
      };

      // Poll D1 for new words
      const pollTimer = setInterval(async () => {
        if (closed) return;
        let rows: WordSubmissionRow[];
        try {
          const result = await env.DB.prepare(
            'SELECT * FROM word_submissions WHERE word_cloud_id = ? AND created_at > ? ORDER BY created_at ASC'
          )
            .bind(cloudId, lastCreatedAt)
            .all<WordSubmissionRow>();
          rows = result.results;
        } catch {
          return; // skip on error, keep stream alive
        }

        for (const row of rows) {
          if (closed) break;
          if (row.created_at > lastCreatedAt) {
            lastCreatedAt = row.created_at;
          }
          try {
            controller.enqueue(encode(sseMessage('word_added', {
              type: 'word_added',
              cloudId,
              word: { id: row.id, word: row.word, createdAt: row.created_at },
            })));
          } catch {
            close();
            return;
          }
        }
      }, POLL_INTERVAL_MS);

      // Heartbeat to keep connection alive
      const heartbeatTimer = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(encode(sseMessage('heartbeat', { type: 'heartbeat' })));
        } catch {
          close();
        }
      }, HEARTBEAT_INTERVAL_MS);
    },

    cancel() {
      // Client disconnected — cleanup handled inside start() via closed flag
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
