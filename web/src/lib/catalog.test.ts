import { describe, it, expect } from "vitest";
import { normalizeProduct, isPlaceholderImage, getAllProducts, filterProducts } from "./catalog";

describe("normalizeProduct", () => {
  it("maps catalog fields and drops price", () => {
    const raw = {
      id: 1,
      name: "Test Carpet",
      slug: "test-carpet",
      design_no: "TC 1",
      material: "Wool Silk",
      quality: "80 K.N.",
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
    const p = normalizeProduct(raw);
    expect(p.slug).toBe("test-carpet");
    expect(p.designNo).toBe("TC 1");
    expect(p).not.toHaveProperty("price_npr");
    expect((p as { price?: unknown }).price).toBeUndefined();
  });

  it("detects placeholder photographer image", () => {
    expect(isPlaceholderImage("assets/images/products/x/LALIT-AGRAWAL-PHOTO.jpg")).toBe(true);
    expect(isPlaceholderImage("assets/images/products/x/real-rug.jpg")).toBe(false);
  });
});

describe("filterProducts", () => {
  it("filters by material case-insensitively", () => {
    const list = getAllProducts().filter((p) => p.material);
    if (list.length === 0) return;
    const material = list[0].material!;
    const filtered = filterProducts({ material });
    expect(filtered.every((p) => (p.material || "").toLowerCase() === material.toLowerCase())).toBe(true);
  });
});
