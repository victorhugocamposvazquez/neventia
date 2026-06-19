export type ExperienceStep = {
  num: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const DEFAULT_EXPERIENCE_STEPS: ExperienceStep[] = [
  {
    num: "01",
    tag: "Llegada",
    title: "Te reciben con tu plaza confirmada",
    description:
      "Llegas al restaurante, registran tu asistencia y te orientan. La mesa ya está montada, el ambiente preparado y la expectativa, en el aire.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=75",
    alt: "Comedor elegante preparado para el evento",
  },
  {
    num: "02",
    tag: "Menú de autor",
    title: "Plato a plato, sin prisas",
    description:
      "Entrante, principal y postre con producto de calidad y servicio impecable. Tiempo para saborear, conversar y disfrutar de un menú completo — por nuestra cuenta.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=75",
    alt: "Plato de autor servido en mesa",
  },
  {
    num: "03",
    tag: "Mesa compartida",
    title: "Buena comida que une",
    description:
      "Conversación, risas y brindis entre personas que ayer no se conocían. Ese es el espíritu Neventia: una tarde memorable en buena compañía.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=75",
    alt: "Brindis entre comensales",
  },
  {
    num: "04",
    tag: "Presentación",
    title: "Conoces al patrocinador, sin presión",
    description:
      "Tras la comida, una charla breve y cercana sobre los productos del colaborador. Información útil, tono amable y cero obligación de comprar nada.",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=75",
    alt: "Comensales escuchando la presentación",
  },
  {
    num: "05",
    tag: "Hasta pronto",
    title: "Te marchas con ganas de repetir",
    description:
      "Hasta pronto: agradecimientos y la invitación al siguiente evento. Habrás comido de lujo, conocido gente estupenda y, lo mejor: sin pagar nada.",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=75",
    alt: "Cierre del evento",
  },
];

export function buildExperienceStepsFromGallery(
  gallery: string[],
): ExperienceStep[] {
  return DEFAULT_EXPERIENCE_STEPS.map((step, i) => ({
    ...step,
    image: gallery[i] ?? step.image,
  }));
}
