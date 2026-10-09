"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";

export type FeaturedPiece = {
  slug: string;
  name: string;
  material: string | null;
  designNo: string | null;
  knots: number | null;
  image: string;
};

type FeaturedGalleryProps = {
  pieces: FeaturedPiece[];
  title: string;
  eyebrow: string;
  viewAllLabel: string;
  viewPieceLabel: string;
  selectLabel: string;
};

const EASE = [0.22, 0.61, 0.36, 1] as const;
const SLIDE_MS = 6500;

function pieceMeta(p: FeaturedPiece) {
  return [p.designNo, p.knots ? `${p.knots} K.N.` : null, p.material].filter(Boolean).join(" · ");
}

export default function FeaturedGallery({
  pieces,
  title,
  eyebrow,
  viewAllLabel,
  viewPieceLabel,
  selectLabel,
}: FeaturedGalleryProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const piece = pieces[active];
  const count = pieces.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0 || index === active) return;
      setActive((index + count) % count);
      setProgress(0);
    },
    [active, count],
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduce || paused || count < 2) return;

    const tick = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + 100 / (SLIDE_MS / 50)));
    }, 50);

    const advance = window.setInterval(goNext, SLIDE_MS);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(advance);
    };
  }, [active, paused, reduce, count, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0]?.clientX ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0]?.clientX ?? 0;
  };

  const onTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) < 60) return;
    if (diff > 0) goNext();
    else goPrev();
  };

  if (!piece) return null;

  const meta = pieceMeta(piece);

  return (
    <section className="bg-surface" aria-label={title}>
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-10 sm:py-16 lg:max-w-7xl lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-balance font-display text-[clamp(1.75rem,4vw,2.25rem)] tracking-wide text-ink">
              {title}
            </h2>
          </div>
          <Link
            href="/collection"
            className="font-ui text-xs tracking-[0.18em] uppercase text-madder underline decoration-madder/40 underline-offset-4 hover:decoration-madder"
          >
            {viewAllLabel}
          </Link>
        </div>

        {/* Elegant carousel — adapted from 21st.dev/@dev.yadhakim/elegant-carousel */}
        <div
          className="relative mt-10 overflow-hidden border border-rule bg-paper lg:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(107,30,35,0.07)_0%,transparent_68%)]"
          />

          <div className="relative grid lg:min-h-[min(72vh,36rem)] lg:grid-cols-[0.95fr_1.05fr]">
            {/* Text panel */}
            <div className="flex flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
              <div className="min-h-[12rem] sm:min-h-[14rem] lg:min-h-[18rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={piece.slug}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-madder/70" aria-hidden />
                      <span className="font-ui text-[0.66rem] tabular-nums tracking-[0.22em] uppercase text-ink-muted">
                        {String(active + 1).padStart(2, "0")}
                        <span className="text-rule"> / </span>
                        {String(count).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-6 text-balance font-display text-[clamp(1.65rem,4vw,2.75rem)] leading-[1.08] tracking-wide text-ink">
                      {piece.name}
                    </h3>

                    {meta ? (
                      <p className="mt-3 font-ui text-xs tracking-[0.16em] uppercase text-madder">
                        {meta}
                      </p>
                    ) : null}

                    <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                      {selectLabel}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous piece"
                    className="inline-flex h-11 w-11 items-center justify-center border border-rule text-ink-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    <span aria-hidden className="rtl:rotate-180">←</span>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next piece"
                    className="inline-flex h-11 w-11 items-center justify-center border border-rule text-ink-muted transition-colors hover:border-ink hover:text-ink"
                  >
                    <span aria-hidden className="rtl:rotate-180">→</span>
                  </button>
                </div>
                <Link
                  href={`/collection/${piece.slug}`}
                  className="group inline-flex min-h-11 items-center gap-2 font-ui text-xs tracking-[0.16em] uppercase text-madder underline decoration-madder/50 underline-offset-[7px] hover:decoration-madder"
                >
                  {viewPieceLabel}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Image panel */}
            <div className="relative min-h-[16rem] border-t border-rule lg:min-h-0 lg:border-t-0 lg:border-s">
              <Link
                href={`/collection/${piece.slug}`}
                className="group relative block h-full min-h-[inherit]"
                aria-label={`${viewPieceLabel}: ${piece.name}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={piece.slug}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <motion.div
                      className="relative h-full min-h-[16rem] w-full overflow-hidden sm:min-h-[20rem] lg:min-h-[min(72vh,36rem)]"
                      initial={reduce ? false : { scale: 1 }}
                      animate={reduce ? { scale: 1 } : { scale: 1.06 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: SLIDE_MS / 1000, ease: "linear" }
                      }
                    >
                      <Image
                        src={piece.image}
                        alt={piece.name}
                        fill
                        priority={active === 0}
                        sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 52vw, 680px"
                        className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.02]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(107,30,35,0.12)_0%,transparent_55%)]"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </Link>

              {/* Frame corners — editorial accent from the 21st pattern */}
              <span
                aria-hidden
                className="pointer-events-none absolute start-4 top-4 h-8 w-8 border-s-2 border-t-2 border-madder/50"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 end-4 h-8 w-8 border-b-2 border-e-2 border-madder/50"
              />
            </div>
          </div>

          {/* Per-piece progress rail */}
          <div
            className="flex gap-px border-t border-rule bg-rule"
            role="tablist"
            aria-label={selectLabel}
          >
            {pieces.map((p, i) => {
              const on = i === active;
              const fill =
                i < active ? 100 : i === active ? progress : 0;
              return (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => goTo(i)}
                  className={`group relative min-h-11 min-w-0 flex-1 bg-paper px-2 py-3 text-start transition-colors sm:px-3 ${
                    on ? "bg-surface" : "hover:bg-surface/80"
                  }`}
                >
                  <span className="relative z-10 block h-0.5 w-full overflow-hidden bg-rule">
                    <span
                      className="absolute inset-y-0 start-0 bg-madder transition-[width] duration-75 ease-linear"
                      style={{ width: `${fill}%` }}
                    />
                  </span>
                  <span
                    className={`relative z-10 mt-2 block truncate font-ui text-[0.72rem] tracking-[0.1em] uppercase sm:text-[0.74rem] ${
                      on ? "text-ink" : "text-ink-muted group-hover:text-ink"
                    }`}
                  >
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {piece.name}
          {meta ? ` — ${meta}` : ""}
        </p>
      </div>
    </section>
  );
}
