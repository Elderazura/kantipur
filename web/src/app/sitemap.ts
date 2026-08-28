import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProducts } from "@/lib/catalog";
import { siteUrl } from "@/lib/seo";

const STATIC_PATHS = ["", "/heritage", "/collection", "/custom", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/collection" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${path}`]),
          ),
        },
      });
    }

    for (const product of getAllProducts()) {
      if (!product.primaryImage) continue;
      const path = `/collection/${product.slug}`;
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
