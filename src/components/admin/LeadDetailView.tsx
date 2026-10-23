import Link from "next/link";
import {
  LEAD_STATUS_LABELS,
  LeadStatusBadge,
  SourceBadge,
} from "@/components/admin/Badges";
import { DeleteLeadButton } from "@/components/admin/DeleteLeadButton";
import { LeadContactButtons } from "@/components/admin/LeadContactButtons";
import { AdminAlert, AdminCard } from "@/components/admin/admin-shell";
import {
  addTimelineNote,
  toggleLeadTag,
  updateLeadNotes,
  updateLeadStatus,
} from "@/lib/actions/leads-admin";
import { formatAdminEventDate } from "@/lib/landing-event";
import {
  defaultWhatsAppMessage,
  SUGGESTED_LEAD_TAGS,
  telHref,
  whatsappHref,
} from "@/lib/lead-contact";
import type { LeadActivity, LeadStatus, LeadWithLanding } from "@/lib/types";

const PARTY_LABELS: Record<string, string> = {
  pareja: "En pareja",
  solo: "Solo/a",
  amigos: "Con amigos",
};

const QUICK_STATUSES: { status: LeadStatus; label: string; style: string }[] = [
  { status: "contacted", label: "Contactado", style: "bg-amber-100 text-amber-800" },
  { status: "confirmed", label: "Confirmado", style: "bg-mint-200 text-forest-800" },
  { status: "attended", label: "Asistió", style: "bg-forest-900 text-mint-300" },
  { status: "no_show", label: "No asistió", style: "bg-zinc-200 text-zinc-700" },
  { status: "discarded", label: "Descartado", style: "bg-red-100 text-red-700" },
];

const ACTIVITY_LABELS: Record<string, string> = {
  created: "Alta",
  status_change: "Estado",
  note: "Nota",
  call: "Llamada",
  whatsapp: "WhatsApp",
  email: "Email",
  tag_added: "Etiqueta",
  tag_removed: "Etiqueta",
  system: "Sistema",
};

function activityText(a: LeadActivity): string {
  if (a.type === "status_change" && a.meta?.label) return String(a.meta.label);
  if (a.type === "tag_added") return `+ ${a.body}`;
  if (a.type === "tag_removed") return `− ${a.body}`;
  if (a.body) return a.body;
  return ACTIVITY_LABELS[a.type] ?? a.type;
}

export function LeadDetailView({
  lead,
  activities,
  returnTo,
  saved,
  error,
}: {
  lead: LeadWithLanding;
  activities: LeadActivity[];
  returnTo: string;
  saved?: string;
  error?: string;
}) {
  const landing = lead.landings;
  const tags = lead.tags ?? [];
  const detailReturn = `/admin/leads/${lead.id}`;
  const tel = telHref(lead.phone);
  const wa = whatsappHref(
    lead.phone,
    defaultWhatsAppMessage(lead.full_name, landing?.name ?? landing?.city)
  );

  return (
    <div>
      {error && <AdminAlert variant="error">{error}</AdminAlert>}
      {saved === "notes" && (
        <AdminAlert variant="success">Notas guardadas.</AdminAlert>
      )}

      <div className="admin-lead-hero">
        <div className="min-w-0">
          <Link href={returnTo} className="admin-back-link">
            ← Volver a leads
          </Link>
          <div className="admin-lead-title-row">
            <h1 className="admin-page-title">{lead.full_name}</h1>
            <LeadStatusBadge status={lead.status} />
            <SourceBadge source={lead.source} />
          </div>
          <p className="admin-lead-meta">
            Solicitud del{" "}
            {new Date(lead.created_at).toLocaleString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <DeleteLeadButton id={lead.id} name={lead.full_name} returnTo={returnTo} />
      </div>

      <div className="admin-lead-toolbar">
        <div className="admin-lead-toolbar-row">
          <LeadContactButtons
            leadId={lead.id}
            tel={tel}
            whatsapp={wa}
            email={lead.email}
          />
          <span className="hidden text-xs font-medium text-forest-800/50 sm:inline">
            Estado: {LEAD_STATUS_LABELS[lead.status]}
          </span>
        </div>
        <div className="admin-status-row">
          {QUICK_STATUSES.map(({ status, label, style }) => (
            <form key={status} action={updateLeadStatus}>
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="status" value={status} />
              <input type="hidden" name="returnTo" value={detailReturn} />
              <button
                type="submit"
                className={`admin-status-btn ${
                  lead.status === status ? style : "admin-status-btn--idle"
                } ${lead.status === status ? "ring-2 ring-forest-900/15" : ""}`}
              >
                {label}
              </button>
            </form>
          ))}
        </div>
      </div>

      <div className="admin-lead-layout">
        <div className="admin-lead-main space-y-4">
          <AdminCard
            title="Actividad"
            description="Notas y seguimiento del lead. Lo último aparece arriba."
          >
            <form action={addTimelineNote} className="flex gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="returnTo" value={detailReturn} />
              <input
                name="body"
                placeholder="Escribe una nota rápida…"
                className="min-w-0 flex-1 rounded-xl border border-forest-900/15 bg-cream/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-mint-300"
              />
              <button type="submit" className="admin-btn-primary shrink-0 px-4 py-2">
                Añadir
              </button>
            </form>

            <div className="admin-timeline-scroll mt-4">
              <ul className="admin-timeline">
                {activities.length === 0 ? (
                  <li className="py-8 text-center text-sm text-forest-800/50">
                    Sin actividad registrada.
                  </li>
                ) : (
                  activities.map((a) => (
                    <li key={a.id} className="admin-timeline-item">
                      <time
                        className="admin-timeline-time"
                        dateTime={a.created_at}
                      >
                        {new Date(a.created_at).toLocaleString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </time>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="admin-timeline-dot" aria-hidden="true" />
                          <span className="admin-timeline-type">
                            {ACTIVITY_LABELS[a.type] ?? a.type}
                          </span>
                        </div>
                        <p className="admin-timeline-body">{activityText(a)}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </AdminCard>
        </div>

        <aside className="admin-lead-aside">
          <AdminCard title="Ficha">
            <div className="admin-fact-grid">
              <div>
                <p className="admin-fact-label">Teléfono</p>
                <p className="admin-fact-value">{lead.phone ?? "—"}</p>
              </div>
              <div>
                <p className="admin-fact-label">Email</p>
                <p className="admin-fact-value">{lead.email ?? "—"}</p>
              </div>
              <div>
                <p className="admin-fact-label">Asistencia</p>
                <p className="admin-fact-value">
                  {PARTY_LABELS[lead.party_type ?? ""] ?? `${lead.guests} pers.`}
                </p>
              </div>
              {lead.preferred_date && (
                <div>
                  <p className="admin-fact-label">Fecha solicitada</p>
                  <p className="admin-fact-value">{lead.preferred_date}</p>
                </div>
              )}
              {landing ? (
                <>
                  <div>
                    <p className="admin-fact-label">Evento</p>
                    <p className="admin-fact-value">
                      <Link
                        href={`/${landing.slug}`}
                        target="_blank"
                        className="font-semibold text-forest-700 hover:underline"
                      >
                        {landing.name} ↗
                      </Link>
                    </p>
                  </div>
                  {landing.city && (
                    <div>
                      <p className="admin-fact-label">Ciudad</p>
                      <p className="admin-fact-value">{landing.city}</p>
                    </div>
                  )}
                  {landing.event_date && (
                    <div>
                      <p className="admin-fact-label">Fecha evento</p>
                      <p className="admin-fact-value">
                        {formatAdminEventDate(landing.event_date)}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <p className="admin-fact-label">Evento</p>
                  <p className="admin-fact-value font-normal text-forest-800/50">
                    Sin vincular
                  </p>
                </div>
              )}
            </div>
          </AdminCard>

          <AdminCard title="Etiquetas">
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_LEAD_TAGS.map((tag) => {
                const active = tags.includes(tag);
                return (
                  <form key={tag} action={toggleLeadTag}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="tag" value={tag} />
                    <input type="hidden" name="returnTo" value={detailReturn} />
                    <button
                      type="submit"
                      className={`admin-tag-btn ${active ? "admin-tag-btn--on" : "admin-tag-btn--off"}`}
                    >
                      {tag}
                    </button>
                  </form>
                );
              })}
            </div>
          </AdminCard>

          <AdminCard title="Notas internas" description="Solo visibles aquí.">
            <form action={updateLeadNotes}>
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="returnTo" value={detailReturn} />
              <textarea
                name="notes"
                defaultValue={lead.notes ?? ""}
                rows={4}
                placeholder="Ej. confirmó por teléfono…"
                className="w-full rounded-xl border border-forest-900/15 bg-cream/40 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-mint-300"
              />
              <button type="submit" className="admin-btn-primary mt-2 w-full py-2">
                Guardar
              </button>
            </form>
          </AdminCard>

          {(Object.keys(lead.utm ?? {}).length > 0 || lead.consents) && (
            <AdminCard title="Atribución">
              {Object.keys(lead.utm ?? {}).length > 0 && (
                <dl className="space-y-1 text-xs text-forest-800/70">
                  {Object.entries(lead.utm).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="font-medium">{k}</dt>
                      <dd className="truncate">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {lead.consents && (
                <p className="mt-2 text-xs text-forest-800/50">
                  Consentimiento{" "}
                  {lead.consents.submitted_at
                    ? new Date(String(lead.consents.submitted_at)).toLocaleString(
                        "es-ES"
                      )
                    : ""}
                </p>
              )}
            </AdminCard>
          )}
        </aside>
      </div>
    </div>
  );
}
