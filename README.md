# kantipurcarpets.com — full site scrape

Complete capture of the live site, taken **2026-08-27**, for the rebuild.
Source is WordPress + WooCommerce (Elementor theme), hosted with a JS
bot-check interstitial in front of it.

**Totals:** 69 products · 25 categories · 36 tags · 217 media files (173 MB) · 102 archived pages

---

## Layout

```
data/          structured data — start here
assets/        every image, organised
raw/html/      verbatim HTML of all 102 pages
site/pages/    page copy as readable markdown
tools/         the scripts used (re-runnable)
logs/          run logs
```

### `data/` — the useful stuff

| File | What it is |
|---|---|
| **`catalog.json`** | **Primary artifact.** All 69 products joined to their local image paths, with resolved category/tag names, prices, specs. |
| **`products.csv`** | Same, flattened for Excel/Sheets. |
| `products.json` | Products with parsed specs (design no, material, quality, colour, sizes). |
| `products_full.json` | Untouched WooCommerce Store API payload. |
| `media.json` | WP media library records (194 public items) with dimensions, alt text, all size variants. |
| `media_manifest.json` | Every downloaded file → local path, source URL, bytes, status. |
| `categories.json` / `tags.json` | Taxonomy with names, slugs, counts, permalinks. |
| `pages_full.json` | WP pages API (8 pages). |
| `site_structure.json` | Navigation, contact details, social links. |
| `embeds.json` | Video / map embed configuration. |
| `extra_media.json` | Files recovered from HTML that the API didn't expose. |
| `pages_index.json` | URL → archived HTML file map. |
| `site.json` | Site name, description, timezone. |

### `assets/`

```
assets/images/products/<product-slug>/   154 images, one folder per product
assets/images/site/                      60 site images (logo, banners, page art)
assets/images/site/elementor-thumbs/     3 theme-generated thumbnails
assets/videos/                           empty — see "Video" below
```

Images are the **full-size originals**. WordPress's resized variants
(`-300x200`, `-1024x683` etc.) were deliberately not downloaded — they're
regenerable, and every variant URL is recorded in `media.json` under
`media_details.sizes` if you need them.

---

## Key facts for the rebuild

**Contact**
- Email: `aglalit@gmail.com`, `kantipurtep@gmail.com`
- Phone: +977 9851020298
- Facebook: [@Kantipurcarpets.np](https://www.facebook.com/@Kantipurcarpets.np) · Instagram: [@kantipurcarpets](https://www.instagram.com/kantipurcarpets/)

**Navigation:** Home · Shop · Contact · About

**Pricing** — only **34 of 69** products have a price; the other 35 are set to 0
(catalogue-only listings). Prices in `catalog.json` are converted to whole NPR;
in the raw WooCommerce files they're in minor units. Range: **NPR 39,900 – 264,000**.

**Product specs** are not WooCommerce attributes — they're free text in the short
description. I parsed them into fields (`design_no`, `material`, `quality`,
`colour`, `size`/`sizes`). Newer products list a per-size piece-count table;
older ones give a single size. Worth modelling properly in the rebuild.

**Video** — the homepage hero uses a **YouTube background video**, not a hosted file:

```
https://www.youtube.com/watch?v=FVjEVCdoMyY   (start 5s, end 54s, hidden on mobile)
```

There are no self-hosted videos anywhere on the site, so `assets/videos/` is
empty. Pull the master from your YouTube account if you want a local copy.
The contact page also embeds a Google Map (`q=kantipur%20carpet`).

**Data quirks worth fixing**
- Product `1591` is named "J972 Silver 100% Pashmina Carpet" but its slug is
  `4368-terracotta-hemp-wool-carpet` — a leftover from being duplicated.
- Product `3006` has the slug `3006` (no real slug).
- `desc` on most products is just "Add to Wishlist" boilerplate; the real copy
  lives in the short description.
- Two products reuse `LALIT-AGRAWAL-PHOTO.jpg` as their image — likely a
  placeholder left in by mistake.

---

## Re-running

A local Chrome is driven over the DevTools Protocol, because the site's
interstitial blocks plain HTTP clients. Start Chrome first:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir=/tmp/kc_chrome_profile --no-first-run "https://kantipurcarpets.com/"
```

Then:

```bash
node tools/harvest.mjs api     # REST API -> data/
node tools/harvest.mjs media   # all media -> assets/
node tools/harvest.mjs pages   # page HTML -> raw/html/
node tools/fetch_extra.mjs     # files referenced in HTML but not in the API
python3 tools/extract_content.py
python3 tools/build_catalog.py
```

Media and page stages skip anything already on disk, so they're safe to re-run.

---

## Coverage notes

- The WP media API exposes **194** of the **269** items in the library.
  The other 75 are attachments whose parent isn't public. I cross-checked every
  image URL appearing in the 102 archived pages and recovered 23 more that way,
  so **everything the site actually renders is captured**. The remaining
  unexposed items are orphaned uploads not used anywhere on the site — if you
  want those too, grab `wp-content/uploads` over FTP/cPanel.
- All 217 files were header-verified as valid JPEG/PNG/SVG; no truncated or
  empty downloads.
- Checkout and my-account pages are captured as templates only — they render
  per-session and hold no reusable content.
