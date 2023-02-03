/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'VeryDarkGray': 'hsl(0, 0%, 17%)',
        'DarkGray': 'hsl(0, 0%, 59%)',
        'dark': 'rgba(0, 0, 0, 0.5)'
      },
      fontFamily: {
        'rubik' : ['Rubik', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-bg': "url('/images/pattern-bg.png')",
      }
    },
  },
  plugins: [],
}
