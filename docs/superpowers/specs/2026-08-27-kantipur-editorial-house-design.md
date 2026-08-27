# Kantipur Carpets — Editorial House Portfolio Site

**Date:** 2026-08-27  
**Status:** Approved — implementation plan ready  
**Source corpus:** Local scrape of kantipurcarpets.com (WordPress + WooCommerce), captured 2026-08-27  

## 1. Goal

Replace the ecommerce-shaped live site with a **classy, multilingual heritage portfolio**: atmosphere and craft first, collection as art objects, inquiry (not checkout) as the conversion path. Markets: West Asia, Europe, US.

## 2. Audience & positioning

| Priority | Audience | Site behaviour |
|----------|----------|----------------|
| Primary | Homeowners / end buyers | Lifestyle-elegant, emotional craft story, easy inquire |
| Secondary | Interior designers / architects | Specs, materials, custom sizes, soft trade path |

**Not in scope:** Cart, checkout, wishlist, my-account, track-order, public pricing.

## 3. Approach

**Editorial House** (selected): film/atmosphere hero → heritage chapters → materials → curated collection → soft custom → contact (WhatsApp + form). Magazine / craft-house feel, not a shop grid first.

Alternatives considered and rejected: Gallery Atelier (too quiet on people/skill); Lifestyle Lookbook (too generic rug-brand).

## 4. Information architecture

### Primary nav

Home · Heritage · Collection · About · Contact  

Plus: language switcher (EN / AR / FR / DE).  

**Custom** = short page linked from Home section + footer (not a top-nav primary).

### Homepage scroll

1. **Atmosphere hero** — full-bleed film or still; brand name dominant; one craft line; CTAs: *Explore the collection* · *WhatsApp*
2. **Heritage chapter** — Nepal, looms, weavers, double-knot / natural materials
3. **Materials** — entries into Collection filters (Wool Silk, Hemp Wool, etc.)
4. **Featured pieces** — curated subset (not all 69 on home)
5. **Custom (soft)** — short invite → Custom page
6. **Contact strip** — form + WhatsApp

### Pages

| Page | Purpose |
|------|---------|
| Home | Atmosphere + heritage lead + featured + soft custom + contact strip |
| Heritage | Deeper craft / community / technique story |
| Collection | Filterable gallery (material, colour; optional quality) |
| Piece detail | Large gallery, specs, inquire (form + WhatsApp with carpet ref) |
| Custom | Made-to-order (sizes up to ~25×40 ft, colour/design) |
| About | K.C.C.I, sister C.C.M.I, scale (looms/weavers), contact pointers |
| Contact | Full form + WhatsApp + emails/phone/map as available |

### Dropped from old site

Shop cart UI, wishlist, my-account, track-order, NPR prices, Add to cart / Add to wishlist chrome.

## 5. Visual direction

**Mood:** Parchment & Madder — but **not** the default AI “luxury craft” look. Treat it as a printed trade catalogue / dye-house ledger: inked, slightly austere, photography-led — not spa-soft cream + friendly terracotta.

### Locked palette (specific — do not “soften” toward beige/peach)

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#EDE6D9` | Page ground (cool-ish parchment, not #F4F1EA cream) |
| `--ink` | `#1A1410` | Primary text / brand |
| `--ink-muted` | `#5C534A` | Secondary text |
| `--madder` | `#6B1E23` | Accent / CTA / rules (deep dye red — not terracotta `#C4A484` / `#B66A4A`) |
| `--madder-deep` | `#3F1014` | Hover / emphasis |
| `--rule` | `#C4B8A5` | Hairlines / dividers |
| `--surface` | `#F7F1E6` | Slightly lifted panels sparingly |

Atmosphere sections may invert to `--ink` ground with `--paper` type for heritage chapters — contrast through materials, not gradients.

### Typography (avoid AI-default pairings)

- **Display:** `Fraunces` (optical size / soft sharpness — character without Playfair/Cormorant cliché)
- **Body:** `Source Serif 4` (readable editorial; **not** Inter / Montserrat / system UI sans for body)
- **UI chrome only (nav labels, filters, buttons):** `DM Sans` at small sizes — never for headlines
- Tight display tracking slightly open; body ~1.6 line-height; generous margins like a book, not a SaaS dashboard

### Hard bans (generic AI / template tells)

- No purple, indigo, neon, glow, glassmorphism, mesh gradients, or “AI aurora” backgrounds
- No warm-cream + terracotta + big serif hero stack (the #1 AI craft-site cliché)
- No Inter / Roboto / Arial / system-ui as brand type
- No rounded-full pill clusters, badge chips, floating stickers on imagery
- No multi-layer drop shadows; no card grids in the hero; cards only if interaction truly needs a container
- No emoji icons; no icon-row feature strips with 4 identical circled icons
- No centered “startup” hero with gradient blob + 3 feature cards below the fold
- No stock Unsplash lifestyle rooms as the primary visual — use **real Kantipur carpet / site assets** from the scrape
- Hero = full-bleed photography or film only; brand name is the loudest text; one short line; dual CTA — nothing else in the first viewport

### System principles

- Photography and carpet texture lead; UI stays quiet and inked
- Section rhythm: one job, one headline, one short supporting sentence
- Motion: 2–3 intentional moments only (hero fade/ken burns subtle, chapter reveal, filter crossfade); respect `prefers-reduced-motion`
- Asymmetry OK (editorial crop, oversized type colliding with image edge) — avoid perfectly balanced “template” layouts

**Accessibility:** WCAG AA contrast on parchment (ink on paper ≥4.5:1; madder on paper checked for large text / buttons); visible focus rings in madder or ink; RTL for Arabic; ≥44px touch targets; alt text from media metadata where available.

## 6. Languages (i18n)

Launch locales: **English, Arabic (RTL), French, German**.

- Locale-prefixed routes: `/en/...`, `/ar/...`, `/fr/...`, `/de/...`
- Translate chrome + Heritage / About / Custom / Contact copy for launch
- Product titles/specs may ship English-first with progressive translation
- Use `next-intl` (or equivalent) with message catalogs; Arabic flips layout direction

## 7. Pricing & conversion

- **No prices** anywhere — “Inquire for availability & pricing”
- **Primary actions:** WhatsApp (prominent) + contact form
- From a piece page: form prefilled with carpet reference; WhatsApp link includes same reference text
- WhatsApp destination: client business number (config env var; confirm number before launch — scrape lists `+977 9851020298`)
- Form delivery: Resend (preferred) or Formspree-class — no commerce backend; recipient emails from scrape (`aglalit@gmail.com`, `kantipurtep@gmail.com`) unless client specifies otherwise

## 8. Technical architecture

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + TypeScript + Tailwind CSS |
| i18n | `next-intl` with RTL for `ar` |
| Content | Structured content (MDX/JSON) for pages; **catalog from scrape** |
| Products | Derived from `data/catalog.json` + `assets/images/products/` |
| Hosting | Vercel (or similar static/SSR-friendly host) |
| Analytics | Optional later; not required for v1 |

### Product model (no price)

- `id`, `slug`, `name`, `design_no`, `material`, `quality`, `colour`, `size` / `sizes[]`, `images[]`, `categories[]`, `tags[]`
- Filters: material, colour; optional quality
- Data quirks to clean at import time: slug mismatches (e.g. product 1591), placeholder images (`LALIT-AGRAWAL-PHOTO.jpg`), empty/boilerplate descriptions

### Media

- Prefer full-size local assets already under `assets/images/`
- Optimize to WebP/AVIF at build or via Next Image
- Homepage atmosphere: existing YouTube hero clip (`FVjEVCdoMyY`) or client-supplied master; hide or simplify on mobile if needed

## 9. Components (high level)

- `SiteHeader` — nav, locale switcher, WhatsApp affordance
- `AtmosphereHero` — full-bleed video/image, brand, one line, dual CTA
- `HeritageChapter` / story blocks
- `MaterialStrip` — links into Collection filters
- `FeaturedGrid` — curated pieces (not shop cards with price)
- `CollectionFilters` + `PieceCard` + `PieceGallery`
- `InquireForm` — name, email, message, optional carpet ref
- `WhatsAppCta` — deep link with optional prefilled text
- `CustomInvite` — short home section + Custom page body
- `SiteFooter` — nav, languages, social, soft Custom link

## 10. Data flow

```
scrape data/catalog.json + assets/
        ↓
build-time normalize (clean quirks, image paths)
        ↓
typed Product[] + category index
        ↓
Collection / Piece pages (SSG)
        ↓
Inquire → email API  |  WhatsApp → wa.me deep link
```

No product database or CMS required for v1 if content stays in repo; CMS optional later for copy edits.

## 11. Error handling & edge cases

- Missing product image → branded placeholder (never broken layout)
- Unknown locale → redirect to default (`en`)
- Form failure → inline error + retry; never silent fail
- Empty filter result → clear empty state + reset filters
- RTL: mirrored nav/spacing; test Arabic on Collection + Piece

## 12. Testing (v1 bar)

- Locale routing + RTL smoke (AR)
- Collection filter combinations
- Piece inquire prefills reference correctly
- Form validation + success/error UI
- Lighthouse/a11y spot-check on Home + Piece
- Visual check 375 / 768 / 1440

## 13. Out of scope (explicit)

- Ecommerce, payments, accounts, wishlists
- Public price lists or currency conversion
- Full product copy translation for all 69 pieces at launch (progressive OK)
- Admin CMS (unless added later)
- Rebuilding the scrape toolchain as part of the site app

## 14. Success criteria

- First viewport reads as Kantipur heritage (brand + atmosphere), not a generic rug shop
- Visitor can discover craft story and inquire about a piece in under two minutes
- Site works in EN/AR/FR/DE with correct RTL for Arabic
- Collection browse feels like a portfolio, not WooCommerce leftovers

## 15. Decisions log

| Decision | Choice |
|----------|--------|
| Audience | Homeowners first, designers secondary |
| Languages | EN + AR + FR + DE |
| Pricing | None — inquire only |
| CTA | WhatsApp + contact form |
| Homepage | Atmosphere/film + heritage/craft first |
| Custom | Mid-weight: home section + short page |
| Site approach | Editorial House |
| Visual mood | Parchment & Madder (anti-AI: Fraunces + Source Serif 4, deep madder `#6B1E23`, real assets only) |
| Stack | Next.js + Tailwind + next-intl |
| Source of truth | Local scrape (`catalog.json` + assets) |
