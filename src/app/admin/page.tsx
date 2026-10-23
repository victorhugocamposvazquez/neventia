import Link from "next/link";
import { LeadStatusBadge, SourceBadge } from "@/components/admin/Badges";
import {
  AdminCard,
  AdminEmpty,
  AdminPageHeader,
  AdminStatLink,
} from "@/components/admin/admin-shell";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";

function weekAgoISO() {
  return new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const weekAgo = weekAgoISO();

  const countLeads = () =>
    supabase.from("leads").select("*", { count: "exact", head: true });

  const [
    totalLeads,
    weekLeads,
    newLeads,
    metaLeads,
    confirmedLeads,
    attendedLeads,
    publishedLandings,
    recent,
  ] = await Promise.all([
    countLeads().then((r) => r.count ?? 0),
    countLeads()
      .gte("created_at", weekAgo)
      .then((r) => r.count ?? 0),
    countLeads()
      .eq("status", "new")
      .then((r) => r.count ?? 0),
    countLeads()
      .eq("source", "meta_ads")
      .then((r) => r.count ?? 0),
    countLeads()
      .eq("status", "confirmed")
      .then((r) => r.count ?? 0),
    countLeads()
      .eq("status", "attended")
      .then((r) => r.count ?? 0),
    supabase
      .from("landings")
      .select("*", { count: "exact", head: true })
      .eq("status", "published")
      .then((r) => r.count ?? 0),
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8)
      .then((r) => (r.data as Lead[]) ?? []),
  ]);

  const stats = [
    {
      label: "Nuevos",
      value: newLeads,
      href: "/admin/leads?status=new",
      hint: "Ver pendientes →",
    },
    {
      label: "Últimos 7 días",
      value: weekLeads,
      href: "/admin/leads",
      hint: "Ver leads →",
    },
    {
      label: "Confirmados",
      value: confirmedLeads,
      href: "/admin/leads?status=confirmed",
      hint: "Filtrar →",
    },
    {
      label: "Asistieron",
      value: attendedLeads,
      href: "/admin/leads?status=attended",
      hint: "Filtrar →",
    },
    {
      label: "Meta Ads",
      value: metaLeads,
      href: "/admin/leads?source=meta_ads",
      hint: "Filtrar →",
    },
    {
      label: "Landings activas",
      value: publishedLandings,
      href: "/admin/landings",
      hint: "Gestionar →",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Resumen"
        description={
          totalLeads === 0
            ? "Empieza creando una landing y compartiendo el enlace."
            : `${totalLeads} lead${totalLeads === 1 ? "" : "s"} en total · ${newLeads} por gestionar`
        }
        actions={
          <Link href="/admin/landings" className="admin-btn-primary">
            Nueva landing
          </Link>
        }
      />

      <div className="admin-quick-actions">
        <Link href="/admin/leads?status=new" className="admin-quick-action">
          <span className="admin-quick-action-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h10M4 17h7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>
            <span className="admin-quick-action-title">Gestionar leads nuevos</span>
            <span className="admin-quick-action-desc">
              {newLeads === 0
                ? "No hay pendientes ahora"
                : `${newLeads} pendiente${newLeads === 1 ? "" : "s"} de contactar`}
            </span>
          </span>
        </Link>
        <Link href="/admin/landings" className="admin-quick-action">
          <span className="admin-quick-action-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>
            <span className="admin-quick-action-title">Crear o editar landings</span>
            <span className="admin-quick-action-desc">
              Eventos, fechas y páginas de reserva
            </span>
          </span>
        </Link>
      </div>

      <div className="admin-stat-grid mb-6">
        {stats.map((s) => (
          <AdminStatLink
            key={s.label}
            href={s.href}
            label={s.label}
            value={s.value}
            hint={s.hint}
          />
        ))}
      </div>

      <AdminCard
        title="Últimos leads"
        action={
          <Link href="/admin/leads" className="admin-btn-ghost text-sm">
            Ver todos →
          </Link>
        }
        noPadding
      >
        {recent.length === 0 ? (
          <AdminEmpty
            title="Aún no hay leads"
            description="Publica una landing y comparte el enlace para empezar a recibir solicitudes."
            action={
              <Link href="/admin/landings" className="admin-btn-primary">
                Ir a landings
              </Link>
            }
          />
        ) : (
          <ul className="divide-y divide-forest-900/5">
            {recent.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 transition hover:bg-cream/40"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-forest-950">
                      {lead.full_name}
                    </p>
                    <p className="truncate text-sm text-forest-800/60">
                      {lead.phone ?? lead.email ?? "Sin contacto"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <SourceBadge source={lead.source} />
                    <LeadStatusBadge status={lead.status} />
                    <span className="text-xs text-forest-800/50">
                      {new Date(lead.created_at).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  );
}
