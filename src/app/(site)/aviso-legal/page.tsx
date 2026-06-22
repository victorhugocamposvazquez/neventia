import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal y condiciones de uso del sitio web de Neventia.",
};

const UPDATED = "19 de junio de 2026";

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso legal" updatedAt={UPDATED}>
      <section>
        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
          Servicios de la Sociedad de la Información y de Comercio Electrónico
          (LSSI-CE), se informa que el titular de este sitio web es:
        </p>
        <ul>
          <li>
            <strong>Titular:</strong> {LEGAL.owner}
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
          </li>
          <li>
            <strong>Sitio web:</strong> {LEGAL.siteUrl}
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Objeto</h2>
        <p>
          El presente aviso legal regula el acceso y uso del sitio web de{" "}
          {LEGAL.brand}, destinado a informar sobre experiencias gastronómicas y
          eventos, así como a facilitar la reserva de plazas en dichos eventos.
        </p>
        <p>
          El acceso al sitio implica la aceptación de las condiciones aquí
          recogidas. Si no estás de acuerdo, te rogamos que no utilices el
          sitio.
        </p>
      </section>

      <section>
        <h2>3. Condiciones de uso</h2>
        <p>El usuario se compromete a:</p>
        <ul>
          <li>
            Hacer un uso adecuado, lícito y conforme a la buena fe del sitio y
            de sus contenidos.
          </li>
          <li>
            No realizar actividades fraudulentas, ilícitas o que puedan dañar la
            imagen, los intereses o los derechos de {LEGAL.brand} o de terceros.
          </li>
          <li>
            Facilitar datos veraces al completar formularios de reserva o
            contacto.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Los contenidos del sitio (textos, imágenes, diseño, logotipos, código
          fuente y demás elementos) son propiedad de {LEGAL.brand} o de terceros
          que han autorizado su uso, y están protegidos por la normativa de
          propiedad intelectual e industrial.
        </p>
        <p>
          Queda prohibida su reproducción, distribución o transformación sin
          autorización expresa del titular.
        </p>
      </section>

      <section>
        <h2>5. Responsabilidad</h2>
        <p>
          {LEGAL.brand} no se hace responsable de los daños derivados del mal uso
          del sitio, de interrupciones del servicio por causas ajenas a su
          control ni de los contenidos enlazados a sitios de terceros.
        </p>
        <p>
          La información publicada sobre eventos, fechas, menús o disponibilidad
          puede actualizarse. En caso de discrepancia, prevalecerá la
          comunicación directa con el usuario tras la reserva.
        </p>
      </section>

      <section>
        <h2>6. Enlaces externos</h2>
        <p>
          Este sitio puede incluir enlaces a páginas de terceros. {LEGAL.brand}{" "}
          no asume responsabilidad sobre sus contenidos ni sobre sus políticas de
          privacidad.
        </p>
      </section>

      <section>
        <h2>7. Legislación aplicable</h2>
        <p>
          Las relaciones derivadas del uso de este sitio se regirán por la
          legislación española. Para la resolución de conflictos, las partes se
          someterán a los juzgados y tribunales que correspondan conforme a la
          normativa vigente.
        </p>
      </section>
    </LegalLayout>
  );
}
