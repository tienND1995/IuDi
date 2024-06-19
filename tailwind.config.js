/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
 plugins: [require('daisyui')],
 content: ['./src/**/*.{js,jsx,ts,tsx}'],
 theme: {
  extend: {
   backgroundImage: {
    'bg-card': "url('/src/images/background.jpg')",
   },
  },

  fontFamily: {
   inter: ['Inter', 'sans-serif'],
   roboto: ['Roboto', 'sans-serif'],
  },

  colors: {
   green: '#50C759',
   greenlight: '#4EC957 ',
  },

  screens: {
    tablet1: {min: '451px', max: '800px'},
    tablet: {min: '451px', max: '1200px'},
    mobile: {max: '450px'},
  },
 },
})
