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

1. Import the GitHub repository [Elderazura/kantipur](https://github.com/Elderazura/kantipur).
2. Set **Root Directory** to `web`.
3. Add environment variables above.
4. Deploy.

Framework preset: **Next.js** (auto-detected).

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
