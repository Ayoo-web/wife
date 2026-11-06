# THE ONE GAME I NEVER WON — made for Nikki

Full project requirements live in [BRIEF.md](BRIEF.md). Read that first.

## Dropping in your photos & videos (no code needed)

Put files in the matching folder — filenames can stay whatever they are on your phone or Messenger, they get wired into the site later:

- `public/images/early-conversations/` — Messenger screenshots from the summer before college
- `public/images/graduation/` — Grade 12 graduation photo of us
- `public/images/mcdonalds/` — anything from the Palakasan McDonald's night (if you have any)
- `public/images/bangko-bangko/` — Bangko Bangko, Iligan City photos
- `public/images/esplanade-coastal-road/` — Esplanade / Coastal Road photos
- `public/images/july-jogging/` — July jogging photos/videos
- `public/images/little-moments/` — everything else, including the sleeping photo
- `public/videos/` — any video clips
- `public/audio/` — background music file (optional)

## Running it

```
npm install
node server.js
```

Open http://localhost:3210 — login password is in `.env` (`SCRAPBOOK_PASSWORD`). **Change it before sending the link to anyone.** Everything on the site — pages, photos, videos, screenshots, even the letter text in `src/data/content.js` — is served only after login.

- Add a photo → drop it in a `public/images/<place>/` folder, then add an entry with `src: '/images/<place>/filename.jpg'` (plus your own caption) to the matching `photos:`/`screenshots:` list in `src/data/content.js`.
- Add music → drop a file in `public/audio/` and set `music.src` in `src/data/content.js`. Until then the music button stays hidden.
- All written copy (messages, captions, the final letter) lives only in `src/data/content.js`.

## Hosting + privacy

The password gate needs a real server, so static hosts (Vercel/Netlify/GitHub Pages) **cannot** be used — they'd serve the photos publicly. Use **Render.com**:

1. Put this folder into a **private** GitHub repository (`.env` and `node_modules/` are already git-ignored — verify `.env` is NOT in the repo, it holds the password).
2. On render.com → sign in with GitHub → **New + → Web Service** → pick the repo.
3. Settings:
   - Build command: *(leave empty — no build step)*
   - Start command: `npm start`
   - Environment variable: name `SCRAPBOOK_PASSWORD`, value = the password you want for Nikki
4. Deploy. You get a URL like `https://nikki-scrapbook.onrender.com` — the plan you're on has free HTTPS.

**Notes / limitations of Render's free tier:**
- The server sleeps after ~15 min without visitors; the next open takes ~30–60 seconds to wake. Open the link once yourself before sending it to her.
- Free-tier data isn't guaranteed persistent — fine here, nothing is stored (sessions are in-memory; a restart just means logging in again).
- Alternatives if you outgrow it: Railway ($5/mo, no sleep), Fly.io, or any small VPS running `node server.js`.

`noindex` headers are already set on every response, but they are not security — the login is. Never commit `.env`; on Render the password lives in the dashboard only.

## Status

- [x] Project folder + structure created
- [x] Phase 1: Discovery — partially; still needs from you: real photos/videos, your chosen password, hosting decision, optional music file
- [x] Phase 2: Creative direction — follows BRIEF.md (approved by "make the website")
- [x] Phase 3: Build — all 7 chapters + the 3 signature interactions implemented; temporary "drop your photo here" placeholders where real media is missing
- [x] Phase 4: Test — browser-tested phone + desktop, plus an independent 4-reviewer code audit; all 18 confirmed findings fixed and re-verified
- [ ] Phase 5: Deploy — waiting on hosting decision + final password

## What I still need from you

1. Real photos/videos/screenshots into the `public/images/...` folders (then add entries in `src/data/content.js`).
2. The password you want to give Nikki (edit `.env`, currently a placeholder: `ali-ali-tapad-ta`).
3. Hosting — easiest path: private GitHub repo + Render.com, full steps in "Hosting + privacy" below (Vercel/Netlify won't work here).
4. Optional: a background-music file in `public/audio/`.
