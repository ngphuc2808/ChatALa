/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B1B2FF',
        secondary: '#AAC4FF',
        'blue-light': '#D2DAFF',
        'blue-lighter': '#EEF1FF'
      },
    },
  },
  plugins: [],
};
