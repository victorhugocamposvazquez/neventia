import type { EventDate, LandingContent } from "@/lib/types";

const TZ = "Europe/Madrid";

export type ResolvedLandingEvent = {
  /** YYYY-MM-DD — se guarda en el lead */
  isoDate: string;
  /** p. ej. "Sábado, 28 de junio" */
  label: string;
  /** p. ej. "13:30 h" */
  time: string;
  /** Etiqueta completa para el chat */
  dateLabel: string;
  slotsLabel?: string;
  status: "available" | "low" | "full";
};

const MONTHS_SHORT = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isoDateFromTimestamp(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

function formatLabelFromTimestamp(iso: string): string {
  const d = new Date(iso);
  const weekday = capitalize(
    new Intl.DateTimeFormat("es-ES", { timeZone: TZ, weekday: "long" }).format(d)
  );
  const dayMonth = new Intl.DateTimeFormat("es-ES", {
    timeZone: TZ,
    day: "numeric",
    month: "long",
  }).format(d);
  return `${weekday}, ${dayMonth}`;
}

function formatTimeFromTimestamp(iso: string): string {
  const t = new Intl.DateTimeFormat("es-ES", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
  return `${t} h`;
}

function fromLegacyDate(d: EventDate): ResolvedLandingEvent {
  return {
    isoDate: d.value,
    label: d.label,
    time: d.time ?? "",
    dateLabel: `${d.label}${d.time ? ` · ${d.time}` : ""}`,
    slotsLabel: d.slotsLabel,
    status: d.status ?? "available",
  };
}

/** Una landing = un evento concreto. La fecha oficial vive en `event_date`. */
export function resolveLandingEvent(landing: {
  event_date: string | null;
  content?: LandingContent | null;
}): ResolvedLandingEvent | null {
  const c = landing.content ?? {};

  if (landing.event_date) {
    const label = formatLabelFromTimestamp(landing.event_date);
    const time = formatTimeFromTimestamp(landing.event_date);
    return {
      isoDate: isoDateFromTimestamp(landing.event_date),
      label,
      time,
      dateLabel: `${label} · ${time}`,
      slotsLabel: c.slotsLabel ?? c.dates?.[0]?.slotsLabel,
      status: c.eventStatus ?? c.dates?.[0]?.status ?? "available",
    };
  }

  const legacy = c.dates?.find((d) => d.status !== "full") ?? c.dates?.[0];
  if (legacy) return fromLegacyDate(legacy);

  return null;
}

export function calFromEventDate(
  eventDate: string | null
): { month: string; day: string } | null {
  if (!eventDate) return null;
  const d = new Date(eventDate);
  if (Number.isNaN(d.getTime())) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "numeric",
    day: "numeric",
  }).formatToParts(d);
  const monthIdx = Number(parts.find((p) => p.type === "month")!.value) - 1;
  const day = parts.find((p) => p.type === "day")!.value;
  return { month: MONTHS_SHORT[monthIdx], day };
}

export function formatAdminEventDate(eventDate: string | null): string {
  if (!eventDate) return "—";
  const resolved = resolveLandingEvent({ event_date: eventDate, content: {} });
  return resolved?.dateLabel ?? "—";
}
