"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  updateLanding,
  deleteLanding,
  type UpdateLandingState,
} from "@/lib/actions/landings";
import { LandingVisualEditor } from "@/components/admin/LandingVisualEditor";
import { mergeLandingContent } from "@/lib/landing-content";
import type { LandingMeta } from "@/components/admin/landing-section-panels";
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

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 16);
}

export function LandingEditor({ landing }: { landing: Landing }) {
  const [state, formAction] = useActionState<UpdateLandingState, FormData>(
    updateLanding,
    {}
  );
  const [content, setContent] = useState<LandingContent>(() =>
    mergeLandingContent(landing.content)
  );
  const [meta, setMeta] = useState<LandingMeta>(() => ({
    name: landing.name,
    slug: landing.slug,
    status: landing.status,
    city: landing.city ?? "",
    region: landing.region ?? "",
    eventDate: toDatetimeLocal(landing.event_date),
    metaPixel: landing.meta_pixel_id ?? "",
  }));

  const patchMeta = (partial: Partial<LandingMeta>) => {
    setMeta((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="space-y-4">
      <form action={formAction}>
        <input type="hidden" name="id" value={landing.id} />
        <input type="hidden" name="content" value={JSON.stringify(content)} />

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex flex-wrap items-center gap-3">
            {state.error && (
              <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
                {state.error}
              </p>
            )}
            {state.ok && (
              <p className="rounded-xl bg-mint-200 px-4 py-2 text-sm font-medium text-forest-800">
                Cambios guardados.
              </p>
            )}
          </div>
          <SaveButton />
        </div>

        <LandingVisualEditor
          landing={landing}
          content={content}
          onContentChange={setContent}
          meta={meta}
          onMetaChange={patchMeta}
        />
      </form>

      <div className="border-t border-forest-900/10 px-1 pt-6">
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
