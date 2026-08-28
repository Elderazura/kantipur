import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./motion/Reveal";

/** Mobile-only closing prompt — replaces the second full-bleed visit banner. */
export default async function HomeContactNudge() {
  const t = await getTranslations("home");
  const tCta = await getTranslations("cta");

  return (
    <section className="border-t border-rule bg-paper md:hidden">
      <div className="mx-auto max-w-6xl px-5 py-12 text-center">
        <Reveal>
          <p className="font-display text-[clamp(1.35rem,5vw,1.75rem)] leading-snug text-ink">
            {t("contactTitle")}
          </p>
          <Link
            href="/contact"
            className="group mt-5 inline-flex min-h-11 items-center gap-2 font-ui text-sm tracking-[0.16em] uppercase text-madder underline decoration-madder/40 underline-offset-[8px] hover:decoration-madder"
          >
            {tCta("inquire")}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
