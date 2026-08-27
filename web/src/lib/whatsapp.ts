export function buildWhatsAppUrl(phoneDigits: string, text?: string): string {
  const base = `https://wa.me/${phoneDigits.replace(/\D/g, "")}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "9779851020298";
}
