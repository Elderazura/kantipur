"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { useScrolledPast } from "@/lib/useScrolledPast";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/heritage", key: "heritage" as const },
  { href: "/collection", key: "collection" as const },
  { href: "/custom", key: "custom" as const },
  { href: "/contact", key: "contact" as const },
];

export default function SiteHeader() {
  const t = useTranslations("nav");
  const tMeta = useTranslations("meta");
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Only the homepage opens on a full-bleed dark hero worth sitting over.
  const overlayCapable = pathname === "/";
  const scrolled = useScrolledPast(0.75);
  const solid = !overlayCapable || scrolled;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(237,230,217,1)" : "rgba(237,230,217,0)",
        borderBottomColor: solid ? "rgba(196,184,165,1)" : "rgba(196,184,165,0)",
      }}
      transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-[2px] pt-[env(safe-area-inset-top,0px)]"
      data-solid={solid}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:gap-6 sm:px-10 sm:py-3.5 lg:max-w-7xl">
        <Link
          href="/"
          aria-label={tMeta("siteName")}
          className="group flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
        >
          <Image
            src="/assets/images/site/logo-mark.png"
            alt=""
            width={210}
            height={98}
            priority
            className={`h-7 w-auto shrink-0 transition-[filter,opacity] duration-500 sm:h-9 ${
              solid ? "" : "brightness-0 invert opacity-90"
            }`}
          />
          <span className="hidden min-[380px]:flex min-w-0 flex-col leading-none">
            <span
              className={`truncate font-display text-lg tracking-[0.06em] transition-colors duration-500 sm:text-[1.4rem] ${
                solid ? "text-ink" : "text-paper"
              }`}
            >
              KANTIPUR
            </span>
            <span
              className={`mt-1 truncate font-ui text-[0.5rem] tracking-[0.38em] transition-colors duration-500 sm:text-[0.55rem] sm:tracking-[0.42em] ${
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

        <div className={`flex shrink-0 items-center ${solid ? "" : "[&_*]:text-paper"}`}>
          <LocaleSwitcher className="hidden min-[420px]:block" />
        </div>
      </div>

      <nav
        aria-label="Primary mobile"
        className="border-t border-rule/40 md:hidden overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]"
      >
        <ul className="flex min-w-max items-center gap-x-4 px-5 py-2 font-ui text-[0.68rem] uppercase tracking-[0.12em] sm:gap-x-5 sm:px-10 sm:text-xs sm:tracking-[0.14em]">
          {NAV_ITEMS.map((item) => (
            <li key={item.key} className="shrink-0">
              <Link
                href={item.href}
                className={`inline-flex min-h-11 items-center whitespace-nowrap transition-colors ${
                  solid ? "text-ink-muted hover:text-ink" : "text-paper/80"
                }`}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li className="shrink-0 min-[420px]:hidden">
            <LocaleSwitcher compact />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
