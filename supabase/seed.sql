-- ============================================================
-- neventia · Seed del evento: A Coruña
-- Ejecuta DESPUÉS de schema.sql.
-- ============================================================

-- Limpia la landing de ejemplo antigua si existe.
delete from public.landings where slug = 'comida-gratis';

insert into public.landings (slug, name, status, city, region, event_date, meta_pixel_id, content)
values (
  'a-coruna',
  'A Coruña · Comida de autor',
  'published',
  'A Coruña',
  'Galicia',
  '2026-06-28 13:30:00+02',
  null,
  '{
    "badge": "Evento gastronómico · plazas limitadas",
    "headline": "Una comida de autor",
    "freePrice": "0€",
    "subheadline": "Te invitamos a una experiencia gastronómica completa en uno de los mejores restaurantes de A Coruña. Sin coste y sin compromiso de compra. Solo buena mesa y buena compañía.",
    "heroImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=75",
    "region": "Galicia",
    "strip": [
      "Menú completo · entrante, principal, postre y bebida",
      "Sin compromiso de compra",
      "Ven en pareja · ambiente cuidado"
    ],
    "stepsIntro": "Reservar tu plaza lleva menos de un minuto. El resto lo ponemos nosotros.",
    "steps": [
      { "title": "Reserva tu plaza", "description": "Elige una de las fechas disponibles y déjanos tus datos. Las plazas son limitadas y se asignan por orden de reserva." },
      { "title": "Asiste a la presentación", "description": "Antes de comer, nuestros colaboradores presentan sus productos en una charla breve y amena. Sin ninguna obligación de comprar nada." },
      { "title": "Disfruta tu comida", "description": "Siéntate, relájate y disfruta de un menú completo de autor, totalmente gratis. La mejor parte del plan." }
    ],
    "menuTitle": "Un menú pensado para disfrutar sin prisa",
    "menuIntro": "Producto gallego de mercado, cocina de temporada y un postre que merece la pena. Esto es lo que te espera en la mesa.",
    "menu": [
      { "course": "Entrante", "name": "Pulpo á feira", "description": "Pulpo cocido en su punto, cachelos, pimentón de la Vera y un buen aceite de oliva.", "image": "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=800&q=70" },
      { "course": "Principal", "name": "Arroz caldoso con bogavante", "description": "Arroz meloso de la costa gallega, cocinado a fuego lento con bogavante fresco.", "image": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=70" },
      { "course": "Postre", "name": "Tarta de Santiago", "description": "La almendra gallega de siempre, con su cruz de azúcar y un toque cítrico.", "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=70" }
    ],
    "menuIncludes": ["Agua", "Vino de la casa", "Café", "Opciones vegetarianas"],
    "whyTitle": "¿Por qué es gratis?",
    "whyIntro": "Porque la comida está patrocinada por marcas que quieren darse a conocer. Ellas presentan sus productos durante una breve charla antes de comer, y a cambio tú disfrutas de un menú completo sin pagar nada.",
    "whyImage": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1000&q=70",
    "whyPoints": [
      { "title": "Cero compromiso de compra", "description": "Asistes, escuchas la presentación y comes. Comprar algo es totalmente opcional." },
      { "title": "Sin coste oculto", "description": "El menú, las bebidas y el café están incluidos. No hay sorpresas en la mesa." },
      { "title": "Plazas reales y limitadas", "description": "Cuidamos el aforo para que la experiencia sea tranquila y agradable. Por eso reservamos por fechas." }
    ],
    "venueTitle": "Restaurante en el centro de A Coruña",
    "venueNote": "Dirección exacta enviada al confirmar tu plaza · fácil aparcamiento",
    "venueImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=70",
    "dates": [
      { "value": "2026-06-28", "label": "Sábado, 28 de junio", "time": "13:30 h", "slotsLabel": "quedan 12 plazas", "status": "available" },
      { "value": "2026-07-05", "label": "Sábado, 5 de julio", "time": "13:30 h", "slotsLabel": "últimas plazas", "status": "low" },
      { "value": "2026-07-12", "label": "Sábado, 12 de julio", "time": "13:30 h", "slotsLabel": "plazas disponibles", "status": "available" },
      { "value": "2026-06-21", "label": "Sábado, 21 de junio", "time": "13:30 h", "slotsLabel": "completo", "status": "full" }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=70",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=70",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=70",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=70",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=70"
    ],
    "testimonials": [
      { "quote": "No me lo creía hasta que fui. Comimos de maravilla, la presentación fue corta y nadie nos presionó para comprar nada. Repetiremos seguro.", "author": "María A.", "role": "Madrid" },
      { "quote": "Una tarde estupenda en pareja. El restaurante precioso y la comida de nivel. La organización, impecable de principio a fin.", "author": "Jorge R.", "role": "Santander" },
      { "quote": "Pensaba que habría truco y no lo hubo. Conocimos gente encantadora y comimos genial. Gracias, Neventia.", "author": "Carmen L.", "role": "Logroño" }
    ],
    "faqs": [
      { "q": "¿De verdad es totalmente gratis?", "a": "Sí. No pagas nada por el menú ni por las bebidas. La comida está patrocinada por las marcas colaboradoras que presentan sus productos antes de comer." },
      { "q": "¿Estoy obligado a comprar algo?", "a": "En absoluto. La presentación de productos es informativa y sin ningún compromiso. Puedes disfrutar de la comida sin adquirir nada." },
      { "q": "¿Cuánto dura el evento?", "a": "Entre 2 y 3 horas aproximadamente: una breve presentación inicial y, a continuación, la comida completa con tiempo para disfrutar sin prisas." },
      { "q": "¿Puedo ir solo o tengo que ir en pareja?", "a": "Puedes venir como prefieras. La experiencia está pensada para disfrutarse en pareja, pero también puedes asistir solo/a o con amigos. Indícalo en el formulario." },
      { "q": "¿Qué incluye exactamente el menú?", "a": "Entrante, plato principal, postre, agua, vino de la casa y café. Disponemos de opciones vegetarianas; indícanos cualquier alergia o intolerancia al confirmar." },
      { "q": "¿Cómo confirmo mi plaza?", "a": "Tras enviar el formulario, nuestro equipo te llamará en 24-48 h para confirmar la reserva y darte la dirección exacta del restaurante." }
    ],
    "form": {
      "title": "Reserva gratuita",
      "subtitle": "Completa tus datos y te confirmamos la plaza.",
      "ctaText": "Reservar mi plaza gratis",
      "successTitle": "¡Plaza reservada!",
      "successText": "Hemos recibido tu reserva. Te llamaremos en las próximas 24-48 h para confirmarla."
    },
    "contactPhone": "+34 900 000 000",
    "legal": "Al reservar aceptas que Neventia te contacte para gestionar tu reserva. Tratamos tus datos conforme a nuestra política de privacidad."
  }'::jsonb
)
on conflict (slug) do update
set content = excluded.content,
    name = excluded.name,
    status = excluded.status,
    city = excluded.city,
    region = excluded.region,
    event_date = excluded.event_date,
    updated_at = now();
