"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_POSTER = "/assets/images/site/Nepali-Handmade-Carpet.jpg";
/** Trimmed 22s loop from hero1.mp4 (from 8s) — 1280×720, H.264, no audio. */
const HERO_VIDEO = "/assets/videos/hero.mp4";

type HeroBackdropProps = {
  posterAlt: string;
};

/**
 * Full-bleed atmosphere. The still is always painted; a local loop fades in
 * over it once the file can play. If the video is missing, blocked, or the
 * visitor prefers reduced motion, the hero stays on the photograph.
 */
export default function HeroBackdrop({ posterAlt }: HeroBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wantsVideo, setWantsVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const ok = !motion.matches;
      setWantsVideo(ok);
      if (!ok) setVideoVisible(false);
    };
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!wantsVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const show = () => setVideoVisible(true);
    const hide = () => setVideoVisible(false);

    video.addEventListener("canplay", show);
    video.addEventListener("error", hide);

    void video.play().catch(hide);

    return () => {
      video.removeEventListener("canplay", show);
      video.removeEventListener("error", hide);
    };
  }, [wantsVideo]);

  return (
    <>
      <Image
        src={HERO_POSTER}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-[42%_35%] ${
          videoVisible
            ? ""
            : "motion-safe:animate-[hero-drift_28s_ease-in-out_infinite_alternate]"
        }`}
      />

      {wantsVideo ? (
        <video
          ref={videoRef}
          aria-hidden
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={HERO_POSTER}
          className={`absolute inset-0 h-full w-full object-cover object-[42%_35%] transition-opacity duration-1000 ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}
