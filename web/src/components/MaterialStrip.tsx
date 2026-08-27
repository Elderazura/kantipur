import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import materials from "../../content/materials.json";

export default async function MaterialStrip() {
  const t = await getTranslations("home");

  return (
    <section className="border-y border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
        <h2 className="font-display text-2xl tracking-wide text-ink sm:text-3xl">
          {t("materialsTitle")}
        </h2>

        <ul className="mt-12 flex flex-col gap-0 sm:mt-14">
          {materials.map((material, index) => (
            <li
              key={material.query}
              className={index === 0 ? "border-t border-rule" : undefined}
            >
              <Link
                href={`/collection?material=${encodeURIComponent(material.query)}`}
                className="group flex min-h-14 items-center justify-between border-b border-rule py-5 font-display text-xl text-ink transition-colors hover:text-madder sm:text-2xl"
              >
                <span>{material.label}</span>
                <span
                  aria-hidden
                  className="font-ui text-sm tracking-widest text-ink-muted opacity-0 transition-opacity group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
