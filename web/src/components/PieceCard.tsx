"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type PieceCardProduct = {
  slug: string;
  name: string;
  material: string | null;
  colour: string | null;
  knots: number | null;
  image: string;
};

type PieceCardProps = {
  product: PieceCardProduct;
  featured?: boolean;
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function PieceCard({ product, featured = false }: PieceCardProps) {
  const t = useTranslations("collection");
  const reduce = useReducedMotion();

  const detail = [product.material, product.colour].filter(Boolean).join(" · ");
  const meta = [product.knots ? `${product.knots} K.N.` : null, detail].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block focus-visible:outline-offset-4"
    >
      <motion.div
        className={`relative overflow-hidden bg-surface ${
          featured ? "aspect-[4/5] lg:aspect-[16/11]" : "aspect-[4/5]"
        }`}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 66vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:scale-[1.06]"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-madder/35"
        />

        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {product.knots ? (
          <span className="absolute start-3 top-3 rounded-full border border-paper/30 bg-ink/75 px-2.5 py-1 font-ui text-[0.72rem] tracking-[0.12em] uppercase text-paper backdrop-blur-[2px]">
            {product.knots} K.N.
          </span>
        ) : null}

        <span className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 font-ui text-[0.74rem] tracking-[0.16em] uppercase text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {t("viewPiece")}
          <span aria-hidden className="ms-1.5 inline-block transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
            →
          </span>
        </span>
      </motion.div>

      <p
        className={`mt-4 text-balance font-display tracking-wide text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-rule ${
          featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
        }`}
      >
        {product.name}
      </p>
      {meta ? (
        <p className="mt-1.5 font-body text-sm text-ink-muted">{meta}</p>
      ) : null}
    </Link>
  );
}
