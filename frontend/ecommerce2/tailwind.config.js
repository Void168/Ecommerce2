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
        cellphone: "url('https://www.androidauthority.com/wp-content/uploads/2020/12/Walli-screenshot-2021.jpg')",
        tablet: "url('https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/04/ipad-pro-wallpaper.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1')",
        laptop: "url('https://c1.wallpaperflare.com/preview/811/367/789/technology-computer-creative-design.jpg')",
        watch: "url('https://images.hindustantimes.com/img/2022/07/14/1600x900/Collage_Maker-14-Jul-2022-12.23-PM_1657781633185_1657781662467_1657781662467.jpg')",
        sound: "url('https://wallpaperaccess.com/full/1876893.jpg')",
        accessory: "url('https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",
        house: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHTGKRL4robU4JRqVVj0YrmCqSm9mok_d1xbmuks7jnOvw9V13fpgeSgsCPD7wQyI_bes&usqp=CAU')",
        apple:
          "url('https://wallpapers.com/images/file/full-hd-apple-in-3d-soft-blue-7eumqvd2821gj3zr.jpg')",
        samsung: "url('https://cdn.wallpapersafari.com/76/68/7F8uTy.jpg')",
        xiaomi:
          "url('https://e0.pxfuel.com/wallpapers/163/794/desktop-wallpaper-xiaomi-3d-logo-gray-brickwall-creative-brands-xiaomi-logo-3d-art-xiaomi.jpg')",
        asus:
          "url('https://images5.alphacoders.com/312/thumb-1920-312869.jpg')",
        jbl: "url('https://images.alphacoders.com/888/888018.jpg')",
        product: "url('https://free4kwallpapers.com/uploads/originals/2021/02/04/future-tech-city-wallpaper.jpg')",
        watched: "url('https://c4.wallpaperflare.com/wallpaper/109/664/851/black-texture-wallpaper-preview.jpg')"
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
        '256': '47rem',
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
