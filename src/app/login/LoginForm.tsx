"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { login, type LoginState } from "@/lib/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-full bg-forest-900 px-6 py-3.5 font-semibold text-white transition hover:bg-forest-800 disabled:opacity-70"
    >
      {pending ? "Entrando…" : "Entrar"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});
  const params = useSearchParams();
  const redirectTo = params.get("redirect") ?? "/admin";

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <input type="hidden" name="redirect" value={redirectTo} />
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-forest-900">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-3 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-forest-900">Contraseña</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-xl border border-forest-900/15 bg-cream/40 px-4 py-3 outline-none focus:border-forest-700 focus:ring-2 focus:ring-mint-300"
        />
      </label>
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
