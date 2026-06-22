import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/site/LegalLayout";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Información sobre el tratamiento de datos personales en Neventia conforme al RGPD.",
};

const UPDATED = "19 de junio de 2026";

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de privacidad" updatedAt={UPDATED}>
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <ul>
          <li>
            <strong>Responsable:</strong> {LEGAL.owner}
          </li>
          <li>
            <strong>Correo de contacto:</strong>{" "}
            <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Datos que tratamos</h2>
        <p>Podemos tratar las siguientes categorías de datos:</p>
        <ul>
          <li>
            <strong>Datos identificativos y de contacto:</strong> nombre,
            teléfono y correo electrónico.
          </li>
          <li>
            <strong>Datos de reserva:</strong> fecha preferida, número de
            comensales y tipo de asistencia.
          </li>
          <li>
            <strong>Datos de navegación:</strong> dirección IP, identificadores
            de cookies y parámetros UTM cuando aceptas su uso.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalidades y legitimación</h2>
        <ul>
          <li>
            <strong>Gestionar tu reserva</strong> en un evento de {LEGAL.brand}{" "}
            (ejecución de medidas precontractuales y contractual).
          </li>
          <li>
            <strong>Contactarte</strong> para confirmar asistencia, resolver
            incidencias o informarte sobre el evento (interés legítimo y
            consentimiento cuando proceda).
          </li>
          <li>
            <strong>Medir campañas publicitarias</strong> y mejorar la
            experiencia del sitio, solo si aceptas cookies no esenciales
            (consentimiento).
          </li>
          <li>
            <strong>Cumplir obligaciones legales</strong> aplicables.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Conservación de los datos</h2>
        <p>
          Conservaremos tus datos mientras sea necesario para gestionar la
          reserva y la relación derivada del evento, y posteriormente durante
          los plazos exigidos por la legislación o hasta que solicites su
          supresión cuando sea legalmente posible.
        </p>
      </section>

      <section>
        <h2>5. Destinatarios</h2>
        <p>Tus datos podrán comunicarse a:</p>
        <ul>
          <li>
            <strong>Proveedores tecnológicos</strong> que nos prestan servicios
            de alojamiento, base de datos o analítica (por ejemplo, Supabase o
            Meta), con las garantías contractuales oportunas.
          </li>
          <li>
            <strong>Patrocinadores del evento</strong>, únicamente cuando sea
            necesario para la organización de la experiencia y con base en tu
            participación voluntaria en el evento.
          </li>
          <li>
            <strong>Autoridades públicas</strong>, cuando exista obligación
            legal.
          </li>
        </ul>
        <p>No vendemos tus datos personales a terceros.</p>
      </section>

      <section>
        <h2>6. Transferencias internacionales</h2>
        <p>
          Algunos proveedores pueden estar ubicados fuera del Espacio Económico
          Europeo. En esos casos, se aplicarán las garantías previstas en el
          RGPD, como cláusulas contractuales tipo u otras medidas equivalentes.
        </p>
      </section>

      <section>
        <h2>7. Tus derechos</h2>
        <p>Puedes ejercer los siguientes derechos:</p>
        <ul>
          <li>Acceso, rectificación y supresión.</li>
          <li>Limitación u oposición al tratamiento.</li>
          <li>Portabilidad, cuando proceda.</li>
          <li>Retirar el consentimiento en cualquier momento.</li>
        </ul>
        <p>
          Para ejercerlos, escríbenos a{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> indicando tu
          solicitud y acreditando tu identidad si fuera necesario.
        </p>
        <p>
          También puedes presentar una reclamación ante la Agencia Española de
          Protección de Datos (www.aepd.es).
        </p>
      </section>

      <section>
        <h2>8. Menores de edad</h2>
        <p>
          Los servicios de {LEGAL.brand} están dirigidos a personas adultas. No
          recopilamos de forma consciente datos de menores sin el consentimiento
          de sus representantes legales.
        </p>
      </section>

      <section>
        <h2>9. Cookies</h2>
        <p>
          Para más información sobre el uso de cookies y cómo gestionarlas,
          consulta nuestra{" "}
          <Link href={LEGAL_LINKS.cookies}>política de cookies</Link>.
        </p>
      </section>
    </LegalLayout>
  );
}
