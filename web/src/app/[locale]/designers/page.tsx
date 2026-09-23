import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import TradePage from "@/components/TradePage";
import { localeAlternates } from "@/lib/seo";

const CAPS = ["dimensions", "colour", "design", "material", "knot", "project", "shipping"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "designers" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: `/${locale}/designers`,
      languages: localeAlternates("/designers"),
    },
  };
}

export default async function DesignersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("designers");

  return (
    <TradePage
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
      image="/assets/images/site/IMG_9255-scaled.jpg"
      imageAlt={t("imageAlt")}
      itemsTitle={t("capsTitle")}
      items={CAPS.map((c) => ({ title: t(`cap_${c}_t`), body: t(`cap_${c}_b`) }))}
      closingTitle={t("needTitle")}
      closingBody={t("needBody")}
      ctaLabel={t("cta")}
    />
  );
}
