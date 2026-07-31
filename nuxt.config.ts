// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    // Matches site.themePreference — laravel.com defaults dark.
    preference: 'dark',
    fallback: 'dark'
  },

  runtimeConfig: {
    // Set NUXT_CONTACT_WEBHOOK_URL in the environment to deliver contact submissions.
    contactWebhookUrl: ''
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/projects': { prerender: true },
    '/projects/**': { prerender: true },
    '/writing': { prerender: true },
    '/writing/**': { prerender: true },
    '/contact': { prerender: true },
    '/api/contact': { prerender: false }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/rss.xml', '/robots.txt']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
