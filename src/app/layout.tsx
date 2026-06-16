import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "neventia · Eventos que convierten",
    template: "%s · neventia",
  },
  description:
    "Creamos y gestionamos eventos memorables. Landings de alta conversión, captación de asistentes y seguimiento de leads en un solo lugar.",
  openGraph: {
    title: "neventia · Eventos que convierten",
    description:
      "Creamos y gestionamos eventos memorables. Landings de alta conversión y captación de asistentes.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-forest-950">
        {children}
      </body>
    </html>
  );
}
