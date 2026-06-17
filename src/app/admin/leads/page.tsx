import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SourceBadge } from "@/components/admin/Badges";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { deleteLead } from "@/lib/actions/leads-admin";
import type { Landing, Lead, LeadSource, LeadStatus } from "@/lib/types";

type Search = {
  source?: string;
  status?: string;
  landing?: string;
};

const PARTY_LABELS: Record<string, string> = {
  pareja: "En pareja",
  solo: "Solo/a",
  amigos: "Con amigos",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();

  const { data: landingsData } = await supabase
    .from("landings")
    .select("id, name, slug")
    .order("created_at", { ascending: false });
  const landings = (landingsData as Pick<Landing, "id" | "name" | "slug">[]) ?? [];
  const landingMap = new Map(landings.map((l) => [l.id, l.name]));

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(300);

  if (sp.source) query = query.eq("source", sp.source);
  if (sp.status) query = query.eq("status", sp.status);
  if (sp.landing) query = query.eq("landing_id", sp.landing);

  const { data } = await query;
  const leads = (data as Lead[]) ?? [];

  const exportParams = new URLSearchParams();
  if (sp.source) exportParams.set("source", sp.source);
  if (sp.status) exportParams.set("status", sp.status);
  if (sp.landing) exportParams.set("landing", sp.landing);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-forest-950">Leads</h1>
          <p className="mt-1 text-forest-800/70">
            {leads.length} resultado{leads.length === 1 ? "" : "s"}
          </p>
        </div>
        <a
          href={`/admin/leads/export?${exportParams.toString()}`}
          className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-800"
        >
          Exportar CSV
        </a>
      </div>

      {/* Filtros */}
      <form className="flex flex-wrap items-end gap-3 rounded-2xl border border-forest-900/10 bg-white p-4 shadow-card">
        <Filter label="Origen" name="source" value={sp.source}>
          <option value="">Todos</option>
          <option value="landing">Landing</option>
          <option value="meta_ads">Meta Ads</option>
          <option value="manual">Manual</option>
        </Filter>
        <Filter label="Estado" name="status" value={sp.status}>
          <option value="">Todos</option>
          <option value="new">Nuevo</option>
          <option value="contacted">Contactado</option>
          <option value="confirmed">Confirmado</option>
          <option value="attended">Asistió</option>
          <option value="no_show">No asistió</option>
          <option value="discarded">Descartado</option>
        </Filter>
        <Filter label="Landing" name="landing" value={sp.landing}>
          <option value="">Todas</option>
          {landings.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </Filter>
        <button
          type="submit"
          className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-800"
        >
          Filtrar
        </button>
        <Link
          href="/admin/leads"
          className="rounded-full px-4 py-2.5 text-sm font-medium text-forest-700 hover:underline"
        >
          Limpiar
        </Link>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-forest-900/10 bg-white shadow-card">
        {leads.length === 0 ? (
          <p className="px-6 py-12 text-center text-forest-800/60">
            No hay leads con estos filtros.
          </p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-forest-900/10 bg-cream/50 text-xs uppercase tracking-wide text-forest-800/60">
              <tr>
                <th className="px-5 py-3">Nombre</th>
                <th className="px-5 py-3">Contacto</th>
                <th className="px-5 py-3">Reserva</th>
                <th className="px-5 py-3">Evento</th>
                <th className="px-5 py-3">Origen</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-900/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="align-middle hover:bg-cream/30">
                  <td className="px-5 py-3 font-semibold text-forest-950">
                    {lead.full_name}
                  </td>
                  <td className="px-5 py-3 text-forest-800/80">
                    {lead.phone && <div>{lead.phone}</div>}
                    {lead.email && (
                      <div className="text-xs text-forest-800/50">
                        {lead.email}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-forest-800/80">
                    {lead.preferred_date && (
                      <div className="text-sm">{lead.preferred_date}</div>
                    )}
                    <div className="text-xs text-forest-800/50">
                      {PARTY_LABELS[lead.party_type ?? ""] ??
                        `${lead.guests} pers.`}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-forest-800/80">
                    {lead.landing_id
                      ? (landingMap.get(lead.landing_id) ?? "—")
                      : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <SourceBadge source={lead.source as LeadSource} />
                  </td>
                  <td className="px-5 py-3">
                    <LeadStatusSelect
                      id={lead.id}
                      status={lead.status as LeadStatus}
                    />
                  </td>
                  <td className="px-5 py-3 text-xs text-forest-800/50">
                    {new Date(lead.created_at).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <form action={deleteLead}>
                      <input type="hidden" name="id" value={lead.id} />
                      <button
                        type="submit"
                        className="text-xs text-red-500 hover:underline"
                        title="Eliminar lead"
                      >
                        Eliminar
                      </button>
                    </form>
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

function Filter({
  label,
  name,
  value,
  children,
}: {
  label: string;
  name: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-forest-800/50">
        {label}
      </span>
      <select
        name={name}
        defaultValue={value ?? ""}
        className="rounded-lg border border-forest-900/15 bg-cream/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mint-300"
      >
        {children}
      </select>
    </label>
  );
}
