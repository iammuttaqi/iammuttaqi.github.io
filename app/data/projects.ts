import type { Project } from '../types/content'

export const projects: Project[] = [
  {
    title: 'Gymscanner',
    slug: 'gymscanner',
    summary: 'Global platform for booking gym memberships, tourist passes and personal training sessions across 100+ cities.',
    problem:
      'Getting into a gym in a city you do not live in means contracts, joining fees and a conversation at a front desk in a language you may not speak. Gymscanner turns that into a booking: find a gym or a trainer, pay for the sessions you want, turn up. On the other side of the marketplace, gyms and trainers get a way to sell access without building any of it themselves.',
    // TODO(muttaqi): the sections below are the honest shell. Fill in the specifics
    // you are comfortable publishing — I have deliberately left out anything I
    // could not verify rather than guessing.
    category: 'saas',
    status: 'live',
    featured: true,
    role: 'Lead Web Engineer',
    owned: [
      'The web application end to end — schema, application code, interface, release',
      'Booking and listing flows for both sides of the marketplace',
      'Keeping the stack current across Laravel, Livewire and Filament major versions'
      // TODO(muttaqi): add anything else you own — payments? admin tooling? the API? mobile backend?
    ],
    teamSize: 0, // TODO(muttaqi): how many people on the engineering team?
    timeline: { start: '2021-08', label: 'Aug 2021 — present' },
    stack: ['Laravel', 'Livewire', 'Filament', 'Vue', 'Inertia', 'Alpine.js', 'Tailwind CSS', 'MySQL', 'Git'],
    liveUrl: 'https://gymscanner.com',
    architecture: [
      // TODO(muttaqi): two or three decisions you made and would defend. The shape
      // that works is: what you chose, why, and what it cost you. Examples of the
      // kind of thing worth writing up — how bookings avoid double-selling the same
      // slot, how gym availability is modelled across time zones, why Livewire
      // rather than a SPA, how payouts to gyms are reconciled.
    ],
    challenges: [
      // TODO(muttaqi): problems that were genuinely hard, and how you got out of
      // them. These are the most-read part of a case study — one concrete example
      // beats three vague ones.
    ],
    outcomes: [
      // TODO(muttaqi): only numbers you are allowed to publish and can stand behind.
      // If there are none, delete this array — an empty outcomes list is far better
      // than a rounded guess.
    ],
    screenshots: [],
    body: [
      { type: 'heading', text: 'A marketplace with two very different sides' },
      {
        type: 'paragraph',
        text: 'Gymscanner sells access to physical places. That sounds like e-commerce until you notice that the inventory is a room with a capacity, opening hours, a local time zone and a human being who might not update anything for a week. The interesting engineering is not the checkout — it is keeping a listing honest.'
      }
      // TODO(muttaqi): a few paragraphs on the work. Written from memory is fine;
      // specific beats polished. What surprised you, what you would build
      // differently, what you are proud of that nobody notices.
    ]
  },

  {
    title: 'Aurora',
    slug: 'aurora',
    summary: 'Product authenticity platform: manufacturers and shops get verified, every unit gets a serial number and a QR code, and buyers can check the chain themselves.',
    problem:
      'A counterfeit looks exactly like the real thing right up to the moment it fails. The usual answer — a hologram sticker, a phone number to call — asks the buyer to trust a second thing that is equally easy to fake. Aurora moves the proof off the packaging and onto a chain of custody the buyer can verify from their own phone.',
    category: 'saas',
    status: 'live',
    featured: true,
    role: 'Sole engineer — undergraduate thesis project',
    owned: [
      'Domain model: profiles, products, ownership transfer and the rules that guard it',
      'Role-based access for admins, manufacturers and shops',
      'QR code generation and the public verification pages',
      'Admin approval workflow, notifications and reminder mail'
    ],
    teamSize: 1,
    timeline: { start: '2023-06', end: '2026-07', label: 'Jun 2023 — Jul 2026' },
    stack: ['Laravel 13', 'PHP 8.4', 'Filament 5', 'Livewire 4', 'Jetstream', 'Sanctum', 'MySQL', 'Tailwind CSS', 'Pest', 'bacon/bacon-qr-code'],
    repoUrl: 'https://github.com/iammuttaqi/aurora',
    architecture: [
      {
        choice: 'A single Profile model carries both manufacturers and shops, with nullable role-specific fields',
        rationale:
          'The two roles share most of what matters — approval state, QR code, address, ownership of products — and differ mostly in which fields are filled in. One table means one approval workflow and one policy to reason about.',
        tradeoff: 'A wide table with a lot of nullable columns, and validation that has to branch on role rather than lean on the schema.'
      },
      {
        choice: 'A profile\'s QR code is generated once, when an admin approves it, and can never be changed',
        rationale:
          'The QR code is the proof. If it can be regenerated, it proves nothing — an attacker who compromises an account could mint a fresh one. It is removed from the fillable attributes entirely and written through a separate admin-only path.',
        tradeoff: 'No recovery if a code is ever issued wrongly. That is the correct trade for a credential.'
      },
      {
        choice: 'Sold products are immutable — once a shop sells a unit to a customer it cannot be edited, deleted or sold again',
        rationale:
          'A transfer of ownership is a historical fact. If the seller can edit a unit after the sale, the record stops being evidence and becomes a claim.',
        tradeoff: 'Genuine mistakes need an admin to intervene. Worth it — the alternative is a chain of custody nobody has a reason to believe.'
      },
      {
        choice: 'Serial numbers are generated with a uniqueness re-roll rather than a sequence',
        rationale: 'Sequential serials leak production volume to anyone holding two units. A random serial checked against the table gives uniqueness without the leak.',
        tradeoff: 'A read per generation, and a loop that has to be bounded as the table grows.'
      }
    ],
    challenges: [
      {
        problem: 'Ownership started out keyed to `manufacturer_id`, which quietly assumed a product only ever belongs to the party that made it.',
        solution:
          'Migrated every reference to `profile_id`. Once ownership pointed at a profile rather than a role, a manufacturer selling to a shop and a shop selling to a customer became the same operation applied twice, instead of two special cases.'
      },
      {
        problem: 'Manufacturers add units in batches, and adding them one form at a time was unusable at that volume.',
        solution:
          'Added bulk creation — one form, a count field — and duplication of an existing unit, with a fresh serial number and QR URL minted per copy so no two units share an identity.'
      },
      {
        problem: 'Admins needed to know about profile updates without living in the notifications panel.',
        solution:
          'Database notifications for the in-app panel, plus a scheduled daily digest by email. The panel is for people who are already there; the digest is for people who are not.'
      }
    ],
    outcomes: [],
    screenshots: [],
    body: [
      { type: 'heading', text: 'Moving the proof off the sticker' },
      {
        type: 'paragraph',
        text: 'Anti-counterfeiting on packaging has a structural problem: whatever you print on the box, a counterfeiter can print too. Holograms, scratch panels, serial stickers — all of them are copied within months, and the buyer has no way to tell a copied proof from a real one because both are just ink.'
      },
      {
        type: 'paragraph',
        text: 'Aurora starts from the other end. The manufacturer is verified by a human before they can list anything. Each unit they create gets a serial number and a QR code that resolves to a page on our side. When a shop buys the unit, ownership transfers and the unit is frozen. When a customer scans the code, they are not reading the packaging — they are reading a record that names who made it, who sold it, and when.'
      },
      { type: 'heading', text: 'The rules are the product' },
      {
        type: 'paragraph',
        text: 'Almost every interesting decision in this codebase is a restriction rather than a feature. Sold products cannot be edited. QR codes cannot be regenerated. Ownership only moves forward. None of those are hard to implement — the work is noticing that each one is load-bearing, because a chain of custody with an escape hatch is not a chain of custody.'
      },
      {
        type: 'code',
        language: 'php',
        filename: 'app/Models/Product.php',
        code: `protected function serialNumber(): Attribute
{
    return Attribute::make(
        set: fn () => $this->generateSerialNumber(),
    );
}

private function generateSerialNumber(): ?string
{
    $serial_number = fake()->unique()->numerify('SN-########');

    while ($this->where('serial_number', $serial_number)->exists()) {
        $serial_number = fake()->unique()->numerify('SN-########');
    }

    return $serial_number;
}`
      },
      {
        type: 'paragraph',
        text: 'The setter ignores whatever it is handed. That is intentional: a serial number is not something a caller gets to propose, and the cheapest way to enforce that is to make the attribute incapable of accepting an outside value in the first place.'
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Status',
        text: 'Built as my undergraduate thesis at Northern University Bangladesh, and shipped rather than left as a report. Roles, approval, products, ownership transfer and QR verification all work end to end. Active development has stopped — it does what it was built to do.'
      }
    ]
  },

  {
    title: 'Filament Fakester',
    slug: 'filament-fakester',
    summary: 'A Filament plugin that fills form fields with sensible fake data in development, one click per field.',
    problem:
      'Testing a form with twelve fields means typing into twelve fields, and then doing it again after every schema change. Faker solves this for seeders and never solved it for the form you are actually looking at.',
    category: 'open-source',
    status: 'live',
    featured: true,
    role: 'Author',
    owned: ['Package design', 'The field resolver', 'Documentation and release process'],
    teamSize: 1,
    timeline: { start: '2026-05', label: 'May 2026 — present' },
    stack: ['PHP', 'Laravel', 'Filament', 'Pest', 'GitHub Actions', 'Laravel Pint'],
    repoUrl: 'https://github.com/iammuttaqi/filament-fakester',
    liveUrl: 'https://packagist.org/packages/iammuttaqi/filament-fakester',
    architecture: [
      {
        choice: 'Register through Laravel package discovery rather than as a Filament panel plugin',
        rationale:
          'A panel plugin only works inside a panel. Hooking the form component itself means the button appears anywhere a Filament form renders — inside a panel, inside a standalone Livewire component, it does not matter. Install and it works; there is nothing to wire up.',
        tradeoff: 'Less control over where it shows up, which is why the config exists.'
      },
      {
        choice: 'Resolve values from the field name first, the HTML input type second',
        rationale:
          'A field called `email` should produce an email whether or not anyone set `type="email"`. Names carry more intent than types in practice, so names win and types fill the gaps.',
        tradeoff: 'A heuristic, and heuristics are wrong sometimes. Being wrong costs one click in development.'
      },
      {
        choice: 'Disabled in production by default, via `! app()->isProduction()`',
        rationale:
          'The failure mode of the opposite default is a sparkles button in a customer\'s admin panel. Anyone who genuinely wants it on can flip `FAKESTER_ENABLED`.'
      }
    ],
    challenges: [
      {
        problem: 'Filament renders several different text-like components, and a plugin that only handled `TextInput` would be missing most of the form.',
        solution: 'Extended the hint action across `TextInput`, `Textarea`, `RichEditor` and `MarkdownEditor`, so the button turns up on everything that takes prose.'
      }
    ],
    outcomes: [
      { metric: 'Packagist downloads', value: '75', detail: 'Since the first release' },
      { metric: 'Install command', value: '--dev', detail: 'Never ships to production' }
    ],
    screenshots: [],
    body: [
      { type: 'heading', text: 'A small itch, scratched properly' },
      {
        type: 'paragraph',
        text: 'This package does one thing and the whole design question was where to put it. The obvious answer — a Filament plugin you register on a panel — is worse than it looks, because half the forms in a real application are not inside a panel. Registering against the form component instead means the install is `composer require --dev` and nothing else.'
      },
      {
        type: 'code',
        language: 'bash',
        code: 'composer require iammuttaqi/filament-fakester --dev'
      },
      {
        type: 'paragraph',
        text: 'The resolver reads the field name and the input type and picks something that fits: `email` gets an email, `phone` gets a phone number, `latitude` gets a real coordinate, `slug` gets a slug. It is a lookup table with fallbacks, not a clever system, and the clever version would be harder to predict without being more useful.'
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Safe by default',
        text: 'Nothing renders in production unless you explicitly set FAKESTER_ENABLED. A development tool that can leak into production is not a development tool.'
      }
    ]
  },

  {
    title: 'Al Quran',
    slug: 'al-quran',
    summary: 'A minimal, ad-free environment to read, study and listen to the Noble Quran.',
    problem:
      'Most Quran apps are free because they are funded by advertising, which puts banner ads next to scripture and trackers on people at their most private. I wanted one that did not do that, so I built one for myself.',
    category: 'open-source',
    status: 'live',
    featured: true,
    role: 'Author',
    owned: ['The entire application', 'Reading, study and audio interfaces', 'Deployment'],
    teamSize: 1,
    timeline: { start: '2026-03', label: 'Mar 2026 — present' },
    stack: ['TypeScript', 'Tailwind CSS', 'Vercel'],
    repoUrl: 'https://github.com/iammuttaqi/al-quran',
    liveUrl: 'https://quran-shareef.vercel.app',
    architecture: [
      {
        choice: 'No advertising, no analytics, no accounts',
        rationale:
          'The reason to build this was that the alternatives monetise attention. Adding a tracker later would make it one of them. Nothing to opt out of, because there is nothing collecting.',
        tradeoff: 'No usage data at all. I find out what is broken when someone tells me.'
      },
      {
        choice: 'Static hosting on Vercel',
        rationale: 'No server means nothing to keep patched and nothing that can go down while I am asleep. For a reading app there is no state worth a backend.'
      }
    ],
    challenges: [
      {
        problem: 'Arabic typography is unforgiving — the wrong line height or letter spacing makes the text harder to read rather than merely uglier.',
        solution: 'Left the script alone. Minimal chrome, generous spacing, and no design flourish that competes with the text for attention.'
      }
    ],
    outcomes: [
      { metric: 'GitHub stars', value: '8', detail: 'My most-starred repository' },
      { metric: 'Trackers', value: '0' }
    ],
    screenshots: [],
    body: [
      { type: 'heading', text: 'Built for one user, kept for the rest' },
      {
        type: 'paragraph',
        text: 'This started as a personal tool and I did not expect anyone else to use it. Then it picked up stars, and the calculus changed — an app other people rely on deserves more care about performance and less about my preferences. Most of the work since has been removing things rather than adding them.'
      }
    ]
  }
]

export const featuredProjects = projects.filter(project => project.featured)

export function findProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

/** Badge label and colour per project status. Shared by the card and the case study. */
export const projectStatusMeta = {
  'live': { label: 'Live', color: 'success' as const },
  'in-development': { label: 'In development', color: 'warning' as const },
  'archived': { label: 'Archived', color: 'neutral' as const }
}
