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
    // Matches site.themePreference.
    preference: 'light',
    fallback: 'light'
  },

  runtimeConfig: {
    public: {
      // Set NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY at build time to deliver contact
      // submissions. Web3Forms access keys are designed to ship to the browser;
      // they only authorise posting to the inbox they were issued for.
      web3formsAccessKey: '58f11180-bd03-439b-bbff-35cf62e65073'
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/projects': { prerender: true },
    '/projects/**': { prerender: true },
    '/writing': { prerender: true },
    '/writing/**': { prerender: true },
    '/contact': { prerender: true },
    '/resume': { prerender: true }
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
  },

  icon: {
    clientBundle: {
      // Bundle every icon referenced in the app so SSR never falls back to a
      // runtime fetch. The default scan skips .ts, where the data files live.
      scan: {
        globInclude: ['app/**/*.{vue,ts}'],
        globExclude: ['node_modules', 'dist', '.output', '.nuxt']
      }
    }
  }
})
