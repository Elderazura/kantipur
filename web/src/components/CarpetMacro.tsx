import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal, Parallax } from "./motion/Reveal";

const MACRO =
  "/assets/images/products/hemp-wool-carpet-stock/TC-1468-B-BLACK-80-K.N.-HEMP-WOOL-CLOSE-VIEW-1.jpg";

/**
 * Full-bleed pile at actual scale. The photograph is the argument — the three
 * lines sit on it rather than beside it, so the texture is never cropped into
 * a column.
 */
export default async function CarpetMacro() {
  const t = await getTranslations("carpet");

  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-obsidian lg:min-h-[86vh]">
      <Parallax distance={40} className="absolute inset-[-8%]">
        <Image
          src={MACRO}
          alt={t("imageAlt")}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,17,15,0.92)_0%,rgba(17,17,15,0.45)_45%,rgba(17,17,15,0.15)_100%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-10 sm:pb-24 lg:max-w-7xl lg:pb-28">
        <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.0] text-paper">
          {[t("line1"), t("line2"), t("line3")].map((line, i) => (
            <Reveal key={line} delay={i * 0.14} y={18} as="div">
              <span className="block">{line}</span>
            </Reveal>
          ))}
        </h2>

        <Reveal delay={0.5}>
          <p className="mt-8 max-w-[52ch] font-body text-base leading-relaxed text-paper/80 sm:text-lg">
            {t("body")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
