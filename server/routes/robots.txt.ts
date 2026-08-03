import { site } from '~~/app/data/site'
import { absoluteUrl } from '~~/app/utils/format'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=86400')

  // /biodata is unlisted rather than private — it also carries a noindex meta
  // tag, and the sitemap builds from the nav so it never appears there.
  return `User-agent: *
Allow: /
Disallow: /biodata

Sitemap: ${absoluteUrl(site.feeds.sitemap, site.domain)}
`
})
