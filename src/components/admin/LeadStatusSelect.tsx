"use client";

import { updateLeadStatus } from "@/lib/actions/leads-admin";
import { LEAD_STATUS_LABELS } from "@/components/admin/Badges";
import type { LeadStatus } from "@/lib/types";

export function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  return (
    <form action={updateLeadStatus} onClick={(e) => e.stopPropagation()}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => {
          const next = e.currentTarget.value as LeadStatus;
          if (
            next === "new" &&
            status !== "new" &&
            !confirm(
              "Al volver a Nuevo se borra el historial y las etiquetas de este lead. ¿Continuar?"
            )
          ) {
            e.currentTarget.value = status;
            return;
          }
          e.currentTarget.form?.requestSubmit();
        }}
        className="admin-status-select"
        aria-label="Cambiar estado del lead"
      >
        {(Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map((s) => (
          <option key={s} value={s}>
            {LEAD_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </form>
  );
}
