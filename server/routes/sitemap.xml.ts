import { publishedPosts } from '~~/app/data/posts'
import { projects } from '~~/app/data/projects'
import { site, visibleNav } from '~~/app/data/site'
import { absoluteUrl } from '~~/app/utils/format'

export default defineEventHandler((event) => {
  const today = new Date().toISOString().slice(0, 10)

  // Search engines have ignored <priority> and <changefreq> for years, so the
  // only thing worth emitting is the URL and when it last changed. Top-level
  // pages come from the nav rather than a second hand-maintained list — a page
  // hidden from the nav should not be advertised here either.
  const entries = [
    { loc: '/', lastmod: today },
    ...visibleNav.map(item => ({ loc: item.to, lastmod: today })),
    ...projects.map(project => ({
      loc: `/projects/${project.slug}`,
      lastmod: `${project.timeline.end ?? today.slice(0, 7)}-01`.slice(0, 10)
    })),
    ...publishedPosts.map(post => ({
      loc: `/writing/${post.slug}`,
      lastmod: post.updatedAt ?? post.publishedAt
    }))
  ]

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(entry => `  <url>
    <loc>${absoluteUrl(entry.loc, site.domain)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`)
  .join('\n')}
</urlset>
`
})
