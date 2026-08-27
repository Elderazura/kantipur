import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type CollectionFiltersProps = {
  materials: string[];
  colours: string[];
  activeMaterial?: string;
  activeColour?: string;
};

function collectionHref(material?: string, colour?: string): string {
  const params = new URLSearchParams();
  if (material) params.set("material", material);
  if (colour) params.set("colour", colour);
  const query = params.toString();
  return query ? `/collection?${query}` : "/collection";
}

function isActive(value: string, active?: string): boolean {
  return active != null && value.toLowerCase() === active.toLowerCase();
}

export default async function CollectionFilters({
  materials,
  colours,
  activeMaterial,
  activeColour,
}: CollectionFiltersProps) {
  const t = await getTranslations("collection");
  const hasFilters = Boolean(activeMaterial || activeColour);

  return (
    <nav
      aria-label={t("filtersLabel")}
      className="border-y border-rule py-8 sm:py-10"
    >
      <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:gap-16">
        <div className="min-w-0 flex-1">
          <p className="font-ui text-xs tracking-[0.18em] uppercase text-ink-muted">
            {t("material")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link
                href={collectionHref(undefined, activeColour)}
                className={`font-body text-sm transition-colors hover:text-madder ${
                  !activeMaterial ? "text-ink underline decoration-rule underline-offset-4" : "text-ink-muted"
                }`}
              >
                {t("allMaterials")}
              </Link>
            </li>
            {materials.map((material) => (
              <li key={material}>
                <Link
                  href={collectionHref(material, activeColour)}
                  className={`font-body text-sm transition-colors hover:text-madder ${
                    isActive(material, activeMaterial)
                      ? "text-ink underline decoration-rule underline-offset-4"
                      : "text-ink-muted"
                  }`}
                >
                  {material}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-ui text-xs tracking-[0.18em] uppercase text-ink-muted">
            {t("colour")}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link
                href={collectionHref(activeMaterial, undefined)}
                className={`font-body text-sm transition-colors hover:text-madder ${
                  !activeColour ? "text-ink underline decoration-rule underline-offset-4" : "text-ink-muted"
                }`}
              >
                {t("allColours")}
              </Link>
            </li>
            {colours.map((colour) => (
              <li key={colour}>
                <Link
                  href={collectionHref(activeMaterial, colour)}
                  className={`font-body text-sm transition-colors hover:text-madder ${
                    isActive(colour, activeColour)
                      ? "text-ink underline decoration-rule underline-offset-4"
                      : "text-ink-muted"
                  }`}
                >
                  {colour}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hasFilters ? (
        <p className="mt-8 font-body text-sm text-ink-muted">
          <Link
            href="/collection"
            className="text-madder underline decoration-madder/50 underline-offset-4 transition-colors hover:decoration-madder"
          >
            {t("reset")}
          </Link>
        </p>
      ) : null}
    </nav>
  );
}
