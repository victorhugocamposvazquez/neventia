import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { PrivacidadContent } from "@/components/site/legal/PrivacidadContent";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Información sobre el tratamiento de datos personales en Neventia conforme al RGPD.",
};

const UPDATED = "20 de junio de 2026";

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de privacidad" updatedAt={UPDATED}>
      <PrivacidadContent />
    </LegalLayout>
  );
}
