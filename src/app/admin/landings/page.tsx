import Link from "next/link";
import { createLanding } from "@/lib/actions/landings";
import {
  AdminAlert,
  AdminEmpty,
  AdminPageHeader,
} from "@/components/admin/admin-shell";
import { formatAdminEventDate } from "@/lib/landing-event";
import { createClient } from "@/lib/supabase/server";
import type { Landing } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  draft: "Borrador",
  published: "Publicada",
  archived: "Archivada",
};

function statusClass(status: string) {
  if (status === "published") return "bg-mint-200 text-forest-800";
  if (status === "draft") return "bg-amber-100 text-amber-700";
  return "bg-zinc-200 text-zinc-600";
}

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
    .order("event_date", { ascending: false, nullsFirst: false });
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
    <div>
      <AdminPageHeader
        title="Landings"
        description="Una página por evento. Cambia slug, fecha y contenido."
      />

      {error && <AdminAlert variant="error">{error}</AdminAlert>}

      <form action={createLanding} className="admin-create-form">
        <label className="admin-field">
          <span>Nombre del evento</span>
          <input
            name="name"
            required
            placeholder="Ej. Cena de presentación Barcelona"
          />
        </label>
        <label className="admin-field">
          <span>URL (slug) · opcional</span>
          <input name="slug" placeholder="a-coruna-28-junio" />
        </label>
        <label className="admin-field">
          <span>Fecha y hora</span>
          <input name="event_date" type="datetime-local" required />
        </label>
        <button type="submit" className="admin-btn-primary shrink-0">
          Crear landing
        </button>
      </form>

      {landings.length === 0 ? (
        <div className="admin-table-wrap">
          <AdminEmpty
            title="Todavía no hay landings"
            description="Crea la primera con el formulario de arriba para empezar a captar reservas."
          />
        </div>
      ) : (
        <div className="admin-landing-grid">
          {landings.map((l, i) => (
            <article key={l.id} className="admin-landing-card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="admin-landing-card-title">{l.name}</h2>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass(l.status)}`}
                >
                  {STATUS_LABELS[l.status] ?? l.status}
                </span>
              </div>

              <div className="admin-landing-card-meta">
                <p>
                  <a
                    href={`/${l.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-forest-700 hover:underline"
                  >
                    /{l.slug} ↗
                  </a>
                </p>
                <p>{formatAdminEventDate(l.event_date)}</p>
                <p>
                  <strong className="text-forest-950">{counts[i]}</strong> lead
                  {counts[i] === 1 ? "" : "s"}
                </p>
              </div>

              <div className="admin-landing-card-actions">
                <Link
                  href={`/admin/landings/${l.id}`}
                  className="admin-btn-primary py-2 text-sm"
                >
                  Editar
                </Link>
                {counts[i] > 0 && (
                  <Link
                    href={`/admin/leads?landing=${l.id}`}
                    className="admin-btn-secondary py-2 text-sm"
                  >
                    Ver leads
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
