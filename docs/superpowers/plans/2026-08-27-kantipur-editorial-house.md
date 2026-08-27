# Kantipur Editorial House Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a classy, multilingual (EN/AR/FR/DE) heritage portfolio for Kantipur Carpets — atmosphere + craft first, inquire-only, no ecommerce — using the local scrape as the product source.

**Architecture:** Next.js App Router app in `web/`, locale-prefixed routes via `next-intl`, products loaded at build time from `../data/catalog.json` with images from `../assets/images/`. Static page copy in message catalogs + small content JSON. Inquire via API route (Resend) + WhatsApp deep links. Visual system is **anti-generic-AI**: parchment/madder ledger aesthetic, Fraunces + Source Serif 4, real carpet photography only.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS 4 · next-intl · next/image · Resend · Vitest (unit) · Playwright (smoke, later)

**Spec:** `docs/superpowers/specs/2026-08-27-kantipur-editorial-house-design.md`

**Anti-AI design gate (every UI task):** Reject Inter/Roboto/system body fonts, purple/glow/glass, cream+terracotta spa look, pill badge clusters, hero card grids, Unsplash fillers, icon-row feature strips. Use locked tokens from the spec (§5).

---

## File map (create under `web/` unless noted)

```
web/
  package.json
  next.config.ts
  tailwind.config.ts          # or @theme in CSS — tokens live here
  postcss.config.mjs
  tsconfig.json
  .env.example
  vitest.config.ts
  messages/
    en.json
    ar.json
    fr.json
    de.json
  content/
    featured.json             # curated home piece slugs
    materials.json            # material strip entries → filter query
  public/
    images/                   # symlink or copy strategy documented in Task 2
  src/
    i18n/
      routing.ts
      request.ts
    middleware.ts
    lib/
      catalog.ts              # load + normalize products
      catalog.test.ts
      whatsapp.ts
      whatsapp.test.ts
    types/
      product.ts
    app/
      globals.css
      [locale]/
        layout.tsx
        page.tsx                # home
        heritage/page.tsx
        collection/page.tsx
        collection/[slug]/page.tsx
        custom/page.tsx
        about/page.tsx
        contact/page.tsx
      api/
        inquire/route.ts
    components/
      SiteHeader.tsx
      SiteFooter.tsx
      LocaleSwitcher.tsx
      AtmosphereHero.tsx
      HeritageChapter.tsx
      MaterialStrip.tsx
      FeaturedGrid.tsx
      PieceCard.tsx
      CollectionFilters.tsx
      PieceGallery.tsx
      CustomInvite.tsx
      InquireForm.tsx
      WhatsAppCta.tsx
      ContactStrip.tsx
```

Repo root stays the scrape (`data/`, `assets/`, `tools/`). App never imports WooCommerce UI.

---

### Task 1: Scaffold Next.js app + git

**Files:**
- Create: `web/` (Next.js app)
- Create: `.gitignore` (root) including `node_modules`, `.next`, `.env*`, `.superpowers/`
- Create: `web/.env.example`

- [ ] **Step 1: Initialize git at repo root (if missing)**

```bash
cd /Users/azura/kanitpur_carpets
git init
printf '%s\n' 'node_modules/' '.next/' '.env' '.env.local' '.superpowers/' 'web/.next/' 'web/node_modules/' '*.log' > .gitignore
git add .gitignore docs/
git commit -m "chore: init repo and keep design docs"
```

- [ ] **Step 2: Create Next.js app in `web/`**

```bash
cd /Users/azura/kanitpur_carpets
npx create-next-app@latest web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes
```

Expected: `web/package.json` exists; `npm run dev` starts (stop after verify).

- [ ] **Step 3: Add env example**

Create `web/.env.example`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=9779851020298
INQUIRE_TO_EMAIL=aglalit@gmail.com
INQUIRE_CC_EMAIL=kantipurtep@gmail.com
RESEND_API_KEY=
```

- [ ] **Step 4: Commit**

```bash
git add web .gitignore
git commit -m "chore: scaffold Next.js app in web/"
```

---

### Task 2: Design tokens + anti-AI global CSS

**Files:**
- Create/Modify: `web/src/app/globals.css`
- Modify: `web/src/app/layout.tsx` (fonts) — will move under `[locale]` in Task 3; for now set font variables
- Test: visual smoke (manual)

- [ ] **Step 1: Install fonts via `next/font/google`**

In the root layout (later moved), load:

```tsx
import { Fraunces, Source_Serif_4, DM_Sans } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
});
```

- [ ] **Step 2: Write locked tokens in `globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-paper: #ede6d9;
  --color-ink: #1a1410;
  --color-ink-muted: #5c534a;
  --color-madder: #6b1e23;
  --color-madder-deep: #3f1014;
  --color-rule: #c4b8a5;
  --color-surface: #f7f1e6;

  --font-display: var(--font-display), ui-serif, Georgia, serif;
  --font-body: var(--font-body), ui-serif, Georgia, serif;
  --font-ui: var(--font-ui), system-ui, sans-serif;
}

html {
  background: var(--color-paper);
  color: var(--color-ink);
}

body {
  font-family: var(--font-body);
  line-height: 1.65;
  background: var(--color-paper);
  color: var(--color-ink);
}

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.15;
}

/* Ban default “AI blue focus”; use ink/madder */
:focus-visible {
  outline: 2px solid var(--color-madder);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Sanity check — page must NOT look like a SaaS template**

Run `npm run dev` in `web/`. Temporary home text: brand wordmark + one line on paper ground.  
Reject if: purple accents, rounded pill nav, centered gradient blob, Inter-looking UI.

- [ ] **Step 4: Commit**

```bash
git add web/src/app/globals.css web/src/app/layout.tsx
git commit -m "style: lock parchment-madder tokens and editorial fonts"
```

---

### Task 3: next-intl routing (EN/AR/FR/DE + RTL)

**Files:**
- Create: `web/src/i18n/routing.ts`, `web/src/i18n/request.ts`
- Create: `web/src/middleware.ts`
- Create: `web/messages/{en,ar,fr,de}.json`
- Modify: move pages under `web/src/app/[locale]/`

- [ ] **Step 1: Install next-intl**

```bash
cd web && npm install next-intl
```

- [ ] **Step 2: Routing config**

`web/src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar", "fr", "de"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
```

`web/src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Middleware**

`web/src/middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ar|en|fr|de)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 4: Seed message catalogs**

Minimal `web/messages/en.json` (mirror keys in ar/fr/de — Arabic may start as English placeholders then fill):

```json
{
  "meta": {
    "siteName": "Kantipur Carpets",
    "tagline": "Nepali handmade carpets"
  },
  "nav": {
    "home": "Home",
    "heritage": "Heritage",
    "collection": "Collection",
    "about": "About",
    "contact": "Contact",
    "custom": "Custom orders"
  },
  "cta": {
    "exploreCollection": "Explore the collection",
    "whatsapp": "WhatsApp",
    "inquire": "Inquire",
    "inquirePricing": "Inquire for availability & pricing"
  },
  "home": {
    "heroLine": "Hand-knotted in Nepal. Natural fibres. Living craft.",
    "heritageTitle": "Keeping the tradition alive",
    "heritageBody": "Our carpets are woven by Nepalese communities using double-knotted technique and high pile density — made to keep local traditions alive.",
    "materialsTitle": "Materials",
    "featuredTitle": "Selected pieces",
    "customTitle": "Made to your measure",
    "customBody": "Custom colours and designs in sizes up to 25 × 40 feet.",
    "contactTitle": "Begin a conversation"
  },
  "form": {
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "carpetRef": "Carpet reference",
    "send": "Send inquiry",
    "sending": "Sending…",
    "success": "Thank you — we will reply shortly.",
    "error": "Something went wrong. Please try again or WhatsApp us."
  }
}
```

Copy structure to `ar.json`, `fr.json`, `de.json` with proper translations for FR/DE; AR can match EN until translated (layout still RTL).

- [ ] **Step 5: Locale layout with `dir`**

`web/src/app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { fraunces, sourceSerif, dmSans } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${fraunces.variable} ${sourceSerif.variable} ${dmSans.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Extract fonts to `web/src/lib/fonts.ts` from Task 2.

Wire `next.config.ts` with `createNextIntlPlugin`.

- [ ] **Step 6: Verify locales**

Visit `/en`, `/ar` (check `dir="rtl"` in DOM), `/fr`, `/de`. Unknown `/xx` redirects to default.

- [ ] **Step 7: Commit**

```bash
git add web/src/i18n web/src/middleware.ts web/messages web/src/app web/next.config.ts web/src/lib/fonts.ts
git commit -m "feat: add next-intl locales with Arabic RTL"
```

---

### Task 4: Product catalog loader (normalize scrape)

**Files:**
- Create: `web/src/types/product.ts`
- Create: `web/src/lib/catalog.ts`
- Create: `web/src/lib/catalog.test.ts`
- Create: `web/content/featured.json`, `web/content/materials.json`
- Configure image path alias to repo `assets/`

- [ ] **Step 1: Install Vitest**

```bash
cd web && npm install -D vitest
```

`web/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: { environment: "node" },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

- [ ] **Step 2: Write failing tests**

`web/src/types/product.ts`:

```ts
export type ProductSize = { size: string; pcs: number };

export type ProductImage = {
  local: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  designNo: string | null;
  material: string | null;
  quality: string | null;
  colour: string | null;
  sizes: ProductSize[];
  categories: { slug: string; name: string }[];
  images: ProductImage[];
  primaryImage: string | null;
};
```

`web/src/lib/catalog.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { normalizeProduct, isPlaceholderImage, getAllProducts, filterProducts } from "./catalog";

describe("normalizeProduct", () => {
  it("maps catalog fields and drops price", () => {
    const raw = {
      id: 1,
      name: "Test Carpet",
      slug: "test-carpet",
      design_no: "TC 1",
      material: "Wool Silk",
      quality: "80 K.N.",
      colour: "GREY",
      size: null,
      sizes: [{ size: "300 X 400", pcs: 1 }],
      categories: [{ slug: "wool-silk", name: "Wool Silk" }],
      tags: [],
      images: [
        {
          local: "assets/images/products/test/photo.jpg",
          alt: "",
          width: 100,
          height: 100,
          url: "https://example.com/x.jpg",
        },
      ],
      primary_image: "assets/images/products/test/photo.jpg",
      price_npr: 99999,
      on_sale: true,
    };
    const p = normalizeProduct(raw);
    expect(p.slug).toBe("test-carpet");
    expect(p.designNo).toBe("TC 1");
    expect(p).not.toHaveProperty("price_npr");
    expect((p as { price?: unknown }).price).toBeUndefined();
  });

  it("detects placeholder photographer image", () => {
    expect(isPlaceholderImage("assets/images/products/x/LALIT-AGRAWAL-PHOTO.jpg")).toBe(true);
    expect(isPlaceholderImage("assets/images/products/x/real-rug.jpg")).toBe(false);
  });
});

describe("filterProducts", () => {
  it("filters by material case-insensitively", () => {
    const list = getAllProducts().filter((p) => p.material);
    if (list.length === 0) return;
    const material = list[0].material!;
    const filtered = filterProducts({ material });
    expect(filtered.every((p) => (p.material || "").toLowerCase() === material.toLowerCase())).toBe(true);
  });
});
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
cd web && npx vitest run src/lib/catalog.test.ts
```

Expected: FAIL (module not found / exports missing).

- [ ] **Step 4: Implement `catalog.ts`**

```ts
import fs from "fs";
import path from "path";
import type { Product, ProductImage } from "@/types/product";

const PLACEHOLDER_RE = /LALIT-AGRAWAL-PHOTO/i;

export function isPlaceholderImage(localPath: string): boolean {
  return PLACEHOLDER_RE.test(localPath);
}

function catalogPath() {
  return path.resolve(process.cwd(), "../data/catalog.json");
}

export function normalizeProduct(raw: Record<string, unknown>): Product {
  const imagesRaw = (raw.images as Array<Record<string, unknown>>) || [];
  const images: ProductImage[] = imagesRaw
    .map((img) => ({
      local: String(img.local || ""),
      alt: String(img.alt || raw.name || ""),
      width: typeof img.width === "number" ? img.width : undefined,
      height: typeof img.height === "number" ? img.height : undefined,
    }))
    .filter((img) => img.local && !isPlaceholderImage(img.local));

  let primary = raw.primary_image ? String(raw.primary_image) : null;
  if (primary && isPlaceholderImage(primary)) primary = images[0]?.local ?? null;
  if (!primary) primary = images[0]?.local ?? null;

  const material = raw.material == null || raw.material === "" ? null : String(raw.material);
  const categories = (raw.categories as { slug: string; name: string }[]) || [];

  return {
    id: Number(raw.id),
    slug: String(raw.slug),
    name: String(raw.name),
    designNo: raw.design_no ? String(raw.design_no) : null,
    material: material ?? categories[0]?.name ?? null,
    quality: raw.quality ? String(raw.quality) : null,
    colour: raw.colour ? String(raw.colour) : null,
    sizes: (raw.sizes as Product["sizes"]) || [],
    categories,
    images,
    primaryImage: primary,
  };
}

let cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cache) return cache;
  const json = JSON.parse(fs.readFileSync(catalogPath(), "utf8"));
  cache = (json.products as Record<string, unknown>[]).map(normalizeProduct);
  return cache;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function filterProducts(opts: {
  material?: string;
  colour?: string;
  quality?: string;
}): Product[] {
  return getAllProducts().filter((p) => {
    if (opts.material && (p.material || "").toLowerCase() !== opts.material.toLowerCase()) return false;
    if (opts.colour && (p.colour || "").toLowerCase() !== opts.colour.toLowerCase()) return false;
    if (opts.quality && (p.quality || "").toLowerCase() !== opts.quality.toLowerCase()) return false;
    return true;
  });
}

export function toPublicImageSrc(localPath: string): string {
  // localPath like "assets/images/products/.../file.jpg"
  return "/" + localPath.replace(/^assets\//, "assets/");
}
```

- [ ] **Step 5: Wire Next image remote/local**

Copy or symlink assets into `web/public/assets` → `../../assets`:

```bash
cd web/public && ln -s ../../assets assets
```

`next.config.ts` — `images.localPatterns` / allow `/assets/**`.

- [ ] **Step 6: Featured + materials content**

`web/content/featured.json` — 6–8 slugs with strong non-placeholder images (pick manually from catalog after running a one-liner).

`web/content/materials.json`:

```json
[
  { "label": "Wool Silk", "query": "Wool Silk" },
  { "label": "Hemp Wool", "query": "Hemp Wool" },
  { "label": "Bamboo", "query": "100% Bamboo" },
  { "label": "Nettle", "query": "100% Nettle" },
  { "label": "Pashmina", "query": "100% Pashmina" }
]
```

- [ ] **Step 7: Run tests — expect PASS**

```bash
cd web && npx vitest run src/lib/catalog.test.ts
```

- [ ] **Step 8: Commit**

```bash
git add web/src/lib/catalog.ts web/src/lib/catalog.test.ts web/src/types web/content web/public web/vitest.config.ts web/package.json web/package-lock.json web/next.config.ts
git commit -m "feat: normalize scrape catalog into typed products"
```

---

### Task 5: Shell — SiteHeader, SiteFooter, LocaleSwitcher, WhatsAppCta

**Files:**
- Create: components listed above
- Create: `web/src/lib/whatsapp.ts` + test
- Modify: `[locale]/layout.tsx` to include header/footer

- [ ] **Step 1: WhatsApp helper tests**

```ts
// whatsapp.test.ts
import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds wa.me link with encoded text", () => {
    const url = buildWhatsAppUrl("9779851020298", "Hello from TC 7081");
    expect(url).toBe("https://wa.me/9779851020298?text=Hello%20from%20TC%207081");
  });
});
```

```ts
// whatsapp.ts
export function buildWhatsAppUrl(phoneDigits: string, text?: string): string {
  const base = `https://wa.me/${phoneDigits.replace(/\D/g, "")}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
```

- [ ] **Step 2: Implement header/footer without SaaS chrome**

Design constraints for implementer:
- Header: wordmark in Fraunces, text links in DM Sans small caps / tracking — **no** filled pill buttons except one madder text-link or underline WhatsApp
- No shadow bar; bottom hairline `--color-rule` only
- Footer: quiet columns; include Custom link; no icon soup

- [ ] **Step 3: Mount in locale layout; verify `/en` shell**

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add site shell, locale switcher, WhatsApp helper"
```

---

### Task 6: Home — AtmosphereHero + chapters (Editorial House)

**Files:**
- Create: `AtmosphereHero.tsx`, `HeritageChapter.tsx`, `MaterialStrip.tsx`, `FeaturedGrid.tsx`, `CustomInvite.tsx`, `ContactStrip.tsx`
- Modify: `web/src/app/[locale]/page.tsx`

- [ ] **Step 1: AtmosphereHero**

Full-bleed only: prefer site banner image from `assets/images/site/` or YouTube background (`FVjEVCdoMyY`, start 5s) with poster fallback. Brand name largest; one `home.heroLine`; CTAs to collection + WhatsApp. **No badges, no stats, no cards.**

- [ ] **Step 2: Compose home page sections in order from spec**

Hero → Heritage → Materials → Featured → Custom → Contact strip.

- [ ] **Step 3: Manual anti-AI review**

Open `/en`. Fail task if first viewport could belong to another brand after removing the wordmark, or if layout looks like a generic template.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: build editorial homepage sections"
```

---

### Task 7: Heritage, About, Custom pages

**Files:**
- Create: `web/src/app/[locale]/heritage/page.tsx`
- Create: `web/src/app/[locale]/about/page.tsx`
- Create: `web/src/app/[locale]/custom/page.tsx`
- Extend message catalogs with page copy adapted from `site/pages/about.md` + README facts (looms, weavers, K.C.C.I / C.C.M.I)

- [ ] **Step 1: Add message keys for heritage/about/custom bodies (EN + FR + DE; AR placeholder OK)**

- [ ] **Step 2: Implement three pages — editorial typography, sparse imagery from `assets/images/site/`**

- [ ] **Step 3: Smoke navigate from header/footer**

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add heritage, about, and custom pages"
```

---

### Task 8: Collection + filters + PieceCard

**Files:**
- Create: `CollectionFilters.tsx`, `PieceCard.tsx`
- Create: `web/src/app/[locale]/collection/page.tsx`

- [ ] **Step 1: Collection page reads `searchParams` `material`, `colour`**

Server component loads `filterProducts`. Empty state with reset link.

- [ ] **Step 2: PieceCard — image + name + material/colour; NO price; NO “Add to cart”**

Quiet hover: opacity or rule underline — not lift+shadow card.

- [ ] **Step 3: MaterialStrip links to `/[locale]/collection?material=...`**

- [ ] **Step 4: Manual RTL check on `/ar/collection`**

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: collection gallery with material and colour filters"
```

---

### Task 9: Piece detail + inquire prefills

**Files:**
- Create: `PieceGallery.tsx`
- Create: `web/src/app/[locale]/collection/[slug]/page.tsx`
- Reuse: `InquireForm`, `WhatsAppCta`

- [ ] **Step 1: `generateStaticParams` from `getAllProducts()`**

- [ ] **Step 2: Detail layout — large gallery, specs list (design no, material, quality, colour, sizes), inquire CTA**

Copy: use `cta.inquirePricing`. Prefill form carpet ref: `${designNo ?? slug} — ${name}`.

WhatsApp text same reference.

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: piece detail pages with inquire prefills"
```

---

### Task 10: Inquire API + Contact page

**Files:**
- Create: `web/src/app/api/inquire/route.ts`
- Create: `InquireForm.tsx` (client)
- Create: `web/src/app/[locale]/contact/page.tsx`
- Optional: `npm install resend zod`

- [ ] **Step 1: Zod schema**

```ts
import { z } from "zod";

export const inquireSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
  carpetRef: z.string().max(300).optional(),
  locale: z.string().max(5).optional(),
});
```

- [ ] **Step 2: API route**

Validate body; if `RESEND_API_KEY` missing, return 503 with clear message in dev log; on success send mail to `INQUIRE_TO_EMAIL` / CC. Never log full PII in production logs beyond id/timestamp.

- [ ] **Step 3: InquireForm UI — visible labels, inline errors, loading/disabled submit, success state**

- [ ] **Step 4: Contact page embeds form + WhatsApp + phone/email from messages**

- [ ] **Step 5: Manual test with mock (or Resend test key)**

- [ ] **Step 6: Commit**

```bash
git commit -am "feat: inquire form API and contact page"
```

---

### Task 11: Motion polish + final anti-AI / a11y pass

**Files:**
- Touch: hero, home sections, collection transitions
- Modify: messages for missing FR/DE/AR strings

- [ ] **Step 1: Add ≤3 motions (CSS only preferred)** — hero slow opacity, chapter fade-in on scroll (respect reduced motion), filter result crossfade

- [ ] **Step 2: Checklist from spec §5 bans — fix any violations**

- [ ] **Step 3: Responsive pass 375 / 768 / 1440; RTL `/ar` home + piece**

- [ ] **Step 4: Commit**

```bash
git commit -am "polish: motion, a11y, and anti-template visual pass"
```

---

## Spec coverage check

| Spec area | Task |
|-----------|------|
| Editorial House IA / homepage order | 6 |
| Nav + Custom soft | 5, 7 |
| Parchment & Madder + anti-AI | 2, 6, 11 |
| EN/AR/FR/DE + RTL | 3 |
| No prices / inquire + WhatsApp | 9, 10 |
| Catalog from scrape | 4 |
| Heritage / About / Custom / Contact | 7, 10 |
| Collection filters + piece detail | 8, 9 |
| Error/empty/RTL edge cases | 8, 10, 11 |
| Out of scope ecommerce | enforced by omitting cart/price |

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-27-kantipur-editorial-house.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute tasks in this session with checkpoints  

Which approach?
