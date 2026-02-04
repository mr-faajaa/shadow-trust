import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        solana: {
          purple: '#9945FF',
          green: '#14F195',
          dark: '#0D0D0D',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(153, 69, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(153, 69, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
