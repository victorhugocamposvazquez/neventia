export const COOKIE_CONSENT_KEY = "neventia-cookie-consent";
export const COOKIE_CONSENT_VERSION = "1";
export const COOKIE_BANNER_OPEN_EVENT = "neventia:cookie-banner-open";
export const COOKIE_CONSENT_EVENT = "neventia:cookie-consent";

export type CookieConsentLevel = "all" | "essential";

export type CookieConsent = {
  version: string;
  level: CookieConsentLevel;
  at: string;
};

export function parseConsent(raw: string | null): CookieConsent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CookieConsent;
    if (data.version !== COOKIE_CONSENT_VERSION) return null;
    if (data.level !== "all" && data.level !== "essential") return null;
    return data;
  } catch {
    return null;
  }
}

export function hasMarketingConsent(consent: CookieConsent | null): boolean {
  return consent?.level === "all";
}

export function saveConsent(level: CookieConsentLevel): CookieConsent {
  const value: CookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    level,
    at: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }),
    );
  }
  return value;
}

export function openCookieBanner() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT));
  window.dispatchEvent(new CustomEvent(COOKIE_BANNER_OPEN_EVENT));
}
