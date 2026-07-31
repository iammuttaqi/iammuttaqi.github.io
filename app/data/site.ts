import type { SiteConfig } from '~/types/content'

/**
 * Global site configuration.
 *
 * NOTE: values here are seeded placeholders — replace with your real details.
 * The domain is used to build canonical URLs, the sitemap, and the RSS feed.
 */
export const site: SiteConfig = {
  domain: 'https://muttaqi.dev',
  title: 'Muntaser Muttaqi — Senior Laravel Engineer',
  description:
    'Senior backend engineer specialising in Laravel, event-driven PHP and the infrastructure that keeps it online. Case studies, open source and writing.',
  ogImage: '/og-image.svg',
  locale: 'en',
  themePreference: 'dark',
  analyticsId: 'G-XXXXXXXXXX',

  nav: [
    { label: 'Work', to: '/projects', icon: 'i-lucide-layout-grid' },
    { label: 'About', to: '/about', icon: 'i-lucide-user' },
    { label: 'Writing', to: '/writing', icon: 'i-lucide-pen-line' },
    { label: 'Contact', to: '/contact', icon: 'i-lucide-mail' }
  ],

  footer: {
    text: 'Built with Nuxt, Nuxt UI and far too much coffee. Deployed on the edge.',
    copyrightHolder: 'Muntaser Muttaqi',
    startYear: 2019
  },

  contact: {
    email: 'muntasermuttaqi@gmail.com',
    bookingUrl: 'https://cal.com/muttaqi/intro',
    responseTime: 'Usually within 24 hours on weekdays'
  },

  socials: [
    { label: 'GitHub', handle: '@muttaqi', url: 'https://github.com/muttaqi', icon: 'i-simple-icons-github' },
    { label: 'LinkedIn', handle: 'in/muttaqi', url: 'https://linkedin.com/in/muttaqi', icon: 'i-simple-icons-linkedin' },
    { label: 'X', handle: '@muttaqi', url: 'https://x.com/muttaqi', icon: 'i-simple-icons-x' },
    { label: 'YouTube', handle: '@muttaqi', url: 'https://youtube.com/@muttaqi', icon: 'i-simple-icons-youtube' },
    { label: 'Instagram', handle: '@muttaqi', url: 'https://instagram.com/muttaqi', icon: 'i-simple-icons-instagram' },
    { label: 'Dev.to', handle: '@muttaqi', url: 'https://dev.to/muttaqi', icon: 'i-simple-icons-devdotto' },
    { label: 'Packagist', handle: 'muttaqi', url: 'https://packagist.org/packages/muttaqi/', icon: 'i-simple-icons-packagist' }
  ],

  resume: {
    file: '/resume/muntaser-muttaqi-cv.pdf',
    updatedAt: '2026-07-14',
    variants: [
      { label: 'Backend / Laravel', file: '/resume/muntaser-muttaqi-backend.pdf', audience: 'Platform and API roles' },
      { label: 'Full-stack', file: '/resume/muntaser-muttaqi-fullstack.pdf', audience: 'Product teams shipping end to end' },
      { label: 'Contract / consulting', file: '/resume/muntaser-muttaqi-consulting.pdf', audience: 'Short engagements and audits' }
    ]
  },

  notFound: {
    code: '404',
    title: 'This route is not registered',
    description: 'The page you asked for was never bound to the container.',
    hint: 'php artisan route:list'
  },

  feeds: {
    rss: '/rss.xml',
    sitemap: '/sitemap.xml'
  }
}

export const currentYear = new Date().getFullYear()
