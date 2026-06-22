"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  testimonialInitials,
  type Testimonial,
} from "@/lib/testimonials";

const PREVIEW_COUNT = 6;

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="testi">
      <div className="stars" aria-hidden="true">
        ★★★★★
      </div>
      <p>&ldquo;{item.quote}&rdquo;</p>
      <div className="who">
        <span className="av" aria-hidden="true">
          {testimonialInitials(item.author)}
        </span>
        <div>
          <div className="nm">{item.author}</div>
          {item.city ? <div className="ct">{item.city}</div> : null}
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection({
  testimonials,
  title = "Lo que dicen quienes ya se sentaron a la mesa",
  subtitle,
}: {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const preview = testimonials.slice(0, PREVIEW_COUNT);
  const hasMore = testimonials.length > PREVIEW_COUNT;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <section className="section" id="opiniones">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Opiniones</span>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
          <p className="testi-count">
            {testimonials.length} valoraciones de comensales reales
          </p>
        </div>

        <div className="testi-grid">
          {preview.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {hasMore && (
          <div className="testi-more-wrap">
            <button
              type="button"
              className="btn btn-ghost testi-more-btn"
              onClick={() => setOpen(true)}
            >
              Ver las {testimonials.length} opiniones
            </button>
          </div>
        )}
      </div>

      {open && (
        <div
          className="testi-modal"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            className="testi-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={panelRef}
          >
            <div className="testi-modal-head">
              <div>
                <p className="testi-modal-eyebrow">Opiniones</p>
                <h3 id={titleId}>Lo que dicen nuestros comensales</h3>
                <p className="testi-modal-sub">
                  {testimonials.length} experiencias compartidas por personas que
                  ya asistieron a un evento Neventia.
                </p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="testi-modal-close"
                aria-label="Cerrar opiniones"
                onClick={close}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="testi-modal-body">
              <div className="testi-modal-grid">
                {testimonials.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
