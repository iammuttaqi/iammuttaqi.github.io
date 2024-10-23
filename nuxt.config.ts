// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts"],

  fonts: {
    families: [
      { name: 'Poppins', provider: 'google' }
    ]
  },

  colorMode: {
    preference: 'light'
  },

  app: {
    head: {
      title: 'Muntaser Muttaqi',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  compatibilityDate: '2024-10-23'
})