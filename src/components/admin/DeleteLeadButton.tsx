"use client";

import { deleteLead } from "@/lib/actions/leads-admin";

export function DeleteLeadButton({
  id,
  name,
  returnTo,
}: {
  id: string;
  name: string;
  returnTo: string;
}) {
  return (
    <form
      action={deleteLead}
      onSubmit={(e) => {
        if (
          !confirm(
            `¿Eliminar el lead de «${name}»?\n\nEsta acción no se puede deshacer.`
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <button
        type="submit"
        className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:underline"
        title="Eliminar lead"
      >
        Eliminar
      </button>
    </form>
  );
}
