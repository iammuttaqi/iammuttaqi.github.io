import type { OpenSourceItem } from '~/types/content'

export const openSource: OpenSourceItem[] = [
  {
    name: 'muttaqi/idempotent-webhooks',
    description:
      'Drop-in idempotency for inbound webhooks in Laravel. Deduplicates by provider event ID, replays safely, and exposes a dead-letter table you can actually query.',
    repoUrl: 'https://github.com/muttaqi/idempotent-webhooks',
    packageUrl: 'https://packagist.org/packages/muttaqi/idempotent-webhooks',
    registry: 'packagist',
    stats: { stars: 874, forks: 63, downloads: 191_000 },
    role: 'author',
    language: 'PHP',
    contributions: [],
    order: 1
  },
  {
    name: 'muttaqi/artisan-insights',
    description:
      'Sampled production query profiling for Laravel with N+1 pattern detection. Archived in favour of Laravel Pulse, kept for the sampling design.',
    repoUrl: 'https://github.com/muttaqi/artisan-insights',
    packageUrl: 'https://packagist.org/packages/muttaqi/artisan-insights',
    registry: 'packagist',
    stats: { stars: 612, forks: 41, downloads: 48_000 },
    role: 'author',
    language: 'PHP',
    contributions: [],
    order: 2
  },
  {
    name: 'muttaqi/queue-drift',
    description:
      'Measures the gap between when a job was meant to run and when it actually ran, and exposes it as a Prometheus metric.',
    repoUrl: 'https://github.com/muttaqi/queue-drift',
    packageUrl: 'https://packagist.org/packages/muttaqi/queue-drift',
    registry: 'packagist',
    stats: { stars: 318, forks: 22, downloads: 27_400 },
    role: 'author',
    language: 'PHP',
    contributions: [],
    order: 3
  },
  {
    name: 'nuxt-composer-audit',
    description: 'Nuxt module rendering Composer advisory data at build time. Small, single-purpose, mostly built to scratch an itch.',
    repoUrl: 'https://github.com/muttaqi/nuxt-composer-audit',
    packageUrl: 'https://www.npmjs.com/package/nuxt-composer-audit',
    registry: 'npm',
    stats: { stars: 96, forks: 7, downloads: 4_200 },
    role: 'maintainer',
    language: 'TypeScript',
    contributions: [],
    order: 4
  },
  {
    name: 'External contributions',
    description: 'Patches merged into projects I depend on. Mostly small — the ones worth listing are the ones that changed behaviour.',
    repoUrl: 'https://github.com/muttaqi',
    stats: { stars: 0, forks: 0, downloads: 0 },
    role: 'contributor',
    language: 'PHP',
    order: 5,
    contributions: [
      {
        repo: 'laravel/framework',
        url: 'https://github.com/laravel/framework/pull/00000',
        description: 'Preserve queue connection when a job is released from a batch, fixing silent connection fallback',
        merged: true
      },
      {
        repo: 'laravel/horizon',
        url: 'https://github.com/laravel/horizon/pull/00000',
        description: 'Report wait time per queue rather than per connection in the metrics endpoint',
        merged: true
      },
      {
        repo: 'pestphp/pest',
        url: 'https://github.com/pestphp/pest/pull/00000',
        description: 'Documentation for dataset composition with higher-order expectations',
        merged: true
      },
      {
        repo: 'brick/money',
        url: 'https://github.com/brick/money/pull/00000',
        description: 'Add allocation strategy preserving remainder distribution order across repeated calls',
        merged: false
      }
    ]
  }
]

export const sortedOpenSource = [...openSource].sort((a, b) => a.order - b.order)

export const openSourceTotals = openSource.reduce(
  (totals, item) => ({
    stars: totals.stars + item.stats.stars,
    forks: totals.forks + item.stats.forks,
    downloads: totals.downloads + item.stats.downloads
  }),
  { stars: 0, forks: 0, downloads: 0 }
)
