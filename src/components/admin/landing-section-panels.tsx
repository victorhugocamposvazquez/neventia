"use client";

import { useState } from "react";
import type {
  Dish,
  LandingContent,
  LandingFaq,
  LandingStep,
  LandingTestimonial,
  WhyPoint,
} from "@/lib/types";
import {
  AddButton,
  Field,
  ImageField,
  ItemCard,
  Select,
  StringListEditor,
  TextArea,
} from "@/components/admin/admin-form";

export type LandingSectionId =
  | "settings"
  | "hero"
  | "event"
  | "steps"
  | "menu"
  | "why"
  | "venue"
  | "gallery"
  | "testimonials"
  | "faq"
  | "contact";

export const LANDING_SECTIONS: {
  id: LandingSectionId;
  label: string;
  description: string;
}[] = [
  {
    id: "settings",
    label: "Configuración",
    description: "Nombre, URL, ciudad, fecha del evento y estado de publicación.",
  },
  {
    id: "hero",
    label: "Cabecera",
    description: "Titular, precio, texto principal e imagen de portada.",
  },
  {
    id: "event",
    label: "Plazas",
    description: "Disponibilidad y texto de plazas en la ficha del evento.",
  },
  {
    id: "steps",
    label: "Cómo funciona",
    description: "Los tres pasos del proceso de reserva.",
  },
  {
    id: "menu",
    label: "Menú",
    description: "Platos, descripciones e imágenes. Vacío = sección oculta.",
  },
  {
    id: "why",
    label: "¿Por qué es gratis?",
    description: "Explicación del modelo y puntos de confianza.",
  },
  {
    id: "venue",
    label: "Lugar",
    description: "Restaurante, nota de ubicación y foto del local.",
  },
  {
    id: "gallery",
    label: "Galería",
    description: "Carrusel de imágenes de la experiencia.",
  },
  {
    id: "testimonials",
    label: "Testimonios",
    description: "Opiniones específicas de esta landing.",
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Preguntas frecuentes antes de reservar.",
  },
  {
    id: "contact",
    label: "Contacto",
    description: "Teléfono y texto legal adicional.",
  },
];

const EMPTY_DISH: Dish = {
  course: "Entrante",
  name: "",
  description: "",
  image: "",
};

const EMPTY_FAQ: LandingFaq = { q: "", a: "" };

const EMPTY_TESTIMONIAL: LandingTestimonial = {
  quote: "",
  author: "",
  role: "",
};

const EMPTY_WHY: WhyPoint = { title: "", description: "" };

export type LandingMeta = {
  name: string;
  slug: string;
  status: string;
  city: string;
  region: string;
  eventDate: string;
  metaPixel: string;
};

type PanelProps = {
  section: LandingSectionId;
  content: LandingContent;
  onChange: (content: LandingContent) => void;
  meta?: LandingMeta;
  onMetaChange?: (meta: Partial<LandingMeta>) => void;
};

export function LandingSectionPanel({
  section,
  content,
  onChange,
  meta,
  onMetaChange,
}: PanelProps) {
  const [showJson, setShowJson] = useState(false);
  const [jsonDraft, setJsonDraft] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const patch = (partial: Partial<LandingContent>) => {
    onChange({ ...content, ...partial });
  };

  const steps = content.steps ?? [];
  const menu = content.menu ?? [];
  const whyPoints = content.whyPoints ?? [];
  const gallery = content.gallery ?? [];
  const testimonials = content.testimonials ?? [];
  const faqs = content.faqs ?? [];

  const def = LANDING_SECTIONS.find((s) => s.id === section)!;

  const updateStep = (index: number, field: keyof LandingStep, value: string) => {
    patch({
      steps: steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      ),
    });
  };

  const updateDish = (index: number, field: keyof Dish, value: string) => {
    patch({
      menu: menu.map((dish, i) =>
        i === index ? { ...dish, [field]: value } : dish
      ),
    });
  };

  const updateWhy = (index: number, field: keyof WhyPoint, value: string) => {
    patch({
      whyPoints: whyPoints.map((point, i) =>
        i === index ? { ...point, [field]: value } : point
      ),
    });
  };

  const updateTestimonial = (
    index: number,
    field: keyof LandingTestimonial,
    value: string
  ) => {
    patch({
      testimonials: testimonials.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  const updateFaq = (index: number, field: keyof LandingFaq, value: string) => {
    patch({
      faqs: faqs.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  const openJson = () => {
    setJsonDraft(JSON.stringify(content, null, 2));
    setJsonError(null);
    setShowJson(true);
  };

  const applyJson = () => {
    try {
      onChange({ ...content, ...(JSON.parse(jsonDraft) as LandingContent) });
      setJsonError(null);
      setShowJson(false);
    } catch {
      setJsonError("JSON no válido.");
    }
  };

  return (
    <div>
      <h3 className="le-panel-title">{def.label}</h3>
      <p className="le-panel-desc">{def.description}</p>

      {section === "settings" && meta && onMetaChange && (
        <div className="space-y-4">
          <Field
            label="Nombre"
            name="name"
            value={meta.name}
            onChange={(e) => onMetaChange({ name: e.target.value })}
            required
          />
          <Field
            label="URL (slug)"
            name="slug"
            value={meta.slug}
            onChange={(e) => onMetaChange({ slug: e.target.value })}
            required
          />
          <Select
            label="Estado"
            name="status"
            value={meta.status}
            onChange={(e) => onMetaChange({ status: e.target.value })}
          >
            <option value="draft">Borrador</option>
            <option value="published">Publicada</option>
            <option value="archived">Archivada</option>
          </Select>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Ciudad"
              name="city"
              value={meta.city}
              onChange={(e) => onMetaChange({ city: e.target.value })}
              placeholder="A Coruña"
            />
            <Field
              label="Región · opcional"
              name="region"
              value={meta.region}
              onChange={(e) => onMetaChange({ region: e.target.value })}
              placeholder="Galicia"
            />
          </div>
          <Field
            label="Fecha y hora del evento"
            name="event_date"
            type="datetime-local"
            value={meta.eventDate}
            onChange={(e) => onMetaChange({ eventDate: e.target.value })}
            required
          />
          <Field
            label="Meta Pixel ID · opcional"
            name="meta_pixel_id"
            value={meta.metaPixel}
            onChange={(e) => onMetaChange({ metaPixel: e.target.value })}
            placeholder="1234567890"
          />
          <details className="text-sm">
            <summary className="cursor-pointer font-semibold text-forest-800">
              Edición avanzada (JSON)
            </summary>
            <div className="mt-3 space-y-2">
              {!showJson ? (
                <button
                  type="button"
                  onClick={openJson}
                  className="text-sm text-forest-700 underline"
                >
                  Abrir editor JSON
                </button>
              ) : (
                <>
                  <textarea
                    value={jsonDraft}
                    onChange={(e) => setJsonDraft(e.target.value)}
                    spellCheck={false}
                    rows={12}
                    className="w-full rounded-xl border border-forest-900/15 bg-forest-950 p-3 font-mono text-xs text-mint-200"
                  />
                  {jsonError && (
                    <p className="text-sm text-red-600">{jsonError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={applyJson}
                      className="rounded-full bg-forest-900 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Aplicar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowJson(false)}
                      className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          </details>
        </div>
      )}

      {section === "hero" && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Etiqueta superior"
              value={content.badge ?? ""}
              onChange={(e) => patch({ badge: e.target.value })}
            />
            <Field
              label="Precio destacado"
              value={content.freePrice ?? "0€"}
              onChange={(e) => patch({ freePrice: e.target.value })}
            />
          </div>
          <Field
            label="Titular"
            value={content.headline ?? ""}
            onChange={(e) => patch({ headline: e.target.value })}
          />
          <TextArea
            label="Texto bajo el titular"
            value={content.subheadline ?? ""}
            onChange={(e) => patch({ subheadline: e.target.value })}
            rows={3}
          />
          <ImageField
            label="Imagen del hero"
            hint="URL pública. Vacío = imagen por defecto."
            value={content.heroImage ?? ""}
            onChange={(heroImage) => patch({ heroImage })}
          />
        </div>
      )}

      {section === "event" && (
        <div className="grid gap-4 sm:grid-cols-1">
          <Field
            label="Texto de plazas"
            hint='Ej.: "quedan 12 plazas"'
            value={content.slotsLabel ?? ""}
            onChange={(e) => patch({ slotsLabel: e.target.value })}
          />
          <Select
            label="Estado del evento"
            value={content.eventStatus ?? "available"}
            onChange={(e) =>
              patch({
                eventStatus: e.target.value as LandingContent["eventStatus"],
              })
            }
          >
            <option value="available">Disponible</option>
            <option value="low">Pocas plazas</option>
            <option value="full">Completo</option>
          </Select>
        </div>
      )}

      {section === "steps" && (
        <div className="space-y-4">
          <TextArea
            label="Introducción"
            value={content.stepsIntro ?? ""}
            onChange={(e) => patch({ stepsIntro: e.target.value })}
            rows={2}
          />
          {steps.map((step, i) => (
            <ItemCard key={i} title={`Paso ${i + 1}`}>
              <Field
                label="Título"
                value={step.title}
                onChange={(e) => updateStep(i, "title", e.target.value)}
              />
              <TextArea
                label="Descripción"
                value={step.description}
                onChange={(e) => updateStep(i, "description", e.target.value)}
                rows={2}
              />
            </ItemCard>
          ))}
          <AddButton
            onClick={() =>
              patch({ steps: [...steps, { title: "", description: "" }] })
            }
          >
            + Añadir paso
          </AddButton>
        </div>
      )}

      {section === "menu" && (
        <div className="space-y-4">
          <Field
            label="Título"
            value={content.menuTitle ?? ""}
            onChange={(e) => patch({ menuTitle: e.target.value })}
          />
          <TextArea
            label="Introducción"
            value={content.menuIntro ?? ""}
            onChange={(e) => patch({ menuIntro: e.target.value })}
            rows={2}
          />
          {menu.map((dish, i) => (
            <ItemCard
              key={i}
              title={dish.name || `Plato ${i + 1}`}
              onRemove={() => patch({ menu: menu.filter((_, j) => j !== i) })}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Tipo"
                  value={dish.course}
                  onChange={(e) => updateDish(i, "course", e.target.value)}
                />
                <Field
                  label="Nombre"
                  value={dish.name}
                  onChange={(e) => updateDish(i, "name", e.target.value)}
                />
              </div>
              <TextArea
                label="Descripción"
                value={dish.description ?? ""}
                onChange={(e) => updateDish(i, "description", e.target.value)}
                rows={2}
              />
              <ImageField
                label="Foto"
                value={dish.image ?? ""}
                onChange={(image) => updateDish(i, "image", image)}
              />
            </ItemCard>
          ))}
          <AddButton
            onClick={() => patch({ menu: [...menu, { ...EMPTY_DISH }] })}
          >
            + Añadir plato
          </AddButton>
          <StringListEditor
            label="Incluye también"
            items={content.menuIncludes ?? []}
            onChange={(menuIncludes) => patch({ menuIncludes })}
            placeholder="Agua, vino…"
          />
        </div>
      )}

      {section === "why" && (
        <div className="space-y-4">
          <Field
            label="Título"
            value={content.whyTitle ?? ""}
            onChange={(e) => patch({ whyTitle: e.target.value })}
          />
          <TextArea
            label="Introducción"
            value={content.whyIntro ?? ""}
            onChange={(e) => patch({ whyIntro: e.target.value })}
            rows={2}
          />
          <ImageField
            label="Imagen"
            value={content.whyImage ?? ""}
            onChange={(whyImage) => patch({ whyImage })}
          />
          {whyPoints.map((point, i) => (
            <ItemCard
              key={i}
              title={point.title || `Punto ${i + 1}`}
              onRemove={() =>
                patch({ whyPoints: whyPoints.filter((_, j) => j !== i) })
              }
            >
              <Field
                label="Título"
                value={point.title}
                onChange={(e) => updateWhy(i, "title", e.target.value)}
              />
              <TextArea
                label="Descripción"
                value={point.description}
                onChange={(e) => updateWhy(i, "description", e.target.value)}
                rows={2}
              />
            </ItemCard>
          ))}
          <AddButton
            onClick={() =>
              patch({ whyPoints: [...whyPoints, { ...EMPTY_WHY }] })
            }
          >
            + Añadir punto
          </AddButton>
        </div>
      )}

      {section === "venue" && (
        <div className="space-y-4">
          <Field
            label="Nombre del local"
            value={content.venueTitle ?? ""}
            onChange={(e) => patch({ venueTitle: e.target.value })}
          />
          <TextArea
            label="Nota de ubicación"
            value={content.venueNote ?? ""}
            onChange={(e) => patch({ venueNote: e.target.value })}
            rows={2}
          />
          <ImageField
            label="Foto del local"
            value={content.venueImage ?? ""}
            onChange={(venueImage) => patch({ venueImage })}
          />
        </div>
      )}

      {section === "gallery" && (
        <div className="space-y-4">
          <StringListEditor
            label="URLs de imágenes"
            items={gallery}
            onChange={(nextGallery) => patch({ gallery: nextGallery })}
            placeholder="https://…"
          />
          {gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {gallery.map((url, i) => (
                <div
                  key={`${url}-${i}`}
                  className="overflow-hidden rounded-lg border border-forest-900/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {section === "testimonials" && (
        <div className="space-y-4">
          {testimonials.map((item, i) => (
            <ItemCard
              key={i}
              title={item.author || `Testimonio ${i + 1}`}
              onRemove={() =>
                patch({
                  testimonials: testimonials.filter((_, j) => j !== i),
                })
              }
            >
              <TextArea
                label="Cita"
                value={item.quote}
                onChange={(e) => updateTestimonial(i, "quote", e.target.value)}
                rows={3}
              />
              <Field
                label="Autor"
                value={item.author}
                onChange={(e) => updateTestimonial(i, "author", e.target.value)}
              />
              <Field
                label="Rol · opcional"
                value={item.role ?? ""}
                onChange={(e) => updateTestimonial(i, "role", e.target.value)}
              />
            </ItemCard>
          ))}
          <AddButton
            onClick={() =>
              patch({
                testimonials: [...testimonials, { ...EMPTY_TESTIMONIAL }],
              })
            }
          >
            + Añadir testimonio
          </AddButton>
        </div>
      )}

      {section === "faq" && (
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <ItemCard
              key={i}
              title={item.q || `Pregunta ${i + 1}`}
              onRemove={() => patch({ faqs: faqs.filter((_, j) => j !== i) })}
            >
              <Field
                label="Pregunta"
                value={item.q}
                onChange={(e) => updateFaq(i, "q", e.target.value)}
              />
              <TextArea
                label="Respuesta"
                value={item.a}
                onChange={(e) => updateFaq(i, "a", e.target.value)}
                rows={3}
              />
            </ItemCard>
          ))}
          <AddButton onClick={() => patch({ faqs: [...faqs, { ...EMPTY_FAQ }] })}>
            + Añadir pregunta
          </AddButton>
        </div>
      )}

      {section === "contact" && (
        <div className="space-y-4">
          <Field
            label="Teléfono · opcional"
            value={content.contactPhone ?? ""}
            onChange={(e) => patch({ contactPhone: e.target.value })}
          />
          <TextArea
            label="Texto legal adicional · opcional"
            value={content.legal ?? ""}
            onChange={(e) => patch({ legal: e.target.value })}
            rows={2}
          />
        </div>
      )}
    </div>
  );
}

export function isSectionVisible(
  id: LandingSectionId,
  content: LandingContent
): boolean {
  switch (id) {
    case "menu":
      return (content.menu?.length ?? 0) > 0;
    case "faq":
      return (content.faqs?.length ?? 0) > 0;
    case "gallery":
      return (content.gallery?.length ?? 0) > 0;
    case "testimonials":
      return (content.testimonials?.length ?? 0) > 0;
    default:
      return true;
  }
}
