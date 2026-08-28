"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { Reveal, WordsUp } from "./motion/Reveal";

/** Dot pitch in px — smaller pitch reads as a denser weave. */
const GRADES = [
  { knots: 60, pitch: 13 },
  { knots: 80, pitch: 9.5 },
  { knots: 100, pitch: 6.5 },
] as const;

export default function KnotCraft() {
  const t = useTranslations("knot");
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number>(80);
  const grade = GRADES.find((g) => g.knots === active) ?? GRADES[1];

  return (
    <section className="border-y border-rule bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-32">
        <Reveal>
          <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("eyebrow")}
          </p>
        </Reveal>

        <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(1.9rem,4.6vw,3.4rem)] leading-[1.06] text-ink">
          <WordsUp text={t("title")} />
        </h2>

        <Reveal delay={0.12}>
          <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-ink-muted">
            {t("lead")}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
          {/* The Senna loop, in three plain steps */}
          <Reveal>
            <ol className="flex flex-col">
              {[1, 2, 3].map((n, i) => (
                <li
                  key={n}
                  className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-rule py-6 last:border-b"
                >
                  <span className="font-display text-lg text-madder">{`0${n}`}</span>
                  <div>
                    <h3 className="font-display text-lg text-ink">{t(`step${n}Title`)}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                      {t(`step${n}Body`)}
                    </p>
                  </div>
                  <motion.span
                    aria-hidden
                    className="col-span-2 h-px origin-left bg-madder/40"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={reduce ? undefined : { scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                </li>
              ))}
            </ol>

            <p className="mt-7 font-body text-sm leading-relaxed text-ink-muted">
              {t("uniqueNote")}
            </p>
          </Reveal>

          {/* Density: pick a grade, watch the weave tighten */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden border border-rule bg-paper">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/assets/images/products/hemp-wool-carpet-stock/TC-1468-B-BLACK-80-K.N.-HEMP-WOOL-CLOSE-VIEW-1.jpg"
                  alt={t("macroAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <motion.div
                  aria-hidden
                  key={grade.knots}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(237,230,217,0.92) 40%, transparent 42%)",
                    backgroundSize: `${grade.pitch}px ${grade.pitch}px`,
                    mixBlendMode: "overlay",
                  }}
                />
              </div>

              <div className="flex" role="group" aria-label={t("eyebrow")}>
                {GRADES.map((g) => {
                  const on = g.knots === active;
                  return (
                    <button
                      key={g.knots}
                      type="button"
                      onClick={() => setActive(g.knots)}
                      aria-pressed={on}
                      className={`flex-1 border-t border-rule px-2 py-3.5 font-ui text-[0.65rem] tracking-[0.08em] transition-colors first:border-s-0 sm:px-3 sm:py-4 sm:text-xs sm:tracking-[0.12em] [&+&]:border-s [&+&]:border-s-rule ${
                        on ? "bg-ink text-paper" : "text-ink-muted hover:bg-surface hover:text-ink"
                      }`}
                    >
                      <span dir="ltr">{g.knots} K.N.</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">
              {t(`density${active}`)}
            </p>

            <Link
              href={`/collection?knots=${active}`}
              className="group mt-5 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
            >
              {t("seeGrade", { knots: active })}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
