"use client";

import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/collection", key: "collection" as const },
  { href: "/custom", key: "custom" as const },
  { href: "/designers", key: "designers" as const },
  { href: "/heritage", key: "heritage" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
        className="absolute start-0 top-0 block h-0.5 w-5 origin-center bg-current"
        transition={{ duration: 0.22 }}
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        className="absolute start-0 top-[7px] block h-0.5 w-5 bg-current"
        transition={{ duration: 0.18 }}
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
        className="absolute start-0 top-3.5 block h-0.5 w-5 origin-center bg-current"
        transition={{ duration: 0.22 }}
      />
    </span>
  );
}

export default function MobileNav({ light = false }: { light?: boolean }) {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const pathname = usePathname();
  const panelId = useId();
  const reduce = useReducedMotion();
  /*
   * The panel is open only while the route it was opened on is still current,
   * so navigating closes it without an effect writing state. `mounted` gates
   * the portal and is read from the environment rather than set in an effect —
   * both avoid the cascading-render pattern.
   */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt !== null && openedAt === pathname;
  const setOpen = useCallback(
    (next: boolean | ((v: boolean) => boolean)) => {
      setOpenedAt((current) => {
        const isOpen = current !== null && current === pathname;
        const wanted = typeof next === "function" ? next(isOpen) : next;
        return wanted ? pathname : null;
      });
    },
    [pathname],
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const buttonClass = light
    ? "text-paper hover:text-paper/90"
    : "text-ink hover:text-ink-muted";

  const menu = (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] md:hidden">
          <motion.button
            type="button"
            aria-label={t("closeMenu")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="absolute inset-0 bg-ink/60"
            onClick={() => setOpen(false)}
          />

          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={t("menuLabel")}
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 8 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-x-0 top-0 flex max-h-[100dvh] min-h-[100dvh] flex-col bg-paper pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-rule px-5 py-3 sm:px-10">
              <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
                {t("menuLabel")}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center font-ui text-xs tracking-[0.16em] uppercase text-ink transition-colors hover:text-madder"
                aria-label={t("closeMenu")}
              >
                ✕
              </button>
            </div>

            <nav
              aria-label="Primary mobile"
              className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-10 sm:py-10"
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.key} className="border-b border-rule/70">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-14 items-center justify-between py-3 font-display text-[clamp(1.75rem,7vw,2.35rem)] leading-none tracking-wide transition-colors ${
                          active ? "text-madder" : "text-ink hover:text-madder"
                        }`}
                      >
                        {t(item.key)}
                        <span aria-hidden className="font-ui text-base text-ink-muted/50">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mx-auto w-full max-w-6xl border-t border-rule px-5 py-5 sm:px-10">
              <LocaleSwitcher tone="light" />
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center bg-ink px-4 font-ui text-xs tracking-[0.16em] uppercase text-paper transition-opacity hover:opacity-90"
              >
                {tCta("inquire")}
              </Link>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm transition-colors ${buttonClass}`}
      >
        <MenuIcon open={open} />
      </button>

      {mounted ? createPortal(menu, document.body) : null}
    </div>
  );
}
