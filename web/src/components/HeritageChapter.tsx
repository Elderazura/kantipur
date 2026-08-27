import { getTranslations } from "next-intl/server";

export default async function HeritageChapter() {
  const t = await getTranslations("home");

  return (
    <section className="chapter-reveal bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-10 sm:py-32 lg:py-36">
        <h2 className="font-display text-3xl leading-tight tracking-wide sm:text-4xl lg:text-[2.75rem]">
          {t("heritageTitle")}
        </h2>
        <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-paper/85 sm:text-xl">
          {t("heritageBody")}
        </p>
      </div>
    </section>
  );
}
