"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type LeadFormState } from "@/lib/actions/leads";
import type { LandingForm } from "@/lib/types";

const initialState: LeadFormState = { ok: false };

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
];

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Enviando…" : label}
      {!pending && (
        <span className="transition-transform group-hover:translate-x-1">→</span>
      )}
    </button>
  );
}

export function LeadForm({
  landingId,
  form,
}: {
  landingId: string;
  form?: LandingForm;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);

  // Captura los parámetros UTM/fbclid de la URL en el momento del envío.
  const actionWithUtm = (formData: FormData) => {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) formData.set(key, value);
    }
    return formAction(formData);
  };

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-card">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint-200 text-3xl text-forest-800">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-forest-950">
          {form?.successTitle ?? "¡Plaza reservada!"}
        </h3>
        <p className="text-forest-800/80">
          {form?.successText ??
            "Te llamaremos en breve para confirmar tu reserva."}
        </p>
      </div>
    );
  }

  return (
    <form
      action={actionWithUtm}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card sm:p-8"
    >
      <div>
        <h3 className="text-2xl font-bold text-forest-950">
          {form?.title ?? "Reserva tu plaza gratis"}
        </h3>
        {form?.subtitle && (
          <p className="mt-1 text-sm text-forest-800/70">{form.subtitle}</p>
        )}
      </div>

      <input type="hidden" name="landingId" value={landingId} />
      {/* Honeypot anti-spam (oculto para humanos) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Field
        label="Nombre y apellidos"
        name="fullName"
        placeholder="Tu nombre"
        autoComplete="name"
        error={state.fieldErrors?.fullName}
      />
      <Field
        label="Teléfono"
        name="phone"
        type="tel"
        placeholder="600 000 000"
        autoComplete="tel"
        error={state.fieldErrors?.phone}
      />
      <Field
        label="Email (opcional)"
        name="email"
        type="email"
        placeholder="tucorreo@email.com"
        autoComplete="email"
        error={state.fieldErrors?.email}
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-forest-900">
          Número de personas
        </span>
        <select
          name="guests"
          defaultValue="2"
          className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-3 text-forest-950 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "persona" : "personas"}
            </option>
          ))}
        </select>
      </label>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton label={form?.ctaText ?? "Quiero mi plaza gratis"} />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-forest-900">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-3 text-forest-950 outline-none transition placeholder:text-forest-900/35 focus:border-forest-700 focus:ring-2 focus:ring-mint-300 aria-[invalid=true]:border-red-400"
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
