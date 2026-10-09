"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const LABELS: Record<AppLocale, string> = {
  en: "EN",
  ar: "AR",
  fr: "FR",
  de: "DE",
};

export default function LocaleSwitcher({
  className = "",
  compact = false,
  tone = "light",
}: {
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const dark = tone === "dark";

  return (
    <nav
      aria-label="Language"
      className={`font-ui text-xs tracking-[0.12em] ${
        dark ? "text-paper/65" : "text-ink-muted"
      } ${className}`}
    >
      <ul className={`flex items-center ${compact ? "gap-1" : "gap-1.5"}`}>
        {routing.locales.map((loc, i) => {
          const active = loc === locale;
          return (
            <li key={loc} className="flex items-center gap-1.5">
              {/* A rule, not a character: a text "|" is held to the 4.5:1 text
                  contrast rule at a weight that would overpower the switcher,
                  while a border is exempt and reads the same. */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`h-3 w-px ${dark ? "bg-paper/40" : "bg-rule"}`}
                />
              )}
              <Link
                href={pathname}
                locale={loc}
                hrefLang={loc}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? `inline-flex items-center ${dark ? "text-paper" : "text-ink"} ${compact ? "min-h-11 px-0.5" : "min-h-11"}`
                    : `inline-flex items-center transition-colors ${compact ? "min-h-11 px-0.5" : "min-h-11"} ${
                        dark
                          ? "text-paper/60 hover:text-paper"
                          : "text-ink-muted hover:text-ink"
                      }`
                }
              >
                {LABELS[loc]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
