import type { Fibre } from "@/lib/vocabulary";
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
  /** Normalised via vocabulary.normaliseColour — never the raw scraped string. */
  colour: string | null;
  sizes: ProductSize[];
  categories: { slug: string; name: string }[];
  images: ProductImage[];
  primaryImage: string | null;
  /** Canonical fibres this piece is woven from; a blend belongs to several. */
  fibres: Fibre[];
  /** Knots per square inch, parsed out of the free-text quality string. */
  knots: number | null;
};
