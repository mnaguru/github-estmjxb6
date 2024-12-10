/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e1ed',
          200: '#b3c2db',
          300: '#8da3c9',
          400: '#6784b7',
          500: '#4165a5',
          600: '#345084',
          700: '#273c63',
          800: '#1a2842',
          900: '#0d1421',
        },
        gold: {
          50: '#fdf9e9',
          100: '#f9ecbb',
          200: '#f5e08d',
          300: '#f1d45f',
          400: '#edc831',
          500: '#d4b118',
          600: '#a68c13',
          700: '#79660e',
          800: '#4c4009',
          900: '#1f1a04',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
      boxShadow: {
        'mac': '0 2px 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      minHeight: {
        '11': '2.75rem',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      lineHeight: {
        'relaxed': '1.75',
      },
    },
  },
  plugins: [],
};