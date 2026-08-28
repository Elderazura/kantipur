"use client";

import { useEffect, useRef, useState } from "react";

/** Trimmed loop — 1280×720, H.264, no audio. */
const HERO_VIDEO = "/assets/videos/hero.mp4";

/**
 * Full-bleed hero atmosphere — video only, no stock still fallback.
 * Reduced motion or load failure falls back to the parent section's ink background.
 */
export default function HeroBackdrop() {
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

  if (!wantsVideo) return null;

  return (
    <video
      ref={videoRef}
      aria-hidden
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className={`absolute inset-0 h-full w-full object-cover object-[42%_35%] transition-opacity duration-1000 ${
        videoVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
