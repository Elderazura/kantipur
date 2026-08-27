import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeroBackdrop from "./HeroBackdrop";
import WhatsAppCta from "./WhatsAppCta";

export default async function AtmosphereHero() {
  const t = await getTranslations("home");
  const tCta = await getTranslations("cta");
  const tMeta = await getTranslations("meta");

  return (
    <section
      aria-label={tMeta("siteName")}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      <HeroBackdrop posterAlt={t("heroPosterAlt")} />

      {/* Layered veil — film grain of ink, not a flat wash */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,transparent_0%,rgba(26,20,16,0.35)_45%,rgba(26,20,16,0.82)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-32 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <p className="mb-6 font-ui text-[0.7rem] tracking-[0.28em] uppercase text-paper/70">
          {t("heroEyebrow")}
        </p>
        <h1 className="max-w-[14ch] font-display text-[clamp(3.5rem,14vw,8.5rem)] leading-[0.88] tracking-[0.01em] text-paper">
          {tMeta("siteName").split(" ")[0]}
        </h1>
        <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-paper/90 sm:text-xl md:text-2xl">
          {t("heroLine")}
        </p>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-4">
          <Link
            href="/collection"
            className="inline-flex min-h-11 items-center font-ui text-sm tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[8px] transition-colors hover:text-paper/90"
          >
            {tCta("exploreCollection")}
          </Link>
          <WhatsAppCta className="inline-flex min-h-11 items-center font-ui text-sm tracking-[0.16em] uppercase text-paper/85 underline decoration-paper/35 underline-offset-[8px] transition-colors hover:text-paper hover:decoration-paper" />
        </div>
      </div>
    </section>
  );
}
