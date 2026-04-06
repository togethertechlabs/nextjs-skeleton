import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        shell: "var(--shell)",
        panel: "var(--panel)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        primary: "var(--primary)",
        accent: "var(--accent)"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15,23,42,0.08)",
        glow: "0 10px 35px rgba(47,107,255,0.2)"
      }
    }
  },
  plugins: []
};

export default config;
