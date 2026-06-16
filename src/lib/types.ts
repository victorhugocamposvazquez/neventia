export type LandingStatus = "draft" | "published" | "archived";

export type LeadSource = "landing" | "meta_ads" | "manual";

export type LeadStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "attended"
  | "no_show"
  | "discarded";

export type LandingHighlight = {
  title: string;
  description: string;
};

export type LandingAgendaItem = {
  time: string;
  title: string;
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
  eventName?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
  heroImage?: string;
  eventDateLabel?: string;
  eventTime?: string;
  doorsTime?: string;
  venueName?: string;
  address?: string;
  mapsUrl?: string;
  scarcity?: string;
  highlights?: LandingHighlight[];
  includes?: string[];
  agenda?: LandingAgendaItem[];
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
  source: LeadSource;
  status: LeadStatus;
  utm: Record<string, string>;
  meta_lead_id: string | null;
  notes: string | null;
  created_at: string;
};
