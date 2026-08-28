"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/heritage", key: "heritage" as const },
  { href: "/collection", key: "collection" as const },
  { href: "/custom", key: "custom" as const },
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
  }, [open]);

  const buttonClass = light
    ? "text-paper hover:text-paper/90"
    : "text-ink hover:text-ink-muted";

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

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label={t("closeMenu")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />

            <motion.div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label={t("menuLabel")}
              initial={{ x: reduce ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: reduce ? 0 : "100%" }}
              transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed inset-y-0 end-0 z-50 flex w-[min(100vw,20rem)] flex-col border-s border-rule bg-paper pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] shadow-[-12px_0_40px_rgba(26,24,20,0.12)] rtl:end-auto rtl:start-0 rtl:border-s-0 rtl:border-e rtl:shadow-[12px_0_40px_rgba(26,24,20,0.12)]"
            >
              <div className="flex items-center justify-between border-b border-rule px-5 py-3">
                <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
                  {t("menuLabel")}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center font-ui text-xs tracking-[0.16em] uppercase text-ink-muted transition-colors hover:text-ink"
                >
                  {t("closeMenu")}
                </button>
              </div>

              <nav aria-label="Primary mobile" className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.key}
                        initial={reduce ? false : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduce ? 0 : 0.05 + i * 0.04, duration: 0.28 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`group flex min-h-12 items-center border-b border-rule/60 py-3 font-display text-2xl tracking-wide transition-colors ${
                            active ? "text-madder" : "text-ink hover:text-madder"
                          }`}
                        >
                          {t(item.key)}
                          <span
                            aria-hidden
                            className={`ms-auto font-ui text-sm transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${
                              active ? "text-madder" : "text-ink-muted/40"
                            }`}
                          >
                            →
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-rule px-5 py-5">
                <LocaleSwitcher tone="light" />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center border border-ink bg-ink px-4 font-ui text-xs tracking-[0.16em] uppercase text-paper transition-colors hover:bg-ink/90"
                >
                  {tCta("inquire")}
                </Link>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
