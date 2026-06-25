"use client";

import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  enabled?: boolean;
  active?: boolean;
  onSelect?: (id: string) => void;
  children: ReactNode;
};

export function EditSectionWrap({
  id,
  label,
  enabled,
  active,
  onSelect,
  children,
}: Props) {
  if (!enabled) return <>{children}</>;

  return (
    <div
      className={`landing-edit-wrap${active ? " is-active" : ""}`}
      data-landing-section={id}
      data-landing-label={label}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          target.closest(
            "a, button, input, textarea, select, details, summary, label"
          )
        ) {
          return;
        }
        e.preventDefault();
        onSelect?.(id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Editar sección: ${label}`}
    >
      <span className="landing-edit-chip">{label}</span>
      {children}
    </div>
  );
}
