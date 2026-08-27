import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
        <h1 className="font-display text-4xl leading-tight tracking-wide text-ink sm:text-5xl lg:text-[3.25rem]">
          {t("title")}
        </h1>

        <div className="mt-12 space-y-7 font-body text-lg leading-relaxed text-ink-muted sm:mt-14 sm:text-xl sm:leading-[1.7]">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>

        <figure className="mt-12 sm:mt-14">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/5">
            <Image
              src="/assets/images/site/Wool-Silk-scaled.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover object-center"
            />
          </div>
        </figure>

        <p className="mt-12 font-body text-lg leading-relaxed text-ink sm:mt-14 sm:text-xl sm:leading-[1.7]">
          {t("p3")}
        </p>
      </article>
    </main>
  );
}
