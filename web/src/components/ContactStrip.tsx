import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WhatsAppCta from "./WhatsAppCta";

export default async function ContactStrip() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <section className="chapter-reveal border-t border-rule bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-24">
        <h2 className="max-w-md font-display text-3xl tracking-wide text-ink sm:text-4xl">
          {t("contactTitle")}
        </h2>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <WhatsAppCta />
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center font-ui text-sm tracking-wide text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {tNav("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
