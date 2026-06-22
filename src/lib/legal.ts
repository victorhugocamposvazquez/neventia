export const LEGAL = {
  brand: "Neventia",
  owner: "Neventia",
  email: process.env.NEXT_PUBLIC_LEGAL_EMAIL ?? "contacto@neventia.com",
  address: "España",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const LEGAL_LINKS = {
  avisoLegal: "/aviso-legal",
  privacidad: "/privacidad",
  cookies: "/cookies",
} as const;
