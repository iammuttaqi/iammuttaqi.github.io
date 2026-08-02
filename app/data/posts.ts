import type { Post } from '../types/content'

/**
 * Placeholder posts, commented out until there are real ones. With the array
 * empty the Writing section is hidden from the home page and the nav, and
 * /writing renders an empty state instead of a page of nothing.
 */
export const posts: Post[] = [
  /*
  {
    title: 'Your queue is not slow, your scheduler is drifting',
    slug: 'queue-scheduler-drift',
    excerpt:
      'Everyone measures job duration. Almost nobody measures the gap between when a job was supposed to run and when it did — which is where "our queues are slow" complaints actually come from.',
    publishedAt: '2026-05-18',
    updatedAt: '2026-06-02',
    tags: ['Laravel', 'Queues', 'Observability'],
    readingTime: 8,
    coverImage: { src: '/images/writing/queue-drift.svg', alt: 'Line chart showing scheduled versus actual job start times diverging over an hour', width: 1600, height: 840 },
    body: [
      {
        type: 'paragraph',
        text: 'When someone says the queue is slow, they almost never mean job execution is slow. They mean the thing they expected to happen at 09:00 happened at 09:04. Those are different failures with different fixes, and job duration metrics cannot distinguish between them.'
      },
      { type: 'heading', text: 'The metric you are missing' },
      {
        type: 'paragraph',
        text: 'Drift is available_at minus started_at. It is trivially cheap to record and it immediately splits your problem space: high drift with low duration means you need more workers or better dispatch; low drift with high duration means the job itself is the problem.'
      },
      {
        type: 'code',
        language: 'php',
        filename: 'app/Providers/QueueDriftServiceProvider.php',
        code: `Queue::before(function (JobProcessing $event) {
    $availableAt = $event->job->payload()['availableAt'] ?? null;

    if ($availableAt === null) {
        return;
    }

    Metrics::histogram('queue.drift_seconds')
        ->withTags(['queue' => $event->job->getQueue()])
        ->observe(now()->timestamp - $availableAt);
});`
      },
      { type: 'heading', text: 'What high drift actually tells you' },
      {
        type: 'list',
        items: [
          'Drift climbing steadily through the day: dispatch rate exceeds processing rate. Add workers or shed load.',
          'Drift spiking on the minute: your scheduler is dispatching in one burst. Stagger it.',
          'Drift high on one queue only: a noisy neighbour is starving it. Separate the connection.',
          'Drift flat but non-zero: worker polling interval. Usually fine, occasionally the whole answer.'
        ]
      },
      {
        type: 'callout',
        tone: 'warning',
        title: 'Do not average this',
        text: 'Drift distributions are heavily skewed. A mean of 400ms can easily hide a p99 of 90 seconds, which is the number your users are actually experiencing.'
      },
      {
        type: 'paragraph',
        text: 'I packaged the instrumentation as muttaqi/queue-drift, but the ten lines above are the entire idea. You do not need the package; you need the metric.'
      }
    ]
  },
  {
    title: 'Store the events, derive the balance',
    slug: 'store-events-derive-balance',
    excerpt:
      'A stored balance column is a cached value that nobody treats like a cache. Here is why double-entry ledgers make a whole class of billing bug structurally impossible.',
    publishedAt: '2026-02-09',
    tags: ['Architecture', 'Billing', 'Postgres'],
    readingTime: 11,
    canonicalUrl: 'https://dev.to/muttaqi/store-the-events-derive-the-balance',
    externalPublication: 'Dev.to',
    coverImage: { src: '/images/writing/ledger.svg', alt: 'Diagram of paired ledger entries summing to zero across two accounts', width: 1600, height: 840 },
    body: [
      {
        type: 'paragraph',
        text: 'Every billing system I have been asked to fix had the same shape: a balance column, an UPDATE statement, and a race condition. The balance is a derived value being stored as a primary one, and once two requests can touch it concurrently, correctness becomes a matter of luck and lock ordering.'
      },
      { type: 'heading', text: 'The invariant' },
      {
        type: 'paragraph',
        text: 'In double-entry bookkeeping, money never appears or disappears — it moves. Every transaction produces at least two entries whose amounts sum to zero. That single rule turns "did we lose money somewhere?" from an investigation into a query.'
      },
      {
        type: 'code',
        language: 'sql',
        code: `SELECT transaction_id, SUM(amount_minor) AS drift
FROM ledger_entries
GROUP BY transaction_id
HAVING SUM(amount_minor) <> 0;`
      },
      {
        type: 'paragraph',
        text: 'If that returns rows, your system is provably wrong. If it returns nothing, an entire category of bug did not happen. Run it in CI and again nightly against production.'
      },
      { type: 'heading', text: 'But the reads' },
      {
        type: 'paragraph',
        text: 'Yes, summing a ledger on every read is slow at volume. Cache it — in a projection table, updated in the same transaction as the entries, with a reconciliation job that recomputes and compares. The difference from a stored balance is that the cache is explicitly a cache, and its divergence from truth is detectable.'
      },
      {
        type: 'quote',
        text: 'A balance you can recompute is a cache. A balance you cannot recompute is a liability.'
      }
    ]
  },
  {
    title: 'Multi-tenancy: pick two models, not one',
    slug: 'multi-tenancy-pick-two',
    excerpt:
      'The advice to commit to a single tenancy model assumes all your customers have the same compliance requirements. Mine did not.',
    publishedAt: '2025-11-24',
    tags: ['Laravel', 'Architecture', 'SaaS'],
    readingTime: 9,
    body: [
      {
        type: 'paragraph',
        text: 'Shared schema with a tenant_id is simple and scales operationally. Database-per-tenant is isolated and satisfies auditors. The standard advice is to choose one and live with it. On a platform with 400 tenants, three of whom had data residency clauses in signed contracts, choosing one meant either failing an audit or making migrations unmanageable.'
      },
      { type: 'heading', text: 'The dual-mode resolver' },
      {
        type: 'paragraph',
        text: 'The trick is to make isolation mode a property of the tenant, resolved once per request, and to make everything downstream indifferent to which mode is active. One abstraction, applied at the connection boundary.'
      },
      {
        type: 'code',
        language: 'php',
        code: `return match ($tenant->isolation) {
    Isolation::Database => $this->connections->switchTo($tenant->database),
    Isolation::Shared   => $this->scopes->applyGlobalScope($tenant->id),
};`
      },
      { type: 'heading', text: 'What it costs' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Migrations run twice: once against the shared schema, once per isolated database. Automate this on day one.',
          'Every tenancy-sensitive test runs in both modes. Your suite gets slower; your confidence gets real.',
          'New engineers need the model explained. Write it down once, properly, and link it from the README.'
        ]
      },
      {
        type: 'paragraph',
        text: 'Two years in, the cost was one abstraction and a slower test suite. The benefit was never telling a paying customer their compliance requirement was architecturally out of scope.'
      }
    ]
  },
  {
    title: 'SKIP LOCKED is the whole job queue',
    slug: 'skip-locked-job-queue',
    excerpt:
      'You probably do not need a queue broker to claim work concurrently. Postgres has shipped the primitive since 9.5 and it is four words long.',
    publishedAt: '2025-08-30',
    tags: ['Postgres', 'Queues', 'PHP'],
    readingTime: 6,
    body: [
      {
        type: 'paragraph',
        text: 'The hard part of a work queue is not storage, it is letting N workers claim disjoint work without coordinating. SELECT ... FOR UPDATE SKIP LOCKED does exactly that: each transaction takes rows nobody else has locked and steps over the rest instead of blocking.'
      },
      {
        type: 'code',
        language: 'sql',
        code: `SELECT id FROM monitors
WHERE next_run_at <= now()
ORDER BY next_run_at
LIMIT 500
FOR UPDATE SKIP LOCKED;`
      },
      {
        type: 'paragraph',
        text: 'Add a partial index on next_run_at where the monitor is active and this stays fast well past the point most applications will ever reach. It is not a replacement for Redis-backed queues at high throughput, but for scheduling work you already store in Postgres, it removes an entire moving part.'
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'Keep the claiming transaction short. Claim IDs, commit, then do the work outside the transaction — otherwise long jobs hold locks and your throughput collapses.'
      }
    ]
  }
  */
]

export const publishedPosts = posts
  .filter(post => !post.draft)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

export const postTags = [...new Set(publishedPosts.flatMap(post => post.tags))].sort()

export function findPost(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug)
}
