import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const CAPS = ["dimensions", "colour", "design", "material", "knot", "project", "shipping"] as const;
const POINTS = ["scale", "spec", "repeat", "docs", "lead", "ship"] as const;

function Grid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <Stagger
      as="ul"
      className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3"
      gap={0.07}
    >
      {items.map((item) => (
        <StaggerItem as="li" key={item.title} className="bg-paper px-6 py-8 sm:px-7 sm:py-10">
          <h3 className="font-display text-xl text-ink sm:text-2xl">{item.title}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
            {item.body}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/**
 * The commissioning detail that used to live on three separate pages.
 *
 * Bespoke, Designers and Hospitality all sold the same thing — we weave to
 * your specification — so they read as duplicates in the nav. They are one
 * page now: who the brief comes from, what we can shape, and how a large
 * order runs. No copy was dropped in the merge.
 */
export default async function BespokeTracks() {
  const t = await getTranslations("custom");
  const tD = await getTranslations("designers");
  const tH = await getTranslations("hospitality");

  const tracks = [
    { title: t("trackPrivateT"), body: t("trackPrivateB") },
    { title: tD("eyebrow"), body: tD("lead") },
    { title: tH("eyebrow"), body: tH("lead") },
  ];

  return (
    <>
      {/* Who the brief comes from */}
      <section className="border-b border-rule bg-surface" aria-labelledby="bespoke-audience">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-28">
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
              {t("audienceEyebrow")}
            </p>
            <h2
              id="bespoke-audience"
              className="mt-5 max-w-[22ch] font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08] text-ink"
            >
              {t("audienceTitle")}
            </h2>
          </Reveal>

          <Stagger as="ul" className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-3 lg:gap-10" gap={0.08}>
            {tracks.map((track, i) => (
              <StaggerItem as="li" key={track.title} className="flex flex-col border-t border-ink pt-6">
                <span className="font-ui text-[0.7rem] tracking-[0.22em] text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl leading-tight text-ink">{track.title}</h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                  {track.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What we shape to a brief */}
      <section className="border-b border-rule bg-paper" aria-labelledby="bespoke-caps">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-28">
          <Reveal>
            <h2
              id="bespoke-caps"
              className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted"
            >
              {tD("capsTitle")}
            </h2>
          </Reveal>
          <Grid items={CAPS.map((c) => ({ title: tD(`cap_${c}_t`), body: tD(`cap_${c}_b`) }))} />
        </div>
      </section>

      {/* How a large order runs */}
      <section className="border-b border-rule bg-surface" aria-labelledby="bespoke-points">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-28">
          <Reveal>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
              {tH("pointsTitle")}
            </p>
            <h2
              id="bespoke-points"
              className="mt-5 max-w-[22ch] font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08] text-ink"
            >
              {tH("title")}
            </h2>
          </Reveal>
          <Grid items={POINTS.map((p) => ({ title: tH(`p_${p}_t`), body: tH(`p_${p}_b`) }))} />
        </div>
      </section>

      {/* What makes a brief quotable */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <h2 className="max-w-[22ch] font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.1] text-ink">
              {tD("needTitle")}
            </h2>
            <p className="mt-5 max-w-[60ch] font-body text-base leading-relaxed text-ink-muted sm:text-lg">
              {tD("needBody")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
