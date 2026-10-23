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
      <button type="submit" className="admin-btn-danger" title="Eliminar lead">
        Eliminar
      </button>
    </form>
  );
}
