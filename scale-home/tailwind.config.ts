import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-card': '#F7F8FA',
        'bg-alt': '#F1F2F6',
        'bg-navy': '#0A1628',
        'accent-gold': '#F0C030',
        'accent-gold-muted': 'rgba(240, 192, 48, 0.12)',
        'accent-blue': '#1428A0',
        'navy': '#0F1D32',
        'navy-light': '#1A2D4A',
        'text-primary': '#0F172A',
        'text-secondary': '#334155',
        'text-muted': '#64748B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      letterSpacing: {
        'eyebrow': '0.2em',
        'stat': '0.15em',
      },
    },
  },
  plugins: [],
};
export default config;
