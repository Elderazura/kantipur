import { getTranslations } from "next-intl/server";
import { STANDARD_ICONS } from "./standards/StandardsIcons";
import { Reveal } from "./motion/Reveal";

const PILLARS = ["handKnotted", "childFree", "traceable", "compliance"] as const;

export default async function PieceStandards() {
  const t = await getTranslations("piece");

  return (
    <section className="border-t border-rule bg-surface" aria-labelledby="piece-standards-heading">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-16 lg:max-w-7xl lg:py-20">
        <Reveal>
          <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("standardsEyebrow")}
          </p>
          <h2
            id="piece-standards-heading"
            className="mt-5 max-w-[22ch] font-display text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.1] text-ink"
          >
            {t("standardsTitle")}
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ink-muted sm:text-lg">
            {t("standardsLead")}
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-px border border-rule bg-rule sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((key) => {
            const Icon = STANDARD_ICONS[key];
            return (
              <li key={key} className="bg-paper px-5 py-6 sm:px-6 sm:py-7">
                <Icon className="h-6 w-6 text-madder/75" aria-hidden />
                <h3 className="mt-4 font-display text-base text-ink sm:text-lg">
                  {t(`standards_${key}Title`)}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  {t(`standards_${key}Body`)}
                </p>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-3xl font-body text-sm leading-relaxed text-ink-muted">
            {t("standardsNote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
