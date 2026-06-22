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
  {
    id: "25",
    quote:
      "Reservamos sin muchas expectativas y salimos encantados. El menú tenía personalidad y el trato, de diez.",
    author: "Pablo I.",
    city: "Lugo",
  },
  {
    id: "26",
    quote:
      "Me gustó la naturalidad de todo el evento. Nada forzado, nada agresivo: solo buena mesa y buen rollo.",
    author: "Teresa U.",
    city: "Ourense",
  },
  {
    id: "27",
    quote:
      "Fuimos dos amigas y nos sentimos muy cómodas desde el primer momento. Volveríamos sin pensarlo.",
    author: "Raquel Y.",
    city: "Palma",
  },
  {
    id: "28",
    quote:
      "El restaurante elegido fue un acierto. Producto fresco, platos bien ejecutados y un servicio muy profesional.",
    author: "Manuel X.",
    city: "Córdoba",
  },
  {
    id: "29",
    quote:
      "Pensé que sería demasiado comercial y fue justo lo contrario. La comida fue lo más importante del día.",
    author: "Inés G.",
    city: "Valladolid",
  },
  {
    id: "30",
    quote:
      "Una forma distinta de pasar el mediodía del sábado. Comida excelente y conversación con gente muy agradable.",
    author: "Alberto P.",
    city: "Badajoz",
  },
  {
    id: "31",
    quote:
      "La organización fue impecable: horarios claros, buena acogida y un ambiente relajado en todo momento.",
    author: "Mónica S.",
    city: "Cáceres",
  },
  {
    id: "32",
    quote:
      "No había ido nunca a algo así y me llevé una grata sorpresa. Todo fue sencillo, transparente y muy cuidado.",
    author: "Víctor A.",
    city: "Tarragona",
  },
  {
    id: "33",
    quote:
      "Salimos hablando del menú durante todo el camino a casa. Entrante, principal y postre: todo muy logrado.",
    author: "Claudia M.",
    city: "Girona",
  },
  {
    id: "34",
    quote:
      "Me encantó el equilibrio entre la presentación y la comida. Ni se hizo largo ni se quedó corto.",
    author: "Óscar T.",
    city: "Lleida",
  },
  {
    id: "35",
    quote:
      "Fue una tarde perfecta para ir en pareja. El restaurante tenía encanto y la experiencia, muy bien coordinada.",
    author: "Sonia V.",
    city: "Huelva",
  },
  {
    id: "36",
    quote:
      "Lo mejor fue la sensación de autenticidad. No parecía un evento promocional, sino una comida de verdad.",
    author: "Iván C.",
    city: "Almería",
  },
  {
    id: "37",
    quote:
      "Repetiría sin dudarlo. La calidad del menú estuvo a la altura de restaurantes que sí pagas habitualmente.",
    author: "Lorena B.",
    city: "Jaén",
  },
  {
    id: "38",
    quote:
      "Nos confirmaron la plaza rápido y el día del evento todo salió como prometían. Muy recomendable.",
    author: "Andrés F.",
    city: "Cuenca",
  },
  {
    id: "39",
    quote:
      "Conocimos a otra pareja de la mesa y acabamos charlando como si nos conociéramos de antes.",
    author: "Pilar D.",
    city: "Ávila",
  },
  {
    id: "40",
    quote:
      "El sitio era precioso y la comida, mejor aún. Se notaba el cuidado en cada detalle del servicio.",
    author: "Ricardo L.",
    city: "Segovia",
  },
  {
    id: "41",
    quote:
      "Dudábamos por el tema de la presentación, pero fue breve y respetuosa. Luego, comida de lujo.",
    author: "Alicia N.",
    city: "Soria",
  },
  {
    id: "42",
    quote:
      "Muy buena experiencia de principio a fin. Desde la reserva hasta la despedida, todo muy fluido.",
    author: "Emilio R.",
    city: "Teruel",
  },
  {
    id: "43",
    quote:
      "Fui sola y también me sentí muy a gusto. El ambiente fue acogedor y la organización, muy profesional.",
    author: "Noelia H.",
    city: "Huesca",
  },
  {
    id: "44",
    quote:
      "No esperaba un menú tan cuidado. Cada plato tenía su detalle y el postre fue la guinda del pastel.",
    author: "Gabriel J.",
    city: "Zamora",
  },
  {
    id: "45",
    quote:
      "Un plan estupendo para descubrir nuevos restaurantes sin arriesgar. Comimos genial y gratis.",
    author: "Verónica K.",
    city: "Palencia",
  },
  {
    id: "46",
    quote:
      "La experiencia transmitió confianza desde el minuto uno. Nada de letra pequeña ni sorpresas raras.",
    author: "Tomás W.",
    city: "Lérida",
  },
  {
    id: "47",
    quote:
      "Nos gustó tanto que ya estamos pendientes del próximo evento. Muy buena propuesta para salir del rutinario.",
    author: "Esther Q.",
    city: "Castellón",
  },
  {
    id: "48",
    quote:
      "El trato del personal del restaurante fue excelente y la comida, de nivel. Una tarde muy redonda.",
    author: "Francisco Z.",
    city: "Reus",
  },
  {
    id: "49",
    quote:
      "Pensaba que sería un evento frío y resultó muy cercano. Buena conversación y mejor comida.",
    author: "Yolanda C.",
    city: "Marbella",
  },
  {
    id: "50",
    quote:
      "Todo estuvo muy bien explicado desde la web hasta el propio evento. Eso da mucha tranquilidad.",
    author: "Marcos E.",
    city: "Benidorm",
  },
  {
    id: "51",
    quote:
      "La mesa estaba perfectamente montada y el ritmo del evento, muy agradable. Sin prisas ni agobios.",
    author: "Helena P.",
    city: "Gandía",
  },
  {
    id: "52",
    quote:
      "Salimos convencidos de que mereció la pena reservar. Comida de calidad y trato humano de verdad.",
    author: "Raúl M.",
    city: "Elche",
  },
  {
    id: "53",
    quote:
      "Fue una sorpresa muy positiva. El menú superó lo que imaginábamos y el ambiente fue muy agradable.",
    author: "Celia O.",
    city: "Cartagena",
  },
  {
    id: "54",
    quote:
      "Si buscas una experiencia distinta, esta es. Buena comida, buena gente y una organización que se nota.",
    author: "Adrián S.",
    city: "Ferrol",
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
