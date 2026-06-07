var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-vXh31X/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// src/lib/id.ts
var JOIN_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function generateId() {
  return crypto.randomUUID();
}
__name(generateId, "generateId");
function generateJoinCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let code = "";
  for (const byte of bytes) {
    code += JOIN_CODE_CHARS[byte % JOIN_CODE_CHARS.length];
  }
  return code;
}
__name(generateJoinCode, "generateJoinCode");

// src/lib/response.ts
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
__name(json, "json");
function notFound(message = "Not found") {
  return json({ ok: false, error: { code: "not_found", message } }, 404);
}
__name(notFound, "notFound");
function badRequest(message) {
  return json({ ok: false, error: { code: "validation_error", message } }, 400);
}
__name(badRequest, "badRequest");
function internalError(message = "Internal error") {
  return json({ ok: false, error: { code: "internal_error", message } }, 500);
}
__name(internalError, "internalError");
function expired(message = "Session expired") {
  return json({ ok: false, error: { code: "expired", message } }, 410);
}
__name(expired, "expired");

// src/routes/clouds.ts
function rowToResponse(row) {
  return {
    id: row.id,
    title: row.title,
    ...row.prompt !== null ? { prompt: row.prompt } : {},
    language: row.language,
    joinCode: row.join_code,
    maxWordsPerClient: row.max_words_per_client,
    liveEnabled: row.live_enabled === 1,
    createdAt: row.created_at,
    ...row.expires_at !== null ? { expiresAt: row.expires_at } : {}
  };
}
__name(rowToResponse, "rowToResponse");
async function createCloud(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }
  const req = body;
  if (!req.title || typeof req.title !== "string" || req.title.trim() === "") {
    return badRequest("title is required");
  }
  const id = generateId();
  const joinCode = generateJoinCode();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const title = req.title.trim();
  const prompt = req.prompt?.trim() ?? null;
  const language = req.language ?? "no";
  const maxWordsPerClient = typeof req.maxWordsPerClient === "number" ? req.maxWordsPerClient : 5;
  const liveEnabled = req.liveEnabled !== false;
  try {
    await env.DB.prepare(
      `INSERT INTO word_clouds
         (id, title, prompt, language, join_code, expires_at, max_words_per_client, live_enabled, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, title, prompt, language, joinCode, null, maxWordsPerClient, liveEnabled ? 1 : 0, now).run();
  } catch {
    return internalError("Failed to create cloud");
  }
  const row = {
    id,
    title,
    prompt,
    language,
    join_code: joinCode,
    expires_at: null,
    max_words_per_client: maxWordsPerClient,
    live_enabled: liveEnabled ? 1 : 0,
    created_at: now
  };
  return json({ ok: true, data: rowToResponse(row) }, 201);
}
__name(createCloud, "createCloud");
async function getCloud(cloudId, env) {
  let row;
  try {
    row = await env.DB.prepare("SELECT * FROM word_clouds WHERE id = ?").bind(cloudId).first();
  } catch {
    return internalError();
  }
  if (!row) {
    return notFound("Cloud not found");
  }
  return json({ ok: true, data: rowToResponse(row) });
}
__name(getCloud, "getCloud");

// src/lib/normalize.ts
function normalizeWord(word) {
  return word.trim().toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
}
__name(normalizeWord, "normalizeWord");

// src/routes/words.ts
function rowToWordResponse(row) {
  return {
    id: row.id,
    cloudId: row.word_cloud_id,
    clientId: row.client_id,
    word: row.word,
    normalizedWord: row.normalized_word,
    createdAt: row.created_at
  };
}
__name(rowToWordResponse, "rowToWordResponse");
async function submitWords(cloudId, request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body");
  }
  const req = body;
  if (!req.clientId || typeof req.clientId !== "string" || req.clientId.trim() === "") {
    return badRequest("clientId is required");
  }
  if (!Array.isArray(req.words) || req.words.length === 0) {
    return badRequest("words must be a non-empty array");
  }
  let cloud;
  try {
    cloud = await env.DB.prepare("SELECT * FROM word_clouds WHERE id = ?").bind(cloudId).first();
  } catch {
    return internalError();
  }
  if (!cloud) {
    return notFound("Cloud not found");
  }
  if (cloud.expires_at !== null && new Date(cloud.expires_at) < /* @__PURE__ */ new Date()) {
    return expired();
  }
  const clientId = req.clientId.trim();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  let existingCount;
  try {
    const result = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM word_submissions WHERE word_cloud_id = ? AND client_id = ?"
    ).bind(cloudId, clientId).first();
    existingCount = result?.count ?? 0;
  } catch {
    return internalError();
  }
  const remaining = cloud.max_words_per_client - existingCount;
  if (remaining <= 0) {
    return badRequest(`Max words per client (${cloud.max_words_per_client}) already reached`);
  }
  const wordsToProcess = req.words.slice(0, remaining);
  const accepted = [];
  for (const rawWord of wordsToProcess) {
    if (typeof rawWord !== "string")
      continue;
    const word = rawWord.trim();
    if (!word)
      continue;
    const normalizedWordValue = normalizeWord(word);
    if (!normalizedWordValue)
      continue;
    const id = generateId();
    try {
      await env.DB.prepare(
        `INSERT INTO word_submissions (id, word_cloud_id, client_id, word, normalized_word, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(id, cloudId, clientId, word, normalizedWordValue, now).run();
      accepted.push({ id, cloudId, clientId, word, normalizedWord: normalizedWordValue, createdAt: now });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!message.toUpperCase().includes("UNIQUE")) {
        return internalError();
      }
    }
  }
  return json({ ok: true, data: accepted }, 201);
}
__name(submitWords, "submitWords");
async function getWords(cloudId, env) {
  let cloud;
  try {
    cloud = await env.DB.prepare("SELECT id FROM word_clouds WHERE id = ?").bind(cloudId).first();
  } catch {
    return internalError();
  }
  if (!cloud) {
    return notFound("Cloud not found");
  }
  let rows;
  try {
    const result = await env.DB.prepare(
      "SELECT * FROM word_submissions WHERE word_cloud_id = ? ORDER BY created_at ASC"
    ).bind(cloudId).all();
    rows = result.results;
  } catch {
    return internalError();
  }
  return json({ ok: true, data: rows.map(rowToWordResponse) });
}
__name(getWords, "getWords");

// src/index.ts
var src_default = {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const method = request.method;
    if (pathname === "/" && method === "GET") {
      return json({ name: "ordboble-worker", status: "ok" });
    }
    if (pathname === "/health" && method === "GET") {
      return json({ ok: true, service: "ordboble-worker" });
    }
    if (pathname === "/api/clouds" && method === "POST") {
      return createCloud(request, env);
    }
    const cloudMatch = pathname.match(/^\/api\/clouds\/([^/]+)$/);
    if (cloudMatch) {
      const cloudId = cloudMatch[1];
      if (method === "GET")
        return getCloud(cloudId, env);
      return notFound();
    }
    const wordsMatch = pathname.match(/^\/api\/clouds\/([^/]+)\/words$/);
    if (wordsMatch) {
      const cloudId = wordsMatch[1];
      if (method === "POST")
        return submitWords(cloudId, request, env);
      if (method === "GET")
        return getWords(cloudId, env);
      return notFound();
    }
    return notFound();
  }
};

// node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260607.1/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260607.1/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-vXh31X/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/.pnpm/wrangler@3.114.17_@cloudflare+workers-types@4.20260607.1/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-vXh31X/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
