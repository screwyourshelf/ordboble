function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/') {
      return json({ name: 'ordboble-worker', status: 'ok' });
    }

    if (pathname === '/health') {
      return json({ ok: true, service: 'ordboble-worker' });
    }

    return json({ error: 'Not found' }, 404);
  },
} satisfies ExportedHandler;
