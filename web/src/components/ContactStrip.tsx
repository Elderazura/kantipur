import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WhatsAppCta from "./WhatsAppCta";

export default async function ContactStrip() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <section className="chapter-reveal border-t border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <p className="font-ui text-[0.7rem] tracking-[0.24em] uppercase text-ink-muted">
          {t("contactEyebrow")}
        </p>
        <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-wide text-ink">
            {t("contactTitle")}
          </h2>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 lg:pb-2">
            <WhatsAppCta />
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center font-ui text-sm tracking-[0.14em] uppercase text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              {tNav("contact")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
