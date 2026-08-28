import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeroBackdrop from "./HeroBackdrop";
import HeroCopy from "./HeroCopy";

export default async function AtmosphereHero() {
  const t = await getTranslations("home");
  const tCta = await getTranslations("cta");
  const tMeta = await getTranslations("meta");

  return (
    <section
      aria-label={tMeta("siteName")}
      className="relative isolate min-h-[100svh] min-h-[100dvh] w-full overflow-hidden bg-ink"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_20%,rgba(58,48,40,0.55)_0%,rgba(26,20,16,1)_55%)]"
      />
      <HeroBackdrop />

      {/* Lighter than a flat wash: the film stays legible, the type still lands.
          A wedge from the lower-left carries the copy; the rest opens up. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,20,16,0.92)_0%,rgba(26,20,16,0.55)_26%,rgba(26,20,16,0.12)_55%,rgba(26,20,16,0.28)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(26,20,16,0.72)_0%,rgba(26,20,16,0.28)_38%,transparent_66%)]"
      />

      <HeroCopy
        titleTop={t("heroTitleTop")}
        titleBottom={t("heroTitleBottom")}
        line={t("heroLine")}
        siteName={tMeta("siteName")}
        tagline={tMeta("tagline")}
        stats={[
          { value: t("statLooms"), label: t("statLoomsLabel") },
          { value: t("statWeavers"), label: t("statWeaversLabel") },
          { value: t("statDesigns"), label: t("statDesignsLabel") },
        ]}
      >
        <Link
          href="/collection"
          className="group inline-flex min-h-11 items-center gap-2 font-ui text-sm tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[8px] transition-colors hover:text-paper/90"
        >
          {tCta("exploreCollection")}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
            →
          </span>
        </Link>
      </HeroCopy>
    </section>
  );
}
