import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { toPublicImageSrc } from "@/lib/images";
import type { Product } from "@/types/product";

type PieceCardProps = {
  product: Product;
};

export default function PieceCard({ product }: PieceCardProps) {
  if (!product.primaryImage) return null;

  const src = toPublicImageSrc(product.primaryImage);
  const detail = [product.material, product.colour].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block focus-visible:outline-offset-4"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        <Image
          src={src}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-90"
        />
      </div>
      <p className="mt-4 font-display text-lg tracking-wide text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-rule">
        {product.name}
      </p>
      {detail ? (
        <p className="mt-1 font-body text-sm text-ink-muted">{detail}</p>
      ) : null}
    </Link>
  );
}
