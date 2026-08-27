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
        "font-ui text-sm tracking-wide text-madder underline underline-offset-4 decoration-madder/60 hover:decoration-madder"
      }
    >
      {t("whatsapp")}
    </a>
  );
}
