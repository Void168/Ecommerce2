module.exports = {
  content: ['./src/**/*.{ts,js,jsx,tsx}'],
  theme: {
    screens: {
      'galaxy-fold': '280px',
      'small-phone': '320px',
      'big-phone': '540px',
      'tablet': '640px',
      'big-tablet': '820px',

      'laptop': '1080px',

      'desktop': '1280px',

      'big-desktop': '1536px',
    },
    extend: {
      backgroundImage: {
        bg: "url('/src/background/bg-login.jpg')",
        main: "url('/src/background/bg-main.jpg')",
        promo: "url('/src/background/bg-promo.jpg')",
        apple:
          "url('https://wallpapers.com/images/file/full-hd-apple-in-3d-soft-blue-7eumqvd2821gj3zr.jpg')",
        samsung: "url('https://cdn.wallpapersafari.com/76/68/7F8uTy.jpg')",
        xiaomi:
          "url('https://e0.pxfuel.com/wallpapers/163/794/desktop-wallpaper-xiaomi-3d-logo-gray-brickwall-creative-brands-xiaomi-logo-3d-art-xiaomi.jpg')",
        asus:
          "url('https://images5.alphacoders.com/312/thumb-1920-312869.jpg')",
        jbl: "url('https://images.alphacoders.com/888/888018.jpg')",
      },
      colors: {
        'nav-color':
          'linear-gradient(0deg, rgba(216,227,231,1) 0%, rgba(18,110,130,1) 35%, rgba(19,44,51,1) 100%)',
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
        '128': '30rem',
        '164': '35rem',
        '180': '37.5rem',
        '200': '42.5rem',
        '256': '45rem',
      },
      left: {
        '2/5': '40%',
      },
      transitionProperty: {
        height: 'height',
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
