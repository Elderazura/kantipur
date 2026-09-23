import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./motion/Reveal";

export const FAQ_KEYS = [
  "where",
  "custom",
  "materials",
  "order",
  "visit",
  "ethics",
  "lead",
  "shipping",
] as const;

export type FaqKey = (typeof FAQ_KEYS)[number];

export default async function FaqSection({
  id = "faq-heading",
  mobileLimit,
}: {
  id?: string;
  /** Collapse extra items below `md` — full list stays in the DOM for SEO. */
  mobileLimit?: number;
}) {
  const t = await getTranslations("faq");
  const tCta = await getTranslations("cta");

  return (
    <section
      className="border-t border-rule bg-paper"
      aria-labelledby={id}
    >
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-10 sm:py-16 lg:max-w-4xl lg:py-24">
        <Reveal>
          <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("eyebrow")}
          </p>
          <h2
            id={id}
            className="mt-5 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08] text-ink"
          >
            {t("title")}
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-muted sm:text-lg">
            {t("lead")}
          </p>
        </Reveal>

        <ul className="mt-8 divide-y divide-rule border-y border-rule sm:mt-10 md:mt-12">
          {FAQ_KEYS.map((key, index) => (
            <li
              key={key}
              className={
                mobileLimit !== undefined && index >= mobileLimit ? "hidden md:block" : undefined
              }
            >
              <details className="group">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base text-ink transition-colors hover:text-madder sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span>{t(`${key}_q`)}</span>
                  <span
                    aria-hidden
                    className="shrink-0 font-ui text-lg text-ink-muted transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-5 pe-8 font-body text-sm leading-relaxed text-ink-muted sm:pb-6 sm:text-base">
                  {t(`${key}_a`)}
                </div>
              </details>
            </li>
          ))}
        </ul>

        {mobileLimit !== undefined ? (
          <p className="mt-6 text-center md:hidden">
            <Link
              href="/contact"
              className="font-ui text-xs tracking-[0.16em] uppercase text-madder underline decoration-madder/40 underline-offset-[7px] hover:decoration-madder"
            >
              {tCta("inquire")}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}

export async function getFaqItems(locale: string) {
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace: "faq" });
  return FAQ_KEYS.map((key) => ({
    question: t(`${key}_q`),
    answer: t(`${key}_a`),
  }));
}
