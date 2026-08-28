# Kantipur Carpets — deployment

Next.js 16 site for **Kantipur Carpet Craft Industries** (hand-knotted Nepalese carpets).

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- [next-intl](https://next-intl.dev) — English, Arabic, French, German
- Resend — contact form (`/api/inquire`)

## Local development

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en).

Product data lives in `web/data/catalog.json` (also mirrored at repo `data/` for local monorepo workflows).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL, e.g. `https://kantipurcarpets.com` |
| `RESEND_API_KEY` | For contact form | Resend API key |
| `INQUIRE_TO_EMAIL` | Optional | Inbox for enquiries |
| `INQUIRE_CC_EMAIL` | Optional | CC address |
| `INQUIRE_FROM_EMAIL` | Optional | From header for Resend |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Defaults to `9779851020298` |

## Deploy on Vercel

1. Import [github.com/Elderazura/kantipur](https://github.com/Elderazura/kantipur).
2. **Root Directory:** set to `web` (required — the Next.js app is not at repo root).
3. **Framework preset:** Next.js (auto-detected once root is `web`).
4. **Do not** set a custom Output Directory — leave it blank. Vercel runs the Next.js server from the build output automatically.
5. Add environment variables (see table above).
6. Deploy.

If you see `404: NOT_FOUND` on Vercel, the usual causes are:
- Root Directory is not `web`
- A custom **Output Directory** was set to `.next` (remove it)
- `NEXT_PUBLIC_SITE_URL` missing (won’t cause 404, but breaks canonical URLs)

After deploy, open `/en` (all routes are locale-prefixed).

## SEO & discoverability

- `/sitemap.xml` — all locales, collection, and product URLs
- `/robots.txt`
- JSON-LD: Organization, WebSite, FAQPage (home), Product (piece pages)
- `/llms.txt` — summary for AI assistants and crawlers

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
npm run test     # Vitest
```

## Structure

```
web/
  src/app/[locale]/   # localized routes
  src/components/     # UI
  messages/           # i18n copy
  public/assets/      # images & video
  data/               # product catalogue JSON
```
