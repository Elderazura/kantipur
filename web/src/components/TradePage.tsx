import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Reveal, Stagger, StaggerItem, WordsUp, Parallax } from "./motion/Reveal";

export type TradeItem = { title: string; body: string };

/**
 * Shared layout for the two trade audiences — designers and hospitality.
 * Both answer the same shape of question (can you make this, to spec, on time),
 * so they share a frame and differ only in content.
 */
export default function TradePage({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  itemsTitle,
  items,
  ctaLabel,
  ctaHref = "/bespoke#begin",
  closingTitle,
  closingBody,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  itemsTitle: string;
  items: TradeItem[];
  ctaLabel: string;
  ctaHref?: string;
  closingTitle?: string;
  closingBody?: string;
}) {
  return (
    <main className="flex flex-1 flex-col bg-paper">
      {/* Opening statement over a full-bleed frame */}
      <section className="relative isolate flex min-h-[58svh] items-end overflow-hidden bg-obsidian lg:min-h-[70vh]">
        <Parallax distance={36} className="absolute inset-[-8%]">
          <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" priority />
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,15,0.92)_0%,rgba(17,17,15,0.5)_50%,rgba(17,17,15,0.2)_100%)]"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 sm:px-10 sm:pb-20 lg:max-w-7xl">
          <p className="font-ui text-[0.7rem] tracking-[0.26em] uppercase text-paper/60 sm:text-[0.74rem]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(2rem,5.6vw,4rem)] leading-[1.04] text-paper">
            <WordsUp text={title} />
          </h1>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <p className="font-body text-lg leading-relaxed text-ink-muted sm:text-xl">{lead}</p>
          </Reveal>
        </div>
      </section>

      {/* Capability list — the questions a specifier actually asks */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24 lg:max-w-7xl lg:py-28">
          <Reveal>
            <h2 className="font-ui text-[0.72rem] tracking-[0.28em] uppercase text-ink-muted">
              {itemsTitle}
            </h2>
          </Reveal>

          <Stagger
            as="ul"
            className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3"
            gap={0.07}
          >
            {items.map((item) => (
              <StaggerItem
                as="li"
                key={item.title}
                className="bg-paper px-6 py-8 sm:px-7 sm:py-10"
              >
                <h3 className="font-display text-xl text-ink sm:text-2xl">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {closingTitle ? (
        <section className="border-t border-rule bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-10 sm:py-24">
            <Reveal>
              <h2 className="max-w-[22ch] font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.1] text-ink">
                {closingTitle}
              </h2>
              {closingBody ? (
                <p className="mt-5 max-w-[60ch] font-body text-base leading-relaxed text-ink-muted sm:text-lg">
                  {closingBody}
                </p>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="border-t border-rule bg-paper">
        <div className="mx-auto flex max-w-4xl flex-col items-start px-5 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <Link
              href={ctaHref}
              className="group inline-flex min-h-12 items-center gap-3 border border-ink px-7 py-4 font-ui text-xs tracking-[0.2em] uppercase text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {ctaLabel}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
