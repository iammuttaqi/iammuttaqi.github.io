// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts", '@nuxt/image'],

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
      ],
      meta: [
        { name: 'description', content: 'Full-stack Developer' },
        { property: 'og:site_name', content: 'Muntaser Muttaqi Resume' },
        { property: 'keywords', content: 'muntaser muttaqi, muttaqi, web developer, full stack developer, web developer bangladesh, laravel, livewire, inertiajs, vuejs, tailwindcss, laravel bangladesh' },
        { property: 'author', content: 'Muntaser Muttaqi' },
        { property: 'og:title', content: 'Muntaser Muttaqi' },
        { property: 'og:type', content: 'Resume' },
        { property: 'og:url', content: 'https://iammuttaqi.github.io' },
        { property: 'og:image', content: '/avatar.png' },
        { property: 'twitter:title', content: 'Muntaser Muttaqi' },
        { property: 'twitter:description', content: 'Full-stack Developer' },
        { property: 'twitter:image', content: '/avatar.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: '@iammuttaqi' },
      ]
    }
  },

  image: {

  },

  compatibilityDate: '2024-10-23'
})