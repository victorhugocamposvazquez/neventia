import Link from "next/link";
import { LEGAL, LEGAL_LINKS } from "@/lib/legal";

type Props = {
  /** En modal: enlaces legales abren en pestaña nueva para no cerrar el chat */
  inModal?: boolean;
};

export function PrivacidadContent({ inModal }: Props) {
  const linkProps = inModal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <>
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
        <p>
          Si envías el formulario de solicitud de plaza, además de los fines
          indicados a continuación, <strong>aceptas expresamente</strong> lo
          siguiente:
        </p>
        <ul>
          <li>
            Recibir el <strong>ofrecimiento de productos y servicios</strong> de{" "}
            {LEGAL.brand} y de <strong>empresas colaboradoras</strong> vinculadas
            al evento o a la experiencia.
          </li>
          <li>
            Que podamos contactarte mediante{" "}
            <strong>llamadas comerciales</strong> y/o proponerte{" "}
            <strong>citas presenciales</strong> relacionadas con dichos productos
            y servicios.
          </li>
        </ul>
        <p>Tratamos tus datos, entre otras finalidades, para:</p>
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
            <strong>Enviarte comunicaciones comerciales</strong>, ofertas de
            productos y servicios propios o de colaboradores, y gestionar
            llamadas comerciales o citas presenciales, cuando hayas prestado tu
            consentimiento al enviar el formulario.
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
          reserva y la relación derivada del evento, incluidas las comunicaciones
          comerciales, llamadas o citas presenciales que hayas aceptado, y
          posteriormente durante los plazos exigidos por la legislación o hasta
          que solicites su supresión o te opongas al tratamiento cuando sea
          legalmente posible.
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
            <strong>Patrocinadores y empresas colaboradoras</strong>, cuando sea
            necesario para la organización del evento, la prestación de
            productos o servicios ofrecidos, o el envío de comunicaciones
            comerciales, llamadas o citas presenciales que hayas aceptado al
            enviar el formulario.
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
          {inModal ? (
            <a href={LEGAL_LINKS.cookies} {...linkProps}>
              política de cookies
            </a>
          ) : (
            <Link href={LEGAL_LINKS.cookies}>política de cookies</Link>
          )}
          .
        </p>
      </section>
    </>
  );
}
