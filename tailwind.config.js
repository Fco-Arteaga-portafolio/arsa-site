/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'offer-red': '#e74c3c',
        'arsa-primary': '#2563eb',
        'arsa-accent': '#7c3aed',
        'arsa-light': '#f8fafc',
        'arsa-dark': '#0f172a',
      },
    },
  },
  plugins: [],
};
