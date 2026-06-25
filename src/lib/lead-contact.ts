/** Normaliza teléfono español a dígitos con prefijo 34. */
export function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) return `34${digits}`;
  if (digits.startsWith("34") && digits.length >= 11) return digits;
  return digits;
}

export function telHref(phone: string | null | undefined): string | null {
  if (!phone?.trim()) return null;
  const digits = normalizePhoneDigits(phone);
  return digits ? `tel:+${digits}` : null;
}

export function whatsappHref(
  phone: string | null | undefined,
  message?: string
): string | null {
  if (!phone?.trim()) return null;
  const digits = normalizePhoneDigits(phone);
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function defaultWhatsAppMessage(name: string, eventName?: string | null) {
  const first = name.split(" ")[0];
  if (eventName) {
    return `Hola ${first}, te escribo de Neventia sobre tu solicitud para ${eventName}.`;
  }
  return `Hola ${first}, te escribo de Neventia sobre tu solicitud de plaza.`;
}

export const SUGGESTED_LEAD_TAGS = [
  "Prioridad",
  "Pareja",
  "Llamar",
  "Confirmado",
  "Revisar",
  "No localizable",
] as const;
