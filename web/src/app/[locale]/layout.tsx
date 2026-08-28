import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteUrl, localeAlternates, OG_IMAGE } from "@/lib/seo";
import { fraunces, sourceSerif, dmSans } from "@/lib/fonts";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeaderSpacer from "@/components/HeaderSpacer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/jsonld";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1814",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("siteName");
  const description = t("tagline");

  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `${title} — ${description}`, template: `%s — ${title}` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: localeAlternates("/"),
    },
    openGraph: {
      type: "website",
      siteName: title,
      title: `${title} — ${description}`,
      description,
      url: `/${locale}`,
      locale,
      images: [{ url: OG_IMAGE, width: 1300, height: 864, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${description}`,
      description,
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fraunces.variable} ${sourceSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden font-body">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={[organizationJsonLd(locale), webSiteJsonLd(locale)]} />
          <SiteHeader />
          <HeaderSpacer />
          {children}
          <SiteFooter />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
