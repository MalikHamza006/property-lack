/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#627D98',
          500: '#334E68',
          600: '#243B53',
          700: '#1A2E44',
          800: '#0F1E2E',
          900: '#0A1320',
          950: '#060B13',
        },
        gold: {
          50: '#FBF8F1',
          100: '#F5EEDD',
          200: '#EBDCB9',
          300: '#DFC089',
          400: '#D4AF37',
          500: '#C5A880',
          600: '#B38E46',
          700: '#8C6C2F',
          800: '#664E1F',
          900: '#423211',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F7F4EC',
          200: '#EFE9DC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(10, 19, 32, 0.08), 0 4px 6px -2px rgba(10, 19, 32, 0.03)',
        'luxury-hover': '0 20px 35px -10px rgba(10, 19, 32, 0.14), 0 8px 12px -3px rgba(10, 19, 32, 0.06)',
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
