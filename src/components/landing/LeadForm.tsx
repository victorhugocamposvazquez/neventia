"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type LeadFormState } from "@/lib/actions/leads";
import type { EventDate, LandingForm } from "@/lib/types";

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
      className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint-500 px-6 py-4 text-base font-semibold text-forest-950 transition hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Enviando…" : label}
    </button>
  );
}

export function LeadForm({
  landingId,
  form,
  dates = [],
  defaultDate,
}: {
  landingId: string;
  form?: LandingForm;
  dates?: EventDate[];
  defaultDate?: string;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);
  const availableDates = dates.filter((d) => d.status !== "full");

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
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-card">
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
      className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card sm:p-8"
    >
      <div>
        <h3 className="text-2xl font-bold text-forest-950">
          {form?.title ?? "Reserva gratuita"}
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
        placeholder="Ej. María García"
        autoComplete="name"
        error={state.fieldErrors?.fullName}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="tucorreo@email.com"
          autoComplete="email"
          error={state.fieldErrors?.email}
        />
        <Field
          label="Teléfono"
          name="phone"
          type="tel"
          placeholder="600 000 000"
          autoComplete="tel"
          error={state.fieldErrors?.phone}
        />
      </div>

      {availableDates.length > 0 && (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-forest-900">
            Fecha preferida
          </span>
          <select
            name="preferredDate"
            defaultValue={defaultDate ?? ""}
            className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-3 text-forest-950 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
          >
            <option value="">Elige una fecha</option>
            {availableDates.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
                {d.time ? ` · ${d.time}` : ""}
              </option>
            ))}
          </select>
        </label>
      )}

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-semibold text-forest-900">
          ¿Cómo vienes?
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "pareja", label: "En pareja" },
            { value: "solo", label: "Solo/a" },
            { value: "amigos", label: "Con amigos" },
          ].map((opt, i) => (
            <label
              key={opt.value}
              className="cursor-pointer rounded-xl border border-forest-900/15 bg-cream/40 px-3 py-2.5 text-center text-sm font-medium text-forest-900 transition has-[:checked]:border-forest-700 has-[:checked]:bg-forest-900 has-[:checked]:text-white"
            >
              <input
                type="radio"
                name="party"
                value={opt.value}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-2.5 text-sm text-forest-800/80">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest-900/30 accent-forest-800"
        />
        <span>
          Acepto la política de privacidad y que Neventia me contacte para
          gestionar mi reserva.
        </span>
      </label>
      {state.fieldErrors?.consent && (
        <span className="-mt-2 text-xs text-red-600">
          {state.fieldErrors.consent}
        </span>
      )}

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton label={form?.ctaText ?? "Reservar mi plaza gratis"} />
      <p className="text-center text-xs text-forest-800/50">
        🔒 Tus datos están seguros y no se comparten con terceros.
      </p>
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
