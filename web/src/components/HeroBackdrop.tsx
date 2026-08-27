"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_POSTER = "/assets/images/site/Nepali-Handmade-Carpet.png";
const YT_ID = "FVjEVCdoMyY";
/** Matches original Elementor settings: start 5s, end 54s */
const YT_SRC = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${YT_ID}&start=5&end=54`;

type HeroBackdropProps = {
  posterAlt: string;
};

/**
 * Full-bleed atmosphere: YouTube on md+ when motion is OK;
 * still poster on mobile / reduced-motion (original site hid video on phone).
 */
export default function HeroBackdrop({ posterAlt }: HeroBackdropProps) {
  const [preferVideo, setPreferVideo] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    const sync = () => setPreferVideo(desktop.matches && !motion.matches);
    sync();
    motion.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  return (
    <>
      <Image
        src={HERO_POSTER}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[42%_35%] ${
          preferVideo
            ? "opacity-0"
            : "opacity-100 motion-safe:animate-[hero-drift_28s_ease-in-out_infinite_alternate]"
        }`}
      />

      {preferVideo ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <iframe
            title=""
            src={YT_SRC}
            allow="autoplay; encrypted-media"
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          />
        </div>
      ) : null}
    </>
  );
}
