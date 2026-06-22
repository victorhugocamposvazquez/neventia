import Link from "next/link";
import { CookiePreferencesButton } from "@/components/site/CookiePreferencesButton";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";

function BrandLogo({ stroke = "#142E23" }: { stroke?: string }) {
  return (
    <svg className="logo" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M 48.94 25.90 A 18 18 0 1 1 38.10 15.06"
        fill="none"
        stroke={stroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="44.7" cy="19.3" r="5.5" fill="#6CAE8C" />
    </svg>
  );
}

export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="site-header scrolled">
        <div className="wrap header-inner">
          <Link className="brand" href="/" aria-label="Neventia inicio">
            <BrandLogo />
            <span className="name">neventia</span>
          </Link>
          <Link className="btn btn-ghost header-cta" href="/">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="legal-page">
        <div className="wrap legal-page-inner">
          <span className="eyebrow">Información legal</span>
          <h1>{title}</h1>
          <p className="legal-updated">Última actualización: {updatedAt}</p>
          <div className="legal-prose">{children}</div>
          <nav className="legal-nav" aria-label="Enlaces legales relacionados">
            <Link href={LEGAL_LINKS.avisoLegal}>Aviso legal</Link>
            <Link href={LEGAL_LINKS.privacidad}>Política de privacidad</Link>
            <Link href={LEGAL_LINKS.cookies}>Política de cookies</Link>
            <CookiePreferencesButton variant="mobile" />
          </nav>
        </div>
      </main>

      <footer className="site-footer legal-footer">
        <div className="wrap footer-bottom">
          <span>© 2026 {LEGAL.brand}. Todos los derechos reservados.</span>
          <span>
            <Link href={LEGAL_LINKS.privacidad}>Privacidad</Link>
            {" · "}
            <Link href={LEGAL_LINKS.cookies}>Cookies</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
