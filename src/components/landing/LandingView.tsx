import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LeadForm } from "@/components/landing/LeadForm";
import type { Landing } from "@/lib/types";

const MONTHS = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

function dateCard(iso: string | null): { month: string; day: string } | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return { month: MONTHS[d.getMonth()], day: String(d.getDate()) };
}

export function LandingView({ landing }: { landing: Landing }) {
  const c = landing.content ?? {};
  const card = dateCard(landing.event_date);
  const nextDate = c.dates?.find((d) => d.status !== "full") ?? c.dates?.[0];

  return (
    <div className="flex flex-col">
      {/* Barra superior */}
      <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            {landing.city && (
              <span className="hidden items-center gap-1.5 text-sm font-medium text-forest-800 sm:flex">
                <span className="h-2 w-2 rounded-full bg-mint-500" />
                {landing.city}
              </span>
            )}
            <a
              href="#reservar"
              className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-800"
            >
              Reservar mi plaza
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div className="animate-fade-up">
            {c.badge && <span className="eyebrow">{c.badge}</span>}
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.04] tracking-tight text-forest-950 text-balance sm:text-6xl">
              {c.headline ?? landing.name}
              {c.freePrice && (
                <>
                  <br />
                  Por <span className="text-mint-600">{c.freePrice}</span>.
                </>
              )}
            </h1>
            {c.subheadline && (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-forest-800/75">
                {c.subheadline}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#reservar"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-900 px-7 py-4 text-base font-semibold text-white transition hover:bg-forest-800"
              >
                Reservar mi plaza gratis
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-900/15 bg-white px-7 py-4 text-base font-semibold text-forest-900 transition hover:bg-white/60"
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
                  Más de 1.200 comensales ya disfrutaron de la experiencia
                </div>
              </div>
            </div>
          </div>

          {c.heroImage && (
            <div className="relative animate-fade-up">
              <div className="relative h-80 overflow-hidden rounded-3xl shadow-soft sm:h-[26rem]">
                <Image
                  src={c.heroImage}
                  alt={landing.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              {c.freePrice && (
                <div className="absolute -left-3 top-6 rounded-2xl bg-forest-950 px-5 py-4 text-left shadow-soft sm:-left-5">
                  <div className="text-4xl font-extrabold leading-none text-cream">
                    {c.freePrice}
                  </div>
                  <div className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-cream/70">
                    Menú completo
                  </div>
                </div>
              )}
              {card && (
                <div className="absolute -bottom-4 right-5 flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 shadow-card">
                  <div className="flex flex-col items-center rounded-xl bg-mint-500 px-3 py-1.5 text-forest-950">
                    <span className="text-[0.6rem] font-semibold tracking-wide">
                      {card.month}
                    </span>
                    <span className="text-lg font-extrabold leading-none">
                      {card.day}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-forest-950">
                      Próxima fecha
                    </div>
                    {nextDate && (
                      <div className="text-xs text-forest-800/60">
                        {nextDate.label.split(",")[0]} · {nextDate.time}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Tira de beneficios */}
      {c.strip && c.strip.length > 0 && (
        <div className="border-y border-forest-900/10 bg-sand">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-sm text-forest-900 sm:flex-row">
            {c.strip.map((item, i) => (
              <span key={i} className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-200 text-forest-700">
                  ✓
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cómo funciona */}
      {c.steps && c.steps.length > 0 && (
        <section id="como-funciona" className="scroll-mt-20 bg-white py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="Cómo funciona"
              title="Tres pasos. Una gran comida."
              center
              intro={c.stepsIntro}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {c.steps.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-forest-900/10 bg-cream/50 p-7"
                >
                  <div className="text-sm font-extrabold text-mint-600">
                    0{i + 1}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-forest-950">
                    {s.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-forest-800/70">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menú */}
      {c.menu && c.menu.length > 0 && (
        <section id="menu" className="scroll-mt-20 bg-forest-950 py-20 text-white">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="El menú"
              title={c.menuTitle ?? "Un menú pensado para disfrutar"}
              intro={c.menuIntro}
              variant="light"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {c.menu.map((dish, i) => (
                <article
                  key={i}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  {dish.image && (
                    <div className="relative h-48">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-mint-400">
                      {dish.course}
                    </span>
                    <h3 className="mt-1 text-xl font-bold">{dish.name}</h3>
                    {dish.description && (
                      <p className="mt-2 text-sm text-white/70">
                        {dish.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
            {c.menuIncludes && c.menuIncludes.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm text-white/60">Incluye también:</span>
                {c.menuIncludes.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Por qué es gratis */}
      {c.whyPoints && c.whyPoints.length > 0 && (
        <section id="por-que" className="scroll-mt-20 bg-white py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Sin letra pequeña"
                title={c.whyTitle ?? "¿Por qué es gratis?"}
                intro={c.whyIntro}
              />
              <div className="mt-8 space-y-5">
                {c.whyPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-200 text-sm font-bold text-forest-800">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-forest-950">{p.title}</h4>
                      <p className="text-sm text-forest-800/70">
                        {p.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {c.whyImage && (
              <div className="relative h-80 overflow-hidden rounded-3xl shadow-soft lg:h-[28rem]">
                <Image
                  src={c.whyImage}
                  alt="Ambiente del comedor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Fechas y ubicación */}
      {c.dates && c.dates.length > 0 && (
        <section id="fechas" className="scroll-mt-20 bg-cream py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
            {c.venueImage && (
              <div className="relative h-72 overflow-hidden rounded-3xl shadow-soft lg:h-[26rem]">
                <Image
                  src={c.venueImage}
                  alt={c.venueTitle ?? "Restaurante"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="rounded-3xl bg-white p-7 shadow-card sm:p-9">
              <span className="text-sm font-bold uppercase tracking-widest text-forest-600">
                Fechas y lugar
              </span>
              <h3 className="mt-3 text-2xl font-bold text-forest-950">
                {c.venueTitle ?? `Restaurante en ${landing.city ?? "la ciudad"}`}
              </h3>
              {c.venueNote && (
                <p className="mt-3 flex items-start gap-2 text-sm text-forest-800/70">
                  <span className="text-mint-600">📍</span>
                  {c.venueNote}
                </p>
              )}
              <div className="mt-6 space-y-3">
                {c.dates.map((d) => {
                  const full = d.status === "full";
                  return (
                    <div
                      key={d.value}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                        full
                          ? "border-forest-900/5 bg-cream/50 opacity-60"
                          : "border-forest-900/10 bg-cream/40"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-forest-950">
                          {d.label}
                        </div>
                        <div className="text-sm text-forest-800/60">
                          {d.time}
                          {d.slotsLabel ? ` · ${d.slotsLabel}` : ""}
                        </div>
                      </div>
                      {full ? (
                        <span className="rounded-full bg-clay px-3 py-1.5 text-xs font-semibold text-forest-800/60">
                          Agotado
                        </span>
                      ) : (
                        <a
                          href="#reservar"
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                            d.status === "low"
                              ? "bg-[#B0413E]/12 text-[#B0413E] hover:bg-[#B0413E]/20"
                              : "bg-mint-500/20 text-forest-600 hover:bg-mint-500/30"
                          }`}
                        >
                          {d.status === "low" ? "Últimas plazas" : "Reservar"}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Formulario */}
      <section id="reservar" className="scroll-mt-20 bg-forest-950 py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-mint-400">
              Reserva tu plaza
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-balance">
              Aparta tu mesa en menos de un minuto
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Completa el formulario y te llamaremos para confirmar tu plaza y
              resolver cualquier duda. Es gratis y no necesitas tarjeta.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Confirmación por teléfono en 24-48 h",
                "Menú completo y bebidas incluidos",
                "Cancela cuando quieras, sin coste",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint-500 text-sm text-forest-950">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {c.contactPhone && (
              <p className="mt-6 text-white/70">
                ¿Prefieres llamarnos?{" "}
                <a
                  href={`tel:${c.contactPhone}`}
                  className="font-bold text-mint-300"
                >
                  {c.contactPhone}
                </a>
              </p>
            )}
          </div>
          <LeadForm
            landingId={landing.id}
            form={c.form}
            dates={c.dates}
            defaultDate={nextDate?.value}
          />
        </div>
      </section>

      {/* FAQ */}
      {c.faqs && c.faqs.length > 0 && (
        <section id="faq" className="scroll-mt-20 bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Todo lo que quieres saber"
              intro="¿Te queda alguna duda? Aquí respondemos las más habituales antes de reservar."
            />
            <div className="divide-y divide-forest-900/10 border-y border-forest-900/10">
              {c.faqs.map((f, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-forest-950">
                    {f.q}
                    <span className="text-2xl leading-none text-forest-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-forest-800/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galería */}
      {c.gallery && c.gallery.length > 0 && (
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading
              eyebrow="El ambiente"
              title="Así se vive una comida Neventia"
              center
            />
            <div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3.5 md:grid-cols-4">
              {c.gallery.map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl shadow-card ${
                    i === 0 ? "row-span-2" : ""
                  } ${i === 3 ? "col-span-2" : ""}`}
                >
                  <Image
                    src={src}
                    alt={`Galería ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="rounded-[2rem] bg-mint-500 px-6 py-16 text-center text-forest-950 sm:px-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Tu mesa te está esperando
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-forest-950/80">
              Plazas limitadas para cada fecha. Reserva ahora y asegura tu sitio
              en la próxima comida de Neventia.
            </p>
            <a
              href="#reservar"
              className="mt-8 inline-flex rounded-full bg-forest-950 px-7 py-4 font-semibold text-cream transition hover:bg-forest-900"
            >
              Reservar mi plaza gratis
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 py-10 text-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/">
            <Logo variant="light" />
          </Link>
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Neventia. Todos los derechos reservados.
          </p>
        </div>
        {c.legal && (
          <p className="mx-auto mt-6 max-w-6xl px-5 text-xs text-white/35">
            {c.legal}
          </p>
        )}
      </footer>

      {/* CTA fija móvil */}
      <a
        href="#reservar"
        className="fixed inset-x-4 bottom-4 z-50 rounded-full bg-mint-500 px-6 py-3.5 text-center font-semibold text-forest-950 shadow-soft lg:hidden"
      >
        Reservar mi plaza gratis · {c.freePrice ?? "0€"}
      </a>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  variant = "dark",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
  variant?: "dark" | "light";
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <span className={`eyebrow ${variant === "light" ? "on-dark" : ""}`}>
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-[2.6rem] ${
          variant === "light" ? "text-white" : "text-forest-950"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg ${
            variant === "light" ? "text-white/70" : "text-forest-800/70"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
