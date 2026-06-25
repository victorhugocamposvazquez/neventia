"use client";

import { forwardRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { LandingView } from "@/components/landing/LandingView";
import type { Landing } from "@/lib/types";
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
};

export const LandingPreview = forwardRef<HTMLDivElement, Props>(
  function LandingPreview({ landing, activeSection, onSectionClick }, ref) {
    return (
      <div ref={ref} className={`le-preview-root ${spaceGrotesk.variable}`}>
        <p className="le-preview-note">
          Haz clic en cualquier bloque de la página para editarlo. Los cambios
          se ven al instante; recuerda guardar arriba.
        </p>
        <div className="le-preview-frame nv-site">
          <LandingView
            landing={landing}
            editMode
            preview
            activeSection={activeSection}
            onSectionClick={onSectionClick}
          />
        </div>
      </div>
    );
  }
);
