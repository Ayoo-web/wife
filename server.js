// Small auth server: everything personal (pages, photos, videos, even the text
// content module) is served only with a valid session cookie.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');

const app = express();
app.disable('x-powered-by');

try {
  for (const line of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.+)\s*$/);
    if (m) process.env[m[1]] ??= m[2];
  }
} catch { /* .env is optional in production — set SCRAPBOOK_PASSWORD in the host's dashboard instead */ }
const { SCRAPBOOK_PASSWORD, PORT = 3210 } = process.env;
if (!SCRAPBOOK_PASSWORD) { console.error('Set SCRAPBOOK_PASSWORD in .env'); process.exit(1); }

const sessions = new Set(); // in-memory: a server restart logs everyone out
const COOKIE = 'sb_session';

app.use((req, res, next) => { // keep search engines out + sane defaults
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});
app.use(express.json());

function authed(req) {
  const cookies = req.headers.cookie || '';
  const token = cookies.match(new RegExp(COOKIE + '=([a-f0-9]+)'));
  return !!token && sessions.has(token[1]);
}

// simple in-memory login limiter: 5 wrong tries per IP → 5 minute cooldown
const failures = new Map();
app.post('/api/login', (req, res) => {
  const ip = req.socket.remoteAddress || 'unknown';
  const f = failures.get(ip);
  if (f && f.until > Date.now()) {
    return res.status(429).json({ ok: false, error: 'Too many wrong tries. Take a breath and come back in a few minutes.' });
  }
  const given = String(req.body?.password || '');
  const ok = Buffer.byteLength(given) === Buffer.byteLength(SCRAPBOOK_PASSWORD) &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(SCRAPBOOK_PASSWORD));
  if (!ok) {
    const count = (f && f.count + 1) || 1;
    failures.set(ip, { count, until: count >= 5 ? Date.now() + 5 * 60 * 1000 : 0 });
    return res.status(401).json({ ok: false, error: 'Wrong password. Try again, love.' });
  }
  failures.delete(ip);
  const token = crypto.randomBytes(32).toString('hex');
  sessions.add(token);
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000; Secure`);
  res.json({ ok: true });
});

app.get('/api/state', (req, res) => res.json({ authed: authed(req) }));

app.get('/logout', (req, res) => {
  const token = (req.headers.cookie || '').match(new RegExp(COOKIE + '=([a-f0-9]+)'));
  if (token) sessions.delete(token[1]);
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0; Secure`);
  res.redirect('/login');
});

// the login page itself is the only non-API thing reachable without a session
app.use('/login', express.static(path.join(__dirname, 'public/login')));

// Everything below this line is protected.
app.use((req, res, next) => {
  if (authed(req)) return next();
  const wantsHtml = (req.headers.accept || '').includes('text/html');
  if (wantsHtml) return res.redirect('/login');
  res.status(401).send('Unauthorized');
});

app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => res.status(404).send('Not found'));

// Only inside the project folder; blocks trivial traversal shortcuts.
const root = path.resolve(__dirname, 'public');
app.use((err, req, res, next) => {
  if (err) return res.status(400).send('Bad request');
  next();
});

app.listen(PORT, () => console.log(`Scrapbook running: http://localhost:${PORT}`));
