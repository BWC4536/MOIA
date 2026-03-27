/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background:                  '#0e0e10',
        surface:                     '#0e0e10',
        'surface-dim':               '#0e0e10',
        'surface-container':         '#19191d',
        'surface-container-low':     '#131316',
        'surface-container-high':    '#1f1f24',
        'surface-container-highest': '#25252b',
        'surface-container-lowest':  '#000000',
        'surface-bright':            '#2b2c32',
        'surface-variant':           '#25252b',
        'on-surface':                '#e7e4ec',
        'on-surface-variant':        '#acaab1',
        'outline-variant':           '#47474e',
        outline:                     '#75757c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
