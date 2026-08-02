import type { Repo } from '../types/content'

/**
 * Stats are real numbers, checked by hand. They are small, and that is fine —
 * inflating them would be the only way to make them worse.
 */
export const repos: Repo[] = [
  {
    name: 'iammuttaqi/filament-fakester',
    description:
      'One-click fake data for Filament form fields in development. Puts a sparkles button next to every text input and resolves sensible values from the field name and type — `email` gets an email, `latitude` gets a coordinate, `slug` gets a slug. Hidden in production by default.',
    repoUrl: 'https://github.com/iammuttaqi/filament-fakester',
    packageUrl: 'https://packagist.org/packages/iammuttaqi/filament-fakester',
    registry: 'packagist',
    stats: { stars: 0, forks: 0, downloads: 75 },
    role: 'author',
    language: 'PHP',
    contributions: []
  },
  {
    name: 'iammuttaqi/al-quran',
    description:
      'A minimal, ad-free environment to read, study and listen to the Noble Quran. Built for myself first, then kept polishing because other people started using it.',
    repoUrl: 'https://github.com/iammuttaqi/al-quran',
    stats: { stars: 8, forks: 0, downloads: 0 },
    role: 'author',
    language: 'TypeScript',
    contributions: []
  },
  {
    name: 'iammuttaqi/discord-bot-starter-nodejs',
    description:
      'A stripped-back Discord bot scaffold for Node.js — commands, events and token handling wired up, nothing else. Written after setting the same thing up by hand one too many times.',
    repoUrl: 'https://github.com/iammuttaqi/discord-bot-starter-nodejs',
    stats: { stars: 0, forks: 0, downloads: 0 },
    role: 'author',
    language: 'JavaScript',
    contributions: []
  }
]

export const repoTotals = repos.reduce(
  (totals, item) => ({
    stars: totals.stars + item.stats.stars,
    forks: totals.forks + item.stats.forks,
    downloads: totals.downloads + item.stats.downloads
  }),
  { stars: 0, forks: 0, downloads: 0 }
)
