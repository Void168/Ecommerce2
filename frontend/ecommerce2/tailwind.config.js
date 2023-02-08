module.exports = {
  content: ['./src/**/*.{ts,js,jsx,tsx}'],
  theme: {
    extend: {
      color: {
        'dark-blue': '#041C32',
        'light-orange': '#ECB365',
        'dark-light-blue': '#04293A',
        'light-blue': '#064663',
      },
      boxShadow: {
        sm: '2px 4px 5px rgba(0, 0, 0, 0.25);',
      },
      maxWidth: {
        xsm: '22rem',
        vs: '16rem',
      },
      minHeight: {
        xl: '24rem',
      },
      height: {
        '256': '50rem',
        '300': '60rem',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-focus'],
    },
  },
  plugins: [],
}
