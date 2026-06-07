import type { Env } from './types.js';
import { createCloud, getCloud } from './routes/clouds.js';
import { submitWords, getWords } from './routes/words.js';
import { json, notFound } from './lib/response.js';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    const method = request.method;

    if (pathname === '/' && method === 'GET') {
      return json({ name: 'ordboble-worker', status: 'ok' });
    }

    if (pathname === '/health' && method === 'GET') {
      return json({ ok: true, service: 'ordboble-worker' });
    }

    // POST /api/clouds
    if (pathname === '/api/clouds' && method === 'POST') {
      return createCloud(request, env);
    }

    // GET /api/clouds/:id
    const cloudMatch = pathname.match(/^\/api\/clouds\/([^/]+)$/);
    if (cloudMatch) {
      const cloudId = cloudMatch[1];
      if (method === 'GET') return getCloud(cloudId, env);
      return notFound();
    }

    // POST|GET /api/clouds/:id/words
    const wordsMatch = pathname.match(/^\/api\/clouds\/([^/]+)\/words$/);
    if (wordsMatch) {
      const cloudId = wordsMatch[1];
      if (method === 'POST') return submitWords(cloudId, request, env);
      if (method === 'GET') return getWords(cloudId, env);
      return notFound();
    }

    return notFound();
  },
} satisfies ExportedHandler<Env>;
