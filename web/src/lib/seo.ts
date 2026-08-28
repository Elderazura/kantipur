import { routing } from "@/i18n/routing";

/** Absolute origin for canonical/OG URLs. Set NEXT_PUBLIC_SITE_URL in production. */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return raw.replace(/\/$/, "");
}

/** Shared social card — the weavers-at-the-loom frame. */
export const OG_IMAGE = "/assets/images/site/Nepali-Handmade-Carpet.jpg";

/**
 * hreflang map for a path such as "/" or "/collection/j924-...".
 * Returns { en: "/en/collection", de: "/de/collection", ..., "x-default": ... }
 * so search engines can relate the four locales to each other.
 */
export function localeAlternates(path: string): Record<string, string> {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const out: Record<string, string> = {};
  for (const locale of routing.locales) {
    out[locale] = `/${locale}${clean}`;
  }
  out["x-default"] = `/${routing.defaultLocale}${clean}`;
  return out;
}
