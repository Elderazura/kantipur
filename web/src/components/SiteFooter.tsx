import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import WhatsAppCta from "./WhatsAppCta";

const FOOTER_LINKS = [
  { href: "/heritage", key: "heritage" as const },
  { href: "/collection", key: "collection" as const },
  { href: "/custom", key: "custom" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export default async function SiteFooter() {
  const t = await getTranslations("nav");
  const tMeta = await getTranslations("meta");

  return (
    <footer className="mt-auto border-t border-rule bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg text-ink">{tMeta("siteName")}</p>
            <p className="mt-1 font-body text-sm text-ink-muted">{tMeta("tagline")}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2 font-ui text-sm text-ink-muted sm:items-end">
              {FOOTER_LINKS.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="hover:text-ink transition-colors">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <WhatsAppCta />
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <LocaleSwitcher />
          <p className="font-ui text-xs tracking-wide text-ink-muted">
            © {new Date().getFullYear()} {tMeta("siteName")}
          </p>
        </div>
      </div>
    </footer>
  );
}
