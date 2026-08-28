import { getTranslations } from "next-intl/server";
import CollectionFiltersBar from "./CollectionFiltersBar";
import type { Fibre } from "@/lib/vocabulary";
import { FIBRE_LABELS, colourSlug } from "@/lib/vocabulary";

type Facets = {
  fibres: { key: Fibre; count: number }[];
  colours: { slug: string; label: string; count: number }[];
  knots: { knots: number; count: number }[];
};

type CollectionFiltersProps = Facets & {
  activeFibre?: string;
  activeColour?: string;
  activeKnots?: number;
  total: number;
  shown: number;
};

export default async function CollectionFilters({
  fibres,
  colours,
  knots,
  activeFibre,
  activeColour,
  activeKnots,
  total,
  shown,
}: CollectionFiltersProps) {
  const tf = await getTranslations("fibre");
  const tc = await getTranslations("colour");

  const fibreLabel = (k: Fibre) => (tf.has(k) ? tf(k) : FIBRE_LABELS[k]);
  const colourLabel = (slug: string, fallback: string) =>
    tc.has(slug) ? tc(slug) : fallback;

  return (
    <CollectionFiltersBar
      fibres={fibres.map((f) => ({
        value: f.key,
        label: fibreLabel(f.key),
        count: f.count,
      }))}
      colours={colours.map((c) => ({
        value: c.slug,
        label: colourLabel(c.slug, c.label),
        count: c.count,
      }))}
      knots={knots.map((k) => ({
        value: k.knots,
        label: `${k.knots} K.N.`,
        count: k.count,
      }))}
      activeFibre={activeFibre}
      activeColour={activeColour}
      activeKnots={activeKnots}
      total={total}
      shown={shown}
    />
  );
}

export { colourSlug };
