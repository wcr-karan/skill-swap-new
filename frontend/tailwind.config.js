/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#4F46E5',      // Indigo-600 — primary CTA
        'brand-light': '#818CF8', // Indigo-400 — accents
        'brand-dark': '#3730A3',  // Indigo-800 — hover states
        accent: '#7C3AED',     // Violet-600 — secondary
        surface: {
          DEFAULT: '#0F1117',  // main bg
          1: '#161B27',        // card bg
          2: '#1C2333',        // elevated card
          3: '#232C40',        // border/divider
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          subtle: 'rgba(255,255,255,0.04)',
          strong: 'rgba(255,255,255,0.12)',
        },
        text: {
          primary: '#F1F5F9',    // slate-100
          secondary: '#94A3B8',  // slate-400
          muted: '#475569',      // slate-600
          accent: '#818CF8',     // indigo-400
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(79, 70, 229, 0.15)',
        'glow': '0 0 30px rgba(79, 70, 229, 0.2)',
        'glow-lg': '0 0 60px rgba(79, 70, 229, 0.25)',
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,70,229,0.15)',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
