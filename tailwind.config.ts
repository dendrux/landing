import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#05070d",
          soft: "#0a0d16",
          card: "#0f1320",
        },
        line: "rgba(255,255,255,0.08)",
        ink: {
          DEFAULT: "#f4f6fb",
          muted: "#a4adc2",
          dim: "#6b7390",
        },
        accent: {
          DEFAULT: "#3ee08f",
          glow: "#5cffb1",
          deep: "#15a564",
        },
        violet: {
          glow: "#8b5cf6",
        },
        cyan: {
          glow: "#22d3ee",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
        display: ["var(--font-display)", "var(--font-plex)", "ui-sans-serif"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(62,224,143,0.12), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 80px -10px rgba(62,224,143,0.45)",
        "glow-violet": "0 0 80px -10px rgba(139,92,246,0.45)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-soft": "pulse-soft 3.2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
