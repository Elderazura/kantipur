import { describe, it, expect } from "vitest";
import {
  normalizeProduct,
  isPlaceholderImage,
  getAllProducts,
  filterProducts,
  fibreFacets,
  colourFacets,
  knotFacets,
} from "./catalog";
import { fibresOf, normaliseColour, colourSlug, knotCount } from "./vocabulary";

const raw = {
  id: 1,
  name: "Test Carpet",
  slug: "test-carpet",
  design_no: "TC 1",
  material: "Wool Silk",
  quality: "80 K.N. WOOL SILK",
  colour: "GREY",
  size: null,
  sizes: [{ size: "300 X 400", pcs: 1 }],
  categories: [{ slug: "wool-silk", name: "Wool Silk" }],
  tags: [],
  images: [
    {
      local: "assets/images/products/test/photo.jpg",
      alt: "",
      width: 100,
      height: 100,
      url: "https://example.com/x.jpg",
    },
  ],
  primary_image: "assets/images/products/test/photo.jpg",
  price_npr: 99999,
  on_sale: true,
};

describe("normalizeProduct", () => {
  it("maps catalog fields and drops price", () => {
    const p = normalizeProduct(raw);
    expect(p.slug).toBe("test-carpet");
    expect(p.designNo).toBe("TC 1");
    expect(p).not.toHaveProperty("price_npr");
    expect((p as { price?: unknown }).price).toBeUndefined();
  });

  it("normalises colour and derives fibres and knot count", () => {
    const p = normalizeProduct(raw);
    expect(p.colour).toBe("Grey");
    expect(p.fibres.sort()).toEqual(["silk", "wool"]);
    expect(p.knots).toBe(80);
  });

  it("detects placeholder photographer image", () => {
    expect(isPlaceholderImage("assets/images/products/x/LALIT-AGRAWAL-PHOTO.jpg")).toBe(true);
    expect(isPlaceholderImage("assets/images/products/x/real-rug.jpg")).toBe(false);
  });
});

describe("vocabulary", () => {
  it("collapses the case variants that produced duplicate filter chips", () => {
    for (const [a, b] of [
      ["BLACK", "Black"],
      ["GREY", "Grey"],
      ["SILVER", "Silver"],
      ["NATURAL", "Natural"],
      ["mix", "Mix"],
    ]) {
      expect(normaliseColour(a)).toBe(normaliseColour(b));
    }
  });

  it("folds spelling variants onto one label", () => {
    expect(normaliseColour("Natural and White")).toBe("Natural White");
    expect(normaliseColour("NATURAL WHITE")).toBe("Natural White");
    expect(normaliseColour("D.Beige")).toBe("Dark Beige");
  });

  it("puts a blend under every fibre it contains", () => {
    const fibres = fibresOf({
      material: "Wool Linen Bamboo",
      categories: [{ slug: "wool-linen-bamboo", name: "Wool Linen Bamboo" }],
    });
    expect(fibres.sort()).toEqual(["bamboo", "linen", "wool"]);
  });

  it("parses knot count from free-text quality", () => {
    expect(knotCount("80 K.N. HEMP WOOL")).toBe(80);
    expect(knotCount("100 Knot")).toBe(100);
    expect(knotCount("80KPSI")).toBe(80);
    expect(knotCount("Kilim Bleach Nettle")).toBeNull();
  });

  it("produces url-safe colour slugs", () => {
    expect(colourSlug("Natural White")).toBe("natural-white");
    expect(colourSlug("Black & White")).toBe("black-and-white");
  });
});

describe("facets over the real catalogue", () => {
  it("exposes no duplicate colour chips", () => {
    const slugs = colourFacets().map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("collapses materials into a small set of fibre families", () => {
    const fibres = fibreFacets();
    expect(fibres.length).toBeGreaterThan(0);
    expect(fibres.length).toBeLessThanOrEqual(9);
  });

  it("reports knot grades ascending", () => {
    const knots = knotFacets().map((k) => k.knots);
    expect([...knots].sort((a, b) => a - b)).toEqual(knots);
  });
});

describe("filterProducts", () => {
  it("filters by fibre", () => {
    const first = fibreFacets()[0];
    if (!first) return;
    const filtered = filterProducts({ fibre: first.key });
    expect(filtered.length).toBe(first.count);
    expect(filtered.every((p) => p.fibres.includes(first.key))).toBe(true);
  });

  it("filters by normalised colour slug", () => {
    const first = colourFacets()[0];
    if (!first) return;
    const filtered = filterProducts({ colour: first.slug });
    expect(filtered.length).toBe(first.count);
  });

  it("returns everything when unfiltered", () => {
    expect(filterProducts({}).length).toBe(getAllProducts().length);
  });
});
