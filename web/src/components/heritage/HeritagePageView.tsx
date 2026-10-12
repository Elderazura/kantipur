import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal, Stagger, StaggerItem, WordsUp, Parallax } from "../motion/Reveal";

const TIMELINE = ["1959", "1960", "1990s", "2000s", "today"] as const;
const KNOT_STEPS = [1, 2, 3] as const;
const FIBRES = ["wool", "silk", "hemp", "nettle", "bamboo", "linen", "pashmina", "banana"] as const;
const LOOM_STATS = ["looms", "weavers", "designs"] as const;

/**
 * The House — the craft and the company in one narrative. `company` is the
 * firm's own story (scale, reach, the sister house), slotted in after the
 * people and before the two houses; it used to be a separate /about page that
 * read as a duplicate of this one.
 */
export default async function HeritagePageView({ company }: { company?: ReactNode }) {
  const t = await getTranslations("heritagePage");
  const tf = await getTranslations("fibre");

  return (
    <main className="flex flex-1 flex-col bg-paper">
      {/* Hero */}
      <section className="relative isolate min-h-[52svh] overflow-hidden bg-ink sm:min-h-[58svh] lg:min-h-[64vh]">
        <Parallax distance={40} className="absolute inset-[-12%]">
          <Image
            src="/assets/images/site/Nepali-Handmade-Carpet.jpg"
            alt={t("heroImageAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35"
        />
        <div className="relative mx-auto flex min-h-[52svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:min-h-[58svh] sm:px-10 sm:pb-20 lg:max-w-7xl lg:min-h-[64vh] lg:pb-24">
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-paper/55">
              {t("heroEyebrow")}
            </p>
          </Reveal>
          <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04] text-paper">
            <WordsUp text={t("heroTitle")} />
          </h1>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-paper/75 sm:text-xl">
              {t("heroLead")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Opening */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20 lg:py-32">
          <div>
            <Reveal>
              <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
                {t("introEyebrow")}
              </p>
              <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-ink">
                {t("introTitle")}
              </h2>
            </Reveal>
            <Stagger className="mt-8 flex flex-col gap-5" gap={0.1}>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                  {t("introP1")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                  {t("introP2")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-ink sm:text-lg">
                  {t("introP3")}
                </p>
              </StaggerItem>
            </Stagger>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/images/site/IMG_9255-scaled.jpg"
                alt={t("introImageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 42vw, 540px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink text-paper" aria-labelledby="heritage-timeline">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-paper/65">
              {t("timelineEyebrow")}
            </p>
            <h2
              id="heritage-timeline"
              className="mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]"
            >
              {t("timelineTitle")}
            </h2>
          </Reveal>

          <Stagger
            as="ul"
            className="mt-12 grid gap-px border border-paper/12 bg-paper/12 sm:mt-16 lg:grid-cols-5"
            gap={0.08}
          >
            {TIMELINE.map((key) => (
              <StaggerItem
                as="li"
                key={key}
                className="flex flex-col bg-ink px-5 py-8 sm:px-6 sm:py-10"
              >
                <span className="font-display text-3xl text-paper/90 sm:text-[2rem]">
                  {t(`t_${key}_year`)}
                </span>
                <span className="mt-4 block h-px w-10 bg-madder" />
                <h3 className="mt-5 font-display text-lg text-paper">{t(`t_${key}_title`)}</h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-paper/65">
                  {t(`t_${key}_body`)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* The knot */}
      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5] lg:sticky lg:top-28">
                <Image
                  src="/assets/images/products/hemp-wool-carpet-stock/TC-1468-B-BLACK-80-K.N.-HEMP-WOOL-CLOSE-VIEW-1.jpg"
                  alt={t("knotImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 46vw, 600px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
                  {t("knotEyebrow")}
                </p>
                <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-ink">
                  {t("knotTitle")}
                </h2>
                <p className="mt-7 font-body text-lg leading-relaxed text-ink-muted">
                  {t("knotLead")}
                </p>
              </Reveal>

              <ol className="mt-10 flex flex-col">
                {KNOT_STEPS.map((n) => (
                  <li
                    key={n}
                    className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-rule py-6 last:border-b"
                  >
                    <span className="font-display text-lg text-madder">{`0${n}`}</span>
                    <div>
                      <h3 className="font-display text-lg text-ink">{t(`knotStep${n}Title`)}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                        {t(`knotStep${n}Body`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <Reveal delay={0.1}>
                <p className="mt-8 border-l-2 border-madder/40 pl-5 font-body text-sm leading-relaxed text-ink-muted">
                  {t("knotNote")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Looms & scale */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
              {t("loomsEyebrow")}
            </p>
            <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-ink">
              {t("loomsTitle")}
            </h2>
            <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
              {t("loomsLead")}
            </p>
          </Reveal>

          <Stagger
            as="ul"
            className="mt-12 grid grid-cols-3 gap-px border border-rule bg-rule sm:mt-14"
            gap={0.08}
          >
            {LOOM_STATS.map((key) => (
              <StaggerItem as="li" key={key} className="bg-paper px-4 py-8 text-center sm:px-6 sm:py-10">
                <p className="font-display text-[clamp(2rem,5vw,3rem)] leading-none text-madder">
                  {t(`stat_${key}_value`)}
                </p>
                <p className="mt-3 font-ui text-[0.74rem] tracking-[0.18em] uppercase text-ink-muted">
                  {t(`stat_${key}_label`)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Stagger className="flex flex-col gap-5" gap={0.1}>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                  {t("loomsP1")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                  {t("loomsP2")}
                </p>
              </StaggerItem>
            </Stagger>
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/assets/images/site/IMG_9277-scaled.jpg"
                  alt={t("loomsImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 46vw, 600px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
              {t("materialsEyebrow")}
            </p>
            <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-ink">
              {t("materialsTitle")}
            </h2>
            <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
              {t("materialsLead")}
            </p>
          </Reveal>

          <Stagger
            as="ul"
            className="mt-12 grid gap-px border border-rule bg-rule sm:mt-14 sm:grid-cols-2 lg:grid-cols-4"
            gap={0.07}
          >
            {FIBRES.map((key) => (
              <StaggerItem as="li" key={key} className="bg-paper px-5 py-6 sm:px-6 sm:py-8">
                <h3 className="font-display text-lg text-ink">
                  {tf.has(key) ? tf(key) : key}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                  {t(`fibre_${key}`)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.12}>
            <Link
              href="/collection"
              className="group mt-12 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
            >
              {t("materialsCta")}
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

      {/* People */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 lg:py-32">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Parallax distance={28} className="absolute inset-[-10%]">
                <Image
                  src="/assets/images/products/w-312/w-312-1.jpg"
                  alt={t("peopleImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 48vw, 620px"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-paper/65">
                {t("peopleEyebrow")}
              </p>
              <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.06]">
                {t("peopleTitle")}
              </h2>
            </Reveal>
            <Stagger className="mt-8 flex flex-col gap-5" gap={0.1}>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-paper/75 sm:text-lg">
                  {t("peopleLead")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-paper/65 sm:text-lg">
                  {t("peopleP1")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-body text-base leading-relaxed text-paper/65 sm:text-lg">
                  {t("peopleP2")}
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      {company}

      {/* Two houses */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
              {t("housesEyebrow")}
            </p>
            <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-ink">
              {t("housesTitle")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px border border-rule bg-rule sm:mt-14 lg:grid-cols-2">
            <Reveal className="bg-paper px-5 py-8 sm:px-8 sm:py-10">
              <h3 className="font-display text-xl text-ink">{t("kantipurName")}</h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                {t("kantipurBody")}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="bg-paper px-5 py-8 sm:px-8 sm:py-10">
              <h3 className="font-display text-xl text-ink">{t("changName")}</h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                {t("changBody")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-10 sm:py-24 lg:py-28">
          <Reveal>
            <blockquote className="font-display text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.24] text-ink">
              <span className="text-madder">“</span>
              {t("pull")}
              <span className="text-madder">”</span>
            </blockquote>
            <p className="mt-7 font-ui text-[0.66rem] tracking-[0.26em] uppercase text-ink-muted">
              {t("pullAttrib")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Close */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-ink">
            {t("ctaTitle")}
          </h2>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink-muted">
            {t("ctaBody")}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <Link
              href="/collection"
              className="group inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder decoration-2 underline-offset-[7px]"
            >
              {t("ctaCollection")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center font-ui text-xs tracking-[0.18em] uppercase text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
