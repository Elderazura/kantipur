import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CollectionFilters from "@/components/CollectionFilters";
import PieceCard from "@/components/PieceCard";
import { filterProducts, getAllProducts } from "@/lib/catalog";

function decodeParam(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function uniqueSorted(values: (string | null)[]): string[] {
  return [...new Set(values.filter((v): v is string => Boolean(v)))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ material?: string | string[]; colour?: string | string[] }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const material = decodeParam(sp.material);
  const colour = decodeParam(sp.colour);
  const t = await getTranslations("collection");

  const galleryReady = getAllProducts().filter((p) => p.primaryImage);
  const products = filterProducts({ material, colour }).filter((p) => p.primaryImage);

  const materials = uniqueSorted(galleryReady.map((p) => p.material));
  const colours = uniqueSorted(galleryReady.map((p) => p.colour));

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
        <header>
          <h1 className="font-display text-4xl leading-tight tracking-wide text-ink sm:text-5xl lg:text-[3.25rem]">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-ink-muted sm:text-xl">
            {t("intro")}
          </p>
        </header>

        <CollectionFilters
          materials={materials}
          colours={colours}
          activeMaterial={material}
          activeColour={colour}
        />

        {products.length === 0 ? (
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
          <ul
            key={`${material ?? ""}|${colour ?? ""}`}
            className="filter-crossfade grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => (
              <li key={product.slug}>
                <PieceCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
