export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  city: string;
};

export function testimonialInitials(author: string): string {
  return author
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "No me lo creía hasta que fui. Comimos de maravilla, la presentación fue corta y nadie nos presionó para comprar nada. Repetiremos seguro.",
    author: "María A.",
    city: "Madrid",
  },
  {
    id: "2",
    quote:
      "Una tarde estupenda en pareja. El restaurante precioso y la comida de nivel. La organización, impecable de principio a fin.",
    author: "Jorge R.",
    city: "Santander",
  },
  {
    id: "3",
    quote:
      "Pensaba que habría truco y no lo hubo. Conocimos gente encantadora y comimos genial. Gracias, Neventia.",
    author: "Carmen L.",
    city: "Logroño",
  },
  {
    id: "4",
    quote:
      "Fuimos escépticos al principio, pero la experiencia superó todas las expectativas. Menú cuidado, trato excelente y ambiente muy agradable.",
    author: "Patricia M.",
    city: "A Coruña",
  },
  {
    id: "5",
    quote:
      "Llevaba meses viendo el anuncio y por fin me animé. Me arrepiento de no haber ido antes. Todo gratis y con calidad de verdad.",
    author: "Antonio G.",
    city: "Vigo",
  },
  {
    id: "6",
    quote:
      "Perfecto para una tarde diferente. La charla del patrocinador fue breve y respetuosa, y luego disfrutamos de una comida de diez.",
    author: "Laura S.",
    city: "Oviedo",
  },
  {
    id: "7",
    quote:
      "Mi marido y yo salimos encantados. Nos gustó conocer a otras parejas de la zona y el menú nos sorprendió para bien.",
    author: "Rosa V.",
    city: "Gijón",
  },
  {
    id: "8",
    quote:
      "Muy bien organizado. Te reciben, te explican todo con claridad y te sientes cómodo desde el primer minuto.",
    author: "Fernando C.",
    city: "Bilbao",
  },
  {
    id: "9",
    quote:
      "La comida estaba espectacular y el servicio del restaurante, impecable. No entiendo cómo puede ser gratis, pero lo fue.",
    author: "Isabel T.",
    city: "Zaragoza",
  },
  {
    id: "10",
    quote:
      "Fui con una amiga y repetiremos en la próxima ciudad. Da gusto ver un evento tan bien montado sin letra pequeña.",
    author: "Elena P.",
    city: "Pamplona",
  },
  {
    id: "11",
    quote:
      "Tenía curiosidad por el formato y salí convencido. Buena comida, buena compañía y cero presión comercial.",
    author: "Miguel D.",
    city: "Salamanca",
  },
  {
    id: "12",
    quote:
      "Un plan ideal para el sábado. Llegamos, reservamos plaza fácil y disfrutamos de un menú completo sin pagar nada.",
    author: "Beatriz N.",
    city: "León",
  },
  {
    id: "13",
    quote:
      "Lo recomendé a mi hermana nada más salir. El ambiente en la mesa fue cercano y la experiencia muy natural.",
    author: "Sergio H.",
    city: "Ibiza",
  },
  {
    id: "14",
    quote:
      "Nos encantó el postre y el ritmo del evento. Ni largo ni corto: justo lo necesario para pasar una tarde redonda.",
    author: "Marta J.",
    city: "Valencia",
  },
  {
    id: "15",
    quote:
      "Pensé que sería un evento masivo y frío, pero fue todo lo contrario. Mesa cuidada y trato muy humano.",
    author: "Carlos B.",
    city: "Sevilla",
  },
  {
    id: "16",
    quote:
      "La presentación del colaborador fue interesante y sin exageraciones. Después, comida de autor y conversación agradable.",
    author: "Lucía F.",
    city: "Málaga",
  },
  {
    id: "17",
    quote:
      "Fuimos en pareja y nos trataron con mucho cariño. Se nota que hay organización detrás y ganas de hacerlo bien.",
    author: "Javier O.",
    city: "Cádiz",
  },
  {
    id: "18",
    quote:
      "Me gustó que todo estuviera claro desde la reserva. Sin sorpresas, sin costes ocultos y con un menú de verdad.",
    author: "Ana R.",
    city: "Granada",
  },
  {
    id: "19",
    quote:
      "Una experiencia diferente y muy recomendable. Conocimos gente de la ciudad y comimos como en un restaurante top.",
    author: "Diego L.",
    city: "Toledo",
  },
  {
    id: "20",
    quote:
      "Salimos con ganas de volver. El equipo de Neventia estuvo atento en todo momento y el restaurante, de categoría.",
    author: "Cristina W.",
    city: "Santiago",
  },
  {
    id: "21",
    quote:
      "No es la típica promoción rara. Es una comida de calidad en buena compañía. Así da gusto descubrir nuevos eventos.",
    author: "Rubén Z.",
    city: "Murcia",
  },
  {
    id: "22",
    quote:
      "Mi pareja dudaba y al final fue la que más disfrutó. La presentación fue amena y la comida, excelente.",
    author: "Silvia K.",
    city: "Alicante",
  },
  {
    id: "23",
    quote:
      "Muy buena relación entre organización, restaurante y asistentes. Todo fluyó sin esperas ni momentos incómodos.",
    author: "Héctor Q.",
    city: "Burgos",
  },
  {
    id: "24",
    quote:
      "Gracias por traer este tipo de eventos a nuestra ciudad. Comimos de lujo, conocimos gente estupenda y repetiremos.",
    author: "Nuria E.",
    city: "A Coruña",
  },
];

export function mapLandingTestimonials(
  items: { quote: string; author: string; role?: string }[],
): Testimonial[] {
  return items.map((item, i) => ({
    id: `landing-${i}`,
    quote: item.quote,
    author: item.author,
    city: item.role ?? "",
  }));
}
