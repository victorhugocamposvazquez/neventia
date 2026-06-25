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
  EditorSection,
  Field,
  ImageField,
  ItemCard,
  Select,
  StringListEditor,
  TextArea,
} from "@/components/admin/admin-form";

type Props = {
  content: LandingContent;
  onChange: (content: LandingContent) => void;
};

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

export function LandingContentEditor({ content, onChange }: Props) {
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

  const updateStep = (index: number, field: keyof LandingStep, value: string) => {
    const next = steps.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    patch({ steps: next });
  };

  const updateDish = (index: number, field: keyof Dish, value: string) => {
    const next = menu.map((dish, i) =>
      i === index ? { ...dish, [field]: value } : dish
    );
    patch({ menu: next });
  };

  const updateWhy = (index: number, field: keyof WhyPoint, value: string) => {
    const next = whyPoints.map((point, i) =>
      i === index ? { ...point, [field]: value } : point
    );
    patch({ whyPoints: next });
  };

  const updateTestimonial = (
    index: number,
    field: keyof LandingTestimonial,
    value: string
  ) => {
    const next = testimonials.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    patch({ testimonials: next });
  };

  const updateFaq = (index: number, field: keyof LandingFaq, value: string) => {
    const next = faqs.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    patch({ faqs: next });
  };

  const openJson = () => {
    setJsonDraft(JSON.stringify(content, null, 2));
    setJsonError(null);
    setShowJson(true);
  };

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as LandingContent;
      onChange({ ...content, ...parsed });
      setJsonError(null);
      setShowJson(false);
    } catch {
      setJsonError("JSON no válido. Revisa la sintaxis.");
    }
  };

  return (
    <div className="space-y-6">
      <EditorSection
        title="Cabecera (hero)"
        description="Lo primero que ve el visitante: titular, precio e imagen principal."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Etiqueta superior"
            value={content.badge ?? ""}
            onChange={(e) => patch({ badge: e.target.value })}
            placeholder="Evento gastronómico · plazas limitadas"
          />
          <Field
            label="Precio destacado"
            value={content.freePrice ?? "0€"}
            onChange={(e) => patch({ freePrice: e.target.value })}
            placeholder="0€"
          />
        </div>
        <Field
          label="Titular principal"
          value={content.headline ?? ""}
          onChange={(e) => patch({ headline: e.target.value })}
          placeholder="Una comida de autor"
        />
        <TextArea
          label="Texto bajo el titular"
          value={content.subheadline ?? ""}
          onChange={(e) => patch({ subheadline: e.target.value })}
          rows={3}
        />
        <ImageField
          label="Imagen del hero"
          hint="URL pública (Unsplash, CDN, etc.). Si está vacía se usa una imagen por defecto."
          value={content.heroImage ?? ""}
          onChange={(heroImage) => patch({ heroImage })}
        />
      </EditorSection>

      <EditorSection
        title="Plazas y disponibilidad"
        description="La fecha del evento se edita arriba. Aquí defines cómo se muestran las plazas."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Texto de plazas"
            hint='Ej.: "quedan 12 plazas" o "plazas disponibles"'
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
      </EditorSection>

      <EditorSection
        title="Cómo funciona"
        description="Tres pasos que explican el proceso antes de reservar."
      >
        <TextArea
          label="Introducción"
          value={content.stepsIntro ?? ""}
          onChange={(e) => patch({ stepsIntro: e.target.value })}
          rows={2}
        />
        <div className="space-y-3">
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
        </div>
        <AddButton
          onClick={() =>
            patch({
              steps: [...steps, { title: "", description: "" }],
            })
          }
        >
          + Añadir paso
        </AddButton>
      </EditorSection>

      <EditorSection
        title="Menú"
        description="Si no añades platos, esta sección no aparece en la landing."
      >
        <Field
          label="Título de la sección"
          value={content.menuTitle ?? ""}
          onChange={(e) => patch({ menuTitle: e.target.value })}
        />
        <TextArea
          label="Introducción del menú"
          value={content.menuIntro ?? ""}
          onChange={(e) => patch({ menuIntro: e.target.value })}
          rows={2}
        />
        <div className="space-y-3">
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
                  placeholder="Entrante, Principal…"
                />
                <Field
                  label="Nombre del plato"
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
                label="Foto del plato"
                value={dish.image ?? ""}
                onChange={(image) => updateDish(i, "image", image)}
              />
            </ItemCard>
          ))}
        </div>
        <AddButton onClick={() => patch({ menu: [...menu, { ...EMPTY_DISH }] })}>
          + Añadir plato
        </AddButton>
        <StringListEditor
          label="Incluye también"
          hint="Bebidas o extras que aparecen como chips bajo el menú."
          items={content.menuIncludes ?? []}
          onChange={(menuIncludes) => patch({ menuIncludes })}
          placeholder="Agua, vino…"
        />
      </EditorSection>

      <EditorSection
        title="¿Por qué es gratis?"
        description="Explica el modelo del evento y genera confianza."
      >
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
          label="Imagen lateral"
          value={content.whyImage ?? ""}
          onChange={(whyImage) => patch({ whyImage })}
        />
        <div className="space-y-3">
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
        </div>
        <AddButton onClick={() => patch({ whyPoints: [...whyPoints, { ...EMPTY_WHY }] })}>
          + Añadir punto
        </AddButton>
      </EditorSection>

      <EditorSection
        title="Lugar del evento"
        description="Restaurante o espacio donde se celebra la comida."
      >
        <Field
          label="Nombre del local"
          value={content.venueTitle ?? ""}
          onChange={(e) => patch({ venueTitle: e.target.value })}
          placeholder="Restaurante Mar de…"
        />
        <TextArea
          label="Nota de ubicación"
          hint="Ej.: dirección exacta al confirmar la plaza."
          value={content.venueNote ?? ""}
          onChange={(e) => patch({ venueNote: e.target.value })}
          rows={2}
        />
        <ImageField
          label="Foto del local"
          value={content.venueImage ?? ""}
          onChange={(venueImage) => patch({ venueImage })}
        />
      </EditorSection>

      <EditorSection
        title="Galería de experiencia"
        description="Imágenes que alimentan el carrusel de «La experiencia». Sin imágenes se usa el contenido por defecto."
      >
        <StringListEditor
          label="URLs de imágenes"
          items={gallery}
          onChange={(nextGallery) => patch({ gallery: nextGallery })}
          placeholder="https://…"
        />
        {gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="overflow-hidden rounded-lg border border-forest-900/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="aspect-[4/3] w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </EditorSection>

      <EditorSection
        title="Testimonios"
        description="Opiniones propias de esta landing. Se combinan con testimonios generales de Neventia."
      >
        <div className="space-y-3">
          {testimonials.map((item, i) => (
            <ItemCard
              key={i}
              title={item.author || `Testimonio ${i + 1}`}
              onRemove={() =>
                patch({ testimonials: testimonials.filter((_, j) => j !== i) })
              }
            >
              <TextArea
                label="Cita"
                value={item.quote}
                onChange={(e) => updateTestimonial(i, "quote", e.target.value)}
                rows={3}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Autor"
                  value={item.author}
                  onChange={(e) => updateTestimonial(i, "author", e.target.value)}
                />
                <Field
                  label="Rol · opcional"
                  value={item.role ?? ""}
                  onChange={(e) => updateTestimonial(i, "role", e.target.value)}
                  placeholder="Comensal en A Coruña"
                />
              </div>
            </ItemCard>
          ))}
        </div>
        <AddButton
          onClick={() =>
            patch({ testimonials: [...testimonials, { ...EMPTY_TESTIMONIAL }] })
          }
        >
          + Añadir testimonio
        </AddButton>
      </EditorSection>

      <EditorSection
        title="Preguntas frecuentes"
        description="Dudas habituales antes de reservar."
      >
        <div className="space-y-3">
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
        </div>
        <AddButton onClick={() => patch({ faqs: [...faqs, { ...EMPTY_FAQ }] })}>
          + Añadir pregunta
        </AddButton>
      </EditorSection>

      <EditorSection title="Contacto y legal">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Teléfono de contacto · opcional"
            value={content.contactPhone ?? ""}
            onChange={(e) => patch({ contactPhone: e.target.value })}
            placeholder="+34 600 000 000"
          />
        </div>
        <TextArea
          label="Texto legal adicional · opcional"
          value={content.legal ?? ""}
          onChange={(e) => patch({ legal: e.target.value })}
          rows={2}
        />
      </EditorSection>

      <details className="rounded-2xl border border-forest-900/10 bg-white shadow-card">
        <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-forest-800">
          Edición avanzada (JSON)
        </summary>
        <div className="space-y-3 border-t border-forest-900/10 px-6 py-4">
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
                rows={16}
                className="w-full rounded-xl border border-forest-900/15 bg-forest-950 p-4 font-mono text-xs leading-relaxed text-mint-200 outline-none focus:ring-2 focus:ring-mint-400"
              />
              {jsonError && (
                <p className="text-sm text-red-600">{jsonError}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={applyJson}
                  className="rounded-full bg-forest-900 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-800"
                >
                  Aplicar JSON
                </button>
                <button
                  type="button"
                  onClick={() => setShowJson(false)}
                  className="rounded-full border border-forest-900/15 px-4 py-2 text-sm font-semibold text-forest-800"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </details>
    </div>
  );
}
