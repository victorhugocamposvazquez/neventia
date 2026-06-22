"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_KEY,
  hasMarketingConsent,
  parseConsent,
} from "@/lib/cookie-consent";

export function MetaPixel({ pixelId }: { pixelId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      const consent = parseConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
      setEnabled(hasMarketingConsent(consent));
    };

    sync();
    window.addEventListener("neventia:cookie-consent", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("neventia:cookie-consent", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <Script id={`meta-pixel-${pixelId}`} strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');`}
    </Script>
  );
}
