import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal, Stagger, StaggerItem, WordsUp, Parallax } from "./motion/Reveal";

const PILLARS = ["hands", "family", "fair"] as const;

export default async function PeopleSection() {
  const t = await getTranslations("people");

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Parallax distance={30} className="absolute inset-[-10%]">
                <Image
                  src="/assets/images/site/Nepali-Handmade-Carpet.jpg"
                  alt={t("imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 48vw, 620px"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
                {t("eyebrow")}
              </p>
            </Reveal>

            <h2 className="mt-6 max-w-[23ch] font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.06] text-ink">
              <WordsUp text={t("title")} />
            </h2>

            <Reveal delay={0.12}>
              <p className="mt-7 font-body text-lg leading-relaxed text-ink-muted">
                {t("lead")}
              </p>
            </Reveal>

            <Stagger as="ul" className="mt-10 flex flex-col" gap={0.1}>
              {PILLARS.map((p) => (
                <StaggerItem
                  as="li"
                  key={p}
                  className="border-t border-rule py-6 last:border-b"
                >
                  <h3 className="font-display text-lg text-ink">{t(`${p}Title`)}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                    {t(`${p}Body`)}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.15}>
              <Link
                href="/heritage"
                className="group mt-9 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
              >
                {t("cta")}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
