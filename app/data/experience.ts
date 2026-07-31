import type { Experience } from '~/types/content'

export const experience: Experience[] = [
  {
    company: 'Meridian Freight',
    companyUrl: 'https://meridianfreight.example.com',
    logo: { src: '/images/logos/meridian.svg', alt: 'Meridian Freight logo', width: 96, height: 96 },
    title: 'Backend Lead',
    employmentType: 'Full-time',
    startDate: '2023-02',
    endDate: '2026-06',
    location: 'Singapore',
    remote: true,
    summary:
      'Led backend architecture for a multi-tenant logistics platform serving 400+ freight forwarders. Owned the event-sourced shipment core, the partner API, and the tenancy layer. Ran design reviews and mentored two mid-level engineers.',
    achievements: [
      'Cut p95 API response time from 610ms to 140ms by rewriting projections to replay in parallel by aggregate',
      'Reduced projection rebuild time from 14 hours to 40 minutes, making read-model schema changes routine',
      'Automated tenant provisioning, dropping onboarding from one week of manual setup to under an hour',
      'Took webhook delivery success from 91% to 99.7% with a dedicated queue, exponential backoff and a dead-letter workflow',
      'Introduced ADRs and a weekly architecture review; both outlived my tenure'
    ],
    stack: ['Laravel', 'PHP 8.2', 'MySQL 8', 'Redis', 'Horizon', 'Elasticsearch', 'Livewire', 'AWS ECS', 'Terraform', 'Datadog'],
    projects: [
      { name: 'Shipment event core', description: 'Append-only event stream with versioned projections and atomic swap rebuilds' },
      { name: 'Partner API v2', description: 'Public REST API with idempotency keys, cursor pagination and signed webhooks' },
      { name: 'Tenancy layer', description: 'Dual-mode isolation: database-per-tenant for enterprise, shared schema for the long tail' }
    ],
    order: 1
  },
  {
    company: 'Northgate Digital',
    companyUrl: 'https://northgate.example.com',
    logo: { src: '/images/logos/northgate.svg', alt: 'Northgate Digital logo', width: 96, height: 96 },
    title: 'Senior Backend Engineer',
    employmentType: 'Full-time',
    startDate: '2021-01',
    endDate: '2023-01',
    location: 'Dhaka, Bangladesh',
    remote: false,
    summary:
      'Product engineering for a fintech client portfolio. Split between building a double-entry billing engine and hardening existing Laravel applications that had outgrown their original architecture.',
    achievements: [
      'Designed and shipped a double-entry billing engine handling $3.4M/month with zero double-charge incidents in 18 months',
      'Reduced month-end close for the client finance team from three days to four hours',
      'Migrated four legacy applications from Laravel 6 to 9 with no customer-visible downtime',
      'Established Pest as the house test framework and lifted average coverage on new code from 34% to 81%'
    ],
    stack: ['Laravel', 'PHP 8.1', 'Postgres', 'Stripe', 'Cashier', 'Pest', 'GitHub Actions', 'Docker'],
    projects: [
      { name: 'Ledgerline', description: 'Double-entry billing engine with usage metering and proration', url: '/projects/ledgerline' },
      { name: 'Legacy upgrade programme', description: 'Four Laravel 6 applications brought to 9 behind feature flags' }
    ],
    order: 2
  },
  {
    company: 'Rivet Studio',
    companyUrl: 'https://rivet.example.com',
    title: 'Full-stack Developer',
    employmentType: 'Full-time',
    startDate: '2019-06',
    endDate: '2020-12',
    location: 'Dhaka, Bangladesh',
    remote: false,
    summary:
      'Agency work: 20+ client projects across e-commerce, booking systems and internal tools. Learned to scope tightly, ship on fixed budgets, and hand off codebases someone else would maintain.',
    achievements: [
      'Delivered 20+ Laravel projects across e-commerce, booking and internal tooling',
      'Built the studio\'s reusable Laravel starter kit, cutting project setup from three days to half a day',
      'Introduced deploy automation, replacing manual FTP releases with zero-downtime deploys via Envoyer'
    ],
    stack: ['Laravel', 'PHP 7.4', 'MySQL', 'Vue 2', 'Alpine.js', 'Bootstrap', 'Envoyer'],
    projects: [
      { name: 'Studio starter kit', description: 'Opinionated Laravel scaffold with auth, roles, media handling and CI preconfigured' }
    ],
    order: 3
  },
  {
    company: 'Independent',
    title: 'Freelance PHP Developer',
    employmentType: 'Freelance',
    startDate: '2018-03',
    endDate: '2019-05',
    location: 'Remote',
    remote: true,
    summary:
      'Self-taught start: WordPress sites and small custom PHP applications for local businesses. This is where I learned that the hard part of software is the second year, not the first.',
    achievements: [
      'Shipped 14 client sites solo, from scoping through hosting and handover',
      'Moved from raw PHP to Laravel after the third project taught me why frameworks exist'
    ],
    stack: ['PHP', 'WordPress', 'MySQL', 'jQuery', 'Laravel 5'],
    projects: [],
    order: 4
  }
]

export const sortedExperience = [...experience].sort((a, b) => a.order - b.order)
