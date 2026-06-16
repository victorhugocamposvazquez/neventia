"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type LeadFormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const landingId = String(formData.get("landingId") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const guestsRaw = String(formData.get("guests") ?? "1").trim();

  // Honeypot anti-spam: si viene relleno, lo ignoramos silenciosamente.
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  const fieldErrors: Record<string, string> = {};
  if (!fullName) fieldErrors.fullName = "Indícanos tu nombre.";
  if (!phone || phone.replace(/\D/g, "").length < 9) {
    fieldErrors.phone = "Necesitamos un teléfono válido para confirmarte.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Revisa el formato del email.";
  }
  if (!landingId) {
    return { ok: false, error: "No se ha podido identificar el evento." };
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const guests = Math.max(1, Math.min(20, Number(guestsRaw) || 1));

  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = String(formData.get(key) ?? "").trim();
    if (value) utm[key] = value;
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("leads").insert({
    landing_id: landingId,
    full_name: fullName,
    phone,
    email: email || null,
    guests,
    source: "landing",
    utm,
  });

  if (error) {
    console.error("[submitLead]", error.message);
    return {
      ok: false,
      error: "No hemos podido registrar tu reserva. Inténtalo de nuevo.",
    };
  }

  return { ok: true };
}
