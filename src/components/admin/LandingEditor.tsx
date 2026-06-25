"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  updateLanding,
  deleteLanding,
  type UpdateLandingState,
} from "@/lib/actions/landings";
import { LandingContentEditor } from "@/components/admin/LandingContentEditor";
import { mergeLandingContent } from "@/lib/landing-content";
import type { Landing, LandingContent } from "@/lib/types";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-forest-900 px-6 py-2.5 font-semibold text-white transition hover:bg-forest-800 disabled:opacity-70"
    >
      {pending ? "Guardando…" : "Guardar cambios"}
    </button>
  );
}

export function LandingEditor({ landing }: { landing: Landing }) {
  const [state, formAction] = useActionState<UpdateLandingState, FormData>(
    updateLanding,
    {}
  );
  const [content, setContent] = useState<LandingContent>(() =>
    mergeLandingContent(landing.content)
  );

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" value={landing.id} />

      <div className="grid gap-4 rounded-2xl border border-forest-900/10 bg-white p-6 shadow-card sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">Nombre</span>
          <input
            name="name"
            defaultValue={landing.name}
            required
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">
            URL (slug)
          </span>
          <input
            name="slug"
            defaultValue={landing.slug}
            required
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">Estado</span>
          <select
            name="status"
            defaultValue={landing.status}
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicada</option>
            <option value="archived">Archivada</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">
            Meta Pixel ID · opcional
          </span>
          <input
            name="meta_pixel_id"
            defaultValue={landing.meta_pixel_id ?? ""}
            placeholder="1234567890"
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">Ciudad</span>
          <input
            name="city"
            defaultValue={landing.city ?? ""}
            placeholder="A Coruña"
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">
            Región · opcional
          </span>
          <input
            name="region"
            defaultValue={landing.region ?? ""}
            placeholder="Galicia"
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">
            Fecha y hora del evento
          </span>
          <span className="text-xs text-forest-800/55">
            Cada landing es un evento concreto. Duplica la landing para otra fecha.
          </span>
          <input
            name="event_date"
            type="datetime-local"
            required
            defaultValue={
              landing.event_date
                ? new Date(landing.event_date).toISOString().slice(0, 16)
                : ""
            }
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-2.5 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          />
        </label>
      </div>

      <input type="hidden" name="content" value={JSON.stringify(content)} />

      <div className="space-y-2">
        <h2 className="text-lg font-bold text-forest-950">
          Contenido de la landing
        </h2>
        <p className="text-sm text-forest-800/60">
          Edita textos, imágenes y secciones de forma visual. Los cambios se
          reflejan al guardar y puedes previsualizar con «Ver landing».
        </p>
      </div>

      <LandingContentEditor content={content} onChange={setContent} />

      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="rounded-xl bg-mint-200 px-4 py-3 text-sm font-medium text-forest-800">
          Cambios guardados correctamente.
        </p>
      )}

        <div className="flex items-center justify-between">
          <SaveButton />
        </div>
      </form>

      <div className="border-t border-forest-900/10 pt-6">
        <DeleteForm id={landing.id} />
      </div>
    </div>
  );
}

function DeleteForm({ id }: { id: string }) {
  return (
    <details className="text-sm">
      <summary className="cursor-pointer text-red-600">
        Eliminar esta landing
      </summary>
      <div className="mt-3">
        <p className="mb-3 text-forest-800/70">
          Esta acción no se puede deshacer. Los leads asociados se conservarán
          sin landing.
        </p>
        <form action={deleteLanding}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            className="rounded-full border border-red-300 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
          >
            Sí, eliminar landing
          </button>
        </form>
      </div>
    </details>
  );
}
