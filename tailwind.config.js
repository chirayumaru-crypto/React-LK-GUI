/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ms-dark': '#2B4B85',      // Deep Royal Blue for Headers/Right vertical bar
        'ms-medium': '#4A72C5',    // Lighter blue for active buttons
        'ms-cell': '#BFE1F6',      // Very light blue for grid cells
        'ms-bg': '#F0F2F5',        // General background
        'ms-gray': '#E5E7EB',      // Disabled/Inactive
        'ms-red': '#DC2626',
        'ms-green': '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'], // For digital numbers
      }
    },
  },
  plugins: [],
}
