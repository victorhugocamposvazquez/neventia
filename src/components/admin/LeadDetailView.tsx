import Link from "next/link";
import {
  LEAD_STATUS_LABELS,
  LeadStatusBadge,
  SourceBadge,
} from "@/components/admin/Badges";
import { CopyButton } from "@/components/admin/CopyButton";
import { DeleteLeadButton } from "@/components/admin/DeleteLeadButton";
import { LeadContactButtons } from "@/components/admin/LeadContactButtons";
import { AdminAlert, AdminCard } from "@/components/admin/admin-shell";
import {
  addTimelineNote,
  toggleLeadTag,
  updateLeadNotes,
  updateLeadStatus,
} from "@/lib/actions/leads-admin";
import {
  formatDateTimeEs,
  formatRelativeShort,
  initialsFromName,
} from "@/lib/admin-format";
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

const PIPELINE: { status: LeadStatus; label: string }[] = [
  { status: "new", label: "Nuevo" },
  { status: "contacted", label: "Contactado" },
  { status: "confirmed", label: "Confirmado" },
  { status: "attended", label: "Asistió" },
];

const OUTCOME: { status: LeadStatus; label: string; style: string }[] = [
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

const ACTIVITY_DOT: Record<string, string> = {
  created: "admin-timeline-dot--mint",
  status_change: "admin-timeline-dot--blue",
  note: "admin-timeline-dot--amber",
  call: "admin-timeline-dot--forest",
  whatsapp: "admin-timeline-dot--wa",
  email: "admin-timeline-dot--blue",
  tag_added: "admin-timeline-dot--mint",
  tag_removed: "admin-timeline-dot--zinc",
  system: "admin-timeline-dot--zinc",
};

function activityText(a: LeadActivity): string {
  if (a.type === "status_change" && a.meta?.label) return String(a.meta.label);
  if (a.type === "tag_added") return `+ ${a.body}`;
  if (a.type === "tag_removed") return `− ${a.body}`;
  if (a.body) return a.body;
  return ACTIVITY_LABELS[a.type] ?? a.type;
}

function pipelineIndex(status: LeadStatus) {
  const i = PIPELINE.findIndex((s) => s.status === status);
  return i;
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
  const currentPipe = pipelineIndex(lead.status);
  const isOutcome =
    lead.status === "no_show" || lead.status === "discarded";

  return (
    <div className="admin-lead-page">
      {error && <AdminAlert variant="error">{error}</AdminAlert>}
      {saved === "notes" && (
        <AdminAlert variant="success">Notas guardadas.</AdminAlert>
      )}

      <div className="admin-lead-hero">
        <div className="admin-lead-hero-main">
          <Link href={returnTo} className="admin-back-link">
            ← Volver a leads
          </Link>
          <div className="admin-lead-identity">
            <div className="admin-lead-avatar" aria-hidden="true">
              {initialsFromName(lead.full_name)}
            </div>
            <div className="min-w-0">
              <div className="admin-lead-title-row">
                <h1 className="admin-page-title">{lead.full_name}</h1>
                <LeadStatusBadge status={lead.status} />
                <SourceBadge source={lead.source} />
              </div>
              <p className="admin-lead-meta">
                Solicitud{" "}
                <time dateTime={lead.created_at} title={formatDateTimeEs(lead.created_at)}>
                  {formatRelativeShort(lead.created_at)}
                </time>
                {" · "}
                {formatDateTimeEs(lead.created_at)}
              </p>
            </div>
          </div>
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
          <span className="hidden text-xs font-medium text-forest-800/50 lg:inline">
            {LEAD_STATUS_LABELS[lead.status]}
          </span>
        </div>

        <div className="admin-pipeline" role="group" aria-label="Estado del lead">
          {PIPELINE.map(({ status, label }, index) => {
            const active = lead.status === status;
            const done = !isOutcome && currentPipe > index;
            return (
              <form key={status} action={updateLeadStatus} className="admin-pipeline-step">
                <input type="hidden" name="id" value={lead.id} />
                <input type="hidden" name="status" value={status} />
                <input type="hidden" name="returnTo" value={detailReturn} />
                <button
                  type="submit"
                  className={`admin-pipeline-btn ${
                    active
                      ? "admin-pipeline-btn--active"
                      : done
                        ? "admin-pipeline-btn--done"
                        : ""
                  }`}
                >
                  <span className="admin-pipeline-index">{index + 1}</span>
                  {label}
                </button>
              </form>
            );
          })}
        </div>

        <div className="admin-status-row">
          {OUTCOME.map(({ status, label, style }) => (
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
            description="Lo último aparece arriba. Las llamadas y WhatsApp se registran al pulsar."
          >
            <form action={addTimelineNote} className="admin-note-form">
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="returnTo" value={detailReturn} />
              <input
                name="body"
                placeholder="Escribe una nota rápida…"
                className="admin-note-input"
                required
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
                        title={formatDateTimeEs(a.created_at)}
                      >
                        {formatRelativeShort(a.created_at)}
                      </time>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`admin-timeline-dot ${ACTIVITY_DOT[a.type] ?? ""}`}
                            aria-hidden="true"
                          />
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
                <div className="admin-fact-row">
                  {tel ? (
                    <a href={tel} className="admin-fact-value admin-fact-link">
                      {lead.phone}
                    </a>
                  ) : (
                    <p className="admin-fact-value">—</p>
                  )}
                  {lead.phone && <CopyButton value={lead.phone} />}
                </div>
              </div>
              <div>
                <p className="admin-fact-label">Email</p>
                <div className="admin-fact-row">
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="admin-fact-value admin-fact-link"
                    >
                      {lead.email}
                    </a>
                  ) : (
                    <p className="admin-fact-value">—</p>
                  )}
                  {lead.email && <CopyButton value={lead.email} />}
                </div>
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
                        className="admin-fact-link"
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
                  <div>
                    <Link
                      href={`/admin/leads?landing=${landing.id}`}
                      className="admin-btn-ghost text-xs"
                    >
                      Ver leads de este evento →
                    </Link>
                  </div>
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
                className="admin-note-textarea"
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
                    ? formatDateTimeEs(String(lead.consents.submitted_at))
                    : ""}
                </p>
              )}
            </AdminCard>
          )}
        </aside>
      </div>

      {(tel || wa) && (
        <div className="admin-lead-mobile-cta">
          <LeadContactButtons
            leadId={lead.id}
            tel={tel}
            whatsapp={wa}
            email={null}
            compact
          />
        </div>
      )}
    </div>
  );
}
