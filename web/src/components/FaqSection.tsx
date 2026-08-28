import { getTranslations } from "next-intl/server";
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

export default async function FaqSection({ id = "faq-heading" }: { id?: string }) {
  const t = await getTranslations("faq");

  return (
    <section
      className="border-t border-rule bg-paper"
      aria-labelledby={id}
    >
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-10 sm:py-20 lg:max-w-4xl lg:py-24">
        <Reveal>
          <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
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

        <ul className="mt-10 divide-y divide-rule border-y border-rule sm:mt-12">
          {FAQ_KEYS.map((key, index) => (
            <li key={key}>
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
