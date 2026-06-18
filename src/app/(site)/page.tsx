/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Neventia · Comemos juntos. Experiencias gastronómicas gratuitas por toda España",
  description:
    "Neventia organiza comidas y eventos gastronómicos gratuitos por toda España. Descubre el próximo evento y reserva tu plaza.",
};

const EVENT_HREF = "/a-coruna";

function BrandLogo({ stroke = "#142E23" }: { stroke?: string }) {
  return (
    <svg className="logo" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M 48.94 25.90 A 18 18 0 1 1 38.10 15.06"
        fill="none"
        stroke={stroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="44.7" cy="19.3" r="5.5" fill="#6CAE8C" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="site-header site-header--home">
        <div className="wrap header-inner">
          <Link className="brand" href="#top" aria-label="Neventia inicio">
            <BrandLogo />
            <span className="name">neventia</span>
          </Link>
          <nav className="nav-links">
            <a href="#concepto">Cómo funciona</a>
            <a href="#eventos">Eventos</a>
            <a href="#opiniones">Opiniones</a>
          </nav>
          <div className="header-right">
            <Link className="btn btn-primary header-cta" href={EVENT_HREF}>
              <span className="cta-lg-text">Próximo evento →</span>
              <span className="cta-sm-text">Evento A Coruña</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="home-hero">
          <svg className="orbit-deco" viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M 48.94 25.90 A 18 18 0 1 1 38.10 15.06"
              fill="none"
              stroke="#6CAE8C"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="44.7" cy="19.3" r="4.2" fill="#6CAE8C" />
          </svg>
          <div className="wrap home-hero-grid">
            <div className="home-hero-copy">
              <span className="eyebrow">
                Experiencias gastronómicas · toda España
              </span>
              <h1>
                Comemos juntos.
                <br />
                <span className="accent">Invita la casa.</span>
              </h1>
              <p className="lede">
                Neventia reúne a buenos comensales en torno a una gran mesa:
                comidas de autor en las mejores ciudades, sin coste. Tú pones el
                apetito — la comida, la ponemos nosotros.
              </p>
              <div className="home-hero-cta">
                <Link className="btn btn-primary btn-lg" href={EVENT_HREF}>
                  Ver próximo evento · A Coruña
                </Link>
                <a className="btn btn-ghost btn-lg" href="#concepto">
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
                    Más de 1.200 comensales en 4 ciudades
                  </div>
                </div>
              </div>
            </div>
            <div className="collage">
              <div className="c-tag">
                <div className="big">5 ciudades</div>
                <div className="lbl">y sumando</div>
              </div>
              <img
                className="c1"
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=70"
                alt="Mesa montada con comensales"
              />
              <img
                className="c2"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=70"
                alt="Plato de autor"
              />
              <img
                className="c3"
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=70"
                alt="Brindis"
              />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="wrap stats-grid">
            <div className="stat">
              <div className="n">
                1.200<span className="accent">+</span>
              </div>
              <div className="l">Comensales</div>
            </div>
            <div className="stat">
              <div className="n">5</div>
              <div className="l">Ciudades</div>
            </div>
            <div className="stat">
              <div className="n">
                4,9<span className="accent">★</span>
              </div>
              <div className="l">Valoración media</div>
            </div>
            <div className="stat">
              <div className="n">
                0<span className="accent">€</span>
              </div>
              <div className="l">Siempre gratis</div>
            </div>
          </div>
        </section>

        {/* CONCEPTO */}
        <section className="section" id="concepto">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">El concepto</span>
              <h2>Una idea sencilla: buena comida que une</h2>
              <p>
                Marcas que quieren darse a conocer patrocinan la comida. Tú
                disfrutas de un menú completo, gratis, en buena compañía.
              </p>
            </div>
            <div className="steps">
              <div className="step">
                <div className="num">01</div>
                <svg
                  className="s-ico"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="7" y="10" width="34" height="30" rx="4" />
                  <path d="M7 18h34M16 6v8M32 6v8" strokeLinecap="round" />
                  <path
                    d="M15 27l5 5 9-9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Elige tu ciudad</h3>
                <p>
                  Consulta el próximo evento en tu zona y reserva tu plaza en
                  menos de un minuto. Las plazas son limitadas.
                </p>
              </div>
              <div className="step">
                <div className="num">02</div>
                <svg
                  className="s-ico"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M24 6c8 0 14 5 14 12 0 4-2 7-5 9v7l-6-4a20 20 0 0 1-3 .2C16 30.2 10 25.2 10 18 10 11 16 6 24 6Z"
                    strokeLinejoin="round"
                  />
                  <path d="M18 17h12M18 22h8" strokeLinecap="round" />
                </svg>
                <h3>Asiste a la presentación</h3>
                <p>
                  Una charla breve y amena de nuestras marcas colaboradoras
                  antes de comer. Sin ninguna obligación de comprar.
                </p>
              </div>
              <div className="step">
                <div className="num">03</div>
                <svg
                  className="s-ico"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M14 6v10a4 4 0 0 0 8 0V6M18 6v36M34 6c-3 0-5 4-5 10s2 8 5 8m0-18v36"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Disfruta la comida</h3>
                <p>
                  Un menú completo de autor, totalmente gratis, con tiempo para
                  disfrutar sin prisas. La mejor parte del plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTOS */}
        <section className="section events" id="eventos">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Eventos</span>
              <h2>Dónde estaremos y dónde hemos estado</h2>
              <p>
                Recorremos España ciudad a ciudad. Este es nuestro próximo
                destino — y los que ya han llenado mesa.
              </p>
            </div>

            {/* Próximo evento */}
            <div className="upcoming-card">
              <div className="upcoming-media">
                <span className="upcoming-flag">
                  <span className="dot" /> Próximo evento
                </span>
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=70"
                  alt="A Coruña"
                />
              </div>
              <div className="upcoming-body">
                <div className="eyebrow">Galicia</div>
                <div className="city">A Coruña</div>
                <div className="when">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="3" />
                    <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
                  </svg>
                  Sábado, 28 de junio · 13:30 h
                </div>
                <p>
                  Una comida de autor con producto gallego de mercado,
                  totalmente gratis. Plazas muy limitadas: reserva la tuya antes
                  de que se agoten.
                </p>
                <Link className="btn btn-accent btn-lg" href={EVENT_HREF}>
                  Reservar plaza gratis →
                </Link>
              </div>
            </div>

            {/* Eventos pasados */}
            <div className="past-head">
              <h3>Eventos celebrados</h3>
              <span>Más de 1.200 comensales en 4 ciudades</span>
            </div>
            <div className="cities-grid">
              {[
                {
                  city: "Ibiza",
                  when: "Mayo 2026 · mesa completa",
                  img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=70",
                },
                {
                  city: "Madrid",
                  when: "Abril 2026 · 3 turnos",
                  img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=70",
                },
                {
                  city: "Santander",
                  when: "Marzo 2026 · mesa completa",
                  img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=800&q=70",
                },
                {
                  city: "Logroño",
                  when: "Febrero 2026 · mesa completa",
                  img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=70",
                },
              ].map((c) => (
                <article className="city-card" key={c.city}>
                  <img src={c.img} alt={c.city} />
                  <div className="cc-body">
                    <div className="cc-top">
                      <h4>{c.city}</h4>
                      <span className="done">Celebrado</span>
                    </div>
                    <div className="cc-meta">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M20 6 9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {c.when}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* OPINIONES */}
        <section className="section" id="opiniones">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Opiniones</span>
              <h2>Lo que dicen quienes ya se sentaron a la mesa</h2>
            </div>
            <div className="testi-grid">
              {[
                {
                  text: "“No me lo creía hasta que fui. Comimos de maravilla, la presentación fue corta y nadie nos presionó para comprar nada. Repetiremos seguro.”",
                  av: "MA",
                  nm: "María A.",
                  ct: "Madrid",
                },
                {
                  text: "“Una tarde estupenda en pareja. El restaurante precioso y la comida de nivel. La organización, impecable de principio a fin.”",
                  av: "JR",
                  nm: "Jorge R.",
                  ct: "Santander",
                },
                {
                  text: "“Pensaba que habría truco y no lo hubo. Conocimos gente encantadora y comimos genial. Gracias, Neventia.”",
                  av: "CL",
                  nm: "Carmen L.",
                  ct: "Logroño",
                },
              ].map((t) => (
                <div className="testi" key={t.nm}>
                  <div className="stars">★★★★★</div>
                  <p>{t.text}</p>
                  <div className="who">
                    <span className="av">{t.av}</span>
                    <div>
                      <div className="nm">{t.nm}</div>
                      <div className="ct">{t.ct}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="section gallery">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">El ambiente</span>
              <h2>Así se vive una comida Neventia</h2>
            </div>
            <div className="gallery-grid">
              <img
                className="g-tall"
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=70"
                alt="Mesa"
              />
              <img
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=70"
                alt="Plato"
              />
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=70"
                alt="Comensales"
              />
              <img
                className="g-wide"
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=70"
                alt="Comedor"
              />
              <img
                src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=70"
                alt="Detalle"
              />
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=70"
                alt="Brindis"
              />
              <img
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=70"
                alt="Postre"
              />
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="section final">
          <div className="wrap">
            <div className="final-card">
              <h2>La próxima mesa es en A Coruña</h2>
              <p>
                Plazas limitadas. Reserva ahora y asegura tu sitio en la próxima
                comida gratuita de Neventia.
              </p>
              <Link className="btn btn-primary btn-lg" href={EVENT_HREF}>
                Reservar mi plaza gratis
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <Link className="brand" href="#top">
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
                <h5>Neventia</h5>
                <a href="#concepto">Cómo funciona</a>
                <a href="#eventos">Eventos</a>
                <a href="#opiniones">Opiniones</a>
                <Link href={EVENT_HREF}>Próximo evento</Link>
              </div>
              <div className="footer-col">
                <h5>Información</h5>
                <Link href={`${EVENT_HREF}#por-que`}>¿Por qué es gratis?</Link>
                <Link href={`${EVENT_HREF}#faq`}>Preguntas frecuentes</Link>
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
            <span>Hecho con cariño en España</span>
          </div>
        </div>
      </footer>
    </>
  );
}
