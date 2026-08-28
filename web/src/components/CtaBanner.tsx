import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Reveal, Parallax, WordsUp } from "./motion/Reveal";

/**
 * Full-bleed break between chapters. Keeps the page moving and gives the
 * enquiry route a second and third appearance without nagging.
 */
export default function CtaBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
  ctaHref,
  ctaLabel,
  height = "tall",
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  body?: string;
  ctaHref: string;
  ctaLabel: string;
  height?: "tall" | "short";
}) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-ink ${
        height === "tall"
          ? "min-h-[48svh] sm:min-h-[56svh] lg:min-h-[62vh]"
          : "min-h-[36svh] sm:min-h-[40svh] lg:min-h-[44vh]"
      } flex items-center`}
    >
      <Parallax distance={48} className="absolute inset-[-10%]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/25 rtl:bg-gradient-to-l"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-14 sm:px-10 sm:py-20 lg:max-w-7xl">
        {eyebrow ? (
          <Reveal>
            <p className="font-ui text-[0.62rem] tracking-[0.24em] uppercase text-paper/60 sm:text-[0.65rem] sm:tracking-[0.28em]">
              {eyebrow}
            </p>
          </Reveal>
        ) : null}

        <h2
          className={`mt-5 text-balance font-display text-[clamp(1.55rem,5vw,3.2rem)] leading-[1.1] text-paper sm:mt-6 sm:leading-[1.08] ${
            body ? "max-w-2xl" : "max-w-[18ch] sm:max-w-[17ch]"
          }`}
        >
          <WordsUp text={title} />
        </h2>

        {body ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-paper/75 sm:mt-6 sm:text-lg">
              {body}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={0.18}>
          <div className="mt-7 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-4">
            <Link
              href={ctaHref}
              className="group inline-flex min-h-11 items-center gap-2 font-ui text-sm tracking-[0.16em] uppercase text-paper underline decoration-madder decoration-2 underline-offset-[8px]"
            >
              {ctaLabel}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
