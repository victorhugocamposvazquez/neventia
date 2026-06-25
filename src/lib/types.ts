export type LandingStatus = "draft" | "published" | "archived";

export type LeadSource = "landing" | "meta_ads" | "manual";

export type LeadStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "attended"
  | "no_show"
  | "discarded";

export type LeadActivityType =
  | "created"
  | "status_change"
  | "note"
  | "call"
  | "whatsapp"
  | "email"
  | "tag_added"
  | "tag_removed"
  | "system";

export type PartyType = "pareja" | "solo" | "amigos";

export type EventDate = {
  /** Valor único de la fecha, p. ej. "2026-06-28" */
  value: string;
  /** Etiqueta visible, p. ej. "Sábado, 28 de junio" */
  label: string;
  time?: string;
  /** Texto de disponibilidad, p. ej. "quedan 12 plazas" */
  slotsLabel?: string;
  status?: "available" | "low" | "full";
};

export type LandingStep = {
  title: string;
  description: string;
};

export type Dish = {
  course: string;
  name: string;
  description?: string;
  image?: string;
};

export type WhyPoint = {
  title: string;
  description: string;
};

export type LandingTestimonial = {
  quote: string;
  author: string;
  role?: string;
};

export type LandingFaq = {
  q: string;
  a: string;
};

export type LandingForm = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  successTitle?: string;
  successText?: string;
};

export type LandingContent = {
  // Cabecera / hero
  badge?: string;
  headline?: string;
  freePrice?: string;
  subheadline?: string;
  heroImage?: string;
  region?: string;

  // Tira de beneficios
  strip?: string[];

  // Cómo funciona
  stepsIntro?: string;
  steps?: LandingStep[];

  // Menú
  menuTitle?: string;
  menuIntro?: string;
  menu?: Dish[];
  menuIncludes?: string[];

  // Por qué es gratis
  whyTitle?: string;
  whyIntro?: string;
  whyImage?: string;
  whyPoints?: WhyPoint[];

  // Fechas y lugar (una landing = un evento; la fecha oficial es `event_date` en la tabla)
  venueTitle?: string;
  venueNote?: string;
  venueImage?: string;
  /** Texto de plazas, p. ej. "quedan 12 plazas" */
  slotsLabel?: string;
  /** Disponibilidad del evento de esta landing */
  eventStatus?: "available" | "low" | "full";
  /** @deprecated Usar `event_date` + slotsLabel/eventStatus */
  dates?: EventDate[];

  // Pruebas sociales y cierre
  gallery?: string[];
  testimonials?: LandingTestimonial[];
  faqs?: LandingFaq[];
  form?: LandingForm;
  contactPhone?: string;
  legal?: string;
};

export type Landing = {
  id: string;
  slug: string;
  name: string;
  status: LandingStatus;
  city: string | null;
  region: string | null;
  event_date: string | null;
  content: LandingContent;
  meta_pixel_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  landing_id: string | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  guests: number;
  preferred_date: string | null;
  party_type: PartyType | null;
  source: LeadSource;
  status: LeadStatus;
  utm: Record<string, string>;
  meta_lead_id: string | null;
  notes: string | null;
  consents?: Record<string, unknown>;
  tags?: string[];
  created_at: string;
};

export type LeadActivity = {
  id: string;
  lead_id: string;
  type: LeadActivityType;
  body: string | null;
  meta: Record<string, unknown>;
  created_at: string;
};

export type LeadWithLanding = Lead & {
  landings?: Pick<Landing, "id" | "name" | "slug" | "city" | "event_date"> | null;
};
