"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_KEY,
  parseConsent,
  saveConsent,
  type CookieConsentLevel,
} from "@/lib/cookie-consent";
import { LEGAL_LINKS } from "@/lib/legal";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = parseConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
    setVisible(!stored);
  }, []);

  const accept = (level: CookieConsentLevel) => {
    saveConsent(level);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <div className="cookie-banner-inner wrap">
        <div className="cookie-banner-copy">
          <p id="cookie-banner-title" className="cookie-banner-title">
            Usamos cookies
          </p>
          <p className="cookie-banner-text">
            Utilizamos cookies técnicas necesarias para el funcionamiento del
            sitio y, si lo aceptas, cookies de medición y publicidad (como Meta
            Pixel) para entender el rendimiento de nuestras campañas. Puedes
            consultar más información en nuestra{" "}
            <Link href={LEGAL_LINKS.cookies}>política de cookies</Link> y{" "}
            <Link href={LEGAL_LINKS.privacidad}>política de privacidad</Link>.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="btn btn-ghost cookie-btn"
            onClick={() => accept("essential")}
          >
            Solo necesarias
          </button>
          <button
            type="button"
            className="btn btn-primary cookie-btn"
            onClick={() => accept("all")}
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
