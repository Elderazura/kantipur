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

  const [lead, ...rest] = pieces;

  return (
    <section className="chapter-reveal bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl tracking-wide text-ink sm:text-3xl">
            {t("featuredTitle")}
          </h2>
          <Link
            href="/collection"
            className="font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-4 hover:decoration-madder"
          >
            {t("featuredAll")}
          </Link>
        </div>

        {lead ? (
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Link
              href={`/collection/${lead.slug}`}
              className="group relative block lg:col-span-7"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-paper sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={toPublicImageSrc(lead.primaryImage!)}
                  alt={lead.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-5 font-display text-2xl tracking-wide text-ink">
                {lead.name}
              </p>
              {lead.material ? (
                <p className="mt-1 font-body text-sm text-ink-muted">
                  {lead.material}
                </p>
              ) : null}
            </Link>

            <ul className="flex flex-col gap-10 lg:col-span-5 lg:justify-between lg:gap-6">
              {rest.slice(0, 3).map((product) => {
                const src = toPublicImageSrc(product.primaryImage!);
                return (
                  <li key={product.slug}>
                    <Link
                      href={`/collection/${product.slug}`}
                      className="group grid grid-cols-[5.5rem_1fr] gap-5 sm:grid-cols-[7rem_1fr]"
                    >
                      <div className="relative aspect-square overflow-hidden bg-paper">
                        <Image
                          src={src}
                          alt={product.name}
                          fill
                          sizes="112px"
                          className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                        />
                      </div>
                      <div className="flex flex-col justify-center border-b border-rule pb-4 group-hover:border-madder/40">
                        <p className="font-display text-lg text-ink">
                          {product.name}
                        </p>
                        {product.material ? (
                          <p className="mt-1 font-body text-sm text-ink-muted">
                            {product.material}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {rest.length > 3 ? (
          <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(3).map((product) => {
              const src = toPublicImageSrc(product.primaryImage!);
              return (
                <li key={product.slug}>
                  <Link
                    href={`/collection/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                      <Image
                        src={src}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                      />
                    </div>
                    <p className="mt-4 font-display text-lg text-ink">
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
        ) : null}
      </div>
    </section>
  );
}
