/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'irish': ['"Irish Grover"', 'sans-serif'],
    },

    extend: {
      scale:{
        '65':'0.65',
        '45':'0.45'
      }
    },
  },
  plugins: [],
}

