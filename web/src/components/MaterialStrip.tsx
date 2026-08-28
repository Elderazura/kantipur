import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { fibreFacets, getAllProducts } from "@/lib/catalog";
import { FIBRE_LABELS, type Fibre } from "@/lib/vocabulary";
import { toPublicImageSrc } from "@/lib/images";
import { Reveal, Stagger, StaggerItem, WordsUp } from "./motion/Reveal";

/**
 * One representative photograph per fibre, drawn from the catalogue. Blends
 * belong to several fibres, so covers are claimed in order and a photo already
 * used is skipped — otherwise Wool and Hemp both show the same hemp-wool piece.
 */
function pickCovers(fibres: Fibre[]): Map<Fibre, string> {
  const products = getAllProducts().filter((p) => p.primaryImage);
  const used = new Set<string>();
  const covers = new Map<Fibre, string>();

  for (const fibre of fibres) {
    const candidates = products.filter((p) => p.fibres.includes(fibre));
    // prefer a piece that is *only* this fibre, then any unused photo
    const pick =
      candidates.find((p) => p.fibres.length === 1 && !used.has(p.primaryImage!)) ??
      candidates.find((p) => !used.has(p.primaryImage!)) ??
      candidates[0];
    if (pick?.primaryImage) {
      used.add(pick.primaryImage);
      covers.set(fibre, toPublicImageSrc(pick.primaryImage));
    }
  }
  return covers;
}

export default async function MaterialStrip() {
  const t = await getTranslations("home");
  const tf = await getTranslations("fibre");

  const gallery = getAllProducts().filter((p) => p.primaryImage);
  const fibres = fibreFacets(gallery).slice(0, 8);
  const covers = pickCovers(fibres.map((f) => f.key));

  return (
    <section className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-10 sm:py-16 md:py-24 lg:max-w-7xl lg:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-[14ch] font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.06] text-ink">
            <WordsUp text={t("materialsTitle")} />
          </h2>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-body text-base leading-relaxed text-ink-muted">
              {t("materialsLead")}
            </p>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4"
          gap={0.07}
        >
          {fibres.map((f) => {
            const cover = covers.get(f.key) ?? null;
            const label = tf.has(f.key) ? tf(f.key) : FIBRE_LABELS[f.key];
            return (
              <StaggerItem as="li" key={f.key}>
                <Link href={`/collection?fibre=${f.key}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                    {cover ? (
                      <Image
                        src={cover}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:scale-[1.06]"
                      />
                    ) : null}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-ink/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-rule pt-3 transition-colors duration-300 group-hover:border-madder">
                    <span className="font-display text-lg text-ink transition-colors group-hover:text-madder sm:text-xl">
                      {label}
                    </span>
                    <span className="font-ui text-[0.65rem] tracking-[0.16em] text-ink-muted tabular-nums">
                      {f.count}
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.15}>
          <Link
            href="/collection"
            className="group mt-14 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
          >
            {t("materialsView")}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
