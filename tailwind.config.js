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
        heavy: '0 4px 6px rgba(0,0,0,0.98)',
      },
    },
  },
  plugins: [],
}
