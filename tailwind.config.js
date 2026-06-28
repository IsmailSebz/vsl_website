/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f0f7f1',
          100: '#d9edd9',
          200: '#b4dab6',
          300: '#80c083',
          400: '#4da052',
          500: '#2e7d32',
          600: '#1b5e20',  // PRIMARY brand green
          700: '#145218',
          800: '#0f3d12',
          900: '#0a290c',
          950: '#051506',
        },
        gold: {
          50:  '#fdf9ec',
          100: '#faf0ca',
          200: '#f5df92',
          300: '#efc95a',
          400: '#c8a84b',  // PRIMARY brand gold
          500: '#b8922f',
          600: '#9a7424',
          700: '#7a5a1c',
          800: '#5e4415',
          900: '#3d2c0d',
          950: '#1f1506',
        },
        dark: '#0D1F0F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'count-up': 'countUp 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'green-gold': 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #c8a84b 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(13,31,15,0.5) 0%, rgba(13,31,15,0.7) 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
