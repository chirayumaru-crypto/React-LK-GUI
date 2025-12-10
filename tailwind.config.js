/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'topcon-blue': {
          900: '#1e3a8a', // Deep header blue
          800: '#1e40af',
          700: '#1d4ed8',
          600: '#2563eb', // Active button blue
          100: '#dbeafe', // Light cell blue
        },
        'topcon-gray': {
          50: '#f8fafc',
          100: '#f1f5f9', // Background
          200: '#e2e8f0', // Borders
          300: '#cbd5e1',
          400: '#94a3b8',
          800: '#334155', // Text
        },
        // Legacy MingSing palette for compatibility
        'ms-dark': '#2B4B85',
        'ms-medium': '#4A72C5',
        'ms-cell': '#BFE1F6',
        'ms-bg': '#F0F2F5',
        'ms-active': '#FFFF00', // Bright yellow for selection
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      boxShadow: {
        'panel': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'key': 'inset 0 -2px 0 rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.1)',
        'key-active': 'inset 0 2px 4px rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
}
