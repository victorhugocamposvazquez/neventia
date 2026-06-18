import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${landing.meta_pixel_id}');
          fbq('track', 'PageView');`}
        </Script>
      )}
      <LandingView landing={landing} />
    </>
  );
}
