import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CommissionForm from "@/components/CommissionForm";
import CustomPageView from "@/components/CustomPageView";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "custom" });
  return {
    title: t("title"),
    description: t("heroLead"),
    alternates: {
      canonical: `/${locale}/custom`,
      languages: localeAlternates("/custom"),
    },
  };
}

export default async function CustomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "commission" });

  return (
    <>
      <CustomPageView />

      <section id="begin" className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-10 sm:py-28">
          <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("pageEyebrow")}
          </p>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.06] text-ink">
            {t("pageTitle")}
          </h2>
          <p className="mt-5 max-w-[52ch] font-body text-base leading-relaxed text-ink-muted sm:text-lg">
            {t("pageLead")}
          </p>
          <div className="mt-12">
            <CommissionForm />
          </div>
        </div>
      </section>
    </>
  );
}
