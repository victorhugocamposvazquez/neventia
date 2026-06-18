import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";
import type { Landing } from "@/lib/types";

const STEPS = [
  {
    title: "Elige tu ciudad",
    description:
      "Consulta el próximo evento en tu zona y reserva tu plaza en menos de un minuto. Las plazas son limitadas.",
  },
  {
    title: "Asiste a la presentación",
    description:
      "Una charla breve y amena de nuestras marcas colaboradoras antes de comer. Sin ninguna obligación de comprar.",
  },
  {
    title: "Disfruta la comida",
    description:
      "Un menú completo de autor, totalmente gratis, con tiempo para disfrutar sin prisas. La mejor parte del plan.",
  },
];

const STATS = [
  { n: "1.200+", l: "Comensales" },
  { n: "5", l: "Ciudades" },
  { n: "4,9★", l: "Valoración media" },
  { n: "0€", l: "Siempre gratis" },
];

const PAST_CITIES = [
  { city: "Ibiza", when: "Mayo 2026 · mesa completa", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=70" },
  { city: "Madrid", when: "Abril 2026 · 3 turnos", img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=70" },
  { city: "Santander", when: "Marzo 2026 · mesa completa", img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=70" },
  { city: "Logroño", when: "Febrero 2026 · mesa completa", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=70" },
];

const TESTIMONIALS = [
  { quote: "No me lo creía hasta que fui. Comimos de maravilla, la presentación fue corta y nadie nos presionó para comprar nada.", author: "María A.", city: "Madrid" },
  { quote: "Una tarde estupenda en pareja. El restaurante precioso y la comida de nivel. La organización, impecable.", author: "Jorge R.", city: "Santander" },
  { quote: "Pensaba que habría truco y no lo hubo. Conocimos gente encantadora y comimos genial. Gracias, Neventia.", author: "Carmen L.", city: "Logroño" },
];

async function getUpcomingEvents(): Promise<Landing[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("landings")
      .select("*")
      .eq("status", "published")
      .order("event_date", { ascending: true });
    return (data as Landing[]) ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const events = await getUpcomingEvents();
  const next = events[0] ?? null;
  const nextHref = next ? `/${next.slug}` : "#eventos";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <nav className="hidden gap-7 text-sm font-medium text-forest-800 md:flex">
            <a href="#concepto" className="hover:text-forest-950">Cómo funciona</a>
            <a href="#eventos" className="hover:text-forest-950">Eventos</a>
            <a href="#opiniones" className="hover:text-forest-950">Opiniones</a>
          </nav>
          <Link
            href={nextHref}
            className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-800"
          >
            Próximo evento →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <svg
          className="pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] opacity-50"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <path
            d="M 48.94 25.90 A 18 18 0 1 1 38.10 15.06"
            fill="none"
            stroke="#6cae8c"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="44.7" cy="19.3" r="4.2" fill="#6cae8c" />
        </svg>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:py-24">
          <div className="animate-fade-up">
            <span className="eyebrow">
              Experiencias gastronómicas · toda España
            </span>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.02] tracking-tight text-forest-950 text-balance sm:text-6xl lg:text-7xl">
              Comemos juntos.
              <br />
              <span className="text-mint-600">Invita la casa.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest-800/75">
              Neventia reúne a buenos comensales en torno a una gran mesa:
              comidas de autor en las mejores ciudades, sin coste y sin
              compromiso. Tú pones el apetito — la comida, la ponemos nosotros.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={nextHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-900 px-7 py-4 text-base font-semibold text-white transition hover:bg-forest-800"
              >
                {next ? `Ver próximo evento · ${next.city ?? ""}`.trim() : "Ver eventos"}
              </Link>
              <a
                href="#concepto"
                className="inline-flex items-center justify-center rounded-full border border-forest-900/15 bg-white px-7 py-4 text-base font-semibold text-forest-900 transition hover:bg-white/60"
              >
                Cómo funciona
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["MA", "JR", "CL", "+"].map((a) => (
                  <span
                    key={a}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-cream bg-forest-800 text-xs font-bold text-mint-300"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div>
                <div className="text-mint-600">★★★★★</div>
                <div className="text-sm text-forest-800/70">
                  Más de 1.200 comensales en 5 ciudades
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[clamp(420px,52vw,600px)] animate-fade-up">
            <div className="absolute right-0 top-0 h-[64%] w-[60%] overflow-hidden rounded-3xl shadow-soft">
              <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=70" alt="Mesa montada" fill sizes="(max-width:1024px) 60vw, 400px" className="object-cover" priority />
            </div>
            <div className="absolute bottom-0 left-0 h-[50%] w-[50%] overflow-hidden rounded-3xl shadow-soft">
              <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70" alt="Plato de autor" fill sizes="(max-width:1024px) 50vw, 320px" className="object-cover" />
            </div>
            <div className="absolute right-[8%] top-[38%] h-[34%] w-[34%] overflow-hidden rounded-2xl border-[6px] border-cream shadow-soft">
              <Image src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=70" alt="Brindis" fill sizes="220px" className="object-cover" />
            </div>
            <div className="absolute left-[2%] top-[6%] z-10 rounded-2xl bg-forest-950 px-4 py-3 text-cream shadow-card">
              <div className="text-2xl font-extrabold leading-none">5 ciudades</div>
              <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-widest text-cream/70">
                y sumando
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-forest-950 py-10 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl font-extrabold">{s.n}</div>
              <div className="mt-1 text-sm text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Concepto */}
      <section id="concepto" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="eyebrow">El concepto</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 text-balance sm:text-4xl">
              Una idea sencilla: buena comida que une
            </h2>
            <p className="mt-4 text-lg text-forest-800/70">
              Marcas que quieren darse a conocer patrocinan la comida. Tú
              disfrutas de un menú completo, gratis, en buena compañía.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={i} className="rounded-2xl border border-forest-900/10 bg-cream/50 p-7">
                <div className="text-sm font-extrabold text-mint-600">0{i + 1}</div>
                <h3 className="mt-3 text-xl font-bold text-forest-950">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-forest-800/70">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos */}
      <section id="eventos" className="scroll-mt-20 bg-sand py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="eyebrow">Eventos</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 text-balance sm:text-4xl">
              Dónde estaremos y dónde hemos estado
            </h2>
          </div>

          {/* Próximo evento */}
          {next ? (
            <div className="mt-10 grid overflow-hidden rounded-3xl bg-white shadow-soft lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-mint-500 px-3.5 py-1.5 text-xs font-semibold text-forest-950">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-forest-950" />{" "}
                  Próximo evento
                </span>
                {next.content?.heroImage && (
                  <Image
                    src={next.content.heroImage}
                    alt={next.city ?? next.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-8 lg:p-10">
                {next.region && (
                  <div className="text-sm font-bold uppercase tracking-widest text-forest-600">
                    {next.region}
                  </div>
                )}
                <div className="mt-1 text-4xl font-extrabold text-forest-950">
                  {next.city ?? next.name}
                </div>
                {next.content?.dates?.[0] && (
                  <div className="mt-3 flex items-center gap-2 text-forest-800/80">
                    <span className="text-mint-600">📅</span>
                    {next.content.dates[0].label} · {next.content.dates[0].time}
                  </div>
                )}
                <p className="mt-4 text-forest-800/70">
                  {next.content?.subheadline}
                </p>
                <Link
                  href={`/${next.slug}`}
                  className="mt-6 inline-flex rounded-full bg-mint-500 px-6 py-3.5 font-semibold text-forest-950 transition hover:bg-mint-400"
                >
                  Reservar plaza gratis →
                </Link>
              </div>
            </div>
          ) : (
            <p className="mt-10 rounded-3xl bg-white p-10 text-center text-forest-800/60 shadow-card">
              Pronto anunciaremos el próximo evento. ¡Vuelve pronto!
            </p>
          )}

          {/* Más eventos publicados */}
          {events.length > 1 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.slice(1).map((e) => (
                <Link
                  key={e.id}
                  href={`/${e.slug}`}
                  className="rounded-2xl border border-forest-900/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="text-lg font-bold text-forest-950">
                    {e.city ?? e.name}
                  </div>
                  {e.content?.dates?.[0] && (
                    <div className="mt-1 text-sm text-forest-800/60">
                      {e.content.dates[0].label}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Eventos celebrados */}
          <div className="mt-14 flex items-end justify-between">
            <h3 className="text-xl font-bold text-forest-950">Eventos celebrados</h3>
            <span className="text-sm text-forest-800/60">
              Más de 1.200 comensales en 5 ciudades
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PAST_CITIES.map((p) => (
              <article
                key={p.city}
                className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white"
              >
                <div className="relative h-36">
                  <Image src={p.img} alt={p.city} fill sizes="280px" className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-forest-950">{p.city}</h4>
                    <span className="rounded-full bg-mint-200 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-forest-600">
                      Celebrado
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-forest-800/60">{p.when}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Opiniones */}
      <section id="opiniones" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="eyebrow">Opiniones</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 text-balance sm:text-4xl">
              Lo que dicen quienes ya se sentaron a la mesa
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="rounded-2xl border border-forest-900/10 bg-cream/50 p-6">
                <div className="text-mint-600">★★★★★</div>
                <blockquote className="mt-3 text-forest-900">“{t.quote}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-xs font-bold text-mint-300">
                    {t.author.slice(0, 2).toUpperCase()}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-forest-950">{t.author}</span>
                    <span className="block text-xs text-forest-800/55">{t.city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="rounded-[2rem] bg-mint-500 px-6 py-16 text-center text-forest-950 sm:px-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
              {next ? `La próxima mesa es en ${next.city}` : "Pronto, nueva mesa"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-forest-950/80">
              Plazas limitadas. Reserva ahora y asegura tu sitio en la próxima
              comida gratuita de Neventia.
            </p>
            <Link
              href={nextHref}
              className="mt-8 inline-flex rounded-full bg-forest-950 px-7 py-4 font-semibold text-cream transition hover:bg-forest-900"
            >
              Reservar mi plaza gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 py-12 text-white/60">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <Logo variant="light" />
              <p className="mt-3 text-sm text-white/50">
                Experiencias gastronómicas y eventos por toda España. Comidas y
                celebraciones con buena mesa y mejor compañía.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-white">Neventia</span>
                <a href="#concepto" className="hover:text-white">Cómo funciona</a>
                <a href="#eventos" className="hover:text-white">Eventos</a>
                <a href="#opiniones" className="hover:text-white">Opiniones</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-white">Acceso</span>
                <Link href="/admin" className="hover:text-white">Backoffice</Link>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/40">
            © {new Date().getFullYear()} Neventia. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
