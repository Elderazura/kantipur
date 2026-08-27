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
