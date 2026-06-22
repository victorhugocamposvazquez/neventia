"use client";

import Link from "next/link";
import { CookiePreferencesButton } from "@/components/site/CookiePreferencesButton";
import { LEGAL_LINKS } from "@/lib/legal";

export function AdminLegalFooter({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
  if (variant === "mobile") {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-forest-800/60">
        <Link href={LEGAL_LINKS.privacidad} className="hover:text-forest-950 hover:underline">
          Privacidad
        </Link>
        <Link href={LEGAL_LINKS.cookies} className="hover:text-forest-950 hover:underline">
          Cookies
        </Link>
        <CookiePreferencesButton variant="mobile" />
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">
        Legal
      </p>
      <div className="flex flex-col gap-1.5 text-xs">
        <Link
          href={LEGAL_LINKS.privacidad}
          className="text-white/55 transition hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de privacidad
        </Link>
        <Link
          href={LEGAL_LINKS.cookies}
          className="text-white/55 transition hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de cookies
        </Link>
        <CookiePreferencesButton variant="admin" />
      </div>
    </div>
  );
}
