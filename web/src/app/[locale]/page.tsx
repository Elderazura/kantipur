import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AtmosphereHero from "@/components/AtmosphereHero";
import HeritageStory from "@/components/HeritageStory";
import WorkshopFilms from "@/components/WorkshopFilms";
import KnotCraft from "@/components/KnotCraft";
import MaterialStrip from "@/components/MaterialStrip";
import FeaturedGrid from "@/components/FeaturedGrid";
import CtaBanner from "@/components/CtaBanner";
import CustomInvite from "@/components/CustomInvite";
import WorldReach from "@/components/WorldReach";
import PeopleSection from "@/components/PeopleSection";
import EthicalStandards from "@/components/EthicalStandards";
import HomeTrustBrief from "@/components/HomeTrustBrief";
import HomeContactNudge from "@/components/HomeContactNudge";
import FaqSection, { getFaqItems } from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/jsonld";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: localeAlternates("/"),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("banner");
  const tCta = await getTranslations("cta");
  const faqItems = await getFaqItems(locale);

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={faqPageJsonLd(faqItems)} />

      <AtmosphereHero />
      <HeritageStory />
      <WorkshopFilms />
      <div className="hidden md:block">
        <KnotCraft />
      </div>
      <MaterialStrip />
      <FeaturedGrid />

      <CtaBanner
        image="/assets/images/site/IMG_9277-scaled.jpg"
        imageAlt={t("commissionAlt")}
        eyebrow={t("commissionEyebrow")}
        title={t("commissionTitle")}
        ctaHref="/custom"
        ctaLabel={tCta("startCommission")}
      />
      <div className="hidden md:block">
        <CustomInvite />
        <WorldReach />
        <PeopleSection />
        <EthicalStandards />
      </div>
      <HomeTrustBrief />
      <FaqSection mobileLimit={4} />

      <div className="hidden md:block">
        <CtaBanner
          image="/assets/images/site/IMG_9255-scaled.jpg"
          imageAlt={t("visitAlt")}
          eyebrow={t("visitEyebrow")}
          title={t("visitTitle")}
          body={t("visitBody")}
          ctaHref="/contact"
          ctaLabel={t("visitCta")}
          height="short"
        />
      </div>
      <HomeContactNudge />
    </main>
  );
}
