// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Jeremy's photography portfolio",
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    strapiSecret: "",
    public: {
      strapiUrl: "https://strapi-production-e78b.up.railway.app",
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxtjs/google-fonts", "nuxt-security", "@nuxt/image"],
  googleFonts: {
    families: {
      Roboto: true,
      Teko: true,
    },
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      crossOriginResourcePolicy: process.env.NODE_ENV === 'development' ? 'cross-origin' : 'same-origin',
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', "https://strapi-production-e78b.up.railway.app/uploads/"],
      }
    },
  },
});