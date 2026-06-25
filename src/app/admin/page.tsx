import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";
import { LeadStatusBadge, SourceBadge } from "@/components/admin/Badges";

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
    { label: "Leads totales", value: totalLeads },
    { label: "Últimos 7 días", value: weekLeads },
    { label: "Desde Meta Ads", value: metaLeads },
    { label: "Confirmados", value: confirmedLeads },
    { label: "Asistieron", value: attendedLeads },
    { label: "Landings activas", value: publishedLandings },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-forest-950">Resumen</h1>
        <p className="mt-1 text-forest-800/70">
          Vista general de tus eventos y la captación de asistentes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card"
          >
            <p className="text-3xl font-extrabold text-forest-950">{s.value}</p>
            <p className="mt-1 text-xs font-medium text-forest-800/60">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-forest-900/10 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-forest-900/10 px-6 py-4">
          <h2 className="font-bold text-forest-950">Últimos leads</h2>
          <Link
            href="/admin/leads"
            className="text-sm font-semibold text-forest-700 hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-6 py-10 text-center text-forest-800/60">
            Aún no hay leads. Comparte tu landing para empezar a recibirlos.
          </p>
        ) : (
          <ul className="divide-y divide-forest-900/5">
            {recent.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5"
              >
                <div>
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="font-semibold text-forest-950 hover:text-forest-700 hover:underline"
                  >
                    {lead.full_name}
                  </Link>
                  <p className="text-sm text-forest-800/60">
                    {lead.phone ?? lead.email ?? "Sin contacto"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SourceBadge source={lead.source} />
                  <LeadStatusBadge status={lead.status} />
                  <span className="text-xs text-forest-800/50">
                    {new Date(lead.created_at).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
