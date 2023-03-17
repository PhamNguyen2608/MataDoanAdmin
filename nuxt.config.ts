// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    // Keys within public are also exposed client-side
    public: {
      apiBase: process.env.BASE_API,
      apiKey: process.env.X_API_KEY,
    }
  },


  sourcemap: {
    server: true,
    client: true,
  },

  // import css 
  css: [
    "@/assets/scss/main.scss",
    "@/assets/template/assets/vendors/mdi/css/materialdesignicons.min.css",
    "@/assets/template/assets/vendors/css/vendor.bundle.base.css",
    "@/assets/template/assets/vendors/jvectormap/jquery-jvectormap.css",
    "@/assets/template/assets/vendors/flag-icon-css/css/flag-icon.min.css",
    "@/assets/template/assets/vendors/owl-carousel-2/owl.carousel.min.css",
    "@/assets/template/assets/vendors/owl-carousel-2/owl.theme.default.min.css",
    "@/assets/template/assets/css/style.css",
  ],

  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt'
  ],  
  
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&family=Mulish:wght@200&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css",
        },
        {
          rel: "shortcut icon",
          href: "/_nuxt/assets/template/assets/images/favicon.png",
        },
        {
          href: "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js",
        },
      ],
      script: [
        { src: "/_nuxt/assets/template/assets/vendors/js/vendor.bundle.base.js", body: true },
        { src: "/_nuxt/assets/template/assets/vendors/chart.js/Chart.min.js", body: true },
        { src: "/_nuxt/assets/template/assets/vendors/progressbar.js/progressbar.min.js", body: true },
        { src: "/_nuxt/assets/template/assets/vendors/jvectormap/jquery-jvectormap.min.js", body: true },
        { src: "/_nuxt/assets/template/assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js", body: true },
        { src: "/_nuxt/assets/template/assets/vendors/owl-carousel-2/owl.carousel.min.js", body: true },

        { src: "/_nuxt/assets/template/assets/js/off-canvas.js", body: true },
        { src: "/_nuxt/assets/template/assets/js/hoverable-collapse.js", body: true },
        { src: "/_nuxt/assets/template/assets/js/misc.js", body: true },
        { src: "/_nuxt/assets/template/assets/js/settings.js", body: true },
        { src: "/_nuxt/assets/template/assets/js/todolist.js", body: true },

        { src: "/_nuxt/assets/template/assets/js/dashboard.js", body: true },
      ]
    },
  },

  // asset config
  vite: {
    build: {
      sourcemap: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_colors.scss" as *;'
        }
      }
    },
    define: {
      'process.env.DEBUG': false,
    },
  }
})
