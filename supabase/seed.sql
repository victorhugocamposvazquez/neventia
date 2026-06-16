-- ============================================================
-- neventia · Seed de la primera landing: "Comida gratis"
-- Ejecuta DESPUÉS de schema.sql.
-- ============================================================

insert into public.landings (slug, name, status, meta_pixel_id, content)
values (
  'comida-gratis',
  'Comida Gratis · Evento de bienvenida',
  'published',
  null,
  '{
    "eventName": "Comida Gratis Exclusiva",
    "badge": "Plazas limitadas · Invitación gratuita",
    "headline": "Te invitamos a una comida gratis para descubrir algo que cambiará tu día a día",
    "subheadline": "Disfruta de una comida completa, sin coste y sin compromiso, mientras conoces de primera mano las novedades que han mejorado la vida de miles de personas.",
    "heroImage": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80",
    "eventDateLabel": "Sábado 12 de julio",
    "eventTime": "14:00 h",
    "doorsTime": "Recepción desde las 13:30 h",
    "venueName": "Restaurante Los Olivos",
    "address": "Av. de la Constitución, 124 · Madrid",
    "mapsUrl": "https://maps.google.com/?q=Restaurante+Los+Olivos+Madrid",
    "scarcity": "Solo 40 plazas disponibles para esta convocatoria",
    "highlights": [
      {
        "title": "Comida 100% gratuita",
        "description": "Menú completo con entrante, principal, postre y bebida. Invita la casa, sin letra pequeña."
      },
      {
        "title": "Sin compromiso de compra",
        "description": "Vienes, disfrutas y decides con total libertad. Cero presión, cero obligaciones."
      },
      {
        "title": "Para ti y un acompañante",
        "description": "Reserva tu plaza y trae a quien quieras. La buena compañía siempre suma."
      },
      {
        "title": "Regalo de bienvenida",
        "description": "Todos los asistentes reciben un detalle exclusivo solo por acudir al evento."
      }
    ],
    "includes": [
      "Aperitivo de bienvenida",
      "Menú completo de tres platos",
      "Bebidas incluidas",
      "Café y postre",
      "Presentación amena de 30 minutos",
      "Sorteo de regalos entre los asistentes"
    ],
    "agenda": [
      { "time": "13:30", "title": "Recepción y aperitivo de bienvenida" },
      { "time": "14:00", "title": "Comida en un ambiente distendido" },
      { "time": "15:30", "title": "Presentación de novedades (sin compromiso)" },
      { "time": "16:00", "title": "Sorteo de regalos y despedida" }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80"
    ],
    "testimonials": [
      {
        "quote": "Fui sin esperar nada y salí encantada. La comida estupenda y el trato inmejorable.",
        "author": "María G.",
        "role": "Asistente en Valencia"
      },
      {
        "quote": "Cumplieron lo que prometían: comida gratis y cero presión. Repetiría sin dudarlo.",
        "author": "Antonio R.",
        "role": "Asistente en Sevilla"
      },
      {
        "quote": "Un planazo para hacer en pareja. Nos trataron de maravilla.",
        "author": "Lucía y Pablo",
        "role": "Asistentes en Madrid"
      }
    ],
    "faqs": [
      {
        "q": "¿De verdad es gratis?",
        "a": "Sí. La comida es totalmente gratuita para ti y tu acompañante. No hay ningún coste ni obligación de compra."
      },
      {
        "q": "¿Tengo que comprar algo?",
        "a": "No. Asistes, disfrutas de la comida y conoces nuestras novedades. La decisión de hacer algo más es completamente tuya."
      },
      {
        "q": "¿Puedo llevar acompañante?",
        "a": "Por supuesto. Cada reserva incluye plaza para ti y un acompañante. Indícalo al reservar."
      },
      {
        "q": "¿Cuántas plazas hay?",
        "a": "Las plazas son limitadas para garantizar la mejor experiencia. Te recomendamos reservar cuanto antes."
      }
    ],
    "form": {
      "title": "Reserva tu plaza gratis",
      "subtitle": "Completa tus datos y te confirmamos la reserva por teléfono.",
      "ctaText": "Quiero mi plaza gratis",
      "successTitle": "¡Plaza reservada!",
      "successText": "Te llamaremos en breve para confirmar tu reserva. Revisa tu teléfono."
    },
    "contactPhone": "+34 900 000 000",
    "legal": "Al reservar aceptas que nos pongamos en contacto contigo para confirmar tu asistencia. Tratamos tus datos conforme a nuestra política de privacidad."
  }'::jsonb
)
on conflict (slug) do update
set content = excluded.content,
    name = excluded.name,
    status = excluded.status,
    updated_at = now();
