/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { EditSectionWrap } from "@/components/landing/EditSectionWrap";
import { ChatReserve } from "@/components/landing/ChatReserve";
import { ExperienceScroll } from "@/components/site/ExperienceScroll";
import { CookiePreferencesButton } from "@/components/site/CookiePreferencesButton";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { buildExperienceStepsFromGallery } from "@/lib/experience-steps";
import { calFromEventDate, resolveLandingEvent } from "@/lib/landing-event";
import { HOME_TESTIMONIALS, mapLandingTestimonials } from "@/lib/testimonials";
import { LEGAL_LINKS } from "@/lib/legal";
import { InlineAddButton, InlineEdit, InlineImage } from "@/components/landing/InlineEdit";
import type { Dish, Landing, LandingContent, LandingFaq, LandingStep, WhyPoint } from "@/lib/types";

const DEFAULT_STEPS: LandingStep[] = [
  {
    title: "Reserva tu plaza",
    description:
      "Déjanos tus datos en el chat. Las plazas son limitadas y se asignan por orden de inscripción.",
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

const HERO_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=70";

const EMPTY_DISH: Dish = {
  course: "Entrante",
  name: "Nuevo plato",
  description: "",
  image: "",
};

const EMPTY_WHY: WhyPoint = { title: "Nuevo punto", description: "" };

const EMPTY_FAQ: LandingFaq = { q: "Nueva pregunta", a: "Respuesta…" };

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

function SectionWrap({
  id,
  label,
  editMode,
  activeSection,
  onSectionClick,
  children,
}: {
  id: string;
  label: string;
  editMode?: boolean;
  activeSection?: string | null;
  onSectionClick?: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <EditSectionWrap
      id={id}
      label={label}
      enabled={editMode}
      active={activeSection === id}
      onSelect={onSectionClick}
    >
      {children}
    </EditSectionWrap>
  );
}

export type LandingViewProps = {
  landing: Landing;
  editMode?: boolean;
  preview?: boolean;
  activeSection?: string | null;
  onSectionClick?: (id: string) => void;
  onContentChange?: (content: LandingContent) => void;
  onMetaChange?: (patch: { city?: string }) => void;
};

export function LandingView({
  landing,
  editMode,
  preview,
  activeSection,
  onSectionClick,
  onContentChange,
  onMetaChange,
}: LandingViewProps) {
  const c = landing.content ?? {};
  const city = landing.city ?? "tu ciudad";
  const freePrice = c.freePrice ?? "0€";
  const event = resolveLandingEvent(landing);
  const cal = calFromEventDate(landing.event_date);
  const steps = c.steps && c.steps.length > 0 ? c.steps : DEFAULT_STEPS;
  const eventFull = event?.status === "full";
  const showVenue = event || c.venueTitle || c.venueImage || c.venueNote;

  const landingTestimonials = c.testimonials?.length
    ? mapLandingTestimonials(c.testimonials)
    : [];
  const landingAuthors = new Set(landingTestimonials.map((t) => t.author));
  const testimonials = [
    ...landingTestimonials,
    ...HOME_TESTIMONIALS.filter((t) => !landingAuthors.has(t.author)),
  ];

  const showMenu = (c.menu && c.menu.length > 0) || editMode;
  const showWhy = (c.whyPoints && c.whyPoints.length > 0) || editMode;
  const showVenueBlock = showVenue || editMode;
  const showFaq = (c.faqs && c.faqs.length > 0) || editMode;

  const inline = Boolean(editMode && onContentChange);
  const defaultHeadline = "Una comida de autor.";
  const defaultSubheadline = `Te invitamos a una experiencia gastronómica completa en uno de los mejores restaurantes de ${city}. Sin coste, sin compromiso de compra. Solo buena mesa y buena compañía.`;

  const applyPatch = (partial: Partial<LandingContent>) => {
    onContentChange?.({ ...c, ...partial });
  };

  const editableSteps = (): LandingStep[] =>
    c.steps?.length ? [...c.steps] : [...DEFAULT_STEPS];

  const updateStep = (index: number, field: keyof LandingStep, value: string) => {
    const next = editableSteps();
    next[index] = { ...next[index], [field]: value };
    applyPatch({ steps: next });
  };

  const updateDish = (index: number, field: keyof Dish, value: string) => {
    const menu = [...(c.menu ?? [])];
    menu[index] = { ...menu[index], [field]: value };
    applyPatch({ menu });
  };

  const updateWhy = (index: number, field: keyof WhyPoint, value: string) => {
    const whyPoints = [...(c.whyPoints ?? [])];
    whyPoints[index] = { ...whyPoints[index], [field]: value };
    applyPatch({ whyPoints });
  };

  const updateFaq = (index: number, field: keyof LandingFaq, value: string) => {
    const faqs = [...(c.faqs ?? [])];
    faqs[index] = { ...faqs[index], [field]: value };
    applyPatch({ faqs });
  };

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="wrap header-inner">
          <Link className="brand" href={preview ? "#" : "/"} aria-label="Neventia inicio">
            <BrandLogo />
            <span className="name">neventia</span>
          </Link>
          <div className="header-right">
            {(landing.city || inline) && (
              <span className="header-meta">
                <span className="pin" />{" "}
                <InlineEdit
                  enabled={inline && Boolean(onMetaChange)}
                  value={landing.city ?? ""}
                  onChange={(city) => onMetaChange?.({ city })}
                  placeholder="Ciudad"
                />
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
        <SectionWrap
          id="hero"
          label="Cabecera"
          editMode={editMode}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        >
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <InlineEdit
                as="span"
                className="eyebrow"
                enabled={inline}
                value={c.badge ?? "Evento gastronómico · plazas limitadas"}
                onChange={(badge) => applyPatch({ badge })}
                placeholder="Etiqueta superior"
              />
              <h1>
                <InlineEdit
                  as="span"
                  enabled={inline}
                  value={c.headline ?? defaultHeadline}
                  onChange={(headline) => applyPatch({ headline })}
                  placeholder="Titular principal"
                />
                <br />
                Por{" "}
                <InlineEdit
                  as="span"
                  className="free"
                  enabled={inline}
                  value={freePrice}
                  onChange={(freePrice) => applyPatch({ freePrice })}
                  placeholder="0€"
                />
                .
              </h1>
              <InlineEdit
                as="p"
                className="hero-sub"
                enabled={inline}
                multiline
                value={c.subheadline ?? defaultSubheadline}
                onChange={(subheadline) => applyPatch({ subheadline })}
                placeholder="Texto bajo el titular"
              />
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
              <InlineImage
                enabled={inline}
                src={c.heroImage ?? ""}
                fallback={HERO_FALLBACK_IMAGE}
                alt={landing.name}
                onChange={(heroImage) => applyPatch({ heroImage })}
              />
              <div className="hero-badge">
                <div className="big">
                  <InlineEdit
                    enabled={inline}
                    value={freePrice}
                    onChange={(v) => applyPatch({ freePrice: v })}
                    placeholder="0€"
                  />
                </div>
                <div className="lbl">Menú completo</div>
              </div>
              {cal && (
                <div className="hero-datecard">
                  <div className="cal">
                    <small>{cal.month}</small>
                    {cal.day}
                  </div>
                  <div>
                    <div className="d-main">Fecha del evento</div>
                    <div className="d-sub">
                      {event
                        ? `${event.label.split(",")[0]} · ${event.time}`.trim()
                        : ""}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        </SectionWrap>

        <SectionWrap
          id="event"
          label="Plazas"
          editMode={editMode}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        >
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
                <circle cx="9" cy="8" r="3.2" />
                <circle cx="16" cy="9" r="2.6" />
                <path d="M3.5 19c0-2.8 2.4-4.5 5.5-4.5s5.5 1.7 5.5 4.5M15 14.6c2.6.2 4.5 1.8 4.5 4.4" strokeLinecap="round" />
              </svg>
              <span>
                <strong>También para parejas</strong> · ambiente cuidado
              </span>
            </div>
          </div>
        </div>
        </SectionWrap>

        <SectionWrap
          id="steps"
          label="Cómo funciona"
          editMode={editMode}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        >
        <section className="section" id="como-funciona">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Cómo funciona</span>
              <h2>Tres pasos. Una gran comida.</h2>
              <p>
                <InlineEdit
                  enabled={inline}
                  multiline
                  value={
                    c.stepsIntro ??
                    "Reservar tu plaza lleva menos de un minuto. El resto, lo ponemos nosotros."
                  }
                  onChange={(stepsIntro) => applyPatch({ stepsIntro })}
                  placeholder="Introducción de los pasos"
                />
              </p>
            </div>
            <div className="steps">
              {steps.slice(0, 3).map((s, i) => (
                <div className="step" key={i}>
                  <div className="num">0{i + 1}</div>
                  {STEP_ICONS[i]}
                  <InlineEdit
                    as="h3"
                    enabled={inline}
                    value={s.title}
                    onChange={(v) => updateStep(i, "title", v)}
                    placeholder={`Título paso ${i + 1}`}
                  />
                  <InlineEdit
                    as="p"
                    enabled={inline}
                    multiline
                    value={s.description}
                    onChange={(v) => updateStep(i, "description", v)}
                    placeholder="Descripción del paso"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        </SectionWrap>

        {showMenu && (
          <SectionWrap
            id="menu"
            label="Menú"
            editMode={editMode}
            activeSection={activeSection}
            onSectionClick={onSectionClick}
          >
          <section className="section menu" id="menu">
            <div className="wrap">
              <div className="section-head">
                <span className="eyebrow on-dark">El menú</span>
                <h2>
                  <InlineEdit
                    as="span"
                    enabled={inline}
                    value={
                      c.menuTitle ?? "Un menú pensado para disfrutar sin prisa"
                    }
                    onChange={(menuTitle) => applyPatch({ menuTitle })}
                    placeholder="Título del menú"
                  />
                </h2>
                <p>
                  <InlineEdit
                    as="span"
                    enabled={inline}
                    multiline
                    value={
                      c.menuIntro ??
                      "Producto de mercado, cocina de temporada y un postre que merece la pena. Esto es lo que te espera en la mesa."
                    }
                    onChange={(menuIntro) => applyPatch({ menuIntro })}
                    placeholder="Introducción del menú"
                  />
                </p>
              </div>
              <div className="menu-grid">
                {(c.menu ?? []).map((dish, i) => (
                  <article className="dish" key={i}>
                    {(dish.image || inline) && (
                      <InlineImage
                        enabled={inline}
                        src={dish.image ?? ""}
                        fallback={HERO_FALLBACK_IMAGE}
                        alt={dish.name}
                        imgClassName=""
                        onChange={(image) => updateDish(i, "image", image)}
                      />
                    )}
                    <div className="dish-body">
                      <InlineEdit
                        as="div"
                        className="course"
                        enabled={inline}
                        value={dish.course}
                        onChange={(v) => updateDish(i, "course", v)}
                        placeholder="Entrante"
                      />
                      <InlineEdit
                        as="h3"
                        enabled={inline}
                        value={dish.name}
                        onChange={(v) => updateDish(i, "name", v)}
                        placeholder="Nombre del plato"
                      />
                      <InlineEdit
                        as="p"
                        enabled={inline}
                        multiline
                        value={dish.description ?? ""}
                        onChange={(v) => updateDish(i, "description", v)}
                        placeholder="Descripción del plato"
                      />
                    </div>
                  </article>
                ))}
              </div>
              <InlineAddButton
                enabled={inline}
                onClick={() =>
                  applyPatch({ menu: [...(c.menu ?? []), { ...EMPTY_DISH }] })
                }
              >
                + Añadir plato
              </InlineAddButton>
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
          </SectionWrap>
        )}

        {showWhy && (
          <SectionWrap
            id="why"
            label="¿Por qué es gratis?"
            editMode={editMode}
            activeSection={activeSection}
            onSectionClick={onSectionClick}
          >
          <section className="section" id="por-que">
            <div className="wrap why-grid">
              <div className="why-copy">
                <span className="eyebrow">Sin letra pequeña</span>
                <h2 style={{ fontSize: "clamp(28px, 3.4vw, 42px)", marginTop: 16 }}>
                  <InlineEdit
                    as="span"
                    enabled={inline}
                    value={c.whyTitle ?? "¿Por qué es gratis?"}
                    onChange={(whyTitle) => applyPatch({ whyTitle })}
                    placeholder="Título"
                  />
                </h2>
                {(c.whyIntro || inline) && (
                  <InlineEdit
                    as="p"
                    enabled={inline}
                    multiline
                    value={c.whyIntro ?? ""}
                    onChange={(whyIntro) => applyPatch({ whyIntro })}
                    placeholder="Introducción"
                    style={{ opacity: 0.74, marginTop: 16, fontSize: 17 }}
                  />
                )}
                <div className="why-list">
                  {(c.whyPoints ?? []).map((p, i) => (
                    <div className="why-item" key={i}>
                      <span className="check">
                        <Check />
                      </span>
                      <div>
                        <InlineEdit
                          as="h4"
                          enabled={inline}
                          value={p.title}
                          onChange={(v) => updateWhy(i, "title", v)}
                          placeholder="Título del punto"
                        />
                        <InlineEdit
                          as="p"
                          enabled={inline}
                          multiline
                          value={p.description}
                          onChange={(v) => updateWhy(i, "description", v)}
                          placeholder="Descripción"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <InlineAddButton
                  enabled={inline}
                  onClick={() =>
                    applyPatch({
                      whyPoints: [...(c.whyPoints ?? []), { ...EMPTY_WHY }],
                    })
                  }
                >
                  + Añadir punto
                </InlineAddButton>
              </div>
              {(c.whyImage || inline) && (
                <div className="why-media">
                  <InlineImage
                    enabled={inline}
                    src={c.whyImage ?? ""}
                    fallback={HERO_FALLBACK_IMAGE}
                    alt="Ambiente del comedor"
                    onChange={(whyImage) => applyPatch({ whyImage })}
                  />
                </div>
              )}
            </div>
          </section>
          </SectionWrap>
        )}

        {showVenueBlock && (
          <SectionWrap
            id="venue"
            label="Lugar"
            editMode={editMode}
            activeSection={activeSection}
            onSectionClick={onSectionClick}
          >
          <section className="section" id="fechas" style={{ paddingTop: 0 }}>
            <div className="wrap venue-grid">
              {(c.venueImage || inline) && (
                <div className="venue-media">
                  <InlineImage
                    enabled={inline}
                    src={c.venueImage ?? ""}
                    fallback={HERO_FALLBACK_IMAGE}
                    alt={c.venueTitle ?? "Restaurante"}
                    onChange={(venueImage) => applyPatch({ venueImage })}
                  />
                </div>
              )}
              <div className="dates-card">
                <span className="eyebrow">Fecha y lugar</span>
                <h3 style={{ marginTop: 14 }}>
                  <InlineEdit
                    as="span"
                    enabled={inline}
                    value={
                      c.venueTitle ?? `Restaurante en el centro de ${city}`
                    }
                    onChange={(venueTitle) => applyPatch({ venueTitle })}
                    placeholder="Nombre del local"
                  />
                </h3>
                {(c.venueNote || inline) && (
                  <div className="venue-line">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                    <InlineEdit
                      as="span"
                      enabled={inline}
                      value={c.venueNote ?? ""}
                      onChange={(venueNote) => applyPatch({ venueNote })}
                      placeholder="Nota de ubicación"
                    />
                  </div>
                )}
                {event && (
                  <div className="date-list">
                    <div className={`date-row${eventFull ? " full" : ""}`}>
                      <div className="dl">
                        <div>
                          <div className="ddate">{event.label}</div>
                          <div className="dslots">
                            {eventFull ? (
                              "Completo"
                            ) : (
                              <>
                                {event.time}
                                {" · "}
                                <InlineEdit
                                  as="span"
                                  enabled={inline}
                                  value={c.slotsLabel ?? event.slotsLabel ?? "plazas disponibles"}
                                  onChange={(slotsLabel) =>
                                    applyPatch({ slotsLabel })
                                  }
                                  placeholder="plazas disponibles"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {eventFull ? (
                        <span className="pill">Agotado</span>
                      ) : (
                        <a
                          className={`pill${event.status === "low" ? " low" : ""}`}
                          href="#reservar"
                        >
                          {event.status === "low" ? "Últimas plazas" : "Reservar"}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          </SectionWrap>
        )}

        <section className="section reserve" id="reservar">
          <div className="wrap reserve-grid">
            <div className="reserve-copy">
              <p className="reserve-kicker">Solicita tu plaza</p>
              <p className="lede">Es gratis y no necesitas tarjeta.</p>
              <ul className="reserve-points">
                <li>
                  <span className="check">
                    <Check />
                  </span>{" "}
                  Confirmación por teléfono
                </li>
                <li>
                  <span className="check">
                    <Check />
                  </span>{" "}
                  Menú completo y bebidas incluidos
                </li>
              </ul>
            </div>

            {preview ? (
              <div className="form-card" style={{ pointerEvents: "none", opacity: 0.92 }}>
                <div className="form-success show">
                  <h3>Vista previa del chat</h3>
                  <p>
                    El formulario de reserva es fijo. Los visitantes completan
                    nombre, teléfono y tipo de asistencia aquí.
                  </p>
                </div>
              </div>
            ) : event && !eventFull ? (
              <ChatReserve
                landingId={landing.id}
                city={city}
                eventDate={event.isoDate}
                dateLabel={event.dateLabel}
              />
            ) : (
              <div className="form-card">
                <div className="form-success show">
                  <h3>{eventFull ? "Plazas agotadas" : "Reservas próximamente"}</h3>
                  <p>
                    {eventFull
                      ? `Este evento ya no admite nuevas solicitudes. Sigue atento a la home para el próximo evento en ${city}.`
                      : "Estamos preparando la fecha de este evento. Vuelve pronto o contacta con nosotros."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {showFaq && (
          <SectionWrap
            id="faq"
            label="FAQ"
            editMode={editMode}
            activeSection={activeSection}
            onSectionClick={onSectionClick}
          >
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
                {(c.faqs ?? []).map((f, i) => (
                  <details className="faq-item" key={i} open={inline || undefined}>
                    <summary>
                      <InlineEdit
                        as="span"
                        enabled={inline}
                        value={f.q}
                        onChange={(v) => updateFaq(i, "q", v)}
                        placeholder="Pregunta"
                      />{" "}
                      <span className="plus" />
                    </summary>
                    <div className="answer">
                      <InlineEdit
                        as="span"
                        enabled={inline}
                        multiline
                        value={f.a}
                        onChange={(v) => updateFaq(i, "a", v)}
                        placeholder="Respuesta"
                      />
                    </div>
                  </details>
                ))}
              </div>
              <InlineAddButton
                enabled={inline}
                onClick={() =>
                  applyPatch({ faqs: [...(c.faqs ?? []), { ...EMPTY_FAQ }] })
                }
              >
                + Añadir pregunta
              </InlineAddButton>
            </div>
          </section>
          </SectionWrap>
        )}

        <SectionWrap
          id="testimonials"
          label="Testimonios"
          editMode={editMode}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        >
        <TestimonialsSection
          testimonials={testimonials}
          title={`Lo que dicen quienes ya vivieron un evento en ${city}`}
          subtitle="Experiencias reales de comensales que ya se sentaron a la mesa con Neventia."
        />
        </SectionWrap>

        <SectionWrap
          id="gallery"
          label="Galería"
          editMode={editMode}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        >
        <ExperienceScroll
          city={city}
          subtitle={
            c.gallery && c.gallery.length > 0
              ? `Mesa cuidada, buena compañía y buen producto. Un anticipo de lo que te espera en ${city}.`
              : undefined
          }
          steps={
            c.gallery && c.gallery.length > 0
              ? buildExperienceStepsFromGallery(c.gallery)
              : undefined
          }
        />
        </SectionWrap>

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
              <Link className="brand" href={preview ? "#" : "/"}>
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
                <Link href={LEGAL_LINKS.avisoLegal}>Aviso legal</Link>
                <Link href={LEGAL_LINKS.privacidad}>Política de privacidad</Link>
                <Link href={LEGAL_LINKS.cookies}>Política de cookies</Link>
                <CookiePreferencesButton variant="site" />
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
          Solicita tu plaza gratis · {freePrice}
        </a>
      </div>
    </>
  );
}
