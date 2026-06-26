"use client";

import { useCallback, useEffect, useId, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
};

export function LegalModal({
  open,
  onClose,
  title,
  updatedAt,
  children,
}: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => onClose(), [onClose]);

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

  if (!open) return null;

  return (
    <div
      className="legal-modal"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="legal-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className="legal-modal-head">
          <div>
            <p className="legal-modal-eyebrow">Información legal</p>
            <h3 id={titleId}>{title}</h3>
            {updatedAt && (
              <p className="legal-modal-updated">
                Última actualización: {updatedAt}
              </p>
            )}
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="legal-modal-close"
            aria-label="Cerrar"
            onClick={close}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="legal-modal-body legal-prose">{children}</div>
      </div>
    </div>
  );
}
