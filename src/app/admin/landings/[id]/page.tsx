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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/landings"
            className="text-sm text-forest-700 hover:underline"
          >
            ← Volver a landings
          </Link>
          <h1 className="mt-1 text-3xl font-extrabold text-forest-950">
            {landing.name}
          </h1>
        </div>
        <a
          href={`/${landing.slug}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-forest-900/15 px-4 py-2 text-sm font-semibold text-forest-800 hover:bg-cream"
        >
          Ver landing ↗
        </a>
      </div>

      <LandingEditor landing={landing} />
    </div>
  );
}
