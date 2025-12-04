/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'topcon-blue': '#5B8BD5', // Header R
        'topcon-purple': '#7030A0', // Header L
        'topcon-red': '#C00000', // Active Cell
        'topcon-yellow': '#FFC000', // S Label, Tabs
        'topcon-green': '#92D050', // Tabs
        'topcon-gray': '#A5A5A5', // Inactive
        'topcon-dark': '#404040', // Text
        'topcon-bg': '#E6E6FA', // Background hint
      }
    },
  },
  plugins: [],
}
