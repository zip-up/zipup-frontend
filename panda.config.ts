import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/components/**/*.{ts,tsx,js,jsx}', './src/pages/**/*.{ts,tsx,js,jsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          'pretendard-bold': { value: 'var(--font-pretendard-bold), Menlo, monospace' },
          'pretendard-semibold': { value: 'var(--font-pretendard-semibold), Menlo, monospace' },
          'pretendard-regular': { value: 'var(--font-pretendard-regular), Menlo, monospace' },
        },
        colors: {
          gray: {
            10: { value: '#F8F9FA' },
            20: { value: '#EDF0F2' },
            30: { value: '#D7DCE0' },
            40: { value: '#C2C8CE' },
            50: { value: '#A7AFB7' },
            60: { value: '#6A737B' },
            70: { value: '#485057' },
            80: { value: '#32383E' },
            90: { value: '#2A2F34' },
            100: { value: '#1E2025' },
            110: { value: '#141517' },
          },
          main: {
            blue: { value: '#0098E8' },
            sky: { value: '#22CEFF' },
            green: { value: '#9BE180' },
            black: { value: '#1E2025' },
          },
          blue: {
            10: { value: '#E0F5FF' },
            20: { value: '#B1E3FE' },
            30: { value: '#7BD2FC' },
            40: { value: '#44C1FA' },
            50: { value: '#02B3FA' },
            60: { value: '#05A5F8' },
            70: { value: '#0098E8' },
            80: { value: '#0385D5' },
            90: { value: '#0074C1' },
            100: { value: '#00549E' },
          },
          green: {
            10: { value: '#EEFAE9' },
            20: { value: '#D6F2CA' },
            30: { value: '#B8EAA5' },
            40: { value: '#9BE180' },
            50: { value: '#82DA63' },
            60: { value: '#6CD24A' },
            70: { value: '#5DC142' },
            80: { value: '#48AC38' },
            90: { value: '#329830' },
            100: { value: '#02751F' },
          },
          success: { value: '#0098E8' },
          error: { value: '#EB5281' },
          bg: {
            100: { value: '#FFF' },
            200: { value: '#F8F9FA' },
            300: { value: '#EDF0F2' },
          },
          text: {
            100: { value: '#1E2025' },
            200: { value: '#0098E8' },
            300: { value: '#05A5F8' },
          },
        },
        fontSizes: {
          title1: { value: '2.8rem' },
          title2: { value: '2.4rem' },
          subtitle1: { value: '2rem' },
          subtitle2: { value: '1.8rem' },
          body1: { value: '1.6rem' },
          body2: { value: '1.4rem' },
          caption1: { value: '1.2rem' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
