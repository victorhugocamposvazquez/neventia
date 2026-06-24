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
      "También para parejas · ambiente cuidado"
    ],
    "stepsIntro": "Reservar tu plaza lleva menos de un minuto. El resto lo ponemos nosotros.",
    "steps": [
      { "title": "Reserva tu plaza", "description": "Déjanos tus datos en el chat. Las plazas son limitadas y se asignan por orden de inscripción." },
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
    "slotsLabel": "quedan 12 plazas",
    "eventStatus": "available",
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
      { "q": "¿Este evento es solo para personas de 45 años o más?", "a": "Sí, este evento es completamente gratuito y está dirigido a personas de 45 años en adelante. Damos prioridad a quienes asisten en pareja, ya que las plazas son limitadas." },
      { "q": "¿Realmente es 0€/persona?", "a": "¡Sí, exactamente! Este evento no tiene ningún coste, es 0€/persona. De hecho, los patrocinadores prefieren invertir en esta experiencia de calidad y en directo con nuestro público, en lugar de gastar en publicidad. Es su manera de privilegiar el contacto humano y el intercambio de experiencias enriquecedoras." },
      { "q": "¿Qué es la invitación de Neventia?", "a": "El evento de Neventia es un momento de convivencia y de intercambio, organizado en torno a una comida completamente ofrecida por una de nuestras empresas colaboradoras. En el programa, una presentación de los productos/servicios del patrocinador y una comida deliciosa en un restaurante de calidad." },
      { "q": "¿Cómo puedo participar en el evento?", "a": "Para participar, solo tienes que inscribirte a través del formulario disponible en esta página. Luego recibirás un correo electrónico de confirmación con la información necesaria." },
      { "q": "¿Debo comprar algo para disfrutar de la comida?", "a": "No, absolutamente no. La comida está completamente ofrecida por nuestros patrocinadores. No hay ninguna obligación de compra; tu opinión sobre los productos/servicios presentados es muy valiosa para ellos." },
      { "q": "¿Qué pasa si llego tarde al evento?", "a": "Te recomendamos encarecidamente llegar a tiempo. Para el buen desarrollo del evento, una vez comenzado no podremos garantizar tu acceso." },
      { "q": "¿Puedo invitar a otra pareja para que me acompañe al evento?", "a": "Sí, puedes invitar a otra pareja, por lo que en total seríais dos parejas: la tuya y la que invitas, que también deben tener más de 45 años." },
      { "q": "¿Cuál es el ambiente en estos eventos?", "a": "Nuestros eventos están diseñados para ser conviviales y agradables. Es una ocasión ideal para relajarse, conocer nuevas personas y descubrir productos y servicios interesantes." },
      { "q": "¿Puedo venir con niños?", "a": "Lamentablemente no. Dado que las plazas son limitadas, solo aceptamos personas mayores de 45 años. Gracias por tu comprensión." }
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
