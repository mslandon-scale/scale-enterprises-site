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
        'bg-primary': '#05070D',
        'bg-card': '#0F2449',
        'bg-alt': '#0A1A3A',
        'bg-navy': '#0A1A3A',
        'bg-deep-black': '#05070D',
        'accent-gold': '#C9A24B',
        'accent-gold-light': '#D4AF37',
        'accent-gold-muted': 'rgba(201, 162, 75, 0.12)',
        'accent-blue': '#1428A0',
        'navy': '#0B1F4B',
        'navy-light': '#122B5E',
        'navy-card': '#0F2449',
        'text-primary': '#F0F0F0',
        'text-secondary': '#B8C4D8',
        'text-muted': '#7A8BA8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        'serif-display': ['var(--font-serif)', 'Georgia', 'serif'],
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
