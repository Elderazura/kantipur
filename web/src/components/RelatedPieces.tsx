import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PieceCard, { type PieceCardProduct } from "./PieceCard";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

type RelatedPiecesProps = {
  products: PieceCardProduct[];
};

export default async function RelatedPieces({ products }: RelatedPiecesProps) {
  if (products.length === 0) return null;

  const t = await getTranslations("piece");

  return (
    <section className="border-t border-rule bg-paper" aria-labelledby="related-pieces-heading">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-16 lg:max-w-7xl lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
                {t("relatedEyebrow")}
              </p>
              <h2
                id="related-pieces-heading"
                className="mt-5 font-display text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.1] text-ink"
              >
                {t("relatedTitle")}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <Link
              href="/collection"
              className="group inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
            >
              {t("relatedAll")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:mt-12 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4"
          gap={0.07}
        >
          {products.map((product) => (
            <StaggerItem as="li" key={product.slug}>
              <PieceCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
