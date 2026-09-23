"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";
import {
  Children,
  Fragment,
  cloneElement,
  createElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Scroll reveals, built so the markup is *visible by default*.
 *
 * Earlier versions rendered `opacity: 0` and relied on JS to bring content in,
 * which meant a failed hydration, a throttled background tab or reduced-motion
 * left whole sections blank. Here the server paints finished content and an
 * IntersectionObserver simply replays it as an animation on the way in. The
 * element is below the fold when that happens, so there is nothing to flash.
 */
function useRevealOnce<T extends HTMLElement>(attr: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Direct DOM write: no state, so no re-render and no cascade.
            el.setAttribute(attr, "run");
            io.disconnect();
          }
        }
      },
      { rootMargin: "-8% 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [attr]);

  return ref;
}

type Tag = "div" | "section" | "li" | "figure" | "ul" | "ol";

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
  as?: Tag;
}) {
  const ref = useRevealOnce<HTMLElement>("data-reveal");
  return createElement(
    as,
    {
      ref,
      className,
      style: { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties,
    },
    children,
  );
}

/** Parent that walks its children in one after another. */
export function Stagger({
  children,
  className,
  gap = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: Tag;
}) {
  const ref = useRevealOnce<HTMLElement>("data-stagger");

  // Index each child so CSS can offset its delay.
  const indexed = Children.map(children, (child, i) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
          style: { ...(child.props as { style?: CSSProperties }).style, "--i": i } as CSSProperties,
        })
      : child,
  );

  return createElement(
    as,
    { ref, className, style: { "--stagger-gap": `${gap}s` } as CSSProperties },
    indexed,
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: Tag;
  style?: CSSProperties;
}) {
  return createElement(
    as,
    { className, style: { ...style, "--reveal-y": `${y}px` } as CSSProperties },
    children,
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
  const ref = useRevealOnce<HTMLSpanElement>("data-words");
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span className="word-rise inline-block" style={{ "--word-i": i } as CSSProperties}>
              {word}
            </span>
          </span>
          {/* The separator sits *outside* the clipping box. Inside it, the
              trailing space is collapsed away and words render flush. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/** Gentle vertical drift tied to scroll position. Enhancement only. */
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
  const [counted, setCounted] = useState(0);
  const spring = useSpring(0, { stiffness: 60, damping: 18 });

  // Until the count is actually running we render the real figure, so the
  // server, a client without JS and reduced motion all show the number.
  const counting = inView && !reduce;

  useEffect(() => {
    if (!counting) return;
    const unsubscribe = spring.on("change", (v) => setCounted(Math.round(v)));
    spring.set(to);
    return unsubscribe;
  }, [counting, spring, to]);

  return (
    <span ref={ref} className={className}>
      {(counting ? counted : to).toLocaleString()}
      {suffix}
    </span>
  );
}
