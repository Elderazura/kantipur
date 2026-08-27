import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CustomInvite() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <section className="chapter-reveal relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-16 top-0 font-display text-[min(40vw,18rem)] leading-none text-paper/[0.04] select-none"
      >
        25×40
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="font-ui text-[0.7rem] tracking-[0.24em] uppercase text-paper/50">
            {t("customEyebrow")}
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-wide">
            {t("customTitle")}
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="font-body text-lg leading-relaxed text-paper/75">
            {t("customBody")}
          </p>
          <Link
            href="/custom"
            className="mt-8 inline-flex min-h-11 items-center font-ui text-sm tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[8px]"
          >
            {tNav("custom")}
          </Link>
        </div>
      </div>
    </section>
  );
}
