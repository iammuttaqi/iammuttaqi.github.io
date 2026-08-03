import { createReadStream, existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'

/**
 * A static file server over a directory, and `pnpm preview` when run directly.
 *
 * `nuxt preview` boots the Nitro node server, which answers static requests
 * from an asset manifest baked during the build. The PDFs are printed after
 * that build, by modules/print-pdf.ts, so the manifest has never heard of them
 * and the server returns 404 for files that are sitting right there in
 * .output/public. Every download link on the site looks broken in preview and
 * works in production, which is the worst way round.
 *
 * GitHub Pages has no manifest — it serves whatever is in the directory. So
 * does this. A local preview and the deployed site now disagree about nothing.
 *
 * modules/print-pdf.ts imports serve() from here for the same reason: the
 * pages it prints have to come from a real origin, because Chrome refuses
 * relative asset URLs over file://.
 */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
}

/** Serves `root` on `port`, or on an ephemeral one when it is left at 0. */
export function serve(root, port = 0) {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    let path = resolve(join(root, decodeURIComponent(url.pathname)))

    // Never serve outside the directory.
    if (!path.startsWith(resolve(root))) {
      res.writeHead(403).end()
      return
    }

    if (!extname(path)) {
      path = join(path, 'index.html')
    }

    if (!existsSync(path)) {
      // The prerendered 404 page if the build made one, a bare status if not.
      const notFound = join(root, '404.html')

      if (existsSync(notFound)) {
        res.writeHead(404, { 'content-type': MIME['.html'] })
        createReadStream(notFound).pipe(res)
        return
      }

      res.writeHead(404).end()
      return
    }

    res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' })
    createReadStream(path).pipe(res)
  })

  return new Promise((res, rej) => {
    server.on('error', rej)
    server.listen(port, '127.0.0.1', () => res({
      port: server.address().port,
      close: () => new Promise(done => server.close(() => done()))
    }))
  })
}

// Only when run as `node scripts/preview.mjs`, not when imported by the module.
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const root = resolve('.output/public')

  if (!existsSync(root)) {
    console.error('No .output/public to preview. Run `pnpm build` first.')
    process.exit(1)
  }

  const { port } = await serve(root, Number(process.env.PORT) || 3000)

  console.log(`Previewing .output/public at http://localhost:${port}`)
}
