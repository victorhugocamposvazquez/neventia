"use server";

import { createClient } from "@/lib/supabase/server";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export type UploadLandingImageResult = { url?: string; error?: string };

export async function uploadLandingImage(
  formData: FormData
): Promise<UploadLandingImageResult> {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Selecciona una imagen." };
  }

  if (file.size > MAX_BYTES) {
    return { error: "La imagen no puede superar 5 MB." };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Formato no válido. Usa JPG, PNG, WebP o GIF." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Debes iniciar sesión para subir imágenes." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpeg", "jpg", "png", "webp", "gif"].includes(ext)
    ? ext.replace("jpeg", "jpg")
    : "jpg";
  const path = `${user.id}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${safeExt}`;

  const { error } = await supabase.storage
    .from("landing-media")
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return { error: error.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("landing-media").getPublicUrl(path);

  return { url: publicUrl };
}
