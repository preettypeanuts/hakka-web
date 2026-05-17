const DEFAULT_NUMBER = "6282211116875";

/** Digits-only WhatsApp number (no + or spaces). */
export function getWhatsAppNumber(): string {
  const raw =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_NUMBER;
  return raw.replace(/\D/g, "");
}

export function whatsAppUrl(text?: string): string {
  const base = `https://wa.me/${getWhatsAppNumber()}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Same destination as wa.me; used for navbar / floating CTA links. */
export const whatsAppLink = `https://api.whatsapp.com/send?phone=${getWhatsAppNumber()}`;

export function whatsAppUrlWithEncodedText(encodedText: string): string {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodedText}`;
}
