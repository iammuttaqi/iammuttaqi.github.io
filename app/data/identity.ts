import type { About, Identity } from '~/types/content'

export const identity: Identity = {
  fullName: 'Muntaser Muttaqi',
  title: 'Senior Laravel Engineer',
  tagline: 'I build PHP backends that stay boring under load.',
  pronunciation: 'moon-TAH-ser moo-TAH-kee',
  status: {
    state: 'open-to-work',
    label: 'Open to senior backend roles',
    detail: 'Available from September 2026 · full-time or contract'
  },
  location: {
    city: 'Dhaka',
    country: 'Bangladesh',
    timezone: 'Asia/Dhaka',
    utcOffset: 'UTC+6',
    remoteFriendly: true
  },
  photo: {
    src: '/images/profile.webp',
    alt: 'Muntaser Muttaqi, wearing glasses and a dark shirt, against a plain grey backdrop',
    width: 750,
    height: 750
  },
  heroBio:
    'Seven years of shipping Laravel applications for fintech and logistics teams — queues, billing, multi-tenancy and the observability that stops a 3 a.m. page. Currently building Pulsecheck, an uptime and dependency monitor for PHP teams.'
}

export const about: About = {
  yearsOfExperience: 7,
  bio: [
    'I am a senior backend engineer working almost entirely in PHP and Laravel. My work sits at the point where product features meet infrastructure: payment flows that must not double-charge, job pipelines that must not silently drop, and tenant isolation that must not leak. I care about the unglamorous parts — idempotency keys, database indexes, retry semantics — because those are the parts that decide whether a product survives its first real traffic spike.',
    'I started as a self-taught PHP developer building WordPress sites for local businesses, moved into agency work where I learned to ship fast against a fixed budget, and then spent five years on product teams where I learned the opposite lesson: what you ship, you maintain. That tension shaped how I work now. I write the boring solution first, instrument it heavily, and only reach for complexity once the metrics justify it.',
    'These days I lead backend architecture for a logistics platform moving several million events a day, mentor two mid-level engineers, and maintain a handful of Laravel packages. Outside of client work I write about queue design and PHP performance, and I am slowly learning Rust — mostly so I stop hand-waving when someone says "just rewrite the hot path".'
  ],
  careerNarrative:
    'Self-taught PHP → agency generalist → product engineer → backend lead. Every step traded breadth for depth in the same stack, which is why I can still be useful on the frontend but am most valuable behind the API boundary.',
  specialization: [
    'Laravel application architecture',
    'Queues, jobs and event-driven workflows',
    'Multi-tenant SaaS and billing systems',
    'Database performance and query tuning',
    'Observability: tracing, metrics, structured logs'
  ],
  currentlyBuilding: [
    'Pulsecheck — dependency and uptime monitoring built for PHP teams',
    'A Laravel package for idempotent webhook ingestion'
  ],
  currentlyLearning: [
    'Rust, for CPU-bound workloads that PHP should not be doing',
    'OpenTelemetry semantics beyond the happy path',
    'Postgres logical replication for zero-downtime migrations'
  ],
  languages: [
    { name: 'Bengali', proficiency: 'Native' },
    { name: 'English', proficiency: 'Fluent', note: 'Daily working language for 7 years' },
    { name: 'Arabic', proficiency: 'Conversational', note: 'Reading stronger than speaking' },
    { name: 'Hindi', proficiency: 'Conversational' }
  ],
  interests: [
    'Long-distance cycling',
    'Mechanical keyboards (currently on a 65% with silent tactiles)',
    'Film photography',
    'Teaching weekend PHP workshops'
  ]
}
