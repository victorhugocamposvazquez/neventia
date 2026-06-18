/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { LeadForm } from "@/components/landing/LeadForm";
import type { Landing, LandingStep } from "@/lib/types";

const MONTHS = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

const DEFAULT_STEPS: LandingStep[] = [
  {
    title: "Reserva tu plaza",
    description:
      "Elige una de las fechas disponibles y déjanos tus datos. Las plazas son limitadas y se asignan por orden de reserva.",
  },
  {
    title: "Asiste a la presentación",
    description:
      "Antes de comer, nuestros colaboradores presentan sus productos en una charla breve y amena. Sin ninguna obligación de comprar nada.",
  },
  {
    title: "Disfruta tu comida",
    description:
      "Siéntate, relájate y disfruta de un menú completo de autor, totalmente gratis. La mejor parte del plan.",
  },
];

const STEP_ICONS = [
  <svg key="1" className="s-ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="7" y="10" width="34" height="30" rx="4" />
    <path d="M7 18h34M16 6v8M32 6v8" strokeLinecap="round" />
    <path d="M15 27l5 5 9-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="2" className="s-ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M24 6c8 0 14 5 14 12 0 4-2 7-5 9v7l-6-4a20 20 0 0 1-3 .2C16 30.2 10 25.2 10 18 10 11 16 6 24 6Z" strokeLinejoin="round" />
    <path d="M18 17h12M18 22h8" strokeLinecap="round" />
  </svg>,
  <svg key="3" className="s-ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 6v10a4 4 0 0 0 8 0V6M18 6v36M34 6c-3 0-5 4-5 10s2 8 5 8m0-18v36" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function BrandLogo({ stroke = "#142E23" }: { stroke?: string }) {
  return (
    <svg className="logo" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M 48.94 25.90 A 18 18 0 1 1 38.10 15.06" fill="none" stroke={stroke} strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="44.7" cy="19.3" r="5.5" fill="#6CAE8C" />
    </svg>
  );
}

function calFromDate(iso: string | null): { month: string; day: string } | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return { month: MONTHS[d.getMonth()], day: String(d.getDate()) };
}

export function LandingView({ landing }: { landing: Landing }) {
  const c = landing.content ?? {};
  const city = landing.city ?? "tu ciudad";
  const freePrice = c.freePrice ?? "0€";
  const dates = c.dates ?? [];
  const nextDate = dates.find((d) => d.status !== "full") ?? dates[0];
  const cal =
    calFromDate(landing.event_date) ??
    (nextDate ? calFromDate(nextDate.value) : null);
  const steps = c.steps && c.steps.length > 0 ? c.steps : DEFAULT_STEPS;

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="wrap header-inner">
          <Link className="brand" href="/" aria-label="Neventia inicio">
            <BrandLogo />
            <span className="name">neventia</span>
          </Link>
          <div className="header-right">
            {landing.city && (
              <span className="header-meta">
                <span className="pin" /> {landing.city}
              </span>
            )}
            <a className="btn btn-primary header-cta" href="#reservar">
              Reservar mi plaza
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                {c.badge ?? "Evento gastronómico · plazas limitadas"}
              </span>
              <h1>
                {c.headline ?? "Una comida de autor."}
                <br />
                Por <span className="free">{freePrice}</span>.
              </h1>
              <p className="hero-sub">
                {c.subheadline ??
                  `Te invitamos a una experiencia gastronómica completa en uno de los mejores restaurantes de ${city}. Sin coste, sin compromiso de compra. Solo buena mesa y buena compañía.`}
              </p>
              <div className="hero-cta-row">
                <a className="btn btn-primary btn-lg" href="#reservar">
                  Reservar mi plaza gratis
                </a>
                <a className="btn btn-ghost btn-lg" href="#como-funciona">
                  Cómo funciona
                </a>
              </div>
              <div className="hero-trust">
                <div className="avatars" aria-hidden="true">
                  <span>MA</span>
                  <span>JR</span>
                  <span>CL</span>
                  <span>+</span>
                </div>
                <div>
                  <div className="stars">★★★★★</div>
                  <div className="t-text">
                    Más de 1.200 comensales ya disfrutaron de la experiencia
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-media">
              <img
                src={
                  c.heroImage ??
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=70"
                }
                alt={landing.name}
              />
              <div className="hero-badge">
                <div className="big">{freePrice}</div>
                <div className="lbl">Menú completo</div>
              </div>
              {cal && (
                <div className="hero-datecard">
                  <div className="cal">
                    <small>{cal.month}</small>
                    {cal.day}
                  </div>
                  <div>
                    <div className="d-main">Próxima fecha</div>
                    <div className="d-sub">
                      {nextDate
                        ? `${nextDate.label.split(",")[0]} · ${nextDate.time ?? ""}`.trim()
                        : ""}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* STRIP */}
        <div className="strip">
          <div className="wrap strip-inner">
            <div className="strip-item">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20M2 12h20" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span>
                <strong>Menú completo</strong> · entrante, principal, postre y
                bebida
              </span>
            </div>
            <div className="strip-sep" />
            <div className="strip-item">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                <strong>Sin compromiso</strong> de compra
              </span>
            </div>
            <div className="strip-sep" />
            <div className="strip-item">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="8" r="3.2" />
                <circle cx="16" cy="9" r="2.6" />
                <path d="M3.5 19c0-2.8 2.4-4.5 5.5-4.5s5.5 1.7 5.5 4.5M15 14.6c2.6.2 4.5 1.8 4.5 4.4" strokeLinecap="round" />
              </svg>
              <span>
                <strong>Ven en pareja</strong> · ambiente cuidado
              </span>
            </div>
          </div>
        </div>

        {/* CÓMO FUNCIONA */}
        <section className="section" id="como-funciona">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Cómo funciona</span>
              <h2>Tres pasos. Una gran comida.</h2>
              <p>
                {c.stepsIntro ??
                  "Reservar tu plaza lleva menos de un minuto. El resto, lo ponemos nosotros."}
              </p>
            </div>
            <div className="steps">
              {steps.slice(0, 3).map((s, i) => (
                <div className="step" key={i}>
                  <div className="num">0{i + 1}</div>
                  {STEP_ICONS[i]}
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENÚ */}
        {c.menu && c.menu.length > 0 && (
          <section className="section menu" id="menu">
            <div className="wrap">
              <div className="section-head">
                <span className="eyebrow on-dark">El menú</span>
                <h2>
                  {c.menuTitle ?? "Un menú pensado para disfrutar sin prisa"}
                </h2>
                <p>
                  {c.menuIntro ??
                    "Producto de mercado, cocina de temporada y un postre que merece la pena. Esto es lo que te espera en la mesa."}
                </p>
              </div>
              <div className="menu-grid">
                {c.menu.map((dish, i) => (
                  <article className="dish" key={i}>
                    {dish.image && <img src={dish.image} alt={dish.name} />}
                    <div className="dish-body">
                      <div className="course">{dish.course}</div>
                      <h3>{dish.name}</h3>
                      {dish.description && <p>{dish.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
              {c.menuIncludes && c.menuIncludes.length > 0 && (
                <div className="menu-foot">
                  <span>Incluye también:</span>
                  {c.menuIncludes.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* POR QUÉ ES GRATIS */}
        {c.whyPoints && c.whyPoints.length > 0 && (
          <section className="section" id="por-que">
            <div className="wrap why-grid">
              <div className="why-copy">
                <span className="eyebrow">Sin letra pequeña</span>
                <h2 style={{ fontSize: "clamp(28px, 3.4vw, 42px)", marginTop: 16 }}>
                  {c.whyTitle ?? "¿Por qué es gratis?"}
                </h2>
                {c.whyIntro && (
                  <p style={{ opacity: 0.74, marginTop: 16, fontSize: 17 }}>
                    {c.whyIntro}
                  </p>
                )}
                <div className="why-list">
                  {c.whyPoints.map((p, i) => (
                    <div className="why-item" key={i}>
                      <span className="check">
                        <Check />
                      </span>
                      <div>
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {c.whyImage && (
                <div className="why-media">
                  <img src={c.whyImage} alt="Ambiente del comedor" />
                </div>
              )}
            </div>
          </section>
        )}

        {/* FECHAS Y UBICACIÓN */}
        {dates.length > 0 && (
          <section className="section" id="fechas" style={{ paddingTop: 0 }}>
            <div className="wrap venue-grid">
              {c.venueImage && (
                <div className="venue-media">
                  <img src={c.venueImage} alt={c.venueTitle ?? "Restaurante"} />
                </div>
              )}
              <div className="dates-card">
                <span className="eyebrow">Fechas y lugar</span>
                <h3 style={{ marginTop: 14 }}>
                  {c.venueTitle ?? `Restaurante en el centro de ${city}`}
                </h3>
                {c.venueNote && (
                  <div className="venue-line">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                    <span>{c.venueNote}</span>
                  </div>
                )}
                <div className="date-list">
                  {dates.map((d) => {
                    const full = d.status === "full";
                    return (
                      <div className={`date-row${full ? " full" : ""}`} key={d.value}>
                        <div className="dl">
                          <div>
                            <div className="ddate">{d.label}</div>
                            <div className="dslots">
                              {full
                                ? "Completo"
                                : `${d.time ?? ""}${d.slotsLabel ? ` · ${d.slotsLabel}` : ""}`}
                            </div>
                          </div>
                        </div>
                        {full ? (
                          <span className="pill">Agotado</span>
                        ) : (
                          <a className={`pill${d.status === "low" ? " low" : ""}`} href="#reservar">
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

        {/* FORMULARIO */}
        <section className="section reserve" id="reservar">
          <div className="wrap reserve-grid">
            <div className="reserve-copy">
              <span className="eyebrow on-dark">Reserva tu plaza</span>
              <h2>
                Aparta tu mesa
                <br />
                en menos de un minuto
              </h2>
              <p className="lede">
                Completa el formulario y te llamaremos para confirmar tu plaza y
                resolver cualquier duda. Es gratis y no necesitas tarjeta.
              </p>
              <ul className="reserve-points">
                <li>
                  <span className="check">
                    <Check />
                  </span>{" "}
                  Confirmación por teléfono en 24-48 h
                </li>
                <li>
                  <span className="check">
                    <Check />
                  </span>{" "}
                  Menú completo y bebidas incluidos
                </li>
                <li>
                  <span className="check">
                    <Check />
                  </span>{" "}
                  Cancela cuando quieras, sin coste
                </li>
              </ul>
            </div>

            <LeadForm
              landingId={landing.id}
              form={c.form}
              dates={dates}
              defaultDate={nextDate?.value}
            />
          </div>
        </section>

        {/* FAQ */}
        {c.faqs && c.faqs.length > 0 && (
          <section className="section" id="faq">
            <div className="wrap faq-grid">
              <div className="faq-head">
                <span className="eyebrow">Preguntas frecuentes</span>
                <h2 style={{ fontSize: "clamp(28px, 3.4vw, 42px)", marginTop: 16 }}>
                  Todo lo que quieres saber
                </h2>
                <p style={{ opacity: 0.72, marginTop: 16 }}>
                  ¿Te queda alguna duda? Aquí respondemos las más habituales
                  antes de reservar.
                </p>
              </div>
              <div className="faq-list">
                {c.faqs.map((f, i) => (
                  <details className="faq-item" key={i}>
                    <summary>
                      {f.q} <span className="plus" />
                    </summary>
                    <div className="answer">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GALERÍA */}
        {c.gallery && c.gallery.length > 0 && (
          <section className="section gallery">
            <div className="wrap">
              <div className="section-head center">
                <span className="eyebrow">El ambiente</span>
                <h2>Así se vive una comida Neventia</h2>
                <p>
                  Mesa cuidada, buena compañía y buen producto. Un anticipo de lo
                  que te espera en {city}.
                </p>
              </div>
              <div className="gallery-grid">
                {c.gallery.map((src, i) => (
                  <img
                    key={i}
                    className={i === 0 ? "g-tall" : i === 3 ? "g-wide" : undefined}
                    src={src}
                    alt={`Galería ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA FINAL */}
        <section className="section final">
          <div className="wrap">
            <div className="final-card">
              <h2>Tu mesa te está esperando</h2>
              <p>
                Plazas limitadas para cada fecha. Reserva ahora y asegura tu
                sitio en la próxima comida de Neventia.
              </p>
              <a className="btn btn-primary btn-lg" href="#reservar">
                Reservar mi plaza gratis
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <Link className="brand" href="/">
                <BrandLogo stroke="#F6F4ED" />
                <span className="name">neventia</span>
              </Link>
              <p>
                Experiencias gastronómicas y eventos por toda España. Comidas,
                fiestas y celebraciones con buena mesa y mejor compañía.
              </p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h5>Evento</h5>
                <a href="#como-funciona">Cómo funciona</a>
                <a href="#menu">El menú</a>
                <a href="#fechas">Fechas y lugar</a>
                <a href="#reservar">Reservar plaza</a>
              </div>
              <div className="footer-col">
                <h5>Información</h5>
                <a href="#por-que">¿Por qué es gratis?</a>
                <a href="#faq">Preguntas frecuentes</a>
                <a href="#">Contacto</a>
              </div>
              <div className="footer-col">
                <h5>Legal</h5>
                <a href="#">Aviso legal</a>
                <a href="#">Política de privacidad</a>
                <a href="#">Política de cookies</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Neventia. Todos los derechos reservados.</span>
            <span>Hecho con cariño en Galicia</span>
          </div>
        </div>
      </footer>

      {/* Sticky CTA móvil */}
      <div className="mobile-cta">
        <a className="btn btn-primary" href="#reservar">
          Reservar mi plaza gratis · {freePrice}
        </a>
      </div>
    </>
  );
}
