/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3A57E8',
          light: '#4B6AFF',
          dark: '#2A47D8',
        },
        secondary: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
          dark: '#4B5563',
        },
        background: {
          DEFAULT: '#F5F7F9',
          light: '#FFFFFF',
          dark: '#E5E7EB',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      fontFamily: {
        sans: ['var(--font-manrope)'],
      },
    },
  },
  plugins: [],
};
