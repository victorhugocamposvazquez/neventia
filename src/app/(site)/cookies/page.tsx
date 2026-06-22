import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/site/LegalLayout";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Información sobre el uso de cookies en el sitio web de Neventia.",
};

const UPDATED = "19 de junio de 2026";

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de cookies" updatedAt={UPDATED}>
      <section>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que se almacenan en tu dispositivo
          cuando visitas un sitio web. Permiten recordar información sobre tu
          visita y mejorar tu experiencia, así como analizar el uso del sitio.
        </p>
      </section>

      <section>
        <h2>2. ¿Qué cookies utilizamos?</h2>
        <p>En {LEGAL.brand} podemos utilizar las siguientes categorías:</p>

        <h3>Cookies técnicas o necesarias</h3>
        <p>
          Son imprescindibles para el funcionamiento básico del sitio, la
          seguridad y la gestión de preferencias como tu elección sobre cookies.
          No requieren consentimiento.
        </p>

        <h3>Cookies de medición y publicidad</h3>
        <p>
          Solo se activan si pulsas <strong>«Aceptar todas»</strong> en el
          banner de cookies. Nos ayudan a medir visitas y el rendimiento de
          campañas en plataformas como Meta (Facebook/Instagram).
        </p>

        <table className="legal-table">
          <thead>
            <tr>
              <th>Cookie / tecnología</th>
              <th>Proveedor</th>
              <th>Finalidad</th>
              <th>Duración orientativa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>neventia-cookie-consent</td>
              <td>{LEGAL.brand}</td>
              <td>Guardar tu preferencia de cookies</td>
              <td>Persistente (local)</td>
            </tr>
            <tr>
              <td>_fbp, fr y similares</td>
              <td>Meta Platforms</td>
              <td>Medición publicitaria y remarketing</td>
              <td>Según proveedor</td>
            </tr>
            <tr>
              <td>Cookies de sesión de autenticación</td>
              <td>Supabase</td>
              <td>Acceso seguro al backoffice (solo administración)</td>
              <td>Sesión</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>3. Base legal</h2>
        <ul>
          <li>
            <strong>Cookies necesarias:</strong> interés legítimo y necesidad
            técnica.
          </li>
          <li>
            <strong>Cookies de medición/publicidad:</strong> consentimiento
            expreso del usuario.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Cómo gestionar o revocar el consentimiento</h2>
        <p>Puedes:</p>
        <ul>
          <li>
            Usar el banner de cookies la primera vez que visitas el sitio.
          </li>
          <li>
            Configurar tu navegador para bloquear o eliminar cookies.
          </li>
          <li>
            Borrar el almacenamiento local del sitio para que el banner vuelva a
            mostrarse.
          </li>
        </ul>
        <p>
          Si eliges <strong>«Solo necesarias»</strong>, no cargaremos cookies de
          medición o publicidad como Meta Pixel.
        </p>
      </section>

      <section>
        <h2>5. Más información</h2>
        <p>
          Para conocer cómo tratamos tus datos personales, consulta nuestra{" "}
          <Link href={LEGAL_LINKS.privacidad}>política de privacidad</Link>.
        </p>
        <p>
          Si tienes dudas, escríbenos a{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
