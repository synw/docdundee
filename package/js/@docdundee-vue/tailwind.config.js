const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@snowind/plugin'),
    require('tailwindcss-semantic-colors'),
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      maxWidth: {
        'prose': '100ch',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: 'normal',
            },
            'code::after': {
              content: 'normal',
            },
          },
        },
      }),
      semanticColors: {
        secondary: {
          light: {
            bg: colors.neutral[300],
            txt: colors.neutral[800]
          },
          dark: {
            bg: colors.stone[900],
            txt: colors.neutral[100]
          }
        }
      }
    }
  }
}