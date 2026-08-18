import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050608",
          secondary: "#090B10",
          card: "#0D1017",
          soft: "#11141C",
        },
        ink: {
          DEFAULT: "#F7F8FA",
          secondary: "#A1A7B3",
          // raised from #6F7683 to clear WCAG AA (>=4.5:1) on every surface
          muted: "#868C9C",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.13)",
        },
        brand: {
          magenta: "#FF2EA6",
          violet: "#A855F7",
          blue: "#3287FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1320px",
      },
      borderRadius: {
        card: "20px",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(100deg, #FF2EA6 0%, #A855F7 45%, #3287FF 100%)",
      },
      keyframes: {
        "pulse-travel": {
          "0%": { offsetDistance: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { offsetDistance: "100%", opacity: "0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(3%, -4%, 0)" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "glow-drift": "glow-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
