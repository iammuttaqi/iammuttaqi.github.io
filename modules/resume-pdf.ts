import { createReadStream, existsSync } from 'node:fs'
import { mkdir, readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { dirname, extname, join, resolve } from 'node:path'
import type { AddressInfo } from 'node:net'
import { defineNuxtModule, useLogger } from '@nuxt/kit'

/**
 * Regenerates the résumé PDF from the prerendered /resume page at the end of
 * every production build.
 *
 * The PDF is a rendering of app/data/*, so exporting it by hand means it drifts
 * the moment the data changes. Printing it during the build ties the two
 * together: whatever the site says, the download says.
 *
 * Chrome does the rendering — it already owns the print stylesheet, so the
 * output is identical to Cmd+P from the page.
 *
 * The PDF is not committed. It used to be, with this module copying each fresh
 * print back into public/ so the change showed up in git — but Chrome stamps a
 * creation time and document id into every print, so the bytes changed on every
 * build whether or not the résumé had, and a generated artefact sat in version
 * control collecting revisions. The deploy runner has Chrome and rebuilds it
 * from app/data/* on every push, so the tracked copy was never what shipped.
 *
 * Losing the committed copy means losing the fallback with it: a build that
 * cannot print now yields a site whose download link 404s. So in CI that is a
 * hard failure. Locally it stays a warning, because nothing there ships.
 */

const ROUTE = '/resume/'

/** Chrome refuses relative asset URLs over file://, so the output gets a real origin. */
const MIME: Record<string, string> = {
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

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean) as string[]

function findBrowser(): string | undefined {
  return CHROME_CANDIDATES.find(candidate => existsSync(candidate))
}

/** Minimal static server over the built output, on an ephemeral port. */
function serve(root: string) {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    let path = resolve(join(root, decodeURIComponent(url.pathname)))

    // Never serve outside the build output.
    if (!path.startsWith(resolve(root))) {
      res.writeHead(403).end()
      return
    }

    if (!extname(path)) {
      path = join(path, 'index.html')
    }

    if (!existsSync(path)) {
      res.writeHead(404).end()
      return
    }

    res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' })
    createReadStream(path).pipe(res)
  })

  return new Promise<{ port: number, close: () => Promise<void> }>((res, rej) => {
    server.on('error', rej)
    server.listen(0, '127.0.0.1', () => res({
      port: (server.address() as AddressInfo).port,
      close: () => new Promise<void>(done => server.close(() => done()))
    }))
  })
}

function printToPdf(browser: string, url: string, out: string, timeoutMs: number) {
  return new Promise<void>((res, rej) => {
    const child = spawn(browser, [
      '--headless',
      '--disable-gpu',
      // CI containers run as root, where the sandbox refuses to start.
      '--no-sandbox',
      '--no-pdf-header-footer',
      `--print-to-pdf=${out}`,
      url
    ], { stdio: 'ignore' })

    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      rej(new Error(`timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    child.on('error', (error) => {
      clearTimeout(timer)
      rej(error)
    })

    child.on('exit', (code) => {
      clearTimeout(timer)

      if (code === 0) {
        res()
      } else {
        rej(new Error(`exited with code ${code}`))
      }
    })
  })
}

export default defineNuxtModule({
  meta: { name: 'resume-pdf' },

  setup(_options, nuxt) {
    if (nuxt.options.dev) {
      return
    }

    const logger = useLogger('resume-pdf')

    /**
     * Nitro's `close` hook is awaited but its rejections have not always sunk
     * the build, and a deploy that quietly publishes a missing download is the
     * exact failure this is guarding. Set the exit code as well as throwing.
     */
    function fail(message: string): void {
      if (!process.env.CI) {
        logger.warn(`${message} Not fatal here — nothing is published from a local build.`)
        return
      }

      logger.error(message)
      process.exitCode = 1
      throw new Error(message)
    }

    nuxt.hook('nitro:init', (nitro) => {
      // `nuxt typecheck` also reaches `close`, but without prerendering, so it
      // would reprint whatever stale output happened to be on disk. Only print
      // when this run actually rendered the pages.
      let prerendered = false

      nitro.hooks.hook('prerender:done', () => {
        prerendered = true
      })

      // `close` rather than `prerender:done`: the client CSS is not copied into
      // the public dir until the build finishes, and printing before that gives
      // an unstyled page that silently swells to four pages.
      nitro.hooks.hook('close', async () => {
        if (!prerendered) {
          return
        }

        const publicDir = nitro.options.output.publicDir
        const page = join(publicDir, ROUTE, 'index.html')

        if (!existsSync(page)) {
          fail(`${ROUTE} was not prerendered, so there is no page to print the résumé from.`)
          return
        }

        const browser = findBrowser()

        if (!browser) {
          fail('No Chrome-family browser found, so the résumé PDF cannot be printed. Set CHROME_PATH to point at one.')
          return
        }

        // The page links its own download, so the target is read back out of the
        // rendered HTML rather than importing app/data/site.ts — that file uses
        // the `~` alias, which does not resolve in a build-time TS project.
        const target = (await readFile(page, 'utf8')).match(/href="(\/[^"]+\.pdf)"/)?.[1]

        if (!target) {
          fail(`No PDF link found in ${ROUTE}, so there is no résumé filename to write.`)
          return
        }

        const built = join(publicDir, target)
        const server = await serve(publicDir)

        try {
          await mkdir(dirname(built), { recursive: true })
          await printToPdf(browser, `http://127.0.0.1:${server.port}${ROUTE}`, built, 60_000)

          const { size } = await stat(built)

          logger.success(`Résumé PDF printed to ${target} (${Math.round(size / 1024)} kB).`)
        } catch (error) {
          fail(`Could not print the résumé PDF. ${(error as Error).message}`)
        } finally {
          await server.close()
        }
      })
    })
  }
})
