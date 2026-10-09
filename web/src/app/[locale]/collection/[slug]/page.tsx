import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import InquireForm from "@/components/InquireForm";
import PieceGallery from "@/components/PieceGallery";
import PieceStandards from "@/components/PieceStandards";
import RelatedPieces from "@/components/RelatedPieces";
import type { PieceCardProduct } from "@/components/PieceCard";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { localeAlternates, OG_IMAGE } from "@/lib/seo";
import { toPublicImageSrc } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/jsonld";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  // A piece with no usable frame has nothing to show, so it gets no page —
  // matching the collection grid and the sitemap, which both skip them.
  return getAllProducts()
    .filter((product) => product.primaryImage)
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !product.primaryImage) return {};

  const t = await getTranslations({ locale, namespace: "piece" });
  const facts = [
    product.designNo ? `${t("designNo")} ${product.designNo}` : null,
    product.quality,
    product.colour,
    product.sizes[0]?.size ? `${product.sizes[0].size} cm` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const image = product.primaryImage ? toPublicImageSrc(product.primaryImage) : OG_IMAGE;
  const path = `/collection/${product.slug}`;

  return {
    title: product.name,
    description: facts || product.name,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: localeAlternates(path),
    },
    openGraph: {
      type: "article",
      title: product.name,
      description: facts || product.name,
      url: `/${locale}${path}`,
      images: [{ url: image, alt: product.name }],
    },
  };
}

function toCardProduct(
  product: NonNullable<ReturnType<typeof getProductBySlug>>,
): PieceCardProduct | null {
  if (!product.primaryImage) return null;
  return {
    slug: product.slug,
    name: product.name,
    material: product.material,
    colour: product.colour,
    knots: product.knots,
    image: toPublicImageSrc(product.primaryImage),
  };
}

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  // No usable frame means no page — the grid and sitemap skip these too, so
  // serving an empty gallery would only be a dead end for a visitor.
  if (!product || !product.primaryImage) notFound();

  const t = await getTranslations("piece");
  const tCta = await getTranslations("cta");

  const carpetRef = `${product.designNo ?? product.slug} — ${product.name}`;
  const sizesLabel =
    product.sizes.length > 0
      ? product.sizes.map((s) => (s.pcs > 1 ? `${s.size} (${s.pcs})` : s.size)).join(", ")
      : null;

  const specs: { label: string; value: string }[] = [];
  if (product.designNo) specs.push({ label: t("designNo"), value: product.designNo });
  if (product.material) specs.push({ label: t("material"), value: product.material });
  if (product.quality) specs.push({ label: t("quality"), value: product.quality });
  if (product.colour) specs.push({ label: t("colour"), value: product.colour });
  if (sizesLabel) specs.push({ label: t("sizes"), value: sizesLabel });

  const related = getRelatedProducts(product, 4)
    .map(toCardProduct)
    .filter((p): p is PieceCardProduct => p !== null);

  const tNav = await getTranslations("nav");
  const path = `/collection/${product.slug}`;

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <JsonLd
        data={[
          productJsonLd(product, locale),
          breadcrumbJsonLd(locale, [
            { name: tNav("home"), path: "/" },
            { name: tNav("collection"), path: "/collection" },
            { name: product.name, path },
          ]),
        ]}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-14 lg:max-w-7xl lg:py-16">
        <Link
          href="/collection"
          className="inline-flex min-h-10 items-center font-ui text-xs tracking-[0.14em] uppercase text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          {t("backToCollection")}
        </Link>

        <div className="mt-8 grid gap-10 sm:mt-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <PieceGallery images={product.images} name={product.name} />

          <div className="flex flex-col">
            <h1 className="text-balance font-display text-3xl leading-tight tracking-wide text-ink sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>

            {specs.length > 0 ? (
              <dl className="mt-8 space-y-0 border-t border-rule pt-6 sm:mt-10 sm:space-y-4 sm:pt-8">
                {specs.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 border-b border-rule py-4 last:border-b-0 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-x-4 sm:border-b-0 sm:py-0"
                  >
                    <dt className="font-ui text-xs tracking-[0.14em] uppercase text-ink-muted">
                      {row.label}
                    </dt>
                    <dd className="break-words font-body text-base text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <p className="mt-10 font-body text-lg text-ink-muted">{tCta("inquirePricing")}</p>

            <div className="mt-12 border-t border-rule pt-10">
              <h2 className="font-display text-2xl tracking-wide text-ink">{t("inquireTitle")}</h2>
              <div className="mt-8">
                <InquireForm carpetRef={carpetRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PieceStandards />
      <RelatedPieces products={related} />
    </main>
  );
}
