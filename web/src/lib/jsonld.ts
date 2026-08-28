import type { Product } from "@/types/product";
import { routing } from "@/i18n/routing";
import { OG_IMAGE, siteUrl } from "./seo";

export type FaqItem = { question: string; answer: string };

export function organizationJsonLd(locale: string) {
  const url = `${siteUrl()}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kantipur Carpet Craft Industries",
    alternateName: "Kantipur Carpets",
    url,
    logo: `${siteUrl()}${OG_IMAGE}`,
    description:
      "Hand-knotted Nepalese carpets woven in Kathmandu workshops — wool, silk, hemp, and natural fibres.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "hand-knotted carpets",
      "Nepalese rugs",
      "custom carpet commissions",
      "natural fibre weaving",
    ],
  };
}

export function webSiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kantipur Carpets",
    url: `${siteUrl()}/${locale}`,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: "Kantipur Carpet Craft Industries" },
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function productJsonLd(product: Product, locale: string) {
  const path = `/collection/${product.slug}`;
  const url = `${siteUrl()}/${locale}${path}`;
  const image = product.primaryImage
    ? `${siteUrl()}${product.primaryImage.startsWith("/") ? product.primaryImage : `/${product.primaryImage}`}`
    : `${siteUrl()}${OG_IMAGE}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: [product.material, product.quality, product.colour].filter(Boolean).join(" · "),
    image,
    url,
    brand: { "@type": "Brand", name: "Kantipur Carpets" },
    category: "Hand-knotted carpet",
    material: product.material ?? undefined,
    additionalProperty: product.knots
      ? [{ "@type": "PropertyValue", name: "Knot count", value: String(product.knots) }]
      : undefined,
  };
}

export function breadcrumbJsonLd(
  locale: string,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl()}/${locale}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function allLocalePaths(path: string): string[] {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return routing.locales.map((locale) => `/${locale}${clean}`);
}
