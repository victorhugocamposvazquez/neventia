import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LandingEditor } from "@/components/admin/LandingEditor";
import type { Landing } from "@/lib/types";

export default async function EditLandingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("landings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const landing = data as Landing | null;
  if (!landing) notFound();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <Link
            href="/admin/landings"
            className="text-sm text-forest-700 hover:underline"
          >
            ← Volver a landings
          </Link>
          <h1 className="mt-1 text-2xl font-extrabold text-forest-950 lg:text-3xl">
            Editar landing
          </h1>
          <p className="text-sm text-forest-800/60">{landing.name}</p>
        </div>
        <a
          href={`/${landing.slug}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-forest-900/15 px-4 py-2 text-sm font-semibold text-forest-800 hover:bg-cream"
        >
          Ver publicada ↗
        </a>
      </div>

      <LandingEditor landing={landing} />
    </div>
  );
}
