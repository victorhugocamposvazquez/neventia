import Link from "next/link";
import {
  LEAD_STATUS_LABELS,
  LeadStatusBadge,
  SourceBadge,
} from "@/components/admin/Badges";
import { DeleteLeadButton } from "@/components/admin/DeleteLeadButton";
import { LeadContactButtons } from "@/components/admin/LeadContactButtons";
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
  { status: "attended", label: "Asistió ✓", style: "bg-forest-900 text-mint-300" },
  { status: "no_show", label: "No asistió", style: "bg-zinc-200 text-zinc-700" },
  { status: "discarded", label: "Descartado", style: "bg-red-100 text-red-700" },
];

const ACTIVITY_LABELS: Record<string, string> = {
  created: "Solicitud recibida",
  status_change: "Cambio de estado",
  note: "Nota",
  call: "Llamada",
  whatsapp: "WhatsApp",
  email: "Email",
  tag_added: "Etiqueta añadida",
  tag_removed: "Etiqueta eliminada",
  system: "Sistema",
};

function activityText(a: LeadActivity): string {
  if (a.type === "status_change" && a.meta?.label) return String(a.meta.label);
  if (a.type === "tag_added") return `Etiqueta: ${a.body}`;
  if (a.type === "tag_removed") return `Quitada: ${a.body}`;
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
    <div className="space-y-6">
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {saved === "notes" && (
        <p className="rounded-xl bg-mint-200 px-4 py-3 text-sm font-medium text-forest-800">
          Notas guardadas.
        </p>
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href={returnTo}
            className="text-sm text-forest-700 hover:underline"
          >
            ← Volver a leads
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold text-forest-950">
              {lead.full_name}
            </h1>
            <LeadStatusBadge status={lead.status} />
            <SourceBadge source={lead.source} />
          </div>
          <p className="mt-1 text-sm text-forest-800/60">
            Alta{" "}
            {new Date(lead.created_at).toLocaleString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <DeleteLeadButton
          id={lead.id}
          name={lead.full_name}
          returnTo={returnTo}
        />
      </div>

      <LeadContactButtons
        leadId={lead.id}
        tel={tel}
        whatsapp={wa}
        email={lead.email}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Cambio rápido de estado */}
          <section className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
            <h2 className="font-bold text-forest-950">Estado</h2>
            <p className="mt-1 text-sm text-forest-800/60">
              Marca si confirmaste, asistió o no vino al evento.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {QUICK_STATUSES.map(({ status, label, style }) => (
                <form key={status} action={updateLeadStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={status} />
                  <input type="hidden" name="returnTo" value={detailReturn} />
                  <button
                    type="submit"
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-90 ${
                      lead.status === status
                        ? `${style} ring-2 ring-forest-900/20`
                        : "border border-forest-900/15 bg-cream/40 text-forest-800"
                    }`}
                  >
                    {label}
                  </button>
                </form>
              ))}
            </div>
            <p className="mt-3 text-xs text-forest-800/50">
              Estado actual: <strong>{LEAD_STATUS_LABELS[lead.status]}</strong>
            </p>
          </section>

          {/* Timeline */}
          <section className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
            <h2 className="font-bold text-forest-950">Timeline</h2>
            <form action={addTimelineNote} className="mt-4 flex gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="returnTo" value={detailReturn} />
              <input
                name="body"
                placeholder="Añadir nota al timeline…"
                className="min-w-0 flex-1 rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-mint-300"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-forest-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
              >
                Añadir
              </button>
            </form>
            <ul className="mt-5 space-y-0 divide-y divide-forest-900/5">
              {activities.length === 0 ? (
                <li className="py-6 text-center text-sm text-forest-800/50">
                  Sin actividad registrada aún.
                </li>
              ) : (
                activities.map((a) => (
                  <li key={a.id} className="flex gap-3 py-3">
                    <div className="mt-0.5 w-20 shrink-0 text-xs text-forest-800/45">
                      {new Date(a.created_at).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                        {ACTIVITY_LABELS[a.type] ?? a.type}
                      </span>
                      <p className="mt-0.5 text-sm text-forest-900">
                        {activityText(a)}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          {/* Datos de contacto */}
          <section className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
            <h2 className="font-bold text-forest-950">Contacto</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                  Teléfono
                </dt>
                <dd className="font-medium text-forest-950">
                  {lead.phone ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                  Email
                </dt>
                <dd className="font-medium text-forest-950">
                  {lead.email ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                  Asistencia
                </dt>
                <dd className="font-medium text-forest-950">
                  {PARTY_LABELS[lead.party_type ?? ""] ?? `${lead.guests} pers.`}
                </dd>
              </div>
              {lead.preferred_date && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                    Fecha solicitada
                  </dt>
                  <dd className="font-medium text-forest-950">
                    {lead.preferred_date}
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {/* Evento */}
          <section className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
            <h2 className="font-bold text-forest-950">Evento</h2>
            {landing ? (
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                    Landing
                  </dt>
                  <dd>
                    <Link
                      href={`/${landing.slug}`}
                      target="_blank"
                      className="font-medium text-forest-700 hover:underline"
                    >
                      {landing.name} ↗
                    </Link>
                  </dd>
                </div>
                {landing.city && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                      Ciudad
                    </dt>
                    <dd className="font-medium text-forest-950">{landing.city}</dd>
                  </div>
                )}
                {landing.event_date && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-forest-800/45">
                      Fecha evento
                    </dt>
                    <dd className="font-medium text-forest-950">
                      {formatAdminEventDate(landing.event_date)}
                    </dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className="mt-3 text-sm text-forest-800/50">Sin evento vinculado.</p>
            )}
          </section>

          {/* Etiquetas */}
          <section className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
            <h2 className="font-bold text-forest-950">Etiquetas</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTED_LEAD_TAGS.map((tag) => {
                const active = tags.includes(tag);
                return (
                  <form key={tag} action={toggleLeadTag}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="tag" value={tag} />
                    <input type="hidden" name="returnTo" value={detailReturn} />
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        active
                          ? "bg-forest-900 text-mint-300"
                          : "border border-forest-900/15 bg-cream/40 text-forest-800 hover:bg-cream"
                      }`}
                    >
                      {tag}
                    </button>
                  </form>
                );
              })}
            </div>
            {tags.filter((t) => !SUGGESTED_LEAD_TAGS.includes(t as (typeof SUGGESTED_LEAD_TAGS)[number])).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags
                  .filter(
                    (t) =>
                      !SUGGESTED_LEAD_TAGS.includes(
                        t as (typeof SUGGESTED_LEAD_TAGS)[number]
                      )
                  )
                  .map((tag) => (
                    <form key={tag} action={toggleLeadTag}>
                      <input type="hidden" name="id" value={lead.id} />
                      <input type="hidden" name="tag" value={tag} />
                      <input type="hidden" name="returnTo" value={detailReturn} />
                      <button
                        type="submit"
                        className="rounded-full bg-forest-900 px-3 py-1 text-xs font-semibold text-mint-300"
                      >
                        {tag} ×
                      </button>
                    </form>
                  ))}
              </div>
            )}
          </section>

          {/* Notas internas */}
          <section className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
            <h2 className="font-bold text-forest-950">Notas internas</h2>
            <p className="mt-1 text-xs text-forest-800/50">
              Solo visibles en el backoffice. Al guardar, se añade al timeline si hay cambio.
            </p>
            <form action={updateLeadNotes} className="mt-3">
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="returnTo" value={detailReturn} />
              <textarea
                name="notes"
                defaultValue={lead.notes ?? ""}
                rows={5}
                placeholder="Ej. prefiere mesa tranquila, confirmó por teléfono el martes…"
                className="w-full rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-mint-300"
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-full bg-forest-900 py-2.5 text-sm font-semibold text-white hover:bg-forest-800"
              >
                Guardar notas
              </button>
            </form>
          </section>

          {/* UTM / consents */}
          {(Object.keys(lead.utm ?? {}).length > 0 || lead.consents) && (
            <section className="rounded-2xl border border-forest-900/10 bg-white p-5 shadow-card">
              <h2 className="font-bold text-forest-950">Atribución</h2>
              {Object.keys(lead.utm ?? {}).length > 0 && (
                <dl className="mt-3 space-y-1 text-xs text-forest-800/70">
                  {Object.entries(lead.utm).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="font-medium">{k}</dt>
                      <dd className="truncate">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {lead.consents && (
                <p className="mt-3 text-xs text-forest-800/50">
                  Consentimiento registrado{" "}
                  {lead.consents.submitted_at
                    ? new Date(String(lead.consents.submitted_at)).toLocaleString("es-ES")
                    : ""}
                </p>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
