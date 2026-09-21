import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: {
          DEFAULT: "#0F172A",
          dark: "#0B0F19",
          card: "#13182C",
          cardHover: "#181F38",
          sidebar: "#0D111E",
          border: "#1E2540",
          borderLight: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          pink: "#FF3B81",
          magenta: "#EC4899",
          purple: "#A855F7",
          violet: "#8B5CF6",
          indigo: "#6366F1",
          blue: "#3B82F6",
          cyan: "#38BDF8",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(135deg, #FF3B81 0%, #A855F7 50%, #6366F1 100%)",
        "gradient-sidebar": "linear-gradient(180deg, #0D111E 0%, #0A0D17 100%)",
        "gradient-card-border": "linear-gradient(135deg, rgba(255,59,129,0.3) 0%, rgba(168,85,247,0.2) 50%, rgba(59,130,246,0.1) 100%)",
        "gradient-hero-orb": "radial-gradient(circle, rgba(236,72,153,0.85) 0%, rgba(168,85,247,0.75) 45%, rgba(59,130,246,0.6) 85%, transparent 100%)",
        "gradient-metrics": "linear-gradient(90deg, #F43F5E 0%, #A855F7 35%, #6366F1 70%, #3B82F6 100%)",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(168, 85, 247, 0.3)",
        "glow-md": "0 0 25px -5px rgba(236, 72, 153, 0.4)",
        "glow-lg": "0 0 40px -10px rgba(168, 85, 247, 0.5)",
        "glow-pink": "0 0 25px -5px rgba(255, 59, 129, 0.5)",
        "glow-card": "0 10px 30px -10px rgba(168, 85, 247, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
