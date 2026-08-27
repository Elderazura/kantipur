import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WhatsAppCta from "./WhatsAppCta";

const HERO_IMAGE = "/assets/images/site/Nepali-Handmade-Carpet.png";

export default async function AtmosphereHero() {
  const t = await getTranslations("home");
  const tCta = await getTranslations("cta");
  const tMeta = await getTranslations("meta");

  return (
    <section
      aria-label={tMeta("siteName")}
      className="relative isolate min-h-[min(92vh,52rem)] w-full overflow-hidden bg-ink"
    >
      <Image
        src={HERO_IMAGE}
        alt="Weavers at vertical looms in a Nepali carpet workshop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[42%_35%] motion-safe:animate-[hero-drift_28s_ease-in-out_infinite_alternate]"
      />

      {/* Soft ink veil — keep type legible without washing out the craft */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25"
      />

      <div className="relative z-10 flex min-h-[min(92vh,52rem)] flex-col justify-end px-6 pb-14 pt-28 sm:px-10 sm:pb-20 lg:px-16">
        <div className="max-w-3xl">
          <h1 className="font-display text-[clamp(3.25rem,12vw,7.5rem)] leading-[0.92] tracking-[0.01em] text-paper">
            Kantipur
          </h1>
          <p className="mt-5 max-w-md font-body text-lg text-paper/90 sm:text-xl">
            {t("heroLine")}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/collection"
              className="inline-flex min-h-11 items-center font-ui text-sm tracking-[0.12em] uppercase text-paper underline decoration-paper/50 underline-offset-[6px] transition-colors hover:decoration-paper"
            >
              {tCta("exploreCollection")}
            </Link>
            <WhatsAppCta className="inline-flex min-h-11 items-center font-ui text-sm tracking-[0.12em] uppercase text-paper/90 underline decoration-paper/40 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper" />
          </div>
        </div>
      </div>
    </section>
  );
}
