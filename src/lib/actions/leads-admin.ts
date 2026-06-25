"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LEAD_STATUS_LABELS } from "@/components/admin/Badges";
import { createAdminClient } from "@/lib/supabase/admin";
import type { LeadActivityType, LeadStatus } from "@/lib/types";

function adminOrRedirect(returnTo: string) {
  try {
    return createAdminClient();
  } catch {
    redirect(`${returnTo}?error=${encodeURIComponent("No se pudo conectar con la base de datos.")}`);
  }
}

async function logActivity(
  supabase: ReturnType<typeof createAdminClient>,
  leadId: string,
  type: LeadActivityType,
  body: string | null,
  meta: Record<string, unknown> = {}
) {
  const { error } = await supabase.from("lead_activities").insert({
    lead_id: leadId,
    type,
    body,
    meta,
  });
  if (error) console.error("[logActivity]", error.message);
}

function revalidateLead(leadId: string) {
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function updateLeadStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() as LeadStatus;
  const returnTo = String(formData.get("returnTo") ?? "").trim();

  if (!id || !status) return;

  const supabase = adminOrRedirect(returnTo || `/admin/leads/${id}`);

  const { data: current } = await supabase
    .from("leads")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) {
    if (returnTo) redirect(`${returnTo}?error=${encodeURIComponent(error.message)}`);
    return;
  }

  if (current?.status && current.status !== status) {
    await logActivity(supabase, id, "status_change", null, {
      from: current.status,
      to: status,
      label: `${LEAD_STATUS_LABELS[current.status as LeadStatus]} → ${LEAD_STATUS_LABELS[status]}`,
    });
  }

  revalidateLead(id);
  if (returnTo) redirect(returnTo);
}

export async function createManualLead(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const landingId = String(formData.get("landing_id") ?? "").trim();
  const guests = Math.max(1, Number(formData.get("guests")) || 1);

  if (!fullName) return;

  const supabase = adminOrRedirect("/admin/leads");

  const { data, error } = await supabase
    .from("leads")
    .insert({
      full_name: fullName,
      phone: phone || null,
      email: email || null,
      landing_id: landingId || null,
      guests,
      source: "manual",
    })
    .select("id")
    .single();

  if (error || !data) return;

  await logActivity(supabase, data.id, "created", "Lead creado manualmente en el backoffice.");
  revalidateLead(data.id);
}

export async function deleteLead(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const returnTo = String(formData.get("returnTo") ?? "/admin/leads").trim();

  if (!id) {
    redirect(`${returnTo}?error=${encodeURIComponent("Lead no encontrado.")}`);
  }

  const supabase = adminOrRedirect(returnTo);
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    redirect(`${returnTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  redirect(`${returnTo}?deleted=1`);
}

export async function updateLeadNotes(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const returnTo = String(formData.get("returnTo") ?? `/admin/leads/${id}`).trim();

  if (!id) return;

  const supabase = adminOrRedirect(returnTo);

  const { data: current } = await supabase
    .from("leads")
    .select("notes")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("leads").update({ notes: notes || null }).eq("id", id);
  if (error) {
    redirect(`${returnTo}?error=${encodeURIComponent(error.message)}`);
  }

  if ((current?.notes ?? "") !== notes && notes) {
    await logActivity(supabase, id, "note", notes);
  }

  revalidateLead(id);
  redirect(`${returnTo}?saved=notes`);
}

export async function addTimelineNote(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const returnTo = String(formData.get("returnTo") ?? `/admin/leads/${id}`).trim();

  if (!id || !body) return;

  const supabase = adminOrRedirect(returnTo);
  await logActivity(supabase, id, "note", body);
  revalidateLead(id);
  if (returnTo) redirect(returnTo);
}

export async function toggleLeadTag(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();
  const returnTo = String(formData.get("returnTo") ?? `/admin/leads/${id}`).trim();

  if (!id || !tag) return;

  const supabase = adminOrRedirect(returnTo);

  const { data: lead } = await supabase.from("leads").select("tags").eq("id", id).maybeSingle();
  const tags: string[] = Array.isArray(lead?.tags) ? lead.tags : [];
  const has = tags.includes(tag);
  const next = has ? tags.filter((t) => t !== tag) : [...tags, tag];

  const { error } = await supabase.from("leads").update({ tags: next }).eq("id", id);
  if (error) {
    redirect(`${returnTo}?error=${encodeURIComponent(error.message)}`);
  }

  await logActivity(
    supabase,
    id,
    has ? "tag_removed" : "tag_added",
    tag,
    { tag }
  );

  revalidateLead(id);
  if (returnTo) redirect(returnTo);
}

export async function logLeadContact(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim() as "call" | "whatsapp" | "email";

  if (!id || !["call", "whatsapp", "email"].includes(type)) return;

  try {
    const supabase = createAdminClient();
    const labels = {
      call: "Llamada iniciada desde el backoffice",
      whatsapp: "WhatsApp abierto desde el backoffice",
      email: "Email abierto desde el backoffice",
    };
    await logActivity(supabase, id, type, labels[type]);
    revalidateLead(id);
  } catch (err) {
    console.error("[logLeadContact]", err);
  }
}

/** Registra actividad «created» al captar un lead desde la web. */
export async function logLeadCreated(leadId: string) {
  try {
    const supabase = createAdminClient();
    await logActivity(supabase, leadId, "created", "Solicitud recibida desde la landing.");
  } catch {
    // No bloquear el alta del lead si falla el log.
  }
}
