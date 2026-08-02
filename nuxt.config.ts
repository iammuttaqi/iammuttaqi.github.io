// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui'
  ],

  $development: {
    image: {
      // `ipxStatic` deliberately skips registering the /_ipx/ route handler, and
      // there is no prerender pass in dev to write the files it would serve — so
      // every generated URL 404s and the site renders with broken images. `ipx`
      // registers the handler and resizes on request. Identical URLs either way,
      // so what you see in dev is what the build writes to disk.
      provider: 'ipx'
    }
  },

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
      // Delivers contact submissions. Web3Forms access keys are designed to
      // ship to the browser; they only authorise posting to the inbox they
      // were issued for, so this belongs in the repo rather than in a secret.
      // NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY overrides it — but note that setting
      // that variable to an empty string wipes the key and breaks the form.
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
  },

  image: {
    // The site deploys as static files, so there is no IPX server to resize on
    // request. `ipxStatic` writes every variant to disk during prerendering and
    // rewrites the markup to point at those files instead of /_ipx/ routes.
    provider: 'ipxStatic',

    // Only the profile photo is a raster today. SVGs pass through untouched —
    // NuxtImg cannot resize them — so the logos, testimonial and writing covers
    // are unaffected either way. Project screenshots are the reason to have this
    // configured before they land.
    quality: 82,
    format: ['webp'],

    // 1x and 2x only. A 3x variant of a 487px portrait is 1461px of image for a
    // display class almost nobody browses a résumé site on.
    densities: [1, 2]
  }
})
