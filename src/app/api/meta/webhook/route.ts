import crypto from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Webhook de Meta Lead Ads.
 *
 * 1) GET  -> verificación inicial del webhook (Meta envía hub.challenge).
 * 2) POST -> recepción de leads (campo `leadgen`). Si hay token de página,
 *    se recuperan los datos completos del lead desde la Graph API.
 *
 * Configura la suscripción en Meta apuntando a:
 *   https://TU-DOMINIO/api/meta/webhook
 */

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: NextRequest) {
  const raw = await request.text();

  // Validación opcional de firma (recomendado en producción).
  const appSecret = process.env.META_APP_SECRET;
  if (appSecret) {
    const signature = request.headers.get("x-hub-signature-256") ?? "";
    const expected =
      "sha256=" +
      crypto.createHmac("sha256", appSecret).update(raw).digest("hex");
    if (
      signature.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
  }

  let payload: MetaWebhookPayload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }

  const supabase = createAdminClient();

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "leadgen" || !change.value) continue;
      const v = change.value;

      const details = await fetchLeadDetails(v.leadgen_id);

      const { error } = await supabase
        .from("leads")
        .upsert(
          {
            full_name: details.full_name ?? "Lead de Meta Ads",
            email: details.email ?? null,
            phone: details.phone ?? null,
            source: "meta_ads",
            meta_lead_id: v.leadgen_id,
            utm: {
              utm_source: "meta_ads",
              meta_form_id: v.form_id ?? "",
              meta_page_id: v.page_id ?? "",
              meta_ad_id: v.ad_id ?? "",
            },
          },
          { onConflict: "meta_lead_id", ignoreDuplicates: true }
        );

      if (error) console.error("[meta webhook]", error.message);
    }
  }

  // Meta espera siempre un 200 rápido.
  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}

type MetaWebhookPayload = {
  entry?: Array<{
    changes?: Array<{
      field?: string;
      value?: {
        leadgen_id: string;
        form_id?: string;
        page_id?: string;
        ad_id?: string;
      };
    }>;
  }>;
};

type LeadDetails = {
  full_name?: string;
  email?: string;
  phone?: string;
};

async function fetchLeadDetails(leadgenId: string): Promise<LeadDetails> {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  if (!token) return {};

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${leadgenId}?fields=field_data&access_token=${token}`,
      { cache: "no-store" }
    );
    if (!res.ok) return {};
    const data = (await res.json()) as {
      field_data?: Array<{ name: string; values: string[] }>;
    };

    const result: LeadDetails = {};
    for (const field of data.field_data ?? []) {
      const value = field.values?.[0];
      if (!value) continue;
      const name = field.name.toLowerCase();
      if (name.includes("name")) result.full_name = value;
      else if (name.includes("email")) result.email = value;
      else if (name.includes("phone")) result.phone = value;
    }
    return result;
  } catch {
    return {};
  }
}
