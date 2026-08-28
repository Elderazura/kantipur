/**
 * Controlled vocabulary for the catalogue.
 *
 * The scraped specs are free text typed by hand over several years, so the same
 * thing appears as "SILVER", "Silver", "Linen Bamboo" and "Linen bamboo". Facets
 * are built from these canonical keys instead of the raw strings, which both
 * removes the duplicate chips and gives translators one small list to work from
 * rather than one string per product.
 */

export const FIBRES = [
  "wool",
  "silk",
  "hemp",
  "nettle",
  "bamboo",
  "linen",
  "pashmina",
  "banana",
  "jute",
] as const;

export type Fibre = (typeof FIBRES)[number];

/** English display names; other locales come from the `fibre` message namespace. */
export const FIBRE_LABELS: Record<Fibre, string> = {
  wool: "Wool",
  silk: "Silk",
  hemp: "Hemp",
  nettle: "Nettle",
  bamboo: "Bamboo",
  linen: "Linen",
  pashmina: "Pashmina",
  banana: "Banana",
  jute: "Jute",
};

/**
 * Which fibres a piece is made of. A wool/linen/bamboo weave belongs under all
 * three, so this returns a set rather than a single bucket.
 */
export function fibresOf(input: {
  material?: string | null;
  categories?: { slug: string; name: string }[];
  quality?: string | null;
}): Fibre[] {
  const hay = [
    input.material || "",
    input.quality || "",
    ...(input.categories || []).flatMap((c) => [c.slug, c.name]),
  ]
    .join(" ")
    .toLowerCase();

  return FIBRES.filter((f) => hay.includes(f));
}

/** Colour spellings that mean the same thing. Keys are lowercased raw values. */
const COLOUR_SYNONYMS: Record<string, string> = {
  "natural white": "Natural White",
  "natural and white": "Natural White",
  "black and white": "Black & White",
  "black and brown": "Black & Brown",
  "silver and black": "Silver & Black",
  "d.beige": "Dark Beige",
  "d. beige": "Dark Beige",
  "light honey": "Light Honey",
  "light rose": "Light Rose",
  "burnt orange": "Burnt Orange",
  mix: "Mix",
  mixed: "Mix",
};

/** Collapse case and spelling variants to one display value. */
export function normaliseColour(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const key = raw.trim().replace(/\s+/g, " ").toLowerCase();
  if (!key) return null;
  if (COLOUR_SYNONYMS[key]) return COLOUR_SYNONYMS[key];
  return key
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** Stable slug used in query strings, e.g. "Natural White" -> "natural-white". */
export function colourSlug(display: string): string {
  return display.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Knot density, the grading axis buyers actually compare on. */
export function knotCount(quality: string | null | undefined): number | null {
  if (!quality) return null;
  const m = quality.match(/(\d{2,3})\s*(?:k\.?\s*n\.?|knot|kpsi)/i);
  return m ? Number(m[1]) : null;
}
