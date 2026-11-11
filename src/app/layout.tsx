import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#FEF9E7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // Base obligatoria para que WhatsApp y Facebook resuelvan URLs absolutas
  metadataBase: new URL("https://masalladelespejo.vercel.app"),

  title: "Más Allá del Espejo | Audrey Caballero · Miss Mundo Formosa 2026",
  description:
    "No somos perfectas. Somos reales. Proyecto social de salud mental juvenil, prevención del bullying y contención emocional. Belleza con Propósito - Miss World.",
  applicationName: "Más Allá del Espejo",
  authors: [{ name: "Audrey Valentina Caballero" }],
  keywords: [
    "Más Allá del Espejo",
    "Audrey Caballero",
    "Miss Mundo Formosa 2026",
    "Belleza con Propósito",
    "Salud Mental Juvenil",
    "Prevención del Bullying",
    "Formosa",
    "Argentina",
  ],

  // Metadatos para WhatsApp, Facebook, LinkedIn y Telegram (Open Graph)
  openGraph: {
    title: "Más Allá del Espejo | Audrey Caballero",
    description:
      "«No somos perfectas. Somos reales.» Espacio de escucha, salud mental juvenil y prevención del bullying. Belleza con Propósito (Miss World).",
    url: "https://masalladelespejo.vercel.app",
    siteName: "Más Allá del Espejo",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/branding/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Más Allá del Espejo - Audrey Valentina Caballero, Miss Mundo Formosa 2026",
      },
    ],
  },

  // Metadatos para X (Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Más Allá del Espejo | Audrey Caballero",
    description:
      "Proyecto social de salud mental juvenil y prevención del acoso. Miss Mundo Formosa 2026.",
    images: ["/images/branding/og-image.jpg"],
  },

  // Favicon del lazo oficial en la pestaña del navegador
  icons: {
    icon: "/images/branding/liston.svg",
    shortcut: "/images/branding/liston.svg",
    apple: "/images/branding/liston.svg",
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