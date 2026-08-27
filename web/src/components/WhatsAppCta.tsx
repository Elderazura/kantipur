"use client";

import { useTranslations } from "next-intl";
import { buildWhatsAppUrl, getWhatsAppNumber } from "@/lib/whatsapp";

type WhatsAppCtaProps = {
  text?: string;
  className?: string;
};

export default function WhatsAppCta({ text, className }: WhatsAppCtaProps) {
  const t = useTranslations("cta");
  const href = buildWhatsAppUrl(getWhatsAppNumber(), text);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex min-h-11 items-center font-ui text-sm tracking-wide text-madder underline decoration-madder/60 underline-offset-4 hover:decoration-madder"
      }
    >
      {t("whatsapp")}
    </a>
  );
}
