import { site } from '~~/app/data/site'

export default defineEventHandler((event) => {
  const base = site.domain.replace(/\/$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=86400')

  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${base}/sitemap.xml
`
})
