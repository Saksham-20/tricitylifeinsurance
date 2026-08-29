import type { Config } from "tailwindcss";

/**
 * Design system: institutional-trust palette for a life-insurance career portal.
 * Deep navy "ink" for authority sections, LIC blue as the single action colour,
 * gold reserved for the Bima Sakhi / recognition track, WhatsApp green for chat.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core brand
        primary: {
          DEFAULT: "#0B4CCB",
          50: "#EEF4FF",
          100: "#DCE7FF",
          200: "#BBD0FF",
          300: "#8FB0FF",
          400: "#5C89FA",
          500: "#2E64EC",
          600: "#0B4CCB",
          700: "#083BA1",
          800: "#0A2F7C",
          900: "#0B2760",
        },
        // Authority surfaces
        ink: {
          DEFAULT: "#0A1628",
          soft: "#12233F",
          muted: "#1C3157",
        },
        gold: {
          DEFAULT: "#E5A400",
          50: "#FFF9E8",
          100: "#FFF0C4",
          200: "#FFE28A",
          300: "#F8CC4A",
          400: "#EDB81C",
          500: "#E5A400",
          600: "#B87F00",
          700: "#8A5E00",
        },
        whatsapp: { DEFAULT: "#167C3A", dark: "#126C32" },

        // Neutrals / semantics
        canvas: "#F6F8FC",
        surface: {
          DEFAULT: "#FFFFFF",
          sunken: "#F1F5FB",
          tint: "#EEF3FD",
        },
        line: {
          DEFAULT: "#E3E9F3",
          strong: "#CFD8E8",
        },
        content: {
          DEFAULT: "#0F1B2E",
          muted: "#53627C",
          faint: "#7C8AA3",
          invert: "#FFFFFF",
        },
        success: { DEFAULT: "#12794F", soft: "#E9F7F0" },
        danger: { DEFAULT: "#B3261E", soft: "#FDECEA" },

        // Legacy aliases (kept so older markup keeps compiling)
        background: "#F6F8FC",
        "on-surface": "#0F1B2E",
        "on-surface-variant": "#53627C",
        "on-background": "#0F1B2E",
        "surface-variant": "#E3E9F3",
        "surface-container": "#F1F5FB",
        "surface-container-low": "#F6F8FC",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-high": "#E9EEF7",
        "surface-container-highest": "#E3E9F3",
        outline: "#7C8AA3",
        "outline-variant": "#CFD8E8",
        "primary-dim": "#083BA1",
        "primary-container": "#DCE7FF",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#0B2760",
        secondary: "#E5A400",
        "secondary-container": "#FFF0C4",
        error: "#B3261E",
        "error-container": "#FDECEA",
      },
      fontFamily: {
        headline: ["var(--font-plex)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        label: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display scale — clamps keep headlines readable at 375px.
        display: ["clamp(2.25rem, 1.4rem + 3.6vw, 4.25rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        h1: ["clamp(1.95rem, 1.3rem + 2.7vw, 3.35rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        h2: ["clamp(1.6rem, 1.15rem + 1.9vw, 2.5rem)", { lineHeight: "1.14", letterSpacing: "-0.02em" }],
        h3: ["clamp(1.25rem, 1.05rem + 0.85vw, 1.6rem)", { lineHeight: "1.22", letterSpacing: "-0.015em" }],
        h4: ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        lead: ["clamp(1rem, 0.95rem + 0.35vw, 1.175rem)", { lineHeight: "1.65" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      borderRadius: {
        DEFAULT: "0.625rem",
        lg: "0.875rem",
        xl: "1.125rem",
        "2xl": "1.375rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        full: "9999px",
      },
      boxShadow: {
        // One elevation ramp; nothing in the UI invents its own shadow.
        xs: "0 1px 2px rgba(10, 22, 40, 0.05)",
        sm: "0 2px 6px rgba(10, 22, 40, 0.06)",
        md: "0 8px 24px -8px rgba(10, 22, 40, 0.12)",
        lg: "0 18px 44px -16px rgba(10, 22, 40, 0.18)",
        xl: "0 34px 70px -30px rgba(10, 22, 40, 0.28)",
        ring: "0 0 0 1px rgba(227, 233, 243, 1)",
        "primary-md": "0 12px 28px -12px rgba(11, 76, 203, 0.55)",
        "primary-lg": "0 20px 44px -18px rgba(11, 76, 203, 0.6)",
        // Legacy aliases
        "elevation-1": "0 1px 2px rgba(10, 22, 40, 0.05)",
        "elevation-2": "0 8px 24px -8px rgba(10, 22, 40, 0.12)",
        "elevation-3": "0 18px 44px -16px rgba(10, 22, 40, 0.18)",
        "elevation-4": "0 34px 70px -30px rgba(10, 22, 40, 0.28)",
        glass: "0 18px 44px -16px rgba(10, 22, 40, 0.18)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        inout: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "reveal-up": {
          from: { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.55" },
          "70%,100%": { transform: "scale(1.9)", opacity: "0" },
        },
        "pulse-subtle": { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.82" } },
      },
      animation: {
        "reveal-up": "reveal-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        marquee: "marquee 32s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
      maxWidth: { shell: "78rem", prose: "68ch" },
      zIndex: { nav: "50", overlay: "40", float: "30" },
    },
  },
  plugins: [],
};

export default config;
