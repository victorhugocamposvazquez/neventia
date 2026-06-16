import Link from "next/link";
import { Logo } from "@/components/Logo";

const features = [
  {
    title: "Landings por evento",
    description:
      "Crea una página de alta conversión para cada evento, con su propia URL gestionable desde el backoffice.",
  },
  {
    title: "Captación de asistentes",
    description:
      "Formularios optimizados para convertir visitas en reservas confirmadas, sin fricción.",
  },
  {
    title: "Leads centralizados",
    description:
      "Reúne en un solo lugar los leads de tus landings y de tus campañas de Meta Ads.",
  },
  {
    title: "Seguimiento real",
    description:
      "Estados de cada lead, filtros y exportación a CSV para que tu equipo no pierda ninguna oportunidad.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Logo variant="light" />
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Backoffice
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-mint-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 pb-28 pt-40 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint-500/30 bg-mint-500/10 px-4 py-1.5 text-sm text-mint-300">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
            Plataforma de eventos
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Eventos que llenan salas y convierten visitas en asistentes
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
            Con neventia creas landings a medida para cada evento, captas leads
            desde la web y desde Meta Ads, y los gestionas todos desde un único
            backoffice.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/comida-gratis"
              className="inline-flex items-center gap-2 rounded-full bg-mint-500 px-7 py-4 font-semibold text-forest-950 transition hover:bg-mint-400"
            >
              Ver landing de ejemplo →
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Entrar al backoffice
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-forest-600">
              Todo en uno
            </span>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-forest-950 text-balance">
              De la campaña al asistente, sin perder ningún lead
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-forest-900/10 bg-white p-6 shadow-card"
              >
                <h3 className="text-lg font-bold text-forest-950">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-800/70">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 py-20 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            ¿Listo para llenar tu próximo evento?
          </h2>
          <p className="max-w-xl text-white/75">
            Empieza con la landing de la comida gratuita y gestiona tus
            asistentes desde el primer minuto.
          </p>
          <Link
            href="/comida-gratis"
            className="rounded-full bg-mint-500 px-7 py-4 font-semibold text-forest-950 transition hover:bg-mint-400"
          >
            Ver el evento de ejemplo
          </Link>
        </div>
      </section>

      <footer className="bg-forest-950 py-8 text-center text-sm text-white/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5">
          <Logo variant="light" />
          <p>© {new Date().getFullYear()} neventia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
