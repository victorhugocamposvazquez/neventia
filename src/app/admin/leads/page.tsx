import Link from "next/link";
import { SourceBadge, LeadStatusBadge } from "@/components/admin/Badges";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import {
  AdminAlert,
  AdminEmpty,
  AdminPageHeader,
} from "@/components/admin/admin-shell";
import { createClient } from "@/lib/supabase/server";
import type { Landing, Lead, LeadSource, LeadStatus } from "@/lib/types";

type Search = {
  source?: string;
  status?: string;
  landing?: string;
  error?: string;
  deleted?: string;
};

const PARTY_LABELS: Record<string, string> = {
  pareja: "En pareja",
  solo: "Solo/a",
  amigos: "Con amigos",
};

const STATUS_CHIPS: { value: string; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "new", label: "Nuevos" },
  { value: "contacted", label: "Contactados" },
  { value: "confirmed", label: "Confirmados" },
  { value: "attended", label: "Asistieron" },
  { value: "no_show", label: "No asistieron" },
  { value: "discarded", label: "Descartados" },
];

function chipHref(status: string, sp: Search) {
  const p = new URLSearchParams();
  if (status) p.set("status", status);
  if (sp.source) p.set("source", sp.source);
  if (sp.landing) p.set("landing", sp.landing);
  const q = p.toString();
  return q ? `/admin/leads?${q}` : "/admin/leads";
}

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
  const hasFilters = Boolean(sp.source || sp.status || sp.landing);

  return (
    <div>
      {sp.error && <AdminAlert variant="error">{sp.error}</AdminAlert>}
      {sp.deleted && (
        <AdminAlert variant="success">Lead eliminado correctamente.</AdminAlert>
      )}

      <AdminPageHeader
        title="Leads"
        description={`${leads.length} resultado${leads.length === 1 ? "" : "s"}`}
        actions={
          <a
            href={`/admin/leads/export?${exportParams.toString()}`}
            className="admin-btn-secondary"
          >
            Exportar CSV
          </a>
        }
      />

      <div className="admin-quick-filters">
        {STATUS_CHIPS.map((chip) => {
          const active = (sp.status ?? "") === chip.value;
          return (
            <Link
              key={chip.value || "all"}
              href={chipHref(chip.value, sp)}
              className={`admin-chip ${active ? "admin-chip--active" : ""}`}
            >
              {chip.label}
            </Link>
          );
        })}
      </div>

      <form className="admin-filters mb-5">
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
        <button type="submit" className="admin-btn-primary py-2">
          Filtrar
        </button>
        {hasFilters && (
          <Link href="/admin/leads" className="admin-btn-ghost pb-2">
            Limpiar
          </Link>
        )}
      </form>

      {leads.length === 0 ? (
        <div className="admin-table-wrap">
          <AdminEmpty
            title={hasFilters ? "Sin resultados" : "Aún no hay leads"}
            description={
              hasFilters
                ? "Prueba a cambiar o limpiar los filtros."
                : "Cuando alguien solicite plaza desde una landing, aparecerá aquí."
            }
            action={
              hasFilters ? (
                <Link href="/admin/leads" className="admin-btn-secondary">
                  Limpiar filtros
                </Link>
              ) : (
                <Link href="/admin/landings" className="admin-btn-primary">
                  Ir a landings
                </Link>
              )
            }
          />
        </div>
      ) : (
        <>
          <div className="admin-lead-cards">
            {leads.map((lead) => (
              <Link
                key={lead.id}
                href={`/admin/leads/${lead.id}`}
                className="admin-lead-card"
              >
                <div className="admin-lead-card-top">
                  <div className="min-w-0">
                    <p className="admin-lead-card-name">{lead.full_name}</p>
                    <p className="admin-lead-card-meta">
                      {lead.phone ?? lead.email ?? "Sin contacto"}
                      {" · "}
                      {PARTY_LABELS[lead.party_type ?? ""] ??
                        `${lead.guests} pers.`}
                    </p>
                  </div>
                  <LeadStatusBadge status={lead.status as LeadStatus} />
                </div>
                <div className="admin-lead-card-bottom">
                  <SourceBadge source={lead.source as LeadSource} />
                  <span className="text-xs text-forest-800/50">
                    {lead.landing_id
                      ? (landingMap.get(lead.landing_id) ?? "Evento")
                      : "Sin evento"}
                  </span>
                  <span className="ml-auto text-xs text-forest-800/45">
                    {new Date(lead.created_at).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="admin-table-wrap admin-table-desktop">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Contacto</th>
                  <th>Reserva</th>
                  <th>Evento</th>
                  <th>Origen</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="font-semibold text-forest-950">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="hover:text-forest-700 hover:underline"
                      >
                        {lead.full_name}
                      </Link>
                    </td>
                    <td className="text-forest-800/80">
                      {lead.phone && <div>{lead.phone}</div>}
                      {lead.email && (
                        <div className="text-xs text-forest-800/50">
                          {lead.email}
                        </div>
                      )}
                    </td>
                    <td className="text-forest-800/80">
                      {lead.preferred_date && (
                        <div className="text-sm">{lead.preferred_date}</div>
                      )}
                      <div className="text-xs text-forest-800/50">
                        {PARTY_LABELS[lead.party_type ?? ""] ??
                          `${lead.guests} pers.`}
                      </div>
                    </td>
                    <td className="text-forest-800/80">
                      {lead.landing_id
                        ? (landingMap.get(lead.landing_id) ?? "—")
                        : "—"}
                    </td>
                    <td>
                      <SourceBadge source={lead.source as LeadSource} />
                    </td>
                    <td>
                      <LeadStatusSelect
                        id={lead.id}
                        status={lead.status as LeadStatus}
                      />
                    </td>
                    <td className="text-xs text-forest-800/50">
                      {new Date(lead.created_at).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
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
    <label className="admin-filter">
      <span>{label}</span>
      <select name={name} defaultValue={value ?? ""}>
        {children}
      </select>
    </label>
  );
}
