/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}",
    "./src/pages/**/*.{html,js,jsx}",
    "./src/components/**/*.{html, js, jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgc: "#f5f5f5",
        primary: "#304BD3",
        secondary: "#FE1301",
        text: "#161616",
      },
    },
    fontFamily: {
      satoshi: ["Satoshi", "sans-serif"],
      bebasNeue: ["Bebas Neue", "sans-serif"],
      neueMontreal: ["PP Neue Montreal", "sans-serif"],
      neueMontrealBold: ["PP Neue Montreal Bold", "sans-serif"],
      neueMontrealBoldItalic: ["PP Neue Montreal Bold Italic", "sans-serif"],
      neueMontrealBook: ["PP Neue Montreal Book", "sans-serif"],
    },
  },
  plugins: [],
};
