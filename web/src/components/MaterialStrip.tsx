import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import materials from "../../content/materials.json";

export default async function MaterialStrip() {
  const t = await getTranslations("home");

  return (
    <section className="chapter-reveal overflow-hidden border-y border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10 sm:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl tracking-wide text-ink sm:text-3xl">
            {t("materialsTitle")}
          </h2>
          <p className="max-w-sm font-body text-sm text-ink-muted">
            {t("materialsLead")}
          </p>
        </div>
      </div>

      {/* Horizontal craft ribbon — large type, scroll on small screens */}
      <div className="mt-12 pb-20 sm:mt-16 sm:pb-24">
        <ul className="flex snap-x snap-mandatory gap-0 overflow-x-auto px-6 sm:px-10 lg:mx-auto lg:max-w-6xl lg:flex-wrap lg:overflow-visible lg:px-10">
          {materials.map((material, index) => (
            <li
              key={material.query}
              className="w-[min(78vw,22rem)] shrink-0 snap-start border-e border-rule lg:w-auto lg:min-w-[14rem] lg:flex-1 lg:border-e-0 lg:border-t lg:border-rule"
            >
              <Link
                href={`/collection?material=${encodeURIComponent(material.query)}`}
                className="group flex h-full min-h-36 flex-col justify-between px-5 py-8 transition-colors hover:bg-surface lg:min-h-44 lg:px-6"
              >
                <span className="font-ui text-[0.65rem] tracking-[0.22em] text-ink-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-8 font-display text-2xl leading-tight text-ink group-hover:text-madder sm:text-3xl">
                  {material.label}
                </span>
                <span className="mt-6 font-ui text-xs tracking-[0.18em] uppercase text-ink-muted opacity-0 transition-opacity group-hover:opacity-100">
                  {t("materialsView")} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
