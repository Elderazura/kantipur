"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { useScrolledPast } from "@/lib/useScrolledPast";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileNav from "./MobileNav";

/* Four destinations: what you can buy, what we can make for you, who we are,
   how to reach us. Bespoke absorbed the old Designers and Hospitality pages,
   and The House absorbed Craft — each pair was selling the same thing. */
const NAV_ITEMS = [
  { href: "/collection", key: "collection" as const },
  { href: "/bespoke", key: "custom" as const },
  { href: "/house", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export default function SiteHeader() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const overlayCapable = pathname === "/";
  const scrolled = useScrolledPast(0.75);
  const solid = !overlayCapable || scrolled;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(243,239,231,1)" : "rgba(243,239,231,0)",
        borderBottomColor: solid ? "rgba(216,208,195,1)" : "rgba(216,208,195,0)",
      }}
      transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-[2px] pt-[env(safe-area-inset-top,0px)]"
      data-solid={solid}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-10 sm:py-3.5 lg:max-w-7xl">
        <Link
          href="/"
          aria-label={tMeta("siteName")}
          className="group flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
        >
          {/* Two marks, cross-faded. The mandala's linework is carried by tone
              inside opaque pixels, so brightness(0)+invert(1) flattened it to a
              solid ivory blob over the hero — the reversed asset keeps the
              gaps transparent instead. */}
          <span className="relative block h-7 w-auto shrink-0 sm:h-9">
            <Image
              src="/assets/images/site/logo-mark.png"
              alt=""
              width={210}
              height={98}
              sizes="80px"
              priority
              className={`h-7 w-auto transition-opacity duration-500 sm:h-9 ${
                solid ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src="/assets/images/site/logo-mark-reversed.png"
              alt=""
              width={210}
              height={98}
              sizes="80px"
              priority
              aria-hidden
              className={`absolute inset-0 h-7 w-auto transition-opacity duration-500 sm:h-9 ${
                solid ? "opacity-0" : "opacity-90"
              }`}
            />
          </span>
          <span className="hidden min-[380px]:flex min-w-0 flex-col leading-none">
            <span
              className={`truncate font-display text-lg tracking-[0.06em] transition-colors duration-500 sm:text-[1.4rem] ${
                solid ? "text-ink" : "text-paper"
              }`}
            >
              KANTIPUR
            </span>
            <span
              className={`mt-1 truncate font-ui text-[0.66rem] tracking-[0.38em] transition-colors duration-500 sm:text-[0.74rem] sm:tracking-[0.42em] ${
                solid ? "text-ink-muted" : "text-paper/70"
              }`}
            >
              CARPETS
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-5 font-ui text-xs uppercase tracking-[0.14em] lg:gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`group relative inline-flex min-h-11 items-center transition-colors ${
                    solid ? "text-ink-muted hover:text-ink" : "text-paper/80 hover:text-paper"
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                      solid ? "bg-madder" : "bg-paper"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div className={`hidden md:block ${solid ? "" : "[&_*]:text-paper"}`}>
            <LocaleSwitcher />
          </div>
          <MobileNav light={!solid} />
        </div>
      </div>
    </motion.header>
  );
}
