import { Space_Grotesk } from "next/font/google";
import { CookieBanner } from "@/components/site/CookieBanner";
import { HeaderScroll } from "@/components/site/HeaderScroll";
import "./site.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`nv-site ${spaceGrotesk.variable}`}>
      <HeaderScroll />
      {children}
      <CookieBanner />
    </div>
  );
}
