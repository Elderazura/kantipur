import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import { buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";

const EXPLORE_LINKS = [
  { href: "/collection", key: "collection" as const },
  { href: "/bespoke", key: "custom" as const },
  { href: "/house", key: "about" as const },
  { href: "/contact", key: "contact" as const },
] as const;

export default async function SiteFooter() {
  const t = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const tFooter = await getTranslations("footer");
  const tContact = await getTranslations("contact");
  const tCta = await getTranslations("cta");
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(getWhatsAppNumber());
  const phoneHref = `tel:${tContact("phone").replace(/\s/g, "")}`;

  return (
    <footer className="mt-auto border-t border-rule bg-ink pb-[calc(5rem+env(safe-area-inset-bottom,0px))] text-paper sm:pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-16 lg:max-w-7xl lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="min-w-0 lg:pe-6">
            <Link href="/" className="group inline-flex min-w-0 items-center gap-3">
              <Image
                src="/assets/images/site/logo-mark-reversed.png"
                alt=""
                width={210}
                height={98}
                sizes="80px"
                className="h-8 w-auto shrink-0 opacity-90 transition-opacity group-hover:opacity-100 sm:h-9"
              />
              <span className="min-w-0 flex flex-col leading-none">
                <span className="truncate font-display text-lg tracking-[0.06em] sm:text-xl">
                  KANTIPUR
                </span>
                <span className="mt-1 truncate font-ui text-[0.66rem] tracking-[0.38em] text-paper/55 sm:text-[0.74rem]">
                  CARPETS
                </span>
              </span>
            </Link>

            {/* The brand line, set as two statements rather than a sentence. */}
            <p className="mt-7 max-w-sm font-display text-lg leading-[1.25] text-paper sm:text-xl">
              <span className="block">{tMeta("brandLine1")}</span>
              {" "}
              <span className="block text-paper/70">{tMeta("brandLine2")}</span>
            </p>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-paper/55">
              {tFooter("visitLine")}
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[7px]"
            >
              {tFooter("inquireCta")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* Explore */}
          <nav aria-label={tFooter("exploreHeading")}>
            <p className="font-ui text-[0.74rem] tracking-[0.24em] uppercase text-paper/65">
              {tFooter("exploreHeading")}
            </p>
            <ul className="mt-5 flex flex-col gap-3 font-ui text-sm tracking-[0.04em] text-paper/70">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center transition-colors hover:text-paper"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Reach us */}
          <div>
            <p className="font-ui text-[0.74rem] tracking-[0.24em] uppercase text-paper/65">
              {tFooter("reachHeading")}
            </p>
            <ul className="mt-5 space-y-4 font-body text-sm text-paper/75">
              <li>
                <p className="font-ui text-[0.72rem] tracking-[0.18em] uppercase text-paper/65">
                  {tContact("locationLabel")}
                </p>
                <p className="mt-1">{tContact("location")}</p>
              </li>
              <li>
                <p className="font-ui text-[0.72rem] tracking-[0.18em] uppercase text-paper/65">
                  {tContact("phoneLabel")}
                </p>
                <a
                  href={phoneHref}
                  className="mt-1 inline-flex min-h-10 items-center underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
                >
                  {tContact("phone")}
                </a>
              </li>
              <li>
                <p className="font-ui text-[0.72rem] tracking-[0.18em] uppercase text-paper/65">
                  {tContact("emailLabel")}
                </p>
                <div className="mt-1 flex flex-col gap-1">
                  <a
                    href={`mailto:${tContact("emailPrimary")}`}
                    className="inline-flex min-h-10 items-center underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
                  >
                    {tContact("emailPrimary")}
                  </a>
                  <a
                    href={`mailto:${tContact("emailSecondary")}`}
                    className="inline-flex min-h-10 items-center underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
                  >
                    {tContact("emailSecondary")}
                  </a>
                </div>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center font-ui text-xs tracking-[0.14em] uppercase text-paper/80 underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper/60"
                >
                  {tCta("whatsapp")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/12 pt-8 lg:mt-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="font-ui text-[0.72rem] tracking-[0.14em] uppercase text-paper/60">
                {tFooter("legal")}
              </p>
              <p className="font-body text-xs leading-relaxed text-paper/65">{tFooter("sisterNote")}</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end lg:gap-5">
              <LocaleSwitcher tone="dark" />
              <p className="font-ui text-xs tracking-wide text-paper/65">
                © {year} {tMeta("siteName")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
