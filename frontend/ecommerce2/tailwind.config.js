module.exports = {
  content: ['./src/**/*.{ts,js,jsx,tsx}'],
  theme: {
    fontSize:{
      'ssm':'0.5rem'
    },
    screens: {
      'galaxy-fold':'280px',
      'small-phone':'320px',
      'big-phone':'540px',
      'tablet': '640px',
      'big-tablet': '820px',

      'laptop': '1080px',

      'desktop': '1280px',

      'big-desktop':'1536px'
    },
    extend: {
      colors: {
        'nav-color': 'linear-gradient(0deg, rgba(216,227,231,1) 0%, rgba(18,110,130,1) 35%, rgba(19,44,51,1) 100%)'
      },
      boxShadow: {
        sm: '2px 4px 5px rgba(0, 0, 0, 0.25);',
      },
      maxWidth: {
        xsm: '22rem',
        vs: '16rem',
      },
      maxHeight: {
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

