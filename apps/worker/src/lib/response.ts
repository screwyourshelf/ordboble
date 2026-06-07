const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function json<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export function notFound(message = 'Not found'): Response {
  return json({ ok: false, error: { code: 'not_found', message } }, 404);
}

export function badRequest(message: string): Response {
  return json({ ok: false, error: { code: 'validation_error', message } }, 400);
}

export function internalError(message = 'Internal error'): Response {
  return json({ ok: false, error: { code: 'internal_error', message } }, 500);
}

export function expired(message = 'Session expired'): Response {
  return json({ ok: false, error: { code: 'expired', message } }, 410);
}

export function preflight(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
