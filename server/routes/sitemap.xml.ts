import { publishedPosts } from '~~/app/data/posts'
import { sortedProjects } from '~~/app/data/projects'
import { site } from '~~/app/data/site'

interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq: string
  priority: string
}

export default defineEventHandler((event) => {
  const base = site.domain.replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)

  const entries: SitemapEntry[] = [
    { loc: '/', changefreq: 'monthly', priority: '1.0', lastmod: today },
    { loc: '/about', changefreq: 'monthly', priority: '0.8', lastmod: today },
    { loc: '/projects', changefreq: 'monthly', priority: '0.9', lastmod: today },
    { loc: '/writing', changefreq: 'weekly', priority: '0.8', lastmod: today },
    { loc: '/contact', changefreq: 'yearly', priority: '0.6', lastmod: today },
    ...sortedProjects.map(project => ({
      loc: `/projects/${project.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: `${project.timeline.end ?? today.slice(0, 7)}-01`.slice(0, 10)
    })),
    ...publishedPosts.map(post => ({
      loc: `/writing/${post.slug}`,
      changefreq: 'yearly',
      priority: '0.7',
      lastmod: post.updatedAt ?? post.publishedAt
    }))
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(entry => `  <url>
    <loc>${base}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return body
})
