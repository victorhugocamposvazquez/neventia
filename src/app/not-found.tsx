import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-forest-950 px-5 text-center text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative flex flex-col items-center gap-6">
        <Logo variant="light" />
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="max-w-md text-white/70">
          No hemos encontrado este evento. Puede que la landing no esté
          publicada o que la URL no sea correcta.
        </p>
        <Link
          href="/"
          className="rounded-full bg-mint-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-mint-400"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
