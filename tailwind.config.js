/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#9DA9B7',
        surface: '#F3F5F7',
        card: '#FFFFFF',
        darkPill: '#181A1E',
        accentOrange: '#FF5722',
        accentTerracotta: '#E65100',
        softBlue: '#3B82F6',
        subtleBorder: '#E6E9EE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}

