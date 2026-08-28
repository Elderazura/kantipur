"use client";

import { motion, useReducedMotion, useInView, useSpring, useTransform, useScroll } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Fade-and-rise as the block enters the viewport. Runs once. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Parent that walks its Reveal children in one after another. */
export function Stagger({
  children,
  className,
  gap = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "shown"}
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "figure";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline that assembles word by word — the page's one piece of type
 * choreography, kept for section openers only.
 */
export function WordsUp({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className="inline-block"
            variants={{
              hidden: { y: "108%" },
              shown: { y: 0, transition: { duration: 0.75, ease: EASE } },
            }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Gentle vertical drift tied to scroll position. */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      {/* relative, so next/image `fill` children have a positioned ancestor */}
      <motion.div style={reduce ? undefined : { y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Counts up to a number once it scrolls into view. */
export function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? to : 0);
  const spring = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce || !inView) return;
    spring.set(to);
    return spring.on("change", (v) => setShown(Math.round(v)));
  }, [inView, reduce, spring, to]);

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString()}
      {suffix}
    </span>
  );
}
