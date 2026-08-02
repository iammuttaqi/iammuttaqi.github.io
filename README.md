# Portfolio

Personal portfolio built with Nuxt 4, Nuxt UI 4 and Tailwind CSS 4, themed after
[laravel.com](https://laravel.com): warm off-black/off-white neutrals, Laravel red (`#F53003`)
as the single accent, Instrument Sans + JetBrains Mono, dot-grid backdrops and code windows.

Everything is statically prerendered. There is no CMS and no database — all content lives in
typed data files.

## Setup

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # prerenders every route into .output/public
pnpm preview
pnpm lint
pnpm typecheck
```

## Editing content

Nothing is hardcoded in components. Edit the files in `app/data/` and the pages update:

| File | Contains |
| --- | --- |
| `app/data/site.ts` | Domain, SEO defaults, nav, footer, socials, résumé path, 404 copy, feed paths |
| `app/data/identity.ts` | Name, title, tagline, status, location + timezone, photo, hero bio, long bio, specialisation, languages, interests |
| `app/data/projects.ts` | Case studies: problem, body, role, team size, timeline, status, stack, architecture decisions, challenges, outcomes, URLs, screenshots, demo, category, featured flag |
| `app/data/roles.ts` | Roles: company, URL, title, employment type, dates, location, achievements, stack, highlights |
| `app/data/skills.ts` | Skills with category, proficiency tier and years used |
| `app/data/repos.ts` | Packages and upstream contributions with stars/forks/downloads |
| `app/data/posts.ts` | Blog posts: excerpt, body, dates, tags, reading time, cover, canonical URL, external publication |
| `app/data/credentials.ts` | Education, certifications, talks, testimonials |

`app/types/content.ts` defines every shape. Adding a field there makes `pnpm typecheck` tell you
exactly which data files still need it.

### Long-form bodies

Case studies and posts use typed blocks instead of markdown, so there is no content dependency and
the bodies are type-checked:

```ts
body: [
  { type: 'heading', text: 'Why build another monitor' },
  { type: 'paragraph', text: '…' },
  { type: 'code', language: 'php', filename: 'app/Jobs/Probe.php', code: '…' },
  { type: 'list', ordered: true, items: ['…'] },
  { type: 'quote', text: '…', cite: 'Client finance lead' },
  { type: 'callout', tone: 'warning', title: 'Do not average this', text: '…' },
  { type: 'image', image: { src: '/images/…', alt: '…' }, caption: '…' }
]
```

## Placeholders to replace

The site ships with realistic seed content so every field is visible. Before publishing:

- **All of `app/data/*`** — names, dates, metrics, URLs and quotes are invented.
- **`site.domain`** in `app/data/site.ts` — drives canonical URLs, sitemap, RSS and OG image URLs.
- **`site.analyticsId`** — absent by default. Add a GA4 measurement id to switch the snippet on.
- **`public/images/**`** — generated SVG placeholders. Real screenshots can be `.png`/`.jpg`;
  update the `src` in the data file to match.
- **`public/resume/muntaser-muttaqi-cv.pdf`** — printed from the seed data, so it is only as real as
  `app/data/*`. It regenerates itself on the next build once the data is yours (see below).
- **`public/og-image.svg`** — replace with a 1200×630 PNG for the widest social-platform support,
  then update `site.ogImage`.
- **`public/apple-touch-icon.png`** and `public/favicon.ico` — solid-colour placeholders.
- **Project demo** — no project sets `demo` yet. Drop an `.mp4` in `public/media/` and add
  `demo: { type: 'video', src, alt }` to a project to render one.

## Résumé

`/resume` renders a print-styled A4 sheet from `app/data/*`, so the PDF can never drift from the
site. It is `noindex` and deliberately absent from the nav and sitemap.

You never export it by hand. `modules/resume-pdf.ts` prints the prerendered page to
`public/resume/muntaser-muttaqi-cv.pdf` at the end of every `nuxt build`, so editing `app/data/*`
and rebuilding is the whole workflow. The repo copy is rewritten too, so the diff shows up in
`git status`.

It uses whichever Chrome-family browser it finds on the machine; set `CHROME_PATH` to point at a
specific one. If none is found the build logs a warning, continues, and ships the committed PDF —
stale, but never broken. `/resume` stays browsable and still has a **Print / Save as PDF** button
if you want a one-off export.

One thing is still manual: `site.resume.updatedAt` is hand-typed, so it can claim a date the PDF
does not deserve. Bump it when the data changes.

## Contact form

There is no server route. The site deploys as static files, so `ContactForm.vue` posts straight to
Web3Forms from the browser, using the public access key in `runtimeConfig.public.web3formsAccessKey`
— that key only authorises posting to the inbox it was issued for. A hidden honeypot field filters
the obvious bots.

Override the key per environment with `NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Setting it to an empty
string wipes the key and breaks the form.

## SEO

- Per-page `useSeoMeta` with Open Graph and Twitter cards
- JSON-LD `Person` on every page, `CreativeWork` on case studies, `BlogPosting` on posts
- Canonical URLs, with cross-posted articles pointing at their original publication
- `/sitemap.xml`, `/rss.xml` (full content) and `/robots.txt` generated from the same data
- `site.webmanifest` plus SVG and PNG app icons

## Theme

The Laravel palette lives in `app/assets/css/main.css` as two Tailwind scales — `laravel-*` (red)
and `artisan-*` (warm neutrals) — wired into Nuxt UI via `app/app.config.ts`. Custom utilities:
`bg-dot-grid`, `bg-ember`, `bg-rule-fade`, `text-balance-tight`, `panel`, `tag-pill`. Light mode is
the default; the header toggle switches it.
