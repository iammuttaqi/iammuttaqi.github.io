import type { Project } from '~/types/content'

export const projects: Project[] = [
  {
    title: 'Pulsecheck',
    slug: 'pulsecheck',
    summary: 'Uptime and dependency monitoring built specifically for PHP teams, with Composer advisory ingestion.',
    problem:
      'Generic uptime monitors tell you a site is down. They do not tell you that the outage started when an abandoned Composer package shipped a breaking patch release. PHP teams were stitching together three tools and a spreadsheet to answer one question: what changed?',
    category: 'saas',
    status: 'in-development',
    featured: true,
    order: 1,
    role: 'Founder and sole engineer',
    owned: [
      'Entire backend: ingestion, scheduling, alerting',
      'Postgres schema and partitioning strategy',
      'Terraform-managed infrastructure on Hetzner',
      'Billing integration via Cashier and Stripe'
    ],
    teamSize: 1,
    timeline: { start: '2025-11', label: 'Nov 2025 — present' },
    stack: ['Laravel 12', 'PHP 8.4', 'Postgres 16', 'Redis', 'Horizon', 'Inertia', 'Vue 3', 'Tailwind', 'Terraform', 'Hetzner'],
    liveUrl: 'https://pulsecheck.dev',
    repoUrl: 'https://github.com/muttaqi/pulsecheck',
    architecture: [
      {
        decision: 'Time-series checks stored in partitioned Postgres tables rather than a dedicated TSDB',
        rationale:
          'At the target volume (~40M rows/month) Postgres with monthly range partitions and BRIN indexes is fast enough, and it keeps operational surface to one database the team already knows.',
        tradeoff: 'Rollup queries are hand-written instead of free. Revisit if retention grows past 18 months.'
      },
      {
        decision: 'Every probe result is written through an idempotency key derived from (monitor_id, scheduled_for)',
        rationale:
          'Workers retry. Without a deterministic key, a retried job double-counts an outage and pages the customer twice.',
        tradeoff: 'One extra unique index on a hot write path.'
      },
      {
        decision: 'Alert delivery is a separate queue connection with its own Redis instance',
        rationale:
          'A flood of probe jobs must never delay the alert that tells a customer they are down. Isolation beats prioritisation.'
      },
      {
        decision: 'Composer advisories ingested nightly from the Packagist security API into a local mirror',
        rationale:
          'Rate limits and availability of a third-party API should not determine whether a customer-facing page renders.'
      }
    ],
    challenges: [
      {
        challenge: 'Probe scheduling drifted: jobs queued every 60s slowly fell behind under load, so "1-minute checks" became 90-second checks.',
        solution:
          'Replaced per-monitor scheduled jobs with a single dispatcher that claims a batch of due monitors with SELECT ... FOR UPDATE SKIP LOCKED and dispatches them in bulk. Drift dropped from ~30s to under 2s at p99.'
      },
      {
        challenge: 'Alert storms — one shared dependency going down produced hundreds of near-identical notifications.',
        solution:
          'Added a correlation window: alerts within 90 seconds sharing a root cause fingerprint are folded into a single digest notification with an expandable list.'
      },
      {
        challenge: 'Postgres autovacuum could not keep up with the check-results table.',
        solution:
          'Monthly range partitions plus dropping whole partitions on retention expiry, instead of DELETE. Vacuum pressure effectively disappeared.'
      }
    ],
    outcomes: [
      { metric: 'Private beta teams', value: '38', detail: 'Onboarded without paid acquisition' },
      { metric: 'Probes per day', value: '1.4M', detail: 'Two application servers, one worker box' },
      { metric: 'p99 alert latency', value: '4.2s', detail: 'From probe failure to notification sent' },
      { metric: 'Infrastructure cost', value: '$96/mo', detail: 'At current beta volume' }
    ],
    screenshots: [
      { src: '/images/projects/pulsecheck-dashboard.svg', alt: 'Pulsecheck dashboard showing uptime timelines for eight monitored services', width: 1600, height: 1000 },
      { src: '/images/projects/pulsecheck-incident.svg', alt: 'Incident detail view correlating a failed probe with a recently released Composer package version', width: 1600, height: 1000 },
      { src: '/images/projects/pulsecheck-advisories.svg', alt: 'Dependency advisory list highlighting two critical severity packages', width: 1600, height: 1000 }
    ],
    // Swap type to 'video' and src to an .mp4 in public/media once a real recording exists.
    demo: {
      type: 'gif',
      src: '/images/projects/pulsecheck-demo.svg',
      poster: '/images/projects/pulsecheck-dashboard.svg',
      alt: 'Screen recording walking through creating a monitor and triggering a test alert'
    },
    body: [
      { type: 'heading', text: 'Why build another monitor' },
      {
        type: 'paragraph',
        text: 'The trigger was a real incident. A logistics platform I worked on went down for 22 minutes because a transitive Composer dependency published a patch release that changed a timezone default. Our uptime monitor fired correctly. It just could not tell us why, and the 40 minutes we spent bisecting the deploy were the expensive part, not the 22 minutes of downtime.'
      },
      {
        type: 'paragraph',
        text: 'Pulsecheck starts from the assumption that "is it up?" and "what changed?" are the same question asked twice. It ingests probe results, deploy markers and Composer lockfile diffs into one timeline, so an incident view can put a failed health check next to the package version that landed 90 seconds earlier.'
      },
      { type: 'heading', text: 'Shape of the system' },
      {
        type: 'paragraph',
        text: 'Three moving parts: a dispatcher that decides what to probe, a worker pool that probes it, and an evaluator that turns raw results into incidents. Keeping evaluation out of the probe worker means a slow probe never delays incident detection for an unrelated monitor.'
      },
      {
        type: 'code',
        language: 'php',
        filename: 'app/Jobs/DispatchDueProbes.php',
        code: `public function handle(MonitorRepository $monitors): void
{
    DB::transaction(function () use ($monitors) {
        $due = $monitors->claimDue(limit: 500);

        $due->each(fn (Monitor $monitor) => ProbeMonitor::dispatch($monitor)
            ->onQueue('probes')
            ->withIdempotencyKey($monitor->idempotencyKeyFor($this->window)));
    });
}`
      },
      {
        type: 'paragraph',
        text: 'claimDue() is the interesting part — it is a single SELECT ... FOR UPDATE SKIP LOCKED against a partial index on monitors where next_run_at <= now(). Multiple dispatchers can run concurrently without coordinating, which is what makes the scheduler horizontally scalable.'
      },
      { type: 'heading', text: 'What I would change' },
      {
        type: 'list',
        items: [
          'Partitioning was added after the table hit 60M rows. It should have been there on day one; retrofitting cost a weekend.',
          'I wrote a custom alert templating layer before validating that anyone wanted it. Nobody did. It was deleted.',
          'Inertia was the right call for speed, but the incident timeline would be better as an isolated island rather than a full-page component.'
        ]
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Status',
        text: 'Private beta. Public launch targeted for Q4 2026 once the alerting rules engine leaves the "clever" phase and enters the "predictable" phase.'
      }
    ]
  },

  {
    title: 'Meridian Freight OS',
    slug: 'meridian-freight-os',
    summary: 'Multi-tenant logistics platform tracking shipments, customs documents and settlement across 11 countries.',
    problem:
      'Freight forwarders ran their operations on email threads and spreadsheets. A single shipment touched six parties, and every handoff lost state. The company needed one system of record without forcing every partner onto the same workflow.',
    category: 'saas',
    status: 'live',
    featured: true,
    order: 2,
    role: 'Backend lead',
    owned: [
      'Event sourcing model for shipment lifecycle',
      'Tenant isolation strategy and migration tooling',
      'Public partner API and webhook delivery',
      'Mentoring two mid-level backend engineers'
    ],
    teamSize: 9,
    timeline: { start: '2023-02', end: '2026-06', label: 'Feb 2023 — Jun 2026' },
    stack: ['Laravel 10 → 12', 'PHP 8.2', 'MySQL 8', 'Redis', 'Horizon', 'Elasticsearch', 'Livewire', 'AWS ECS', 'Terraform'],
    liveUrl: 'https://meridianfreight.example.com',
    architecture: [
      {
        decision: 'Shipment state modelled as an append-only event stream with projected read models',
        rationale:
          'Customs disputes are settled by proving what was known at a point in time. An audit log bolted onto mutable rows never survives that scrutiny.',
        tradeoff: 'Every new read requirement needs a projector and a replay. Onboarding cost for new engineers roughly doubled.'
      },
      {
        decision: 'Database-per-tenant for enterprise accounts, shared schema with tenant_id for the long tail',
        rationale:
          'Three enterprise customers had contractual data residency requirements. Forcing all 400 tenants into isolated databases would have made migrations unmanageable.',
        tradeoff: 'Two code paths in the tenancy layer, tested separately.'
      },
      {
        decision: 'Webhook delivery through a dedicated queue with exponential backoff and a dead-letter table',
        rationale: 'Partner endpoints are unreliable by default. Delivery guarantees had to live on our side of the boundary.'
      }
    ],
    challenges: [
      {
        challenge: 'Projection rebuilds took 14 hours, which made schema changes to read models effectively impossible during business hours.',
        solution:
          'Rewrote projectors to run in parallel by aggregate ID with chunked replay and a versioned projection table, then swapped atomically. Rebuild time fell to 40 minutes.'
      },
      {
        challenge: 'Elasticsearch and MySQL drifted out of sync during high-volume imports, producing shipments that were searchable but not viewable.',
        solution:
          'Moved indexing off model events onto the event stream itself, so search became just another projection with the same replay guarantees as everything else.'
      },
      {
        challenge: 'Onboarding a tenant took a week of manual setup.',
        solution:
          'Built an artisan provisioning command that creates the database, runs migrations, seeds reference data and issues API credentials. Onboarding dropped to under an hour.'
      }
    ],
    outcomes: [
      { metric: 'Shipments tracked', value: '2.1M', detail: 'Across 11 countries' },
      { metric: 'Events per day', value: '4.8M', detail: 'Peak sustained throughput' },
      { metric: 'Manual reconciliation time', value: '−82%', detail: 'Measured against the pre-launch spreadsheet process' },
      { metric: 'p95 API response', value: '140ms', detail: 'Down from 610ms after the projection rewrite' }
    ],
    screenshots: [
      { src: '/images/projects/meridian-shipments.svg', alt: 'Shipment list view with status filters and customs document indicators', width: 1600, height: 1000 },
      { src: '/images/projects/meridian-timeline.svg', alt: 'Event timeline for a single shipment showing every state transition with actor and timestamp', width: 1600, height: 1000 }
    ],
    body: [
      { type: 'heading', text: 'The system of record problem' },
      {
        type: 'paragraph',
        text: 'A freight shipment is a conversation between a shipper, a forwarder, a carrier, a customs broker, a warehouse and a consignee. Each party has their own software or no software at all. The failure mode is not that data is wrong — it is that six parties each hold a slightly different version of it and only discover the divergence when money is owed.'
      },
      {
        type: 'paragraph',
        text: 'We solved this by refusing to store shipment state as mutable rows. Every change is an event with an actor, a timestamp and a payload. The current state of a shipment is a fold over its events, materialised into read models for query performance. When a customs authority asks what we knew on 14 March, the answer is a replay, not an argument.'
      },
      { type: 'heading', text: 'Tenancy without dogma' },
      {
        type: 'paragraph',
        text: 'The common advice is to pick one tenancy model and commit. We did not, and I still think that was correct. Three enterprise customers had data residency clauses in their contracts; 400 smaller forwarders had no such requirement and would have been badly served by the operational overhead of isolated databases.'
      },
      {
        type: 'code',
        language: 'php',
        filename: 'app/Tenancy/TenantResolver.php',
        code: `public function resolve(Request $request): Tenant
{
    $tenant = $this->tenants->findByDomain($request->getHost());

    return match ($tenant->isolation) {
        Isolation::Database => $this->connections->switchTo($tenant->database),
        Isolation::Shared   => $this->scopes->applyGlobalScope($tenant->id),
    };
}`
      },
      {
        type: 'paragraph',
        text: 'The cost of that decision was one extra abstraction and a test suite that runs every tenancy-sensitive test twice, once per isolation mode. The benefit was that we never had to tell a customer their compliance requirement was out of scope.'
      },
      { type: 'heading', text: 'Handing it over' },
      {
        type: 'paragraph',
        text: 'I left in June 2026 after a three-month handover. Most of that time went into writing the architecture decision records that had lived in my head, and into pairing with the two engineers I had been mentoring until they were comfortable running a projection rebuild without me on a call.'
      }
    ]
  },

  {
    title: 'Ledgerline',
    slug: 'ledgerline',
    summary: 'Double-entry billing engine handling subscriptions, usage metering and proration for a fintech client.',
    problem:
      'The client had grown past what Stripe subscriptions alone could express: hybrid seat-plus-usage pricing, mid-cycle plan changes and revenue recognition that finance could actually audit. Their existing billing code had six known double-charge bugs.',
    category: 'client',
    status: 'live',
    featured: true,
    order: 3,
    role: 'Contract backend engineer',
    owned: [
      'Double-entry ledger schema and invariants',
      'Proration and usage metering engine',
      'Stripe reconciliation jobs',
      'Property-based test suite for money arithmetic'
    ],
    teamSize: 4,
    timeline: { start: '2022-05', end: '2023-01', label: 'May 2022 — Jan 2023' },
    stack: ['Laravel 9', 'PHP 8.1', 'Postgres 14', 'Stripe', 'Cashier', 'Pest', 'brick/money'],
    architecture: [
      {
        decision: 'Every monetary movement is two ledger entries that must sum to zero',
        rationale:
          'Double-entry makes an entire class of bug structurally impossible: money cannot appear or vanish without a matching entry. A nightly invariant check either passes or the system is provably wrong.',
        tradeoff: 'More rows, more joins, and engineers had to learn accounting vocabulary.'
      },
      {
        decision: 'All amounts stored as integer minor units with an explicit currency, never floats',
        rationale: 'Floating point and money are incompatible. brick/money enforces this at the type level.'
      },
      {
        decision: 'Stripe treated as a payment processor, not a source of truth',
        rationale:
          'Our ledger is authoritative; Stripe webhooks reconcile against it. Inverting this makes every Stripe outage a correctness problem rather than an availability problem.'
      }
    ],
    challenges: [
      {
        challenge: 'Mid-cycle plan changes with usage already accrued produced off-by-one-day proration that finance rejected.',
        solution:
          'Modelled billing periods as half-open intervals and drove every proration calculation through one function with property-based tests asserting that adjacent periods never overlap and never leave gaps.'
      },
      {
        challenge: 'Retried Stripe webhooks caused duplicate ledger entries.',
        solution: 'Persisted the Stripe event ID with a unique constraint and made webhook handling idempotent by construction.'
      }
    ],
    outcomes: [
      { metric: 'Double-charge incidents', value: '0', detail: 'In the 18 months post-launch' },
      { metric: 'Monthly billed volume', value: '$3.4M', detail: 'At handover' },
      { metric: 'Month-end close', value: '3 days → 4 hours', detail: 'Finance team self-reported' },
      { metric: 'Ledger invariant checks', value: '100% pass', detail: 'Nightly, since launch' }
    ],
    screenshots: [
      { src: '/images/projects/ledgerline-invoice.svg', alt: 'Invoice detail view showing line items, proration adjustments and the corresponding ledger entries', width: 1600, height: 1000 }
    ],
    body: [
      { type: 'heading', text: 'Billing is an accounting problem wearing a software costume' },
      {
        type: 'paragraph',
        text: 'The client asked for a billing rewrite. What they actually needed was a ledger. Their existing system stored a balance column and mutated it — which is why it had six known double-charge bugs and an unknown number of silent ones. A balance that is stored rather than derived is a bug waiting for concurrency.'
      },
      {
        type: 'quote',
        text: 'The first month-end close after launch took four hours instead of three days. Nobody had to open a spreadsheet.',
        cite: 'Client finance lead'
      },
      { type: 'heading', text: 'Invariants over tests' },
      {
        type: 'paragraph',
        text: 'Unit tests prove that specific cases work. Invariants prove that whole categories of failure cannot happen. We ran three continuously: entries per transaction sum to zero, no account balance derived from the ledger disagrees with its cached projection, and no billing period overlaps another for the same subscription.'
      },
      {
        type: 'code',
        language: 'php',
        filename: 'tests/Invariants/LedgerBalancesTest.php',
        code: `it('never lets a transaction leave money unaccounted for', function () {
    $unbalanced = DB::table('ledger_entries')
        ->select('transaction_id')
        ->groupBy('transaction_id')
        ->havingRaw('SUM(amount_minor) <> 0')
        ->get();

    expect($unbalanced)->toBeEmpty();
});`
      },
      {
        type: 'paragraph',
        text: 'That test runs in CI and again nightly against production data. It has never failed in production, which is the entire point: the schema makes the failure hard, and the check makes it loud if the schema is ever wrong.'
      }
    ]
  },

  {
    title: 'Artisan Insights',
    slug: 'artisan-insights',
    summary: 'Open-source Laravel package surfacing slow queries and N+1 patterns from production traces.',
    problem:
      'Debugbar is a local tool. Once code is in production, the queries that actually hurt you are invisible unless you already run APM. Small teams needed the middle ground.',
    category: 'open-source',
    status: 'archived',
    featured: false,
    order: 4,
    role: 'Author',
    owned: ['Package design and API', 'Sampling strategy', 'Documentation and release process'],
    teamSize: 1,
    timeline: { start: '2021-03', end: '2024-08', label: 'Mar 2021 — Aug 2024' },
    stack: ['PHP 8.0', 'Laravel 8–11', 'SQLite', 'Blade'],
    repoUrl: 'https://github.com/muttaqi/artisan-insights',
    architecture: [
      {
        decision: 'Sample at 1% of requests by default, with per-route overrides',
        rationale: 'Query logging on every request is itself a performance problem. Sampling makes the tool safe to leave enabled.'
      },
      {
        decision: 'Store traces in a separate SQLite file rather than the application database',
        rationale: 'Diagnostics should never contend with production writes, and a file is trivially disposable.'
      }
    ],
    challenges: [
      {
        challenge: 'N+1 detection produced false positives on legitimately batched loops.',
        solution: 'Fingerprinted queries by normalised SQL and only flagged patterns exceeding a configurable repetition threshold within one request.'
      }
    ],
    outcomes: [
      { metric: 'Packagist installs', value: '48k', detail: 'Lifetime' },
      { metric: 'GitHub stars', value: '612' },
      { metric: 'Contributors', value: '19' }
    ],
    screenshots: [
      { src: '/images/projects/artisan-insights-report.svg', alt: 'Artisan Insights report listing the ten slowest queries with N+1 warnings', width: 1600, height: 1000 }
    ],
    body: [
      { type: 'heading', text: 'Archived, deliberately' },
      {
        type: 'paragraph',
        text: 'Laravel Pulse shipped in 2024 and did most of what this package did, first-party and better maintained. Keeping a redundant package alive is a disservice to the people who install it, so I archived the repository, wrote a migration note pointing at Pulse, and left the last release working on Laravel 11.'
      },
      {
        type: 'paragraph',
        text: 'It is here because the sampling design is the part I still reuse. Making diagnostics cheap enough to leave on is a more useful property than making them detailed.'
      }
    ]
  }
]

export const featuredProjects = projects.filter(project => project.featured).sort((a, b) => a.order - b.order)

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order)

export function findProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}
