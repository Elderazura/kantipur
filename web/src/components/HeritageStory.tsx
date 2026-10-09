import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal, Stagger, StaggerItem, WordsUp, Parallax } from "./motion/Reveal";

const CHAPTERS = ["1959", "1960", "1990s", "today"] as const;

export default async function HeritageStory() {
  const t = await getTranslations("soul");

  return (
    <section id="heritage" className="relative overflow-hidden bg-ink text-paper">
      {/* The name — the page's quietest, most important claim */}
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-12 sm:px-10 sm:pt-24 sm:pb-0 lg:max-w-7xl lg:pt-32">
        <Reveal>
          <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-paper/50">
            {t("nameEyebrow")}
          </p>
        </Reveal>

        <h2 className="mt-7 max-w-[23ch] font-display text-[clamp(2rem,5.2vw,4rem)] leading-[1.04] tracking-[0.01em]">
          <WordsUp text={t("nameTitle")} />
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-paper/75 line-clamp-4 sm:mt-8 sm:text-xl md:line-clamp-none">
            {t("nameBody")}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 md:hidden">
          <Link
            href="/house"
            className="group inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[7px]"
          >
            {t("originCta")}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>

      {/* Story + image, side by side — desktop only; full chapter lives on /heritage */}
      <div className="mx-auto mt-14 hidden max-w-6xl gap-10 px-5 sm:px-10 md:grid lg:mt-28 lg:max-w-7xl lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Parallax distance={34} className="absolute inset-[-12%]">
              <Image
                src="/assets/images/site/IMG_9255-scaled.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 52vw, 680px"
                className="object-cover"
              />
            </Parallax>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-paper/50">
              {t("originEyebrow")}
            </p>
            <h3 className="mt-6 max-w-[20ch] font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.1]">
              {t("originTitle")}
            </h3>
          </Reveal>

          <Stagger className="mt-8 flex flex-col gap-5" gap={0.12}>
            <StaggerItem>
              <p className="font-body text-base leading-relaxed text-paper/75 sm:text-lg">
                {t("originP1")}
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-body text-base leading-relaxed text-paper/75 sm:text-lg">
                {t("originP2")}
              </p>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.2}>
            <Link
              href="/house"
              className="group mt-9 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[7px]"
            >
              {t("originCta")}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Four moments that made the craft an industry */}
      <div className="mx-auto mt-16 hidden max-w-6xl px-5 sm:px-10 md:block lg:mt-32 lg:max-w-7xl">
        <Reveal>
          <h3 className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-paper/50">
            {t("timelineEyebrow")}
          </h3>
        </Reveal>

        <Stagger as="ul" className="mt-8 grid gap-px border-t border-paper/15 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {CHAPTERS.map((key) => (
            <StaggerItem
              as="li"
              key={key}
              className="group relative border-b border-paper/15 py-8 pe-6 sm:border-b-0 sm:pe-8"
            >
              <span className="block font-display text-3xl text-paper/90 sm:text-[2.1rem]">
                {t(`t_${key}_year`)}
              </span>
              <span className="mt-4 block h-px w-10 bg-madder transition-[width] duration-500 group-hover:w-20" />
              <p className="mt-5 font-body text-sm leading-relaxed text-paper/70">
                {t(`t_${key}_body`)}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Pull quote — the emotional close of the chapter */}
      <div className="mx-auto mt-16 hidden max-w-4xl px-5 pb-12 text-center sm:px-10 sm:pb-24 md:block lg:mt-32 lg:pb-32">
        <Reveal>
          <blockquote className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.24] text-paper/95">
            <span className="text-madder">“</span>
            {t("pull")}
            <span className="text-madder">”</span>
          </blockquote>
          <p className="mt-7 font-ui text-[0.66rem] tracking-[0.26em] uppercase text-paper/65">
            {t("pullAttrib")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
