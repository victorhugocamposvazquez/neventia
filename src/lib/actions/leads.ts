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

const PARTY_TYPES = ["pareja", "solo", "amigos"] as const;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const landingId = String(formData.get("landingId") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const preferredDate = String(formData.get("preferredDate") ?? "").trim();
  const partyRaw = String(formData.get("party") ?? "").trim();
  const consent = formData.get("consent");

  // Honeypot anti-spam: si viene relleno, lo ignoramos silenciosamente.
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  const fieldErrors: Record<string, string> = {};
  if (!fullName) fieldErrors.fullName = "Escribe tu nombre.";
  if (!phone || phone.replace(/\D/g, "").length < 9) {
    fieldErrors.phone = "Teléfono no válido.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Email no válido.";
  }
  if (!consent) {
    fieldErrors.consent = "Debes aceptar la política de privacidad.";
  }
  if (!landingId) {
    return { ok: false, error: "No se ha podido identificar el evento." };
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const partyType = (PARTY_TYPES as readonly string[]).includes(partyRaw)
    ? partyRaw
    : null;
  const guests = partyType === "pareja" ? 2 : 1;

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
    preferred_date: preferredDate || null,
    party_type: partyType,
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
