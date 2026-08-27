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

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label="Language" className="font-ui text-xs tracking-[0.12em] text-ink-muted">
      <ul className="flex items-center gap-1.5">
        {routing.locales.map((loc, i) => {
          const active = loc === locale;
          return (
            <li key={loc} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true" className="text-rule">|</span>}
              <Link
                href={pathname}
                locale={loc}
                hrefLang={loc}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink transition-colors"
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
