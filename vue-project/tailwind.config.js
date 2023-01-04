/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white-bg':'#FFFFFF50',
      'white-hover':'#FFFFFF20',
      'white-bg-second':'#FFFFFF80',
      'white-hover-second':'#FFFFFF60',
      'white-bg': 'rgb(255,255,255,70%)',

      'alpha': '#FFFFFF00',
      'blue': '#1890ff',
      'white': '#FFFFFF',
      'black': '#212529',
      
    },
  },
  plugins: [],
}
