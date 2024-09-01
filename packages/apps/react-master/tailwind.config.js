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
      },
      // 1.第一种修改颜色模式的操作：搭配index.css的给html定义变量，再在此处修改tailwind的变量取值
      // 这样可以通过document.getElementsByTagName("html")[0].setAttribute('data-theme','dark')修改深夜白天颜色模式
      // colors: {
      //   black: "var(--black)",
      //   white: "var(--white)",
      //   slate: {
      //     50: "var(--slate-50)",
      //     100: "var(--slate-100)",
      //     200: "var(--slate-200)",
      //     300: "var(--slate-300)",
      //     400: "var(--slate-400)",
      //     500: "var(--slate-500)",
      //     600: "var(--slate-600)",
      //     700: "var(--slate-700)",
      //     800: "var(--slate-800)",
      //     900: "var(--slate-900)",
      //     950: "var(--slate-950)"
      //   },
      // }
    },
  },
  plugins: [],
}

