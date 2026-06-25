"use client";

import { forwardRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { LandingView } from "@/components/landing/LandingView";
import type { Landing, LandingContent } from "@/lib/types";
import "@/app/(site)/site.css";
import "./landing-builder.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  landing: Landing;
  activeSection: string | null;
  onSectionClick: (id: string) => void;
  onContentChange: (content: LandingContent) => void;
  onMetaChange: (patch: { city?: string }) => void;
};

export const LandingPreview = forwardRef<HTMLDivElement, Props>(
  function LandingPreview(
    {
      landing,
      activeSection,
      onSectionClick,
      onContentChange,
      onMetaChange,
    },
    ref
  ) {
    return (
      <div ref={ref} className={`le-preview-root ${spaceGrotesk.variable}`}>
        <p className="le-preview-note">
          Haz clic en cualquier texto o imagen para editarlo al instante. El
          panel lateral sirve para listas (platos, FAQ…) y configuración.
          Recuerda guardar arriba.
        </p>
        <div className="le-preview-frame nv-site">
          <LandingView
            landing={landing}
            editMode
            preview
            activeSection={activeSection}
            onSectionClick={onSectionClick}
            onContentChange={onContentChange}
            onMetaChange={onMetaChange}
          />
        </div>
      </div>
    );
  }
);
