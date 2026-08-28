# Deploying to Vercel

The Next.js site lives in **`web/`**. The repo root is a scrape archive + data — not the app.

## Vercel project settings

| Setting | Value |
|---------|--------|
| **Root Directory** | `web` |
| **Framework** | Next.js (auto) |
| **Output Directory** | *(leave empty — do not use `.next`)* |
| **Build Command** | `npm run build` (default) |
| **Install Command** | `npm install` (default) |

## Environment variables

Set in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
RESEND_API_KEY=re_...
INQUIRE_TO_EMAIL=aglalit@gmail.com
INQUIRE_CC_EMAIL=kantipurtep@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=9779851020298
```

## URLs

All pages use locale prefixes:

- English: `/en`
- Arabic: `/ar`
- French: `/fr`
- German: `/de`

The middleware redirects `/` → `/en`.

## Fix 404 NOT_FOUND

1. Confirm **Root Directory = `web`**
2. Remove any custom **Output Directory** in Vercel settings
3. Redeploy

See `web/README.md` for full development docs.
