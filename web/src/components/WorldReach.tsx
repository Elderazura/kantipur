"use client";

import { useTranslations } from "next-intl";
import { Reveal, Stagger, StaggerItem, WordsUp, CountUp } from "./motion/Reveal";

/** Figures come from the company's own published numbers. */
const FIGURES = [
  { key: "years", to: 40, suffix: "" },
  { key: "looms", to: 200, suffix: "+" },
  { key: "weavers", to: 1200, suffix: "" },
  { key: "designs", to: 500, suffix: "+" },
] as const;

/** Export markets — Gulf & Asia first, then Europe, Americas, Oceania. */
const MARKETS = [
  "uae",
  "saudiArabia",
  "qatar",
  "kuwait",
  "oman",
  "bahrain",
  "india",
  "china",
  "singapore",
  "japan",
  "southKorea",
  "germany",
  "france",
  "italy",
  "unitedKingdom",
  "switzerland",
  "netherlands",
  "spain",
  "unitedStates",
  "canada",
  "australia",
] as const;

export default function WorldReach() {
  const t = useTranslations("house");

  return (
    <section className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
        <Reveal>
          <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("eyebrow")}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <h2 className="max-w-[16ch] font-display text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.06] text-ink">
            <WordsUp text={t("title")} />
          </h2>
          <Reveal delay={0.12}>
            <p className="font-body text-lg leading-relaxed text-ink-muted">{t("lead")}</p>
          </Reveal>
        </div>

        {/* The numbers, counted up once they land in view */}
        <Stagger
          as="ul"
          className="mt-12 grid grid-cols-2 gap-px border border-rule bg-rule sm:mt-16 lg:grid-cols-4"
          gap={0.1}
        >
          {FIGURES.map((f) => (
            <StaggerItem as="li" key={f.key} className="bg-paper px-4 py-7 sm:px-6 sm:py-9 md:px-8 md:py-11">
              <span className="block font-display text-[clamp(2.1rem,4.4vw,3rem)] leading-none text-ink tabular-nums">
                <CountUp to={f.to} suffix={f.suffix} />
              </span>
              <span className="mt-4 block font-ui text-[0.62rem] tracking-[0.22em] uppercase text-ink-muted">
                {t(`fig_${f.key}`)}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Where the work goes */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <h3 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.14] text-ink">
              {t("marketsTitle")}
            </h3>
            <p className="mt-5 font-body text-base leading-relaxed text-ink-muted">
              {t("marketsBody")}
            </p>
          </Reveal>

          <Stagger as="ul" className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-4" gap={0.05}>
            {MARKETS.map((m) => (
              <StaggerItem
                as="li"
                key={m}
                className="border-b border-rule py-3.5 font-body text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {t(`market_${m}`)}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
