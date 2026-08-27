import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CustomInvite() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <section className="chapter-reveal bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-10 sm:py-32">
        <h2 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
          {t("customTitle")}
        </h2>
        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink-muted">
          {t("customBody")}
        </p>
        <Link
          href="/custom"
          className="mt-10 inline-flex min-h-11 items-center font-ui text-sm tracking-[0.14em] uppercase text-madder underline decoration-madder/50 underline-offset-[6px] transition-colors hover:decoration-madder"
        >
          {tNav("custom")}
        </Link>
      </div>
    </section>
  );
}
