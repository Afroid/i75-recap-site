/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "global-nav": "#2b2c2d",
      },
      dropShadow: {
        medium: '0 2px 3px rgba(0,0,0,0.88)',
        heavy: '0 4px 6px rgba(0,0,0,0.98)',
      },
    },
  },
  plugins: [],
}
