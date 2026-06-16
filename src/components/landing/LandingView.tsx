import Image from "next/image";
import { Logo } from "@/components/Logo";
import { LeadForm } from "@/components/landing/LeadForm";
import type { Landing } from "@/lib/types";

export function LandingView({ landing }: { landing: Landing }) {
  const c = landing.content ?? {};
  const phone = c.contactPhone;

  return (
    <div className="flex flex-col">
      {/* Barra superior */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-forest-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo variant="light" />
          <a
            href="#reservar"
            className="rounded-full bg-mint-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition hover:bg-mint-400"
          >
            Reservar plaza
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-950 text-white">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-forest-700/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-mint-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div className="animate-fade-up">
            {c.badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-mint-500/30 bg-mint-500/10 px-4 py-1.5 text-sm font-medium text-mint-300">
                <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
                {c.badge}
              </span>
            )}
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {c.headline ?? landing.name}
            </h1>
            {c.subheadline && (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                {c.subheadline}
              </p>
            )}

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:max-w-lg">
              <Fact label="Fecha" value={c.eventDateLabel} />
              <Fact label="Hora" value={c.eventTime} />
              <Fact label="Lugar" value={c.venueName} />
              <Fact label="Dirección" value={c.address} />
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#reservar"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mint-500 px-7 py-4 text-base font-semibold text-forest-950 transition hover:bg-mint-400"
              >
                {c.form?.ctaText ?? "Reserva tu plaza gratis"} →
              </a>
              {c.scarcity && (
                <span className="text-sm text-white/60">{c.scarcity}</span>
              )}
            </div>
          </div>

          <div id="reservar-top" className="animate-fade-up lg:pl-4">
            <LeadForm landingId={landing.id} form={c.form} />
          </div>
        </div>

        {c.heroImage && (
          <div className="relative mx-auto max-w-6xl px-5 pb-16">
            <div className="relative h-64 overflow-hidden rounded-3xl sm:h-80 lg:h-96">
              <Image
                src={c.heroImage}
                alt={c.eventName ?? landing.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent" />
            </div>
          </div>
        )}
      </section>

      {/* Highlights */}
      {c.highlights && c.highlights.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="Por qué venir"
              title="Una experiencia pensada para ti"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.highlights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-forest-900/10 bg-white p-6 shadow-card transition hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-900 text-lg font-bold text-mint-400">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-forest-950">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-800/70">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Incluye + Agenda */}
      {(c.includes?.length || c.agenda?.length) && (
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
            {c.includes && c.includes.length > 0 && (
              <div>
                <SectionHeading eyebrow="Todo incluido" title="Qué incluye tu plaza" />
                <ul className="mt-8 space-y-3">
                  {c.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-200 text-sm text-forest-800">
                        ✓
                      </span>
                      <span className="text-forest-900">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {c.agenda && c.agenda.length > 0 && (
              <div>
                <SectionHeading eyebrow="Programa" title="Así será el día" />
                <ol className="mt-8 space-y-5 border-l-2 border-forest-900/10 pl-6">
                  {c.agenda.map((a, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-mint-500 bg-white" />
                      <span className="text-sm font-bold text-forest-700">
                        {a.time}
                      </span>
                      <p className="text-forest-950">{a.title}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Galería */}
      {c.gallery && c.gallery.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="Ambiente" title="Cómo se vive el evento" />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {c.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative h-60 overflow-hidden rounded-2xl shadow-card"
                >
                  <Image
                    src={src}
                    alt={`Galería ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonios */}
      {c.testimonials && c.testimonials.length > 0 && (
        <section className="bg-forest-950 py-20 text-white">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="Opiniones"
              title="Lo que dicen quienes ya han venido"
              variant="light"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {c.testimonials.map((t, i) => (
                <figure
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-mint-400">★★★★★</div>
                  <blockquote className="mt-3 text-white/85">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-white">
                    {t.author}
                    {t.role && (
                      <span className="block font-normal text-white/55">
                        {t.role}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-5">
            <SectionHeading eyebrow="Dudas" title="Preguntas frecuentes" />
            <div className="mt-10 divide-y divide-forest-900/10">
              {c.faqs.map((f, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-forest-950">
                    {f.q}
                    <span className="text-mint-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-forest-800/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final con formulario */}
      <section id="reservar" className="scroll-mt-20 bg-cream py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Última llamada"
              title="Reserva ahora tu plaza gratuita"
            />
            <p className="mt-4 text-lg text-forest-800/75">
              {c.scarcity ?? "Las plazas son limitadas. Asegura la tuya hoy."}
            </p>
            {phone && (
              <p className="mt-6 text-forest-900">
                ¿Prefieres llamarnos?{" "}
                <a href={`tel:${phone}`} className="font-bold text-forest-700">
                  {phone}
                </a>
              </p>
            )}
          </div>
          <LeadForm landingId={landing.id} form={c.form} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 py-10 text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
          <Logo variant="light" />
          <div className="text-sm">
            {c.address && <p>{c.venueName} · {c.address}</p>}
            <p className="mt-1 text-white/40">
              © {new Date().getFullYear()} neventia. Todos los derechos reservados.
            </p>
          </div>
        </div>
        {c.legal && (
          <p className="mx-auto mt-6 max-w-6xl px-5 text-xs text-white/35">
            {c.legal}
          </p>
        )}
      </footer>
    </div>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <dt className="text-xs uppercase tracking-wide text-mint-400/80">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  variant = "dark",
}: {
  eyebrow: string;
  title: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className="max-w-2xl">
      <span
        className={`text-sm font-bold uppercase tracking-widest ${
          variant === "light" ? "text-mint-400" : "text-forest-600"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl ${
          variant === "light" ? "text-white" : "text-forest-950"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
