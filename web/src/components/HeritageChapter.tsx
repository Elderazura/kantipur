import { getTranslations } from "next-intl/server";

export default async function HeritageChapter() {
  const t = await getTranslations("home");

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-10 lg:py-40">
        <div className="lg:col-span-5 lg:pt-4">
          <p className="font-ui text-[0.7rem] tracking-[0.24em] uppercase text-paper/55">
            {t("heritageEyebrow")}
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-wide">
            {t("heritageTitle")}
          </h2>
        </div>

        <div className="lg:col-span-7 lg:border-s lg:border-paper/15 lg:ps-12">
          <p className="font-display text-2xl leading-snug text-paper/95 sm:text-3xl">
            {t("heritagePull")}
          </p>
          <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-paper/75">
            {t("heritageBody")}
          </p>

          <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-paper/15 pt-10 sm:grid-cols-3">
            <div>
              <dt className="font-ui text-[0.72rem] tracking-[0.2em] uppercase text-paper/50">
                {t("statLoomsLabel")}
              </dt>
              <dd className="mt-2 font-display text-4xl text-paper sm:text-5xl">
                {t("statLooms")}
              </dd>
            </div>
            <div>
              <dt className="font-ui text-[0.72rem] tracking-[0.2em] uppercase text-paper/50">
                {t("statWeaversLabel")}
              </dt>
              <dd className="mt-2 font-display text-4xl text-paper sm:text-5xl">
                {t("statWeavers")}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="font-ui text-[0.72rem] tracking-[0.2em] uppercase text-paper/50">
                {t("statDesignsLabel")}
              </dt>
              <dd className="mt-2 font-display text-4xl text-paper sm:text-5xl">
                {t("statDesigns")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
