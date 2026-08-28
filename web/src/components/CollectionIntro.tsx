import { getTranslations } from "next-intl/server";
import { Reveal, WordsUp } from "./motion/Reveal";

type CollectionIntroProps = {
  total: number;
};

export default async function CollectionIntro({ total }: CollectionIntroProps) {
  const t = await getTranslations("collection");

  return (
    <header className="border-b border-rule pb-10 sm:pb-12">
      <Reveal>
        <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
          {t("eyebrow")}
        </p>
      </Reveal>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <h1 className="max-w-[14ch] font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] text-ink">
          <WordsUp text={t("title")} />
        </h1>

        <Reveal delay={0.1} className="lg:max-w-md lg:pb-1">
          <p className="font-body text-base leading-relaxed text-ink-muted sm:text-lg">
            {t("intro")}
          </p>
          <p className="mt-4 font-ui text-[0.62rem] tracking-[0.18em] uppercase text-madder">
            {t("pieceCount", { count: total })}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
