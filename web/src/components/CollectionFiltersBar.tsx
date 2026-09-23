"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

type FacetOption = { value: string; label: string; count?: number };
type KnotOption = { value: number; label: string; count: number };

type CollectionFiltersBarProps = {
  fibres: FacetOption[];
  colours: FacetOption[];
  knots: KnotOption[];
  activeFibre?: string;
  activeColour?: string;
  activeKnots?: number;
  total: number;
  shown: number;
};

function buildHref(fibre?: string, colour?: string, knots?: number): string {
  const params = new URLSearchParams();
  if (fibre) params.set("fibre", fibre);
  if (colour) params.set("colour", colour);
  if (knots) params.set("knots", String(knots));
  const q = params.toString();
  return q ? `/collection?${q}` : "/collection";
}

const selectClass =
  "max-w-[11rem] cursor-pointer truncate border-b border-rule bg-transparent py-1.5 pe-6 font-ui text-xs tracking-[0.04em] text-ink outline-none transition-colors hover:border-ink focus-visible:border-madder";

export default function CollectionFiltersBar({
  fibres,
  colours,
  knots,
  activeFibre,
  activeColour,
  activeKnots,
  total,
  shown,
}: CollectionFiltersBarProps) {
  const t = useTranslations("collection");
  const router = useRouter();
  const hasFilters = Boolean(activeFibre || activeColour || activeKnots);

  const navigate = (
    fibre: string | undefined,
    colour: string | undefined,
    knots: number | undefined,
  ) => {
    router.push(buildHref(fibre, colour, knots));
  };

  return (
    <nav
      aria-label={t("filtersLabel")}
      className="flex flex-col gap-3 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-2"
    >
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3 sm:gap-x-6">
        <label className="flex min-w-0 flex-col gap-1">
          <span className="font-ui text-[0.72rem] tracking-[0.16em] uppercase text-ink-muted">
            {t("material")}
          </span>
          <select
            value={activeFibre ?? ""}
            onChange={(e) =>
              navigate(e.target.value || undefined, activeColour, activeKnots)
            }
            className={selectClass}
          >
            <option value="">{t("allMaterials")}</option>
            {fibres.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
                {f.count != null ? ` (${f.count})` : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1">
          <span className="font-ui text-[0.72rem] tracking-[0.16em] uppercase text-ink-muted">
            {t("knots")}
          </span>
          <select
            value={activeKnots ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              navigate(activeFibre, activeColour, v ? Number(v) : undefined);
            }}
            className={selectClass}
            dir="ltr"
          >
            <option value="">{t("allMaterials")}</option>
            {knots.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
                {` (${k.count})`}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1">
          <span className="font-ui text-[0.72rem] tracking-[0.16em] uppercase text-ink-muted">
            {t("colour")}
          </span>
          <select
            value={activeColour ?? ""}
            onChange={(e) =>
              navigate(activeFibre, e.target.value || undefined, activeKnots)
            }
            className={selectClass}
          >
            <option value="">{t("allColours")}</option>
            {colours.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
                {c.count != null ? ` (${c.count})` : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="flex flex-wrap items-baseline gap-x-3 font-ui text-[0.74rem] tracking-[0.06em] text-ink-muted sm:justify-end">
        <span>{t("showing", { shown, total })}</span>
        {hasFilters ? (
          <Link
            href="/collection"
            className="text-madder underline decoration-madder/45 underline-offset-[3px] transition-colors hover:decoration-madder"
          >
            {t("reset")}
          </Link>
        ) : null}
      </p>
    </nav>
  );
}
