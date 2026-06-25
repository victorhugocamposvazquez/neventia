"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { LandingPreview } from "@/components/admin/LandingPreview";
import {
  isSectionVisible,
  LANDING_SECTIONS,
  LandingSectionPanel,
  type LandingMeta,
  type LandingSectionId,
} from "@/components/admin/landing-section-panels";
import type { Landing, LandingContent } from "@/lib/types";
import "./landing-builder.css";

type Props = {
  landing: Landing;
  content: LandingContent;
  onContentChange: (content: LandingContent) => void;
  meta: LandingMeta;
  onMetaChange: (meta: Partial<LandingMeta>) => void;
};

export function LandingVisualEditor({
  landing,
  content,
  onContentChange,
  meta,
  onMetaChange,
}: Props) {
  const [activeSection, setActiveSection] = useState<LandingSectionId>("hero");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("preview");
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const previewInnerRef = useRef<HTMLDivElement>(null);

  const draftLanding = useMemo((): Landing => {
    return {
      ...landing,
      name: meta.name,
      slug: meta.slug,
      status: meta.status as Landing["status"],
      city: meta.city || null,
      region: meta.region || null,
      event_date: meta.eventDate
        ? new Date(meta.eventDate).toISOString()
        : null,
      meta_pixel_id: meta.metaPixel || null,
      content,
    };
  }, [landing, meta, content]);

  const selectSection = useCallback((id: string) => {
    const sectionId = id as LandingSectionId;
    setActiveSection(sectionId);
    setMobileTab("edit");
  }, []);

  const scrollPreviewToSection = (id: LandingSectionId) => {
    setActiveSection(id);
    setMobileTab("preview");
    requestAnimationFrame(() => {
      previewInnerRef.current
        ?.querySelector(`[data-landing-section="${id}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="le-builder">
      <div className="le-toolbar lg:hidden">
        <div className="le-toolbar-tabs">
          <button
            type="button"
            className={`le-toolbar-tab${mobileTab === "edit" ? " is-active" : ""}`}
            onClick={() => setMobileTab("edit")}
          >
            Editar
          </button>
          <button
            type="button"
            className={`le-toolbar-tab${mobileTab === "preview" ? " is-active" : ""}`}
            onClick={() => setMobileTab("preview")}
          >
            Vista previa
          </button>
        </div>
      </div>

      <div className="le-layout">
        <aside
          className={`le-sidebar${mobileTab === "preview" ? " le-hidden-mobile" : ""}`}
        >
          <nav className="le-sidebar-nav" aria-label="Secciones de la landing">
            {LANDING_SECTIONS.map((section) => {
              const hidden =
                section.id !== "settings" &&
                !isSectionVisible(section.id, content) &&
                !["hero", "event", "steps", "why", "venue", "contact"].includes(
                  section.id
                );

              return (
                <button
                  key={section.id}
                  type="button"
                  className={`le-nav-item${activeSection === section.id ? " is-active" : ""}${hidden ? " is-muted" : ""}`}
                  onClick={() => {
                    setActiveSection(section.id);
                    if (section.id !== "settings") {
                      scrollPreviewToSection(section.id);
                    }
                  }}
                >
                  <span className="le-nav-dot" aria-hidden />
                  {section.label}
                  {hidden && " · oculta"}
                </button>
              );
            })}
          </nav>

          <div className="le-sidebar-panel">
            <LandingSectionPanel
              section={activeSection}
              content={content}
              onChange={onContentChange}
              meta={meta}
              onMetaChange={onMetaChange}
            />
          </div>
        </aside>

        <div
          className={`le-canvas${mobileTab === "edit" ? " le-hidden-mobile" : ""}`}
        >
          <div className="le-canvas-bar">
            Clic en textos e imágenes para editar · panel lateral para listas
          </div>
          <div className="le-preview-scroll" ref={previewScrollRef}>
            <LandingPreview
              ref={previewInnerRef}
              landing={draftLanding}
              activeSection={activeSection}
              onSectionClick={selectSection}
              onContentChange={onContentChange}
              onMetaChange={(patch) => onMetaChange(patch)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
