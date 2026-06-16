"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const STARTER_CONTENT = {
  eventName: "",
  badge: "Plazas limitadas",
  headline: "Título principal del evento",
  subheadline: "Subtítulo que explica la propuesta de valor del evento.",
  heroImage: "",
  eventDateLabel: "",
  eventTime: "",
  venueName: "",
  address: "",
  scarcity: "Plazas limitadas",
  highlights: [],
  includes: [],
  agenda: [],
  gallery: [],
  testimonials: [],
  faqs: [],
  form: {
    title: "Reserva tu plaza",
    subtitle: "Déjanos tus datos y te confirmamos.",
    ctaText: "Reservar ahora",
    successTitle: "¡Plaza reservada!",
    successText: "Te contactaremos en breve.",
  },
  contactPhone: "",
  legal: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createLanding(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || name);

  if (!name || !slug) {
    redirect("/admin/landings?error=Faltan%20datos");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("landings")
    .insert({ name, slug, status: "draft", content: STARTER_CONTENT })
    .select("id")
    .single();

  if (error) {
    redirect(`/admin/landings?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/landings");
  redirect(`/admin/landings/${data!.id}`);
}

export type UpdateLandingState = { ok?: boolean; error?: string };

export async function updateLanding(
  _prev: UpdateLandingState,
  formData: FormData
): Promise<UpdateLandingState> {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? "").trim());
  const status = String(formData.get("status") ?? "draft");
  const metaPixel = String(formData.get("meta_pixel_id") ?? "").trim();
  const contentRaw = String(formData.get("content") ?? "{}");

  if (!id || !name || !slug) {
    return { error: "Nombre y URL son obligatorios." };
  }

  let content: unknown;
  try {
    content = JSON.parse(contentRaw);
  } catch {
    return { error: "El contenido no es un JSON válido. Revísalo." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("landings")
    .update({
      name,
      slug,
      status,
      meta_pixel_id: metaPixel || null,
      content,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/landings");
  revalidatePath(`/admin/landings/${id}`);
  revalidatePath(`/${slug}`);
  return { ok: true };
}

export async function deleteLanding(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  await supabase.from("landings").delete().eq("id", id);
  revalidatePath("/admin/landings");
  redirect("/admin/landings");
}
