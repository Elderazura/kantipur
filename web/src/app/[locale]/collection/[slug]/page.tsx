import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import InquireForm from "@/components/InquireForm";
import PieceGallery from "@/components/PieceGallery";
import WhatsAppCta from "@/components/WhatsAppCta";
import { getAllProducts, getProductBySlug } from "@/lib/catalog";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("piece");
  const tCta = await getTranslations("cta");

  const carpetRef = `${product.designNo ?? product.slug} — ${product.name}`;
  const sizesLabel =
    product.sizes.length > 0
      ? product.sizes.map((s) => (s.pcs > 1 ? `${s.size} (${s.pcs})` : s.size)).join(", ")
      : null;

  const specs: { label: string; value: string }[] = [];
  if (product.designNo) specs.push({ label: t("designNo"), value: product.designNo });
  if (product.material) specs.push({ label: t("material"), value: product.material });
  if (product.quality) specs.push({ label: t("quality"), value: product.quality });
  if (product.colour) specs.push({ label: t("colour"), value: product.colour });
  if (sizesLabel) specs.push({ label: t("sizes"), value: sizesLabel });

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <PieceGallery images={product.images} name={product.name} />

        <div className="flex flex-col">
          <h1 className="font-display text-4xl leading-tight tracking-wide text-ink sm:text-5xl">
            {product.name}
          </h1>

          {specs.length > 0 ? (
            <dl className="mt-10 space-y-4 border-t border-rule pt-8">
              {specs.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="font-ui text-xs tracking-[0.14em] uppercase text-ink-muted">
                    {row.label}
                  </dt>
                  <dd className="font-body text-base text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <p className="mt-10 font-body text-lg text-ink-muted">{tCta("inquirePricing")}</p>

          <div className="mt-6">
            <WhatsAppCta
              text={carpetRef}
              className="inline-flex min-h-11 items-center font-ui text-sm tracking-wide text-madder underline decoration-madder/60 underline-offset-4 hover:decoration-madder"
            />
          </div>

          <div className="mt-12 border-t border-rule pt-10">
            <h2 className="font-display text-2xl tracking-wide text-ink">{t("inquireTitle")}</h2>
            <div className="mt-8">
              <InquireForm carpetRef={carpetRef} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
