import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import WhatsAppCta from "@/components/WhatsAppCta";

export default async function CustomPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("custom");

  return (
    <main className="flex flex-1 flex-col bg-paper">
      <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
        <h1 className="font-display text-4xl leading-tight tracking-wide text-ink sm:text-5xl lg:text-[3.25rem]">
          {t("title")}
        </h1>

        <div className="mt-12 space-y-7 font-body text-lg leading-relaxed text-ink-muted sm:mt-14 sm:text-xl sm:leading-[1.7]">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p className="text-ink">{t("p3")}</p>
        </div>

        <figure className="mt-12 sm:mt-14">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/5">
            <Image
              src="/assets/images/site/IMG_9255-scaled.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover object-center"
            />
          </div>
        </figure>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-4 border-t border-rule pt-10 sm:mt-14">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center font-ui text-sm tracking-[0.14em] uppercase text-madder underline decoration-madder/50 underline-offset-[6px] transition-colors hover:decoration-madder"
          >
            {t("contactCta")}
          </Link>
          <span className="font-body text-sm text-ink-muted sm:text-base">
            {t("whatsappHint")}{" "}
            <WhatsAppCta className="font-ui text-sm tracking-wide text-madder underline underline-offset-4 decoration-madder/60 hover:decoration-madder" />
          </span>
        </div>
      </article>
    </main>
  );
}
