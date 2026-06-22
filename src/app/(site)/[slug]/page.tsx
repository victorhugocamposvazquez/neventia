import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MetaPixel } from "@/components/site/MetaPixel";
import { createClient } from "@/lib/supabase/server";
import { LandingView } from "@/components/landing/LandingView";
import type { Landing } from "@/lib/types";

async function getLanding(slug: string): Promise<Landing | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("landings")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return (data as Landing) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = await getLanding(slug);
  if (!landing) return { title: "Evento no encontrado" };

  const c = landing.content ?? {};
  const title = landing.city
    ? `Comida de autor a ${c.freePrice ?? "0€"} en ${landing.city}`
    : landing.name;
  return {
    title,
    description: c.subheadline ?? c.headline,
    openGraph: {
      title,
      description: c.subheadline,
      images: c.heroImage ? [c.heroImage] : undefined,
      type: "website",
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const landing = await getLanding(slug);
  if (!landing) notFound();

  return (
    <>
      {landing.meta_pixel_id && (
        <MetaPixel pixelId={landing.meta_pixel_id} />
      )}
      <LandingView landing={landing} />
    </>
  );
}
