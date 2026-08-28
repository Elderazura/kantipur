import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal, Stagger, StaggerItem, WordsUp, Parallax } from "./motion/Reveal";
import CustomCapabilities from "./custom/CustomCapabilities";

const STEPS = [
  { key: "talk", image: "/assets/images/custom/step-talk.jpg" },
  { key: "shape", image: "/assets/images/custom/step-shape.jpg" },
  { key: "weave", image: "/assets/images/custom/step-weave.jpg" },
] as const;

export default async function CustomPageView() {
  const t = await getTranslations("custom");

  return (
    <main className="flex flex-1 flex-col bg-paper">
      {/* Hero */}
      <section className="relative isolate min-h-[50svh] overflow-hidden bg-ink sm:min-h-[56svh] lg:min-h-[62vh]">
        <Parallax distance={36} className="absolute inset-[-10%]">
          <Image
            src="/assets/images/custom/step-weave.jpg"
            alt={t("heroImageAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/78 to-ink/45"
        />
        <div className="relative mx-auto flex min-h-[50svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 sm:min-h-[56svh] sm:px-10 sm:pb-16 lg:max-w-7xl lg:min-h-[62vh] lg:pb-20">
          <Reveal>
            <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-paper/55">
              {t("eyebrow")}
            </p>
          </Reveal>
          <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.2rem,6vw,4.25rem)] leading-[1.04] text-paper">
            <WordsUp text={t("title")} />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-paper/75 sm:text-xl">
              {t("heroLead")}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[7px]"
            >
              {t("contactCta")}
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

      {/* Scale */}
      <section className="border-b border-rule bg-surface" aria-labelledby="custom-scale-heading">
        <div className="mx-auto grid max-w-6xl lg:max-w-7xl lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col justify-center gap-5 px-5 py-10 sm:px-10 sm:py-12">
            <Reveal>
              <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
                {t("scaleEyebrow")}
              </p>
              <h2
                id="custom-scale-heading"
                className="mt-4 max-w-[14ch] font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] text-ink"
              >
                {t("scaleTitle")}
              </h2>
              <p className="mt-5 max-w-md font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                {t("scaleBody")}
              </p>
              <p className="mt-8 font-display text-[clamp(2rem,5vw,3rem)] leading-none text-madder/90">
                25×40
                <span className="mt-2 block font-ui text-[0.58rem] tracking-[0.22em] uppercase text-ink-muted">
                  {t("scaleExampleLabel")}
                </span>
              </p>
            </Reveal>
          </div>
          <Reveal className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-full">
            <Image
              src="/assets/images/custom/scale-weaving.jpg"
              alt={t("scaleImageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </Reveal>
        </div>
      </section>

      {/* Two ways to start */}
      <section className="border-b border-rule bg-paper" aria-labelledby="custom-paths-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-20 lg:max-w-7xl lg:py-24">
          <Reveal>
            <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
              {t("pathsEyebrow")}
            </p>
            <h2
              id="custom-paths-heading"
              className="mt-5 max-w-[20ch] font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08] text-ink"
            >
              {t("pathsTitle")}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-10">
            <Reveal className="group flex flex-col overflow-hidden border border-rule bg-paper">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/assets/images/custom/path-online.jpg"
                  alt={t("pathOnlineImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-7 sm:px-7 sm:py-8">
                <h3 className="font-display text-xl text-ink sm:text-2xl">{t("pathOnlineTitle")}</h3>
                <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                  {t("pathOnlineBody")}
                </p>
                <Link
                  href="/contact"
                  className="group/link mt-7 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.16em] uppercase text-madder underline decoration-madder/50 underline-offset-[7px] hover:decoration-madder"
                >
                  {t("onlineCta")}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="group flex flex-col overflow-hidden border border-rule bg-paper">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/assets/images/custom/path-visit.jpg"
                  alt={t("pathVisitImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-7 sm:px-7 sm:py-8">
                <h3 className="font-display text-xl text-ink sm:text-2xl">{t("pathVisitTitle")}</h3>
                <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                  {t("pathVisitBody")}
                </p>
                <Link
                  href="/contact"
                  className="group/link mt-7 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.16em] uppercase text-ink underline decoration-rule underline-offset-[7px] transition-colors hover:decoration-ink"
                >
                  {t("visitCta")}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-rule bg-ink text-paper" aria-labelledby="custom-process-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-20 lg:max-w-7xl lg:py-24">
          <Reveal>
            <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-paper/45">
              {t("processEyebrow")}
            </p>
            <h2
              id="custom-process-heading"
              className="mt-5 max-w-[18ch] font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08]"
            >
              {t("processTitle")}
            </h2>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-paper/70 sm:text-lg">
              {t("processLead")}
            </p>
          </Reveal>

          <Stagger
            as="ul"
            className="mt-12 grid gap-8 sm:mt-14 lg:grid-cols-3 lg:gap-8"
            gap={0.1}
          >
            {STEPS.map(({ key, image }, i) => (
              <StaggerItem as="li" key={key} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`${key}ImageAlt`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                  <span className="absolute start-4 top-4 font-display text-2xl text-paper drop-shadow-sm">
                    {`0${i + 1}`}
                  </span>
                </div>
                <div className="border-t border-paper/15 pt-5">
                  <h3 className="font-display text-xl text-paper">{t(`${key}Title`)}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-paper/65 sm:text-[0.95rem]">
                    {t(`${key}Body`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CustomCapabilities />

      {/* Story + image */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-10 sm:py-20 lg:max-w-7xl lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <Stagger className="flex flex-col gap-5" gap={0.1}>
            <StaggerItem>
              <p className="font-body text-lg leading-relaxed text-ink-muted sm:text-xl">{t("p1")}</p>
            </StaggerItem>
            <StaggerItem>
              <p className="font-body text-lg leading-relaxed text-ink sm:text-xl">{t("p3")}</p>
            </StaggerItem>
          </Stagger>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/assets/images/custom/story-fibres.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Close */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/assets/images/custom/hero-loom.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-ink/85" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-20 lg:max-w-7xl lg:py-24">
          <h2 className="max-w-[16ch] font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08]">
            {t("closingTitle")}
          </h2>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-paper/70 sm:text-lg">
            {t("closingNote")}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <Link
              href="/contact"
              className="group inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[7px]"
            >
              {t("contactCta")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/collection"
              className="inline-flex min-h-11 items-center font-ui text-xs tracking-[0.16em] uppercase text-paper/70 underline decoration-paper/30 underline-offset-[7px] transition-colors hover:text-paper hover:decoration-paper/60"
            >
              {t("browseCollection")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
