import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import featuredSlugs from "../../content/featured.json";
import { getProductBySlug } from "@/lib/catalog";
import { toPublicImageSrc } from "@/lib/images";

export default async function FeaturedGrid() {
  const t = await getTranslations("home");
  const pieces = featuredSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.primaryImage));

  return (
    <section className="chapter-reveal bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <h2 className="font-display text-2xl tracking-wide text-ink sm:text-3xl">
          {t("featuredTitle")}
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((product) => {
            const src = toPublicImageSrc(product.primaryImage!);
            return (
              <li key={product.slug}>
                <Link
                  href={`/collection/${product.slug}`}
                  className="group block focus-visible:outline-offset-4"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                    <Image
                      src={src}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                    />
                  </div>
                  <p className="mt-4 font-display text-lg tracking-wide text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] group-hover:decoration-rule">
                    {product.name}
                  </p>
                  {product.material ? (
                    <p className="mt-1 font-body text-sm text-ink-muted">
                      {product.material}
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
