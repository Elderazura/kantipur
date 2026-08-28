import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./motion/Reveal";

export default async function CustomInvite() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl lg:max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative flex flex-col justify-end px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -end-16 top-0 font-display text-[min(28vw,12rem)] leading-none text-paper/[0.04] select-none"
          >
            TO FIT
          </div>
          <Reveal>
            <p className="font-ui text-[0.7rem] tracking-[0.24em] uppercase text-paper/50">
              {t("customEyebrow")}
            </p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-wide">
              {t("customTitle")}
            </h2>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-paper/75">
              {t("customBody")}
            </p>
            <Link
              href="/custom"
              className="mt-8 inline-flex min-h-11 items-center font-ui text-sm tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[8px]"
            >
              {tNav("custom")}
            </Link>
          </Reveal>
        </div>

        <Reveal className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
          <Image
            src="/assets/images/custom/path-visit.jpg"
            alt={t("customImageAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover object-[center_15%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent lg:from-ink/80 lg:via-transparent"
          />
        </Reveal>
      </div>
    </section>
  );
}
