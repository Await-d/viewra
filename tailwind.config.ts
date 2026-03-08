import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#edf9ff',
          100: '#d6f1ff',
          200: '#a9e5ff',
          300: '#76d5ff',
          400: '#35b8ff',
          500: '#0d9fff',
          600: '#067dd4',
          700: '#0d639f',
          800: '#124f7d',
          900: '#163f64'
        }
      },
      boxShadow: {
        panel: '0 24px 64px -36px rgba(15, 23, 42, 0.35)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
