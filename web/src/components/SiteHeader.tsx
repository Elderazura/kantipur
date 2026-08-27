import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import WhatsAppCta from "./WhatsAppCta";

const NAV_ITEMS = [
  { href: "/heritage", key: "heritage" as const },
  { href: "/collection", key: "collection" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export default async function SiteHeader() {
  const t = await getTranslations("nav");
  const tMeta = await getTranslations("meta");

  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-ink sm:text-[1.65rem]"
          aria-label={tMeta("siteName")}
        >
          Kantipur
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 font-ui text-xs uppercase tracking-[0.14em] text-ink-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="hover:text-ink transition-colors">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <LocaleSwitcher />
          <WhatsAppCta />
        </div>
      </div>

      <nav aria-label="Primary mobile" className="border-t border-rule md:hidden">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 font-ui text-xs uppercase tracking-[0.14em] text-ink-muted sm:px-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className="hover:text-ink transition-colors">
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
