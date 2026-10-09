import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeritagePageView from "@/components/heritage/HeritagePageView";
import WorldReach from "@/components/WorldReach";
import { Reveal } from "@/components/motion/Reveal";
import { localeAlternates } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("p1"),
    alternates: {
      canonical: `/${locale}/house`,
      languages: localeAlternates("/house"),
    },
  };
}

/** The firm itself — what /about carried alone, now inside the House story. */
async function Company() {
  const t = await getTranslations("about");

  return (
    <>
      <section className="border-b border-rule bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="max-w-[20ch] font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08] text-ink">
                {t("title")}
              </h2>
            </Reveal>
            {(["p1", "p2", "p3"] as const).map((k, i) => (
              <Reveal key={k} delay={(i + 1) * 0.08}>
                <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                  {t(k)}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/images/site/Wool-Silk-scaled.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 46vw, 600px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <WorldReach />
    </>
  );
}

export default async function HousePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={[
          pageJsonLd(locale, "AboutPage", "/house", t("title"), t("p1")),
          breadcrumbJsonLd(locale, [
            { name: tNav("home"), path: "/" },
            { name: tNav("about"), path: "/house" },
          ]),
        ]}
      />
      <HeritagePageView company={<Company />} />
    </>
  );
}
