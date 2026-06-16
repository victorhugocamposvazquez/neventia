import { Suspense } from "react";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Acceso · Backoffice" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-950 px-5">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo variant="light" />
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-soft">
          <h1 className="text-2xl font-extrabold text-forest-950">
            Acceso al backoffice
          </h1>
          <p className="mt-1 text-sm text-forest-800/70">
            Gestiona tus landings y leads.
          </p>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
