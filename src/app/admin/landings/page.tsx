import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createLanding } from "@/lib/actions/landings";
import type { Landing } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  draft: "Borrador",
  published: "Publicada",
  archived: "Archivada",
};

export default async function LandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase
    .from("landings")
    .select("*")
    .order("created_at", { ascending: false });
  const landings = (data as Landing[]) ?? [];

  const counts = await Promise.all(
    landings.map((l) =>
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("landing_id", l.id)
        .then((r) => r.count ?? 0)
    )
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-forest-950">Landings</h1>
        <p className="mt-1 text-forest-800/70">
          Gestiona las URLs y el contenido de cada evento.
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form
        action={createLanding}
        className="flex flex-col gap-3 rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card sm:flex-row sm:items-end"
      >
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">
            Nombre del evento
          </span>
          <input
            name="name"
            required
            placeholder="Ej. Cena de presentación Barcelona"
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">
            URL (slug) · opcional
          </span>
          <input
            name="slug"
            placeholder="cena-barcelona"
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-forest-900 px-6 py-2.5 font-semibold text-white transition hover:bg-forest-800"
        >
          Crear landing
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white shadow-card">
        {landings.length === 0 ? (
          <p className="px-6 py-12 text-center text-forest-800/60">
            Todavía no hay landings. Crea la primera arriba.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-forest-900/10 bg-cream/50 text-xs uppercase tracking-wide text-forest-800/60">
              <tr>
                <th className="px-6 py-3">Evento</th>
                <th className="px-6 py-3">URL</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Leads</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-900/5">
              {landings.map((l, i) => (
                <tr key={l.id} className="hover:bg-cream/30">
                  <td className="px-6 py-4 font-semibold text-forest-950">
                    {l.name}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/${l.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-forest-700 hover:underline"
                    >
                      /{l.slug} ↗
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        l.status === "published"
                          ? "bg-mint-200 text-forest-800"
                          : l.status === "draft"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {STATUS_LABELS[l.status] ?? l.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-forest-950">
                    {counts[i]}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/landings/${l.id}`}
                      className="font-semibold text-forest-700 hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
