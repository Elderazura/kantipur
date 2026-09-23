import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TradePage from "@/components/TradePage";
import { localeAlternates } from "@/lib/seo";

const POINTS = ["scale", "spec", "repeat", "docs", "lead", "ship"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hospitality" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/hospitality`,
      languages: localeAlternates("/hospitality"),
    },
  };
}

export default async function HospitalityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hospitality");

  return (
    <TradePage
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
      image="/assets/images/site/IMG_9277-scaled.jpg"
      imageAlt={t("imageAlt")}
      itemsTitle={t("pointsTitle")}
      items={POINTS.map((p) => ({ title: t(`p_${p}_t`), body: t(`p_${p}_b`) }))}
      ctaLabel={t("cta")}
    />
  );
}
