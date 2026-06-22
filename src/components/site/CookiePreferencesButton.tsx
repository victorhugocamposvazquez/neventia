"use client";

import { openCookieBanner } from "@/lib/cookie-consent";

type Variant = "site" | "admin" | "mobile";

export function CookiePreferencesButton({ variant = "site" }: { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`cookie-prefs-trigger cookie-prefs-trigger--${variant}`}
      onClick={openCookieBanner}
    >
      Gestionar cookies
    </button>
  );
}
