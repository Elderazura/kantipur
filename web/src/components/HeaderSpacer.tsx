"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * The header is fixed so it can sit over the homepage hero. Every other page
 * needs that height given back. Measured rather than hard-coded, because the
 * bar grows a second row on small screens.
 *
 * Also publishes `--site-header-h` on :root so the hero can clear the bar.
 */
export default function HeaderSpacer() {
  const pathname = usePathname();
  const [height, setHeight] = useState(0);
  const isHome = pathname === "/";

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const sync = () => {
      const h = header.getBoundingClientRect().height;
      setHeight(h);
      document.documentElement.style.setProperty("--site-header-h", `${h}px`);
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(header);
    window.addEventListener("resize", sync, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      document.documentElement.style.removeProperty("--site-header-h");
    };
  }, [pathname]);

  if (isHome) return null;
  return <div aria-hidden style={{ height }} />;
}
