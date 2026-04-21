/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#6366F1', // Indigo (matches auth pages)
        accent: '#A78BFA', // Soft Purple
        emerald: '#10B981', // Emerald Green (kept for skill tags)
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      }
    },
  },
  plugins: [],
}
