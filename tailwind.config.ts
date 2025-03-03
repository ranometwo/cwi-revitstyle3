import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Professional color palette for architecture/construction
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a3f6',
          500: '#0c87e8',
          600: '#0068c6',
          700: '#0054a3',
          800: '#004786',
          900: '#003c70',
          950: '#00254a',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef3',
          200: '#d2dae5',
          300: '#adbcce',
          400: '#8398b1',
          500: '#637a97',
          600: '#4d617c',
          700: '#3f4e65',
          800: '#374356',
          900: '#313a4a',
          950: '#1e242f',
        },
        accent: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d6',
          300: '#86efb8',
          400: '#4ade8e',
          500: '#22c56c',
          600: '#16a354',
          700: '#158045',
          800: '#16653a',
          900: '#145432',
          950: '#052e1a',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
          950: '#0d0f10',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;