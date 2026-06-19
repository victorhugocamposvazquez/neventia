"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_EXPERIENCE_STEPS,
  type ExperienceStep,
} from "@/lib/experience-steps";

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
          <div className="exp-scroll-media-col" aria-hidden="true">
            <div className="exp-scroll-sticky">
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
