import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: colors.slate[200],
        ring: colors.slate[400],
        foreground: colors.slate[950],
        muted: {
          DEFAULT: colors.slate[100],
          foreground: colors.slate[500],
        },
        primary: colors.indigo[700],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
