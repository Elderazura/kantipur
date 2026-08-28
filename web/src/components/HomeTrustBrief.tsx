import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./motion/Reveal";

const POINTS = ["adult", "handKnotted", "traceable"] as const;

/** Mobile-only trust block — one beat instead of People + Ethics + World Reach. */
export default async function HomeTrustBrief() {
  const tPeople = await getTranslations("people");
  const tStandards = await getTranslations("standards");

  return (
    <section
      className="border-y border-rule bg-surface md:hidden"
      aria-labelledby="home-trust-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Reveal>
          <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
            {tPeople("eyebrow")}
          </p>
          <h2
            id="home-trust-heading"
            className="mt-4 max-w-[16ch] font-display text-[clamp(1.5rem,6vw,2rem)] leading-[1.08] text-ink"
          >
            {tPeople("title")}
          </h2>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink-muted">
            {tPeople("lead")}
          </p>
        </Reveal>

        <ul className="mt-6 flex flex-col gap-2.5 border-t border-rule pt-6">
          {POINTS.map((key) => (
            <li key={key} className="flex items-baseline gap-3 font-body text-sm text-ink-muted">
              <span aria-hidden className="font-display text-madder">
                ·
              </span>
              <span className="font-display text-ink">{tStandards(`${key}Title`)}</span>
            </li>
          ))}
        </ul>

        <Reveal delay={0.08}>
          <Link
            href="/heritage"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
          >
            {tPeople("cta")}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
