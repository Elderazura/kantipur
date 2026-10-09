import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WorldReach from "@/components/WorldReach";
import { Reveal, WordsUp, Parallax } from "@/components/motion/Reveal";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("p1"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: localeAlternates("/about"),
    },
  };
}

/**
 * The House — who the company is. Distinct from /heritage, which covers the
 * craft itself: the knot, the fibres and where the technique came from.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tSoul = await getTranslations("soul");
  const tNav = await getTranslations("nav");

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <section className="relative isolate flex min-h-[54svh] items-end overflow-hidden bg-obsidian lg:min-h-[66vh]">
        <Parallax distance={34} className="absolute inset-[-8%]">
          <Image
            src="/assets/images/site/IMG_9255-scaled.jpg"
            alt={tSoul("imageAlt")}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,15,0.92)_0%,rgba(17,17,15,0.5)_50%,rgba(17,17,15,0.2)_100%)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 sm:px-10 sm:pb-20 lg:max-w-7xl">
          <p className="font-ui text-[0.7rem] tracking-[0.26em] uppercase text-paper/60 sm:text-[0.74rem]">
            {tNav("about")}
          </p>
          <h1 className="mt-5 max-w-[22ch] text-balance font-display text-[clamp(2rem,5.2vw,3.8rem)] leading-[1.06] text-paper">
            <WordsUp text={t("title")} />
          </h1>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
          <div className="flex flex-col gap-6">
            {(["p1", "p2", "p3"] as const).map((k, i) => (
              <Reveal key={k} delay={i * 0.08}>
                <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                  {t(k)}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/images/site/Wool-Silk-scaled.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 46vw, 600px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scale, reach and the sister house */}
      <WorldReach />

      <section className="border-t border-rule bg-surface">
        <div className="mx-auto flex max-w-4xl flex-col items-start px-5 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <h2 className="max-w-[22ch] font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.12] text-ink">
              {tSoul("originTitle")}
            </h2>
            <p className="mt-5 max-w-[60ch] font-body text-base leading-relaxed text-ink-muted sm:text-lg">
              {tSoul("originP1")}
            </p>
            <Link
              href="/heritage"
              className="group mt-9 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
            >
              {tSoul("originCta")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
