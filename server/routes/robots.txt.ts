import { site } from '~~/app/data/site'
import { absoluteUrl } from '~~/app/utils/format'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=86400')

  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl(site.feeds.sitemap, site.domain)}
`
})
