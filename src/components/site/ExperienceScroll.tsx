"use client";

import { useEffect, useRef, useState } from "react";

export type ExperienceStep = {
  num: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const DEFAULT_EXPERIENCE_STEPS: ExperienceStep[] = [
  {
    num: "01",
    tag: "Llegada",
    title: "Te reciben con tu plaza confirmada",
    description:
      "Llegas al restaurante, registran tu asistencia y te orientan. La mesa ya está montada, el ambiente preparado y la expectativa, en el aire.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=75",
    alt: "Comedor elegante preparado para el evento",
  },
  {
    num: "02",
    tag: "Menú de autor",
    title: "Plato a plato, sin prisas",
    description:
      "Entrante, principal y postre con producto de calidad y servicio impecable. Tiempo para saborear, conversar y disfrutar de un menú completo — por nuestra cuenta.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=75",
    alt: "Plato de autor servido en mesa",
  },
  {
    num: "03",
    tag: "Mesa compartida",
    title: "Buena comida que une",
    description:
      "Conversación, risas y brindis entre personas que ayer no se conocían. Ese es el espíritu Neventia: una tarde memorable en buena compañía.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=75",
    alt: "Brindis entre comensales",
  },
  {
    num: "04",
    tag: "Presentación",
    title: "Conoces al patrocinador, sin presión",
    description:
      "Tras la comida, una charla breve y cercana sobre los productos del colaborador. Información útil, tono amable y cero obligación de comprar nada.",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=75",
    alt: "Comensales escuchando la presentación",
  },
  {
    num: "05",
    tag: "Hasta pronto",
    title: "Te marchas con ganas de repetir",
    description:
      "Hasta pronto: agradecimientos y la invitación al siguiente evento. Habrás comido de lujo, conocido gente estupenda y, lo mejor: sin pagar nada.",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=75",
    alt: "Cierre del evento",
  },
];

type Props = {
  subtitle?: string;
  steps?: ExperienceStep[];
  city?: string;
};

export function ExperienceScroll({
  subtitle,
  steps = DEFAULT_EXPERIENCE_STEPS,
  city,
}: Props) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) setActive(index);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length]);

  const lede =
    subtitle ??
    (city
      ? `De la reserva al brindis final: así es una tarde Neventia en ${city}.`
      : "De la reserva al brindis final: cinco momentos que definen una tarde Neventia.");

  return (
    <section className="section experience-scroll" id="experiencia">
      <div className="wrap">
        <div className="section-head center exp-scroll-head">
          <span className="eyebrow on-dark">La experiencia</span>
          <h2>Así se vive una experiencia Neventia</h2>
          <p>{lede}</p>
        </div>

        <div className="exp-scroll-layout">
          <div className="exp-scroll-sticky" aria-hidden="true">
            <div className="exp-scroll-visual">
              {steps.map((step, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={step.num}
                  className={i === active ? "active" : undefined}
                  src={step.image}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
              <div className="exp-scroll-frame">
                <span className="exp-scroll-counter">
                  {steps[active]?.num}
                  <small> / {steps.length.toString().padStart(2, "0")}</small>
                </span>
                <span className="exp-scroll-tag">{steps[active]?.tag}</span>
              </div>
            </div>
            <div className="exp-scroll-track" role="presentation">
              {steps.map((step, i) => (
                <span
                  key={step.num}
                  className={
                    i < active ? "done" : i === active ? "current" : undefined
                  }
                />
              ))}
            </div>
          </div>

          <div className="exp-scroll-steps">
            {steps.map((step, i) => (
              <article
                key={step.num}
                className={`exp-scroll-step${i === active ? " active" : ""}`}
                data-index={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <div className="exp-scroll-step-mobile-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={step.image} alt={step.alt} loading="lazy" />
                  <span className="exp-scroll-step-badge">{step.tag}</span>
                </div>
                <div className="exp-scroll-step-body">
                  <span className="exp-scroll-step-num">{step.num}</span>
                  <span className="exp-scroll-step-tag">{step.tag}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function buildExperienceStepsFromGallery(
  gallery: string[],
): ExperienceStep[] {
  return DEFAULT_EXPERIENCE_STEPS.map((step, i) => ({
    ...step,
    image: gallery[i] ?? step.image,
  }));
}
