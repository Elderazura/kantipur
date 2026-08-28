import { getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import {
  CUSTOM_CAPABILITY_ICONS,
  type CustomCapabilityKey,
} from "./CustomCapabilityIcons";

const CAPABILITIES: CustomCapabilityKey[] = [
  "size",
  "material",
  "texture",
  "colour",
  "knot",
];

function cellClass(index: number) {
  if (index < 3) {
    return "bg-paper px-5 py-6 sm:px-6 sm:py-7 lg:col-span-2";
  }
  return "bg-paper px-5 py-6 sm:col-span-2 sm:px-6 sm:py-7 lg:col-span-3";
}

export default async function CustomCapabilities() {
  const t = await getTranslations("custom");

  return (
    <section className="border-b border-rule bg-surface" aria-labelledby="custom-capabilities-heading">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-20 lg:max-w-7xl lg:py-24">
        <Reveal>
          <p className="font-ui text-[0.65rem] tracking-[0.28em] uppercase text-ink-muted">
            {t("capabilitiesEyebrow")}
          </p>
          <h2
            id="custom-capabilities-heading"
            className="mt-5 max-w-[20ch] font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.08] text-ink"
          >
            {t("capabilitiesTitle")}
          </h2>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-10 grid gap-px border border-rule bg-rule sm:mt-12 sm:grid-cols-2 lg:grid-cols-6"
          gap={0.07}
        >
          {CAPABILITIES.map((key, index) => {
            const Icon = CUSTOM_CAPABILITY_ICONS[key];
            return (
              <StaggerItem as="li" key={key} className={cellClass(index)}>
                <Icon className="h-7 w-7 text-madder/80" aria-hidden />
                <h3 className="mt-4 font-display text-base text-ink sm:text-lg">
                  {t(`cap_${key}_title`)}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                  {t(`cap_${key}_body`)}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
