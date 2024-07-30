/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx, ts, jsx, js}"
  ],
  theme: {
    extend: {
      spacing: {
        '13': '3.25rem',
        '5/7': '71.4%',
        '2/7': '28.6%'
      },
      minWidth: {
        '6xl': '68rem'
      }
    },
  },
  plugins: [],
}

