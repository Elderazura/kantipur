import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal, WordsUp } from "./motion/Reveal";

/**
 * A held pause after the hero: one claim, centred, with nothing competing.
 * The whole point is the space around it, so resist adding anything here.
 */
export default async function StatementSection() {
  const t = await getTranslations("statement");

  return (
    <section className="bg-paper">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center sm:px-10 sm:py-32 lg:py-44">
        <h2 className="font-display text-[clamp(2.1rem,6.2vw,4.5rem)] leading-[1.02] tracking-[0.01em] text-ink">
          <WordsUp text={t("title")} />
        </h2>

        <Reveal delay={0.18}>
          <p className="mt-8 max-w-[44ch] font-body text-base leading-relaxed text-ink-muted sm:mt-10 sm:text-lg">
            {t("body")}
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <Link
            href="/about"
            className="group mt-10 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.2em] uppercase text-madder underline decoration-madder/35 underline-offset-[8px] transition-colors hover:decoration-madder sm:mt-12"
          >
            {t("cta")}
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
  );
}
