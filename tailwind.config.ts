import type { Config } from 'tailwindcss'

export default {
  content: [ "./app/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config

