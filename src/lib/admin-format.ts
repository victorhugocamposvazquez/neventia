/** Fecha relativa corta para el backoffice (es-ES). */
export function formatRelativeShort(iso: string, now = Date.now()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";

  const diffSec = Math.round((then - now) / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

  if (abs < 60) return rtf.format(Math.round(diffSec), "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 86400 * 7) return rtf.format(Math.round(diffSec / 86400), "day");

  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
}

export function formatDateTimeEs(iso: string): string {
  return new Date(iso).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
