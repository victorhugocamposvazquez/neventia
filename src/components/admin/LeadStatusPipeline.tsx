"use client";

import { updateLeadStatus } from "@/lib/actions/leads-admin";
import type { LeadStatus } from "@/lib/types";

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

function pipelineIndex(status: LeadStatus) {
  return PIPELINE.findIndex((s) => s.status === status);
}

export function LeadStatusPipeline({
  leadId,
  status,
  returnTo,
}: {
  leadId: string;
  status: LeadStatus;
  returnTo: string;
}) {
  const currentPipe = pipelineIndex(status);
  const isOutcome = status === "no_show" || status === "discarded";

  return (
    <>
      <div className="admin-pipeline" role="group" aria-label="Estado del lead">
        {PIPELINE.map(({ status: step, label }, index) => {
          const active = status === step;
          const done = !isOutcome && currentPipe > index;
          const resetsHistory = step === "new" && status !== "new";
          return (
            <form
              key={step}
              action={updateLeadStatus}
              className="admin-pipeline-step"
              onSubmit={(e) => {
                if (!resetsHistory) return;
                if (
                  !confirm(
                    "Al volver a Nuevo se borra el historial y las etiquetas de este lead. ¿Continuar?"
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <input type="hidden" name="id" value={leadId} />
              <input type="hidden" name="status" value={step} />
              <input type="hidden" name="returnTo" value={returnTo} />
              <button
                type="submit"
                className={`admin-pipeline-btn ${
                  active
                    ? "admin-pipeline-btn--active"
                    : done
                      ? "admin-pipeline-btn--done"
                      : ""
                }`}
                title={
                  resetsHistory
                    ? "Reinicia el lead: borra historial y etiquetas"
                    : undefined
                }
              >
                <span className="admin-pipeline-index">{index + 1}</span>
                {label}
              </button>
            </form>
          );
        })}
      </div>

      <div className="admin-status-row">
        {OUTCOME.map(({ status: step, label, style }) => (
          <form key={step} action={updateLeadStatus}>
            <input type="hidden" name="id" value={leadId} />
            <input type="hidden" name="status" value={step} />
            <input type="hidden" name="returnTo" value={returnTo} />
            <button
              type="submit"
              className={`admin-status-btn ${
                status === step ? style : "admin-status-btn--idle"
              } ${status === step ? "ring-2 ring-forest-900/15" : ""}`}
            >
              {label}
            </button>
          </form>
        ))}
      </div>
    </>
  );
}
