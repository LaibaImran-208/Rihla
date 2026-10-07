const ALLOWED_ACTIVITY_TYPES = new Set([
  'JOURNEY_STARTED',
  'JOURNEY_STARTED',
  'PASSPORT_OPENED',
  'PROFILE_SAVED',
  'EMIRATES_OPENED',
  'STAMP_EARNED',
  'CHALLENGE_COMPLETED',
  'PUZZLE_COMPLETED',
  'CERTIFICATE_OPENED',
  'CERTIFICATE_PRINTED',
  'JOURNEY_COMPLETED',
]);
const ALLOWED_STAMPS = new Set(['abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah']);
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
});
const validId = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
const validToken = value => typeof value === 'string' && /^[0-9a-f]{64}$/i.test(value);
const cleanText = (value, max) => typeof value === 'string' ? value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max) : '';
const dateNow = () => new Date().toISOString();

async function tokenHash(token) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
}

async function readJson(request) {
  const body = await request.text();
  if (body.length > 8192) throw new Error('Request body too large.');
  return JSON.parse(body);
}

async function authenticate(request, env) {
  const id = request.headers.get('X-Explorer-Id');
  const token = request.headers.get('X-Explorer-Token');
  if (!validId(id) || !validToken(token)) return null;
  const hash = await tokenHash(token);
  const explorer = await env.DB.prepare('SELECT id FROM explorers WHERE id = ? AND token_hash = ?').bind(id, hash).first();
  return explorer ? { id, hash } : { id, hash, isNew: true };
}

async function ensureExplorer(env, owner, type) {
  if (owner.isNew) {
    await env.DB.prepare(`INSERT OR IGNORE INTO explorers (id, token_hash, created_at, updated_at, last_activity, last_activity_at)
      VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(owner.id, owner.hash, dateNow(), dateNow(), type, dateNow()).run();
    const match = await env.DB.prepare('SELECT id FROM explorers WHERE id = ? AND token_hash = ?').bind(owner.id, owner.hash).first();
    if (!match) return false;
  }
  return true;
}

async function updateSnapshot(env, owner, body) {
  const stamps = Array.isArray(body.stamps) ? [...new Set(body.stamps.filter(stamp => ALLOWED_STAMPS.has(stamp)))] : [];
  const points = Number.isSafeInteger(body.points) && body.points >= 0 ? body.points : 0;
  const completed = stamps.length === ALLOWED_STAMPS.size;
  const completedAt = completed && typeof body.journeyCompletedAt === 'string' && !Number.isNaN(Date.parse(body.journeyCompletedAt))
    ? new Date(body.journeyCompletedAt).toISOString()
    : completed ? dateNow() : null;
  await env.DB.prepare(`UPDATE explorers SET passport_points = ?, stamp_ids = ?, journey_completed = MAX(journey_completed, ?),
      journey_completed_at = COALESCE(journey_completed_at, ?), updated_at = ?
    WHERE id = ? AND token_hash = ?`)
    .bind(points, JSON.stringify(stamps), completed ? 1 : 0, completedAt, dateNow(), owner.id, owner.hash).run();
}

async function logActivity(env, owner, type, metadata = {}) {
  const at = dateNow();
  const safeMetadata = JSON.stringify(metadata).slice(0, 2048);
  await env.DB.prepare(`INSERT INTO activities (id, explorer_id, type, metadata, created_at) VALUES (?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), owner.id, type, safeMetadata, at).run();
    await env.DB.prepare(`UPDATE explorers SET
      last_activity = CASE WHEN last_activity_at IS NULL OR last_activity_at <= ? THEN ? ELSE last_activity END,
      last_activity_at = MAX(COALESCE(last_activity_at, ''), ?),
      certificate_opened_at = CASE WHEN ? = 'CERTIFICATE_OPENED' THEN COALESCE(certificate_opened_at, ?) ELSE certificate_opened_at END,
      certificate_print_initiated_at = CASE WHEN ? = 'CERTIFICATE_PRINTED' THEN COALESCE(certificate_print_initiated_at, ?) ELSE certificate_print_initiated_at END,
      journey_completed = CASE WHEN ? = 'JOURNEY_COMPLETED' THEN 1 ELSE journey_completed END,
      journey_completed_at = CASE WHEN ? = 'JOURNEY_COMPLETED' THEN COALESCE(journey_completed_at, ?) ELSE journey_completed_at END,
      updated_at = ? WHERE id = ? AND token_hash = ?`)
    .bind(at, type, at, type, at, type, at, type, type, at, at, owner.id, owner.hash).run();
}

async function routeApi(request, env) {
  if (!env.DB) return json({ error: 'Activity storage is not configured.' }, 503);
  const url = new URL(request.url);
  const path = url.pathname;
  if (!path.startsWith('/api/explorer/')) return json({ error: 'Not found.' }, 404);
  if (request.headers.get('Origin') && request.headers.get('Origin') !== url.origin) return json({ error: 'Origin not allowed.' }, 403);

  const owner = await authenticate(request, env);
  if (!owner) return json({ error: 'Explorer credentials are required.' }, 401);

  if (request.method === 'GET' && (path === '/api/explorer/me' || path === '/api/explorer/activities')) {
    const found = await env.DB.prepare('SELECT * FROM explorers WHERE id = ? AND token_hash = ?').bind(owner.id, owner.hash).first();
    if (!found) return json({ error: 'Explorer record not found.' }, 404);
    if (path.endsWith('/activities')) {
      const rows = await env.DB.prepare('SELECT type, metadata, created_at FROM activities WHERE explorer_id = ? ORDER BY created_at DESC LIMIT 100').bind(owner.id).all();
      return json({ activities: rows.results || [] });
    }
    const { token_hash: _privateHash, ...safeRecord } = found;
    return json(safeRecord);
  }

  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const body = await readJson(request);
  const type = body.type;

  if (path === '/api/explorer/profile') {
    const name = cleanText(body.profile?.name, 80);
    const grade = cleanText(body.profile?.grade, 30);
    const age = Number(body.profile?.age);
    if (!name || !Number.isInteger(age)) return json({ error: 'Valid name and age are required.' }, 400);
    if (!await ensureExplorer(env, owner, 'PROFILE_SAVED')) return json({ error: 'Explorer credentials are invalid.' }, 403);
    await env.DB.prepare(`UPDATE explorers SET name = ?, age = ?, grade = ?, updated_at = ? WHERE id = ? AND token_hash = ?`)
      .bind(name, age, grade || null, dateNow(), owner.id, owner.hash).run();
    await updateSnapshot(env, owner, body);
    await logActivity(env, owner, 'PROFILE_SAVED', {});
    return json({ saved: true });
  }

  if (path !== '/api/explorer/activity') return json({ error: 'Not found.' }, 404);
  if (!ALLOWED_ACTIVITY_TYPES.has(type)) return json({ error: 'Unsupported activity type.' }, 400);
  if (type === 'JOURNEY_COMPLETED' && (!Array.isArray(body.stamps) || ALLOWED_STAMPS.size !== new Set(body.stamps.filter(stamp => ALLOWED_STAMPS.has(stamp))).size)) {
    return json({ error: 'All seven emirate stamps are required to complete the journey.' }, 400);
  }
  if (type === 'STAMP_EARNED' && (!ALLOWED_STAMPS.has(body.metadata?.stampId) || !body.stamps?.includes(body.metadata.stampId))) {
    return json({ error: 'A valid earned stamp is required.' }, 400);
  }
  if (type === 'PUZZLE_COMPLETED' && !new Set(['uae', 'abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah']).has(body.metadata?.puzzleId)) {
    return json({ error: 'A valid completed puzzle ID is required.' }, 400);
  }
  if (type === 'CHALLENGE_COMPLETED' && !['quiz', 'crossword', 'word-game'].includes(body.metadata?.kind)) {
    return json({ error: 'A valid completed challenge kind is required.' }, 400);
  }
  if (!await ensureExplorer(env, owner, type)) return json({ error: 'Explorer credentials are invalid.' }, 403);
  await updateSnapshot(env, owner, body);
  const rawMetadata = body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata) ? body.metadata : {};
  const metadata = type === 'STAMP_EARNED'
    ? { stampId: rawMetadata.stampId }
    : type === 'PUZZLE_COMPLETED'
      ? { puzzleId: rawMetadata.puzzleId }
      : type === 'CHALLENGE_COMPLETED'
        ? {
          challengeId: cleanText(rawMetadata.challengeId, 64),
          kind: rawMetadata.kind,
          ...(Number.isInteger(rawMetadata.score) && rawMetadata.score >= 0 ? { score: rawMetadata.score } : {}),
          ...(Number.isInteger(rawMetadata.total) && rawMetadata.total > 0 ? { total: rawMetadata.total } : {}),
        }
        : {};
  await logActivity(env, owner, type, metadata);
  return json({ recorded: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      try {
        return await routeApi(request, env);
      } catch (error) {
        if (error instanceof SyntaxError) return json({ error: 'Invalid JSON.' }, 400);
        return json({ error: 'The activity service is temporarily unavailable.' }, 503);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
