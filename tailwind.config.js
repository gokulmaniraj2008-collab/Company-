/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        white: '#F5F5F5',
        crimson: {
          DEFAULT: '#DC143C',
          dark: '#A50E2D',
          light: '#FF1F4F',
        },
        zinc: {
          900: '#111111',
          800: '#1A1A1A',
          700: '#2A2A2A',
          600: '#3A3A3A',
          500: '#5A5A5A',
          400: '#8A8A8A',
          300: '#AAAAAA',
          200: '#CCCCCC',
          100: '#EEEEEE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
