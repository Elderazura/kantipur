import catalog from "../../data/catalog.json";
import type { Product, ProductImage } from "@/types/product";
import {
  fibresOf,
  normaliseColour,
  colourSlug,
  knotCount,
  type Fibre,
} from "./vocabulary";

const PLACEHOLDER_RE = /LALIT-AGRAWAL-PHOTO/i;

export function isPlaceholderImage(localPath: string): boolean {
  return PLACEHOLDER_RE.test(localPath);
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

  const quality = raw.quality ? String(raw.quality) : null;
  const resolvedMaterial = material ?? categories[0]?.name ?? null;

  return {
    id: Number(raw.id),
    slug: String(raw.slug),
    name: String(raw.name),
    designNo: raw.design_no ? String(raw.design_no) : null,
    material: resolvedMaterial,
    quality,
    colour: normaliseColour(raw.colour == null ? null : String(raw.colour)),
    sizes: (raw.sizes as Product["sizes"]) || [],
    categories,
    images,
    primaryImage: primary,
    fibres: fibresOf({ material: resolvedMaterial, categories, quality }),
    knots: knotCount(quality),
  };
}

let cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cache) return cache;
  cache = (catalog.products as Record<string, unknown>[]).map(normalizeProduct);
  return cache;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

/** Pieces similar by fibre, knot grade, and colour — then fill from the catalogue. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const pool = getAllProducts().filter(
    (p) => p.slug !== product.slug && p.primaryImage && !isPlaceholderImage(p.primaryImage),
  );

  const scored = pool
    .map((p) => {
      let score = 0;
      for (const f of product.fibres) {
        if (p.fibres.includes(f)) score += 3;
      }
      if (product.knots && p.knots === product.knots) score += 2;
      if (product.colour && p.colour === product.colour) score += 1;
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name));

  const picked: Product[] = [];
  const seen = new Set<string>([product.slug]);

  for (const { p } of scored) {
    if (picked.length >= limit) break;
    if (seen.has(p.slug)) continue;
    picked.push(p);
    seen.add(p.slug);
  }

  for (const p of pool) {
    if (picked.length >= limit) break;
    if (seen.has(p.slug)) continue;
    picked.push(p);
    seen.add(p.slug);
  }

  return picked;
}

export function filterProducts(opts: {
  fibre?: string;
  colour?: string;
  knots?: number;
}): Product[] {
  return getAllProducts().filter((p) => {
    if (opts.fibre && !p.fibres.includes(opts.fibre as Fibre)) return false;
    if (opts.colour && colourSlug(p.colour || "") !== opts.colour) return false;
    if (opts.knots && p.knots !== opts.knots) return false;
    return true;
  });
}

/** Fibre facets with counts, ordered by how much of the catalogue they cover. */
export function fibreFacets(products = getAllProducts()): { key: Fibre; count: number }[] {
  const tally = new Map<Fibre, number>();
  for (const p of products) {
    for (const f of p.fibres) tally.set(f, (tally.get(f) ?? 0) + 1);
  }
  return [...tally.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

/** Colour facets, already de-duplicated by normaliseColour. */
export function colourFacets(
  products = getAllProducts(),
): { slug: string; label: string; count: number }[] {
  const tally = new Map<string, { label: string; count: number }>();
  for (const p of products) {
    if (!p.colour) continue;
    const slug = colourSlug(p.colour);
    const hit = tally.get(slug);
    if (hit) hit.count += 1;
    else tally.set(slug, { label: p.colour, count: 1 });
  }
  return [...tally.entries()]
    .map(([slug, v]) => ({ slug, ...v }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/** Knot grades present in the catalogue, ascending. */
export function knotFacets(products = getAllProducts()): { knots: number; count: number }[] {
  const tally = new Map<number, number>();
  for (const p of products) {
    if (p.knots) tally.set(p.knots, (tally.get(p.knots) ?? 0) + 1);
  }
  return [...tally.entries()]
    .map(([knots, count]) => ({ knots, count }))
    .sort((a, b) => a.knots - b.knots);
}
