import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AtmosphereHero from "@/components/AtmosphereHero";
import StatementSection from "@/components/StatementSection";
import CarpetMacro from "@/components/CarpetMacro";
import ClosingInvitation from "@/components/ClosingInvitation";
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
    // title.template on a layout does not apply to a page in the same route
    // segment, so the homepage has to carry the brand itself.
    title: `${t("homeTitle")} — ${t("siteName")}`,
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
      <StatementSection />
      <CarpetMacro />
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
        ctaHref="/bespoke"
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
      <ClosingInvitation />
    </main>
  );
}
