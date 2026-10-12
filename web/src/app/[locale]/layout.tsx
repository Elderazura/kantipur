import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteUrl, localeAlternates, OG_IMAGE } from "@/lib/seo";
import { cormorant, inter, interUi } from "@/lib/fonts";
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
  // The house is ivory and charcoal in every condition. Declaring a single
  // scheme stops Chrome's Auto Dark Theme from re-tinting the page on a phone
  // set to dark, and keeps form fields and scrollbars on the light UA styling
  // iOS would otherwise invert.
  colorScheme: "light",
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
  const tNav = await getTranslations("nav");
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cormorant.variable} ${inter.variable} ${interUi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden font-body">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={[organizationJsonLd(locale), webSiteJsonLd(locale)]} />
          {/* Keyboard users land here first and can jump the header (WCAG 2.4.1). */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:inline-flex focus:min-h-11 focus:items-center focus:bg-ink focus:px-5 focus:py-3 focus:font-ui focus:text-xs focus:tracking-[0.18em] focus:uppercase focus:text-paper"
          >
            {tNav("skipToContent")}
          </a>
          <SiteHeader />
          <HeaderSpacer />
          <div id="main">{children}</div>
          <SiteFooter />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
