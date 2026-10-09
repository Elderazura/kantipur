import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CollectionFilters from "@/components/CollectionFilters";
import CollectionGrid from "@/components/CollectionGrid";
import CollectionIntro from "@/components/CollectionIntro";
import type { PieceCardProduct } from "@/components/PieceCard";
import {
  filterProducts,
  getAllProducts,
  fibreFacets,
  colourFacets,
  knotFacets,
} from "@/lib/catalog";
import { toPublicImageSrc } from "@/lib/images";
import { localeAlternates } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionJsonLd } from "@/lib/jsonld";

function decodeParam(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function toCardProduct(
  product: ReturnType<typeof getAllProducts>[number],
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collection" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/collection`,
      languages: localeAlternates("/collection"),
    },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    fibre?: string | string[];
    colour?: string | string[];
    knots?: string | string[];
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const fibre = decodeParam(sp.fibre);
  const colour = decodeParam(sp.colour);
  const knotsRaw = decodeParam(sp.knots);
  const knots = knotsRaw && /^\d+$/.test(knotsRaw) ? Number(knotsRaw) : undefined;
  const t = await getTranslations("collection");

  const galleryReady = getAllProducts().filter((p) => p.primaryImage);
  const products = filterProducts({ fibre, colour, knots }).filter((p) => p.primaryImage);
  const hasFilters = Boolean(fibre || colour || knots);
  const filterKey = `${fibre ?? ""}|${colour ?? ""}|${knots ?? ""}`;
  const cardProducts = products
    .map(toCardProduct)
    .filter((p): p is PieceCardProduct => p !== null);

  const tNav = await getTranslations("nav");

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <JsonLd
        data={[
          collectionJsonLd(locale, t("title"), t("intro"), galleryReady),
          breadcrumbJsonLd(locale, [
            { name: tNav("home"), path: "/" },
            { name: tNav("collection"), path: "/collection" },
          ]),
        ]}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-10 sm:py-14 lg:max-w-7xl">
        <CollectionIntro total={galleryReady.length} />

        <div
          className="sticky z-30 -mx-5 border-b border-rule bg-paper/90 px-5 backdrop-blur-sm sm:-mx-10 sm:px-10"
          style={{ top: "var(--site-header-h, 4rem)" }}
        >
          <CollectionFilters
            fibres={fibreFacets(galleryReady)}
            colours={colourFacets(galleryReady)}
            knots={knotFacets(galleryReady)}
            activeFibre={fibre}
            activeColour={colour}
            activeKnots={knots}
            total={galleryReady.length}
            shown={products.length}
          />
        </div>

        <div className="mt-10 sm:mt-12">
          {cardProducts.length === 0 ? (
            <div className="py-16 text-center sm:py-20">
              <p className="font-body text-lg text-ink-muted sm:text-xl">{t("empty")}</p>
              <Link
                href="/collection"
                className="mt-6 inline-flex min-h-11 items-center font-ui text-sm tracking-[0.14em] uppercase text-madder underline decoration-madder/50 underline-offset-[6px] transition-colors hover:decoration-madder"
              >
                {t("reset")}
              </Link>
            </div>
          ) : (
            <CollectionGrid
              products={cardProducts}
              filterKey={filterKey}
              featuredLead={!hasFilters}
            />
          )}
        </div>
      </div>
    </main>
  );
}
