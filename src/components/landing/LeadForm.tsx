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
      className="btn btn-accent btn-block submit"
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
      <div className="form-card">
        <div className="form-success show">
          <div className="tick">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3>{form?.successTitle ?? "¡Plaza reservada!"}</h3>
          <p>
            {form?.successText ??
              "Hemos recibido tu reserva. Te llamaremos en las próximas 24-48 h para confirmarla."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h3>{form?.title ?? "Reserva gratuita"}</h3>
      <p className="fhint">
        {form?.subtitle ?? "Completa tus datos y te confirmamos la plaza."}
      </p>
      <form action={actionWithUtm} noValidate>
        <input type="hidden" name="landingId" value={landingId} />
        {/* Honeypot anti-spam (nombre sin autofill) */}
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
        />

        <div className={`field${state.fieldErrors?.fullName ? " invalid" : ""}`}>
          <label htmlFor="f-name">Nombre y apellidos</label>
          <input
            type="text"
            id="f-name"
            name="fullName"
            placeholder="Ej. María García"
            autoComplete="name"
          />
          {state.fieldErrors?.fullName && (
            <div className="field-err">{state.fieldErrors.fullName}</div>
          )}
        </div>

        <div className="field-row">
          <div className={`field${state.fieldErrors?.email ? " invalid" : ""}`}>
            <label htmlFor="f-email">Email</label>
            <input
              type="email"
              id="f-email"
              name="email"
              placeholder="tucorreo@email.com"
              autoComplete="email"
            />
            {state.fieldErrors?.email && (
              <div className="field-err">{state.fieldErrors.email}</div>
            )}
          </div>
          <div className={`field${state.fieldErrors?.phone ? " invalid" : ""}`}>
            <label htmlFor="f-phone">Teléfono</label>
            <input
              type="tel"
              id="f-phone"
              name="phone"
              placeholder="600 000 000"
              autoComplete="tel"
            />
            {state.fieldErrors?.phone && (
              <div className="field-err">{state.fieldErrors.phone}</div>
            )}
          </div>
        </div>

        {availableDates.length > 0 && (
          <div className="field">
            <label htmlFor="f-date">Fecha preferida</label>
            <select id="f-date" name="preferredDate" defaultValue={defaultDate ?? ""}>
              <option value="" disabled>
                Elige una fecha
              </option>
              {availableDates.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                  {d.time ? ` · ${d.time}` : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="field">
          <label>¿Cómo vienes?</label>
          <div className="toggle-group">
            {[
              { id: "p-pareja", value: "pareja", label: "En pareja" },
              { id: "p-solo", value: "solo", label: "Solo/a" },
            ].map((opt, i) => (
              <div className="opt" key={opt.value}>
                <input
                  type="radio"
                  id={opt.id}
                  name="party"
                  value={opt.value}
                  defaultChecked={i === 0}
                />
                <label htmlFor={opt.id}>{opt.label}</label>
              </div>
            ))}
          </div>
          <p className="fhint">
            Las personas que vengan en pareja tendrán preferencia en la
            asignación de mesa.
          </p>
        </div>

        <label className="consent">
          <input type="checkbox" name="consent" />
          <span>
            Acepto la <a href="#">política de privacidad</a> y que Neventia me
            contacte para gestionar mi reserva.
          </span>
        </label>
        {state.fieldErrors?.consent && (
          <div className="field-err">{state.fieldErrors.consent}</div>
        )}

        {state.error && <div className="field-err">{state.error}</div>}

        <SubmitButton label={form?.ctaText ?? "Reservar mi plaza gratis"} />
        <div className="form-foot">
          🔒 Tus datos están seguros y no se comparten con terceros.
        </div>
      </form>
    </div>
  );
}
