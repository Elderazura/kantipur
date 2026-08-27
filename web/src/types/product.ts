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
