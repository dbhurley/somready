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
        // Warm backgrounds — not cold tech-white
        background: '#FAFAF8',
        surface:    '#FFFFFF',
        surface2:   '#F4F4F0',
        border:     '#E5E3DD',
        'border-strong': '#C8C5BC',
        // Typography — warm, not cold
        'text-primary': '#1A1916',
        'text-muted':   '#6B6760',
        'text-faint':   '#9E9B95',
        // Accent — cyan-teal, more distinctive than sky blue
        accent:          '#0891B2',
        'accent-dark':   '#0E7490',
        'accent-light':  '#ECFEFF',
        // Ready/live indicator
        green:           '#059669',
        'green-light':   '#D1FAE5',
        // Pro tier
        purple:          '#7C3AED',
      },
      fontFamily: {
        // DM Serif Display — editorial, for H1/H2 hero headings only
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // Plus Jakarta Sans — warm humanist sans for all UI/body
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
};

export default config;
