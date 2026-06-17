"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const STARTER_CONTENT = {
  badge: "Evento gastronómico · plazas limitadas",
  headline: "Una comida de autor",
  freePrice: "0€",
  subheadline: "Te invitamos a una experiencia gastronómica completa, sin coste y sin compromiso de compra.",
  heroImage: "",
  region: "",
  strip: [
    "Menú completo · entrante, principal, postre y bebida",
    "Sin compromiso de compra",
    "Ven en pareja · ambiente cuidado",
  ],
  stepsIntro: "Reservar tu plaza lleva menos de un minuto.",
  steps: [
    { title: "Reserva tu plaza", description: "Elige fecha y déjanos tus datos." },
    { title: "Asiste a la presentación", description: "Una charla breve de nuestras marcas. Sin compromiso." },
    { title: "Disfruta tu comida", description: "Un menú completo de autor, gratis." },
  ],
  menuTitle: "Un menú pensado para disfrutar",
  menuIntro: "",
  menu: [],
  menuIncludes: ["Agua", "Vino de la casa", "Café"],
  whyTitle: "¿Por qué es gratis?",
  whyIntro: "La comida está patrocinada por marcas que presentan sus productos antes de comer.",
  whyImage: "",
  whyPoints: [
    { title: "Cero compromiso de compra", description: "Comprar algo es totalmente opcional." },
    { title: "Sin coste oculto", description: "Menú, bebidas y café incluidos." },
  ],
  venueTitle: "",
  venueNote: "Dirección exacta enviada al confirmar tu plaza.",
  venueImage: "",
  dates: [
    { value: "2026-01-01", label: "Sábado, 1 de enero", time: "13:30 h", slotsLabel: "plazas disponibles", status: "available" },
  ],
  gallery: [],
  testimonials: [],
  faqs: [],
  form: {
    title: "Reserva gratuita",
    subtitle: "Completa tus datos y te confirmamos la plaza.",
    ctaText: "Reservar mi plaza gratis",
    successTitle: "¡Plaza reservada!",
    successText: "Te llamaremos en 24-48 h para confirmar.",
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
  const city = String(formData.get("city") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "").trim();
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
      city: city || null,
      region: region || null,
      event_date: eventDate ? new Date(eventDate).toISOString() : null,
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
