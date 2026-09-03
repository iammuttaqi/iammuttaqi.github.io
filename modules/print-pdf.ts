import { existsSync } from 'node:fs'
import { mkdir, readFile, stat } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { addDevServerHandler, defineNuxtModule, useLogger } from '@nuxt/kit'
import { defineEventHandler, getRequestURL, setResponseHeader } from 'h3'
// Chrome refuses relative asset URLs over file://, so the built pages are
// printed from a real origin. The same server backs `pnpm preview`.
import { serve } from '../scripts/preview.mjs'

/**
 * Regenerates every printable PDF from its own prerendered page at the end of
 * a production build.
 *
 * Each PDF is a rendering of app/data/*, so exporting one by hand means it
 * drifts the moment the data changes. Printing during the build ties the two
 * together: whatever the site says, the download says.
 *
 * Chrome does the rendering — it already owns the print stylesheet, so the
 * output is identical to Cmd+P from the page.
 *
 * The PDFs are not committed. The résumé used to be, with this module copying
 * each fresh print back into public/ so the change showed up in git — but
 * Chrome stamps a creation time and document id into every print, so the bytes
 * changed on every build whether or not the résumé had, and a generated
 * artefact sat in version control collecting revisions. The deploy runner has
 * Chrome and rebuilds them from app/data/* on every push, so the tracked copy
 * was never what shipped.
 *
 * Losing the committed copy means losing the fallback with it: a build that
 * cannot print now yields a site whose download link 404s. So in CI that is a
 * hard failure. Locally it stays a warning, because nothing there ships.
 *
 * In dev there is no build to hang this off, so the same prints happen on
 * demand: the download links would otherwise 404 and the browser would save the
 * 404 page under the PDF's name, which looks exactly like a broken button.
 *
 * Adding a third sheet is one entry below, plus a prerender route in
 * nuxt.config.ts and a PDF link on the page itself.
 */

/**
 * `route` is prerendered and printed; `label` only shows up in the build log.
 * The output filename is not configured here — it is read back out of the
 * rendered page, so the download link and the file it points at cannot diverge.
 */
const SHEETS = [
  { route: '/resume/', label: 'Résumé' },
  { route: '/biodata/print/', label: 'Biodata' }
]

/**
 * Ordered by trust: an explicit path beats anything guessed off disk.
 *
 * Neither deploy target is left to the guesses. GitHub Actions names
 * /usr/bin/google-chrome in deploy.yml, because ubuntu-latest ships it.
 * Vercel's image ships no browser at all — Amazon Linux 2023 has no chromium
 * package — so vercel.json downloads Chrome for Testing during the build and
 * points CHROME_PATH at it. The listed paths are for local builds only.
 */
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

/**
 * Where a rendered sheet says its own PDF belongs.
 *
 * Reading it back out of the HTML rather than importing app/data/* keeps the
 * link and the file it points at from diverging — and those files use the `~`
 * alias, which does not resolve in a build-time TS project anyway.
 *
 * The link has to identify itself with data-print-pdf: the site header carries
 * a "Download resume" button on every page, so the first .pdf href in the
 * markup belongs to the header, not the sheet, and matching on that printed the
 * biodata over the résumé.
 */
function pdfTarget(html: string): string | undefined {
  const anchor = html.match(/<a\b[^>]*\bdata-print-pdf\b[^>]*>/)?.[0]

  return anchor?.match(/href="(\/[^"]+\.pdf)"/)?.[1]
}

function printToPdf(browser: string, url: string, out: string, timeoutMs: number, extra: string[] = []) {
  return new Promise<void>((res, rej) => {
    const child = spawn(browser, [
      '--headless',
      '--disable-gpu',
      // CI containers run as root, where the sandbox refuses to start.
      '--no-sandbox',
      '--no-pdf-header-footer',
      `--print-to-pdf=${out}`,
      ...extra,
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
  meta: { name: 'print-pdf' },

  setup(_options, nuxt) {
    const logger = useLogger('print-pdf')

    if (nuxt.options.dev) {
      const cacheDir = join(nuxt.options.buildDir, 'print-pdf')

      /** PDF path a sheet asks for → the route that renders it. Resolved once. */
      let routes: Map<string, string> | undefined

      /** Three impatient clicks are one print, not three Chromes. */
      const inFlight = new Map<string, Promise<void>>()

      addDevServerHandler({
        handler: defineEventHandler(async (event) => {
          const url = getRequestURL(event)

          if (!url.pathname.endsWith('.pdf')) {
            return
          }

          try {
            // The dev server is the origin the request just came from, so the
            // pages are fetched and printed from the same place the browser
            // sees — no second server and no port to guess.
            routes ??= new Map(
              (await Promise.all(SHEETS.map(async ({ route }) => {
                const html = await fetch(`${url.origin}${route}`).then(response => response.text())

                return [pdfTarget(html), route] as const
              }))).filter((entry): entry is [string, string] => Boolean(entry[0]))
            )

            const route = routes.get(url.pathname)

            if (!route) {
              return
            }

            const browser = findBrowser()

            if (!browser) {
              logger.warn('No Chrome-family browser found, so the PDF cannot be printed. Set CHROME_PATH to point at one.')
              return
            }

            const out = join(cacheDir, url.pathname)

            // Reprinted on every request rather than cached: dev is where
            // app/data/* gets edited, and handing back a PDF from before the
            // edit is worse than waiting a couple of seconds for a true one.
            //
            // The extra flag is dev-only. A built page arrives styled; this one
            // assembles itself with client-side JS, and Chrome prints at the
            // load event — early enough to catch it half-dressed.
            let job = inFlight.get(url.pathname)

            if (!job) {
              job = (async () => {
                await mkdir(dirname(out), { recursive: true })
                await printToPdf(browser, `${url.origin}${route}`, out, 60_000, ['--virtual-time-budget=5000'])
              })().finally(() => inFlight.delete(url.pathname))

              inFlight.set(url.pathname, job)
            }

            await job

            setResponseHeader(event, 'content-type', 'application/pdf')

            return await readFile(out)
          } catch (error) {
            // Falling through to the 404 is the honest answer — better than
            // serving a stale or empty file that looks like a working download.
            logger.warn(`Could not print ${url.pathname}. ${(error as Error).message}`)
          }
        })
      })

      return
    }

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

        const browser = findBrowser()

        if (!browser) {
          fail('No Chrome-family browser found, so no PDF can be printed. Set CHROME_PATH to point at one.')
          return
        }

        // One server for every sheet — starting and tearing one down per PDF
        // buys nothing, and they all read from the same directory.
        const publicDir = nitro.options.output.publicDir
        const server = await serve(publicDir)

        try {
          for (const { route, label } of SHEETS) {
            const page = join(publicDir, route, 'index.html')

            if (!existsSync(page)) {
              fail(`${route} was not prerendered, so there is no page to print ${label.toLowerCase()} from.`)
              continue
            }

            const target = pdfTarget(await readFile(page, 'utf8'))

            if (!target) {
              fail(`No data-print-pdf link found in ${route}, so there is no filename to write ${label.toLowerCase()} to.`)
              continue
            }

            const built = join(publicDir, target)

            try {
              await mkdir(dirname(built), { recursive: true })
              await printToPdf(browser, `http://127.0.0.1:${server.port}${route}`, built, 60_000)

              const { size } = await stat(built)

              logger.success(`${label} PDF printed to ${target} (${Math.round(size / 1024)} kB).`)
            } catch (error) {
              fail(`Could not print ${label.toLowerCase()} to PDF. ${(error as Error).message}`)
            }
          }
        } finally {
          await server.close()
        }
      })
    })
  }
})
