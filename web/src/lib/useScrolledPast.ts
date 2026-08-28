"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * True once the page is scrolled past `fraction` of the viewport height.
 *
 * Subscribing to browser state through useSyncExternalStore rather than
 * useState + useEffect keeps the first paint consistent and avoids setting
 * state from inside an effect.
 */
export function useScrolledPast(fraction: number): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  const getSnapshot = useCallback(
    () => window.scrollY > window.innerHeight * fraction,
    [fraction],
  );

  // Server render and first client paint agree: not yet scrolled.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
