import { getTranslations } from "next-intl/server";
import featuredSlugs from "../../content/featured.json";
import { getProductBySlug } from "@/lib/catalog";
import { toPublicImageSrc } from "@/lib/images";
import FeaturedGallery from "./FeaturedGallery";

export default async function FeaturedGrid() {
  const t = await getTranslations("home");

  const pieces = featuredSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.primaryImage))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      material: p.material,
      designNo: p.designNo,
      knots: p.knots,
      image: toPublicImageSrc(p.primaryImage!),
    }));

  return (
    <FeaturedGallery
      pieces={pieces}
      title={t("featuredTitle")}
      eyebrow={t("featuredEyebrow")}
      viewAllLabel={t("featuredAll")}
      viewPieceLabel={t("featuredViewPiece")}
      selectLabel={t("featuredSelect")}
    />
  );
}
