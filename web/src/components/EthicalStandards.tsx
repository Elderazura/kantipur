import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem, WordsUp } from "./motion/Reveal";
import { STANDARD_ICONS } from "./standards/StandardsIcons";

const STANDARDS = [
  "adult",
  "childFree",
  "handKnotted",
  "natural",
  "traceable",
  "compliance",
] as const;

export default async function EthicalStandards() {
  const t = await getTranslations("standards");

  return (
    <section className="border-y border-rule bg-paper" aria-labelledby="standards-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
        <Reveal>
          <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("eyebrow")}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <h2
            id="standards-heading"
            className="max-w-[16ch] font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] text-ink"
          >
            <WordsUp text={t("title")} />
          </h2>
          <Reveal delay={0.1}>
            <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
              {t("lead")}
            </p>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="mt-12 grid gap-px border border-rule bg-rule sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.08}
        >
          {STANDARDS.map((key) => {
            const Icon = STANDARD_ICONS[key];
            return (
              <StaggerItem as="li" key={key} className="bg-paper px-5 py-7 sm:px-7 sm:py-9">
                <div className="flex gap-4">
                  <Icon className="mt-0.5 h-6 w-6 shrink-0 text-madder/75" aria-hidden />
                  <div>
                    <h3 className="font-display text-lg text-ink">{t(`${key}Title`)}</h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                      {t(`${key}Body`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-3xl font-body text-sm leading-relaxed text-ink-muted">
            {t("footnote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
