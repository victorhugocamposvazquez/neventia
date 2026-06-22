"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_BANNER_OPEN_EVENT,
  COOKIE_CONSENT_KEY,
  parseConsent,
  saveConsent,
  type CookieConsentLevel,
} from "@/lib/cookie-consent";
import { LEGAL_LINKS } from "@/lib/legal";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      const stored = parseConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
      setVisible(!stored);
    };
    const open = () => setVisible(true);

    sync();
    window.addEventListener(COOKIE_BANNER_OPEN_EVENT, open);
    return () => window.removeEventListener(COOKIE_BANNER_OPEN_EVENT, open);
  }, []);

  const accept = (level: CookieConsentLevel) => {
    saveConsent(level);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <div className="cookie-banner-inner">
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
            className="cookie-btn cookie-btn-ghost"
            onClick={() => accept("essential")}
          >
            Solo necesarias
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-primary"
            onClick={() => accept("all")}
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
