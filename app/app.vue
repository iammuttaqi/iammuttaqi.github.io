<script setup lang="ts">
import { about, identity } from '~/data/identity'
import { sortedEducation } from '~/data/credentials'
import { sortedExperience } from '~/data/experience'
import { site } from '~/data/site'
import { skills } from '~/data/skills'

const route = useRoute()
const canonical = computed(() => absoluteUrl(route.path, site.domain))

useHead({
  titleTemplate: title => (title ? `${title} — ${identity.fullName}` : site.title),
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#F53003' },
    { name: 'author', content: identity.fullName }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'canonical', href: canonical },
    // Instrument Sans and JetBrains Mono are self-hosted by @nuxt/fonts — no external stylesheet needed.
    { rel: 'alternate', type: 'application/rss+xml', title: `${identity.fullName} — Writing`, href: site.feeds.rss }
  ],
  htmlAttrs: {
    lang: site.locale
  }
})

useSeoMeta({
  title: site.title,
  description: site.description,
  ogSiteName: identity.fullName,
  ogTitle: site.title,
  ogDescription: site.description,
  ogImage: absoluteUrl(site.ogImage, site.domain),
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: site.title,
  twitterDescription: site.description,
  twitterImage: absoluteUrl(site.ogImage, site.domain)
})

/** JSON-LD Person schema — one graph for the whole site. */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': identity.fullName,
  'jobTitle': identity.title,
  'description': identity.heroBio,
  'url': site.domain,
  'image': absoluteUrl(identity.photo.src, site.domain),
  'email': `mailto:${site.contact.email}`,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': identity.location.city,
    'addressCountry': identity.location.country
  },
  'sameAs': site.socials.map(social => social.url),
  'knowsLanguage': about.languages.map(language => language.name),
  'knowsAbout': skills.map(skill => skill.name),
  'alumniOf': sortedEducation.map(entry => ({
    '@type': 'CollegeOrUniversity',
    'name': entry.institution
  })),
  'worksFor': sortedExperience.slice(0, 1).map(role => ({
    '@type': 'Organization',
    'name': role.company,
    'url': role.companyUrl
  }))
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(personSchema) },
    ...(site.analyticsId && !site.analyticsId.includes('X')
      ? [
          { src: `https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`, async: true },
          {
            innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.analyticsId}')`
          }
        ]
      : [])
  ]
})
</script>

<template>
  <UApp>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      Skip to content
    </a>

    <AppHeader />

    <UMain id="main">
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
