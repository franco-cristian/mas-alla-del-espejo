import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        gold: {
          50: "#FCF9ED",
          100: "#F9F3D5",
          200: "#F5E7AA",
          300: "#F0D778",
          400: "#E9C54B",
          500: "#DFB028", // Oro principal de la corona
          600: "#C2921C",
          700: "#9C6F15",
          800: "#755013",
          900: "#4D3410",
        },
        ivory: {
          50: "#FFFEFC",
          100: "#FDFBF7", // Fondo principal de lectura cálido
          200: "#F9F5EC",
          300: "#F3EDE0",
          400: "#E8DEC9",
        },
        espresso: {
          DEFAULT: "#262017", // Tipografía principal elegante
          muted: "#6B5E4F",
          subtle: "#9E8E7D",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;