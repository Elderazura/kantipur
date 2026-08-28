"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

type Stat = { value: string; label: string };

/**
 * Hero foreground.
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
  stats,
  children,
}: {
  titleTop: string;
  titleBottom: string;
  line: string;
  siteName: string;
  tagline: string;
  stats: Stat[];
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
      className="relative z-10 flex min-h-[100svh] min-h-[100dvh] flex-col justify-end px-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-[calc(var(--site-header-h,5.5rem)+1rem)] sm:px-10 sm:pb-16 lg:px-16 xl:max-w-7xl xl:px-20"
    >
      <h1 className="max-w-[14ch] text-balance font-display text-[clamp(2.25rem,10vw,6.75rem)] leading-[0.92] tracking-[0.01em] text-paper sm:max-w-none">
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
        className="hero-rise mt-5 max-w-xl text-pretty font-body text-base leading-relaxed text-paper/90 sm:mt-6 sm:text-lg md:text-xl"
      >
        {line}
      </p>

      <div
        style={rise(0.52)}
        className="hero-rise mt-7 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-4 md:gap-x-10"
      >
        {children}
      </div>

      {/* Proof of scale, stated plainly, before anyone scrolls */}
      <dl
        style={rise(0.64)}
        className="hero-rise mt-10 grid grid-cols-3 gap-x-3 gap-y-4 border-t border-paper/20 pt-5 sm:mt-12 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-5 sm:pt-6 md:gap-x-12"
      >
        {stats.map((s) => (
          <div key={s.label} className="flex min-w-0 flex-col gap-1">
            <dt className="order-2 font-ui text-[0.55rem] tracking-[0.18em] uppercase text-paper/55 sm:text-[0.6rem] sm:tracking-[0.24em]">
              {s.label}
            </dt>
            <dd className="order-1 font-display text-xl text-paper sm:text-2xl md:text-[1.7rem]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
