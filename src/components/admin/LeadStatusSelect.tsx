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
    <form action={updateLeadStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-forest-900/15 bg-white px-2 py-1 text-xs font-semibold text-forest-900 outline-none focus:ring-2 focus:ring-mint-300"
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
