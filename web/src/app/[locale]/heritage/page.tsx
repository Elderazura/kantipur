import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeritagePageView from "@/components/heritage/HeritagePageView";
import { localeAlternates, siteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "heritagePage" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("heroTitle"),
    description: t("heroLead"),
    alternates: {
      canonical: `/${locale}/heritage`,
      languages: localeAlternates("/heritage"),
    },
    openGraph: {
      title: `${t("heroTitle")} — ${tMeta("siteName")}`,
      description: t("heroLead"),
      url: `${siteUrl()}/${locale}/heritage`,
    },
  };
}

export default async function HeritagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeritagePageView />;
}
