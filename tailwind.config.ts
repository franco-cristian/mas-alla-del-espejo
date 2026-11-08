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
        mirror: {
          gold: {
            50: "#FCF9EE",
            100: "#F8F0D3",
            200: "#F2E2A7",
            300: "#EAD27B",
            400: "#E5C555",
            500: "#D4AF37", // Oro emblema
            600: "#B89328",
            700: "#8E6F1C",
            800: "#654E14",
            900: "#3D2E0B",
          },
          cream: "#FAF8F5",
          sand: "#F0ECE1",
          charcoal: "#18181B",
          crisis: {
            bg: "#FEF2F2",
            border: "#EF4444",
            text: "#991B1B",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;