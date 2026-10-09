import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import InquireForm from "@/components/InquireForm";
import { localeAlternates } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: localeAlternates("/contact"),
    },
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string | string[] }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const rawRef = Array.isArray(sp.ref) ? sp.ref[0] : sp.ref;
  let carpetRef: string | undefined;
  if (rawRef) {
    try {
      carpetRef = decodeURIComponent(rawRef);
    } catch {
      carpetRef = rawRef;
    }
  }

  const tNav = await getTranslations("nav");

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <JsonLd
        data={[
          pageJsonLd(locale, "ContactPage", "/contact", t("title"), t("intro")),
          breadcrumbJsonLd(locale, [
            { name: tNav("home"), path: "/" },
            { name: tNav("contact"), path: "/contact" },
          ]),
        ]}
      />
      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-10 sm:py-20 lg:py-28 xl:max-w-4xl">
        <header>
          <h1 className="text-balance font-display text-3xl leading-tight tracking-wide text-ink sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-ink-muted sm:text-xl">
            {t("intro")}
          </p>
        </header>

        <div className="mt-12 space-y-4 border-t border-rule pt-10 sm:mt-14">
          <p className="font-body text-base text-ink">
            <span className="font-ui text-xs tracking-[0.14em] uppercase text-ink-muted">
              {t("phoneLabel")}
            </span>
            <br />
            <a
              href={`tel:${t("phone").replace(/\s/g, "")}`}
              className="inline-flex min-h-11 items-center text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {t("phone")}
            </a>
          </p>
          <p className="font-body text-base text-ink">
            <span className="font-ui text-xs tracking-[0.14em] uppercase text-ink-muted">
              {t("emailLabel")}
            </span>
            <br />
            <a
              href={`mailto:${t("emailPrimary")}`}
              className="inline-flex min-h-11 items-center text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {t("emailPrimary")}
            </a>
            <br />
            <a
              href={`mailto:${t("emailSecondary")}`}
              className="inline-flex min-h-11 items-center text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              {t("emailSecondary")}
            </a>
          </p>
        </div>

        <div className="mt-12 border-t border-rule pt-10 sm:mt-14">
          <InquireForm carpetRef={carpetRef} />
        </div>
      </div>
    </main>
  );
}
