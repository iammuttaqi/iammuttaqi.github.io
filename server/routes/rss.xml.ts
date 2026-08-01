import { identity } from '~~/app/data/identity'
import { publishedPosts } from '~~/app/data/posts'
import { site } from '~~/app/data/site'
import type { Block } from '~~/app/types/content'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Flattens typed blocks into plain HTML for feed readers. */
function blocksToHtml(blocks: Block[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `<h2>${escapeXml(block.text)}</h2>`
        case 'paragraph':
          return `<p>${escapeXml(block.text)}</p>`
        case 'list': {
          const tag = block.ordered ? 'ol' : 'ul'
          return `<${tag}>${block.items.map(item => `<li>${escapeXml(item)}</li>`).join('')}</${tag}>`
        }
        case 'quote':
          return `<blockquote><p>${escapeXml(block.text)}</p>${block.cite ? `<cite>${escapeXml(block.cite)}</cite>` : ''}</blockquote>`
        case 'code':
          return `<pre><code>${escapeXml(block.code)}</code></pre>`
        case 'image':
          return `<figure><img src="${escapeXml(block.image.src)}" alt="${escapeXml(block.image.alt)}" /></figure>`
        case 'callout':
          return `<p><strong>${escapeXml(block.title ?? 'Note')}:</strong> ${escapeXml(block.text)}</p>`
        default:
          return ''
      }
    })
    .join('')
}

export default defineEventHandler((event) => {
  const base = site.domain.replace(/\/$/, '')

  const items = publishedPosts
    .map((post) => {
      const url = `${base}/writing/${post.slug}`

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${blocksToHtml(post.body)}]]></content:encoded>
${post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(identity.fullName)} — Writing</title>
    <link>${base}/writing</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.locale}</language>
    <managingEditor>${escapeXml(site.contact.email)} (${escapeXml(identity.fullName)})</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return body
})
