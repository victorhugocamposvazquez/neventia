/** Fecha relativa ultra-corta para el backoffice (no desborda layouts). */
export function formatRelativeShort(iso: string, now = Date.now()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";

  const absSec = Math.abs(Math.round((then - now) / 1000));

  if (absSec < 45) return "ahora";
  if (absSec < 3600) return `${Math.round(absSec / 60)}m`;
  if (absSec < 86400) return `${Math.round(absSec / 3600)}h`;
  if (absSec < 86400 * 7) return `${Math.round(absSec / 86400)}d`;

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
