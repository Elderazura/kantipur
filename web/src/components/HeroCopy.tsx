"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Hero foreground.
 *
 * Deliberately sparse: a claim, one line of substance, one way in. The
 * loom/weaver/design counts live further down the page — a spec row here reads
 * as throughput, and crowds the frame the film is doing the work in.
 *
 * The entry animation is CSS (`.hero-rise`), not Framer Motion, so the
 * headline is painted by the server and stays readable even if JS never
 * hydrates. Only the scroll-linked drift — pure enhancement — is JS, and it
 * defaults to fully visible when it doesn't run.
 */
export default function HeroCopy({
  titleTop,
  titleBottom,
  line,
  siteName,
  tagline,
  children,
}: {
  titleTop: string;
  titleBottom: string;
  line: string;
  siteName: string;
  tagline: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.18], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  const rise = (delay: number): CSSProperties => ({ animationDelay: `${delay}s` });

  return (
    <motion.div
      style={reduce ? undefined : { y, opacity }}
      className="relative z-10 flex min-h-[100svh] min-h-[100dvh] flex-col justify-end px-5 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[calc(var(--site-header-h,5.5rem)+1rem)] sm:px-10 sm:pb-24 lg:px-16 xl:max-w-7xl xl:px-20"
    >
      <h1 className="max-w-[22ch] text-balance font-display text-[clamp(2rem,6.4vw,4.75rem)] leading-[0.98] tracking-[0.01em] text-paper sm:max-w-[22ch]">
        <span style={rise(0.15)} className="hero-rise block">
          {titleTop}
        </span>
        <span style={rise(0.28)} className="hero-rise block italic text-paper/85">
          {titleBottom}
        </span>
        <span className="sr-only">
          {" "}
          {siteName} — {tagline}
        </span>
      </h1>

      <p
        style={rise(0.4)}
        className="hero-rise mt-5 max-w-[46ch] text-pretty font-body text-base leading-relaxed text-paper/85 sm:mt-6 sm:text-lg"
      >
        {line}
      </p>

      <div
        style={rise(0.52)}
        className="hero-rise mt-7 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-4"
      >
        {children}
      </div>
    </motion.div>
  );
}
