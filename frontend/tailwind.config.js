/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#f97316', // Primary CTAs, active states, logo accent
          blue: '#2563eb',   // Secondary actions, links, trust markers
          black: '#09090b',  // Headers, Footers, Primary Typography
          white: '#ffffff',  // Base backgrounds
          gray: '#f4f4f5',   // Required for subtle UI borders/cards (Zinc 100)
        }
      }
    },
  },
  plugins: [],
};