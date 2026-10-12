import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal, WordsUp } from "./motion/Reveal";

/**
 * The last thing on the page: ivory, one sentence, one route onward.
 * Deliberately almost empty — everything before it has already argued.
 */
export default async function ClosingInvitation() {
  const t = await getTranslations("closing");

  return (
    <section className="border-t border-rule bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-24 text-center sm:px-10 sm:py-36 lg:py-48">
        <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.04] tracking-[0.01em] text-ink">
          <span className="block">
            <WordsUp text={t("title1")} />
          </span>
          {" "}
          <span className="block italic text-ink-muted">
            <WordsUp text={t("title2")} delay={0.2} />
          </span>
        </h2>

        <Reveal delay={0.35}>
          <Link
            href="/bespoke"
            className="group mt-12 inline-flex min-h-12 items-center gap-3 border border-ink px-7 py-4 font-ui text-xs tracking-[0.2em] uppercase text-ink transition-colors duration-300 hover:bg-ink hover:text-paper sm:mt-14"
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
