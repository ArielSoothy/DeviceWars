/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        player1: 'var(--player1)',
        player2: 'var(--player2)',
        gold: 'var(--gold)',
        magic: 'var(--magic)',
        speed: 'var(--speed)',
        surface: {
          DEFAULT: 'var(--surface)',
          border: 'var(--surface-border)',
          hover: 'var(--surface-hover)',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
    },
  },
  plugins: [],
};
