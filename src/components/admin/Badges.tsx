import type { LeadSource, LeadStatus } from "@/lib/types";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  confirmed: "Confirmado",
  attended: "Asistió",
  no_show: "No asistió",
  discarded: "Descartado",
};

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  confirmed: "bg-mint-200 text-forest-800",
  attended: "bg-forest-900 text-mint-300",
  no_show: "bg-zinc-200 text-zinc-600",
  discarded: "bg-red-100 text-red-700",
};

const SOURCE_LABELS: Record<LeadSource, string> = {
  landing: "Landing",
  meta_ads: "Meta Ads",
  manual: "Manual",
};

const SOURCE_STYLES: Record<LeadSource, string> = {
  landing: "bg-forest-900/10 text-forest-800",
  meta_ads: "bg-[#1877F2]/10 text-[#1877F2]",
  manual: "bg-zinc-100 text-zinc-600",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}

export function SourceBadge({ source }: { source: LeadSource }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${SOURCE_STYLES[source]}`}
    >
      {SOURCE_LABELS[source]}
    </span>
  );
}
