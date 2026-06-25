import type { LandingContent } from "./types";

export const LANDING_CONTENT_STARTER: LandingContent = {
  badge: "Evento gastronómico · plazas limitadas",
  headline: "Una comida de autor",
  freePrice: "0€",
  subheadline:
    "Te invitamos a una experiencia gastronómica completa, sin coste y sin compromiso de compra.",
  heroImage: "",
  region: "",
  strip: [
    "Menú completo · entrante, principal, postre y bebida",
    "Sin compromiso de compra",
    "Ven en pareja · ambiente cuidado",
  ],
  stepsIntro: "Reservar tu plaza lleva menos de un minuto.",
  steps: [
    {
      title: "Reserva tu plaza",
      description:
        "Déjanos tus datos en el chat. Las plazas son limitadas.",
    },
    {
      title: "Asiste a la presentación",
      description:
        "Una charla breve de nuestras marcas. Sin compromiso.",
    },
    {
      title: "Disfruta tu comida",
      description: "Un menú completo de autor, gratis.",
    },
  ],
  menuTitle: "Un menú pensado para disfrutar",
  menuIntro: "",
  menu: [],
  menuIncludes: ["Agua", "Vino de la casa", "Café"],
  whyTitle: "¿Por qué es gratis?",
  whyIntro:
    "La comida está patrocinada por marcas que presentan sus productos antes de comer.",
  whyImage: "",
  whyPoints: [
    {
      title: "Cero compromiso de compra",
      description: "Comprar algo es totalmente opcional.",
    },
    {
      title: "Sin coste oculto",
      description: "Menú, bebidas y café incluidos.",
    },
  ],
  venueTitle: "",
  venueNote: "Dirección exacta enviada al confirmar tu plaza.",
  venueImage: "",
  slotsLabel: "plazas disponibles",
  eventStatus: "available",
  gallery: [],
  testimonials: [],
  faqs: [],
  form: {
    title: "Reserva gratuita",
    subtitle: "Completa tus datos y te confirmamos la plaza.",
    ctaText: "Reservar mi plaza gratis",
    successTitle: "¡Plaza reservada!",
    successText: "Te llamaremos en 24-48 h para confirmar.",
  },
  contactPhone: "",
  legal: "",
};

export function mergeLandingContent(
  raw: Partial<LandingContent> | null | undefined
): LandingContent {
  const base = LANDING_CONTENT_STARTER;
  if (!raw) return structuredClone(base);

  return {
    ...base,
    ...raw,
    steps: raw.steps?.length ? raw.steps : base.steps,
    menu: raw.menu ?? base.menu,
    menuIncludes: raw.menuIncludes ?? base.menuIncludes,
    whyPoints: raw.whyPoints?.length ? raw.whyPoints : base.whyPoints,
    gallery: raw.gallery ?? [],
    testimonials: raw.testimonials ?? [],
    faqs: raw.faqs ?? [],
    strip: raw.strip ?? base.strip,
    form: { ...base.form, ...raw.form },
  };
}
