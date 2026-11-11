import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Más Allá del Espejo | Audrey Caballero · Miss Mundo Formosa 2026",
  description:
    "Proyecto social de salud mental juvenil, prevención del bullying y contención emocional. Belleza con Propósito - Miss World.",
  openGraph: {
    title: "Más Allá del Espejo | Audrey Caballero",
    description: "No somos perfectas. Somos reales. Espacio cívico de escucha y orientación.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen antialiased selection:bg-[#FDE68A] selection:text-zinc-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}