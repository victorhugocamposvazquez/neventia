import Link from "next/link";
import { SourceBadge, LeadStatusBadge } from "@/components/admin/Badges";
import { LeadListContact } from "@/components/admin/LeadListContact";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import {
  AdminAlert,
  AdminEmpty,
  AdminPageHeader,
} from "@/components/admin/admin-shell";
import { formatRelativeShort } from "@/lib/admin-format";
import { createClient } from "@/lib/supabase/server";
import type { Landing, Lead, LeadSource, LeadStatus } from "@/lib/types";

type Search = {
  q?: string;
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

function buildParams(sp: Search, overrides: Partial<Search> = {}) {
  const merged = { ...sp, ...overrides };
  const p = new URLSearchParams();
  if (merged.q?.trim()) p.set("q", merged.q.trim());
  if (merged.source) p.set("source", merged.source);
  if (merged.status) p.set("status", merged.status);
  if (merged.landing) p.set("landing", merged.landing);
  return p;
}

function listHref(sp: Search, overrides: Partial<Search> = {}) {
  const q = buildParams(sp, overrides).toString();
  return q ? `/admin/leads?${q}` : "/admin/leads";
}

function detailHref(leadId: string, sp: Search) {
  const from = buildParams(sp).toString();
  return from
    ? `/admin/leads/${leadId}?from=${encodeURIComponent(`/admin/leads?${from}`)}`
    : `/admin/leads/${leadId}`;
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const q = (sp.q ?? "").trim().slice(0, 80);
  const qSafe = q.replace(/[%_,]/g, "").replace(/,/g, " ");

  const { data: landingsData } = await supabase
    .from("landings")
    .select("id, name, slug")
    .order("created_at", { ascending: false });
  const landings = (landingsData as Pick<Landing, "id" | "name" | "slug">[]) ?? [];
  const landingMap = new Map(landings.map((l) => [l.id, l.name]));

  const baseFiltered = () => {
    let query = supabase.from("leads").select("*", { count: "exact", head: true });
    if (sp.source) query = query.eq("source", sp.source);
    if (sp.landing) query = query.eq("landing_id", sp.landing);
    if (qSafe) {
      query = query.or(
        `full_name.ilike.%${qSafe}%,phone.ilike.%${qSafe}%,email.ilike.%${qSafe}%`
      );
    }
    return query;
  };

  const statusCountEntries = await Promise.all(
    STATUS_CHIPS.filter((c) => c.value).map(async (chip) => {
      const { count } = await baseFiltered().eq("status", chip.value);
      return [chip.value, count ?? 0] as const;
    })
  );
  const statusCounts = Object.fromEntries(statusCountEntries) as Record<
    string,
    number
  >;

  const { count: allCount } = await baseFiltered();
  statusCounts[""] = allCount ?? 0;

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(300);

  if (sp.source) query = query.eq("source", sp.source);
  if (sp.status) query = query.eq("status", sp.status);
  if (sp.landing) query = query.eq("landing_id", sp.landing);
  if (qSafe) {
    query = query.or(
      `full_name.ilike.%${qSafe}%,phone.ilike.%${qSafe}%,email.ilike.%${qSafe}%`
    );
  }

  const { data } = await query;
  const leads = (data as Lead[]) ?? [];

  const exportParams = buildParams(sp);
  const hasFilters = Boolean(q || sp.source || sp.status || sp.landing);

  return (
    <div>
      {sp.error && <AdminAlert variant="error">{sp.error}</AdminAlert>}
      {sp.deleted && (
        <AdminAlert variant="success">Lead eliminado correctamente.</AdminAlert>
      )}

      <AdminPageHeader
        title="Leads"
        description={`${leads.length} resultado${leads.length === 1 ? "" : "s"}${
          statusCounts.new ? ` · ${statusCounts.new} nuevos` : ""
        }`}
        actions={
          <a
            href={`/admin/leads/export?${exportParams.toString()}`}
            className="admin-btn-secondary"
          >
            Exportar CSV
          </a>
        }
      />

      <form className="admin-search-bar" method="get">
        {sp.source && <input type="hidden" name="source" value={sp.source} />}
        {sp.status && <input type="hidden" name="status" value={sp.status} />}
        {sp.landing && <input type="hidden" name="landing" value={sp.landing} />}
        <label className="admin-search-field">
          <span className="sr-only">Buscar</span>
          <svg
            className="admin-search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M16.5 16.5 20 20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre, teléfono o email…"
            autoComplete="off"
          />
        </label>
        <button type="submit" className="admin-btn-primary py-2.5">
          Buscar
        </button>
        {q && (
          <Link href={listHref(sp, { q: "" })} className="admin-btn-ghost">
            Limpiar búsqueda
          </Link>
        )}
      </form>

      <div className="admin-quick-filters">
        {STATUS_CHIPS.map((chip) => {
          const active = (sp.status ?? "") === chip.value;
          const count = statusCounts[chip.value] ?? 0;
          return (
            <Link
              key={chip.value || "all"}
              href={listHref(sp, { status: chip.value })}
              className={`admin-chip ${active ? "admin-chip--active" : ""}`}
            >
              {chip.label}
              <span className="admin-chip-count">{count}</span>
            </Link>
          );
        })}
      </div>

      <form className="admin-filters mb-5" method="get">
        {q && <input type="hidden" name="q" value={q} />}
        {sp.status && <input type="hidden" name="status" value={sp.status} />}
        <Filter label="Origen" name="source" value={sp.source}>
          <option value="">Todos</option>
          <option value="landing">Landing</option>
          <option value="meta_ads">Meta Ads</option>
          <option value="manual">Manual</option>
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
          Aplicar
        </button>
        {hasFilters && (
          <Link href="/admin/leads" className="admin-btn-ghost pb-2">
            Limpiar todo
          </Link>
        )}
      </form>

      {leads.length === 0 ? (
        <div className="admin-table-wrap">
          <AdminEmpty
            title={hasFilters ? "Sin resultados" : "Aún no hay leads"}
            description={
              hasFilters
                ? "Prueba otra búsqueda o limpia los filtros."
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
            {leads.map((lead) => {
              const eventName = lead.landing_id
                ? landingMap.get(lead.landing_id)
                : null;
              return (
                <div key={lead.id} className="admin-lead-card admin-lead-card--row">
                  <Link
                    href={detailHref(lead.id, sp)}
                    className="admin-lead-card-main"
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
                        {eventName ?? "Sin evento"}
                      </span>
                      <time
                        className="ml-auto text-xs text-forest-800/45"
                        dateTime={lead.created_at}
                        title={new Date(lead.created_at).toLocaleString("es-ES")}
                      >
                        {formatRelativeShort(lead.created_at)}
                      </time>
                    </div>
                  </Link>
                  <LeadListContact
                    name={lead.full_name}
                    phone={lead.phone}
                    eventName={eventName}
                  />
                </div>
              );
            })}
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
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const eventName = lead.landing_id
                    ? landingMap.get(lead.landing_id)
                    : null;
                  const isNew = lead.status === "new";
                  return (
                    <tr
                      key={lead.id}
                      className={isNew ? "admin-table-row--new" : undefined}
                    >
                      <td className="font-semibold text-forest-950">
                        <Link
                          href={detailHref(lead.id, sp)}
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
                        {eventName ?? "—"}
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
                        <time
                          dateTime={lead.created_at}
                          title={new Date(lead.created_at).toLocaleString("es-ES")}
                        >
                          {formatRelativeShort(lead.created_at)}
                        </time>
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          <LeadListContact
                            name={lead.full_name}
                            phone={lead.phone}
                            eventName={eventName}
                          />
                          <Link
                            href={detailHref(lead.id, sp)}
                            className="admin-btn-ghost text-xs"
                          >
                            Abrir
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
