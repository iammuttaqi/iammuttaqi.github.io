<script setup lang="ts">
import { biodata } from '~/data/biodata'
import { site } from '~/data/site'

/**
 * The A4 sheet. /biodata is the readable version of the same data; this one
 * exists to be printed, and modules/print-pdf.ts prints it on every build.
 *
 * Unlisted on purpose: no nav entry, no sitemap entry (the sitemap builds from
 * visibleNav), a robots.txt Disallow, and noindex/nofollow here. None of that
 * is access control — the HTML is public to anyone holding the URL.
 */
useSeoMeta({
  title: 'Biodata — printable',
  description: 'Printable marriage biodata.',
  robots: 'noindex, nofollow, noarchive'
})

/** 283px is 300 dpi at the 24mm the sheet draws the portrait at. */
const portraitPx = 283

/**
 * Same treatment as the résumé sheet, for the same reason: Chrome embeds a JPEG
 * in a PDF untouched but decodes WebP and re-embeds it losslessly, which put
 * 764 kB of bitmap in the résumé file before this override. Calling useImage()
 * during SSR also queues the URL for prerendering, so the file exists on disk.
 */
const portraitSrc = biodata.photo
  ? useImage()(biodata.photo.src, {
      format: 'jpeg',
      quality: 82,
      width: portraitPx,
      height: portraitPx
    })
  : undefined

const bareDomain = site.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
</script>

<template>
  <div>
    <!--
      Screen-only chrome, never printed. Whatever sits here is shown to everyone
      the link is sent to, so it holds nothing addressed to the person editing
      the page — those notes live in app/data/biodata.ts, and the empty-field
      warning is on /biodata and dev-only.
    -->
    <div class="chrome print:hidden">
      <div class="chrome-inner flex flex-wrap items-center justify-between gap-3">
        <UButton
          to="/biodata"
          label="Back to biodata"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="ghost"
        />

        <!--
          The PDF is printed from this page on every build, so the download is
          always this sheet — no reason to make anyone run their own print.

          data-print-pdf is how modules/print-pdf.ts finds where to write it.
          Without it the module takes the header's "Download resume" href
          instead and prints the biodata over the résumé.
        -->
        <UButton
          :to="biodata.pdfFile"
          external
          download
          data-print-pdf
          label="Download PDF"
          icon="i-lucide-download"
        />
      </div>
    </div>

    <!-- The sheet. Sized in millimetres so screen and paper agree. -->
    <div class="sheet-wrap">
      <article class="sheet">
        <header class="masthead">
          <div class="identity">
            <!--
              A plain img, not a NuxtImg: the component would emit a density
              srcset, and a 2x candidate is a bigger bitmap for Chrome to embed.
              One URL, one size, one file in the PDF. Same as the résumé sheet.
            -->
            <img
              v-if="biodata.photo"
              class="portrait"
              :src="portraitSrc"
              :alt="biodata.photo.alt"
              :width="portraitPx"
              :height="portraitPx"
            >
            <div>
              <h1 class="name">
                {{ biodata.fullName }}
              </h1>
              <p
                v-if="biodata.subtitle"
                class="role"
              >
                {{ biodata.subtitle }}
              </p>
            </div>
          </div>
        </header>

        <section
          v-for="section in biodata.sections"
          :id="section.id"
          :key="section.id"
          class="block"
        >
          <h2>{{ section.title }}</h2>

          <div
            v-for="(group, index) in section.groups"
            :key="group.title ?? index"
            class="group"
          >
            <h3 v-if="group.title">
              {{ group.title }}
            </h3>

            <dl class="fields">
              <template
                v-for="field in group.fields"
                :key="field.label"
              >
                <dt>{{ field.label }}</dt>
                <dd>
                  <ul
                    v-if="Array.isArray(field.value) && field.value.length"
                    class="lines"
                  >
                    <li
                      v-for="line in field.value"
                      :key="line"
                    >
                      {{ line }}
                    </li>
                  </ul>
                  <span
                    v-else-if="Array.isArray(field.value) || !field.value"
                    class="empty"
                  >—</span>
                  <span v-else>{{ field.value }}</span>
                </dd>
              </template>
            </dl>
          </div>
        </section>

        <footer
          v-if="biodata.updatedAt"
          class="colophon"
        >
          Updated {{ formatDate(biodata.updatedAt, true) }} · {{ bareDomain }}
        </footer>
      </article>
    </div>
  </div>
</template>

<style scoped>
/*
 * Authored in millimetres and points rather than rem, so what renders on screen
 * is what lands on the page. A4 is 210mm wide; 15mm margins leave 180mm of
 * text. A serif from the system stack — this reads as a document, and it costs
 * no font download.
 */
/*
 * The controls take the sheet's width and gutter, not the site container's, so
 * the button lands on the document's own right edge instead of floating off
 * somewhere to the side of it. Same 210mm and same 1rem gutter as .sheet-wrap
 * and .sheet below — change one and change all three.
 */
.chrome {
  padding: 2.5rem 1rem 1.25rem;
}

.chrome-inner {
  width: 210mm;
  max-width: 100%;
  margin: 0 auto;
}

.sheet-wrap {
  display: flex;
  justify-content: center;
  padding: 0 1rem 4rem;
}

.sheet {
  width: 210mm;
  max-width: 100%;
  box-sizing: border-box;
  padding: 15mm;
  background: #fff;
  color: #1b1b18;
  font-family: var(--font-sans);
  font-size: 9.5pt;
  line-height: 1.5;
  border-radius: 4px;
  box-shadow: 0 24px 60px rgb(0 0 0 / 45%);
}

/*
 * Masthead, type and accents below are the résumé sheet's, deliberately. The
 * two documents go to different people but come from the same person, and they
 * should read that way side by side. Change one and change app/pages/resume.vue.
 */
.masthead {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 6mm;
  padding-bottom: 4mm;
  border-bottom: 1.5pt solid #f53003;
}

.identity {
  display: flex;
  align-items: center;
  gap: 5mm;
}

.portrait {
  width: 24mm;
  height: 24mm;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 2mm;
}

.name {
  font-size: 22pt;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.role {
  margin-top: 1mm;
  font-family: var(--font-mono);
  font-size: 8.5pt;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #f53003;
}

.block {
  margin-top: 6mm;
}

.block h2 {
  margin-bottom: 2.5mm;
  padding-bottom: 1mm;
  border-bottom: 0.5pt solid #d0d0cc;
  font-family: var(--font-mono);
  font-size: 8pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #706f6c;
}

/* Keep one record — a degree, a sibling — whole on a page where the flow allows. */
.group {
  margin-top: 4mm;
  break-inside: avoid;
}

/* The section heading already spaces the first record off its rule. */
.group:first-of-type {
  margin-top: 0;
}

.group h3 {
  margin-bottom: 1mm;
  font-size: 10.5pt;
  font-weight: 600;
}

.fields {
  display: grid;
  grid-template-columns: 52mm 1fr;
  column-gap: 5mm;
  row-gap: 1.2mm;
}

/* The résumé's Skills list treatment, applied to every label here. */
.fields dt {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #706f6c;
  padding-top: 0.4mm;
}

.fields dd {
  min-width: 0;
}

/* The résumé's red bullet dot, in place of the em dash this used to draw. */
.lines {
  padding-left: 4.5mm;
  list-style: none;
}

.lines li {
  position: relative;
  margin-top: 1mm;
}

.lines li:first-child {
  margin-top: 0;
}

.lines li::before {
  content: "";
  position: absolute;
  left: -3.5mm;
  top: 1.7mm;
  width: 1.2mm;
  height: 1.2mm;
  border-radius: 50%;
  background: #f53003;
}

.empty {
  color: #c4c3be;
}

.colophon {
  margin-top: 7mm;
  padding-top: 2mm;
  border-top: 0.5pt solid #e3e3e0;
  font-family: var(--font-mono);
  font-size: 7.5pt;
  color: #a1a09a;
  text-align: center;
}

/*
 * One column once the value column stops being usable. At 34rem the sheet has
 * 544px, less 32px of wrap padding and 113px of sheet padding, leaving 399px of
 * content; the 52mm label and 5mm gap take 215px of that, so a value gets about
 * 184px. Below this it drops under 25 characters a line and long values — a
 * father's occupation, an address — shred into ribbons.
 */
@media (max-width: 34rem) {
  .fields {
    grid-template-columns: 1fr;
    row-gap: 0;
  }

  .fields dt {
    margin-top: 2mm;
    font-size: 9pt;
  }
}

/*
 * The margin moves from the element to the page box: .sheet drops its padding
 * below and @page takes over, so the 15mm holds on paper instead of falling
 * back to whatever the browser defaults to (usually 12.7mm, and adjustable in
 * the print dialog). Whoever receives this prints it on settings you do not
 * control, so the sheet declares its own.
 */
@page {
  margin: 15mm;
}

@media print {
  .sheet-wrap {
    padding: 0;
  }

  .sheet {
    width: auto;
    max-width: none;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
  }

  /*
   * Shorter than the résumé's list, which also names .masthead and .role. Those
   * two are a border colour and a text colour, and browsers print both anyway —
   * only a real background needs forcing, which is the bullet dot.
   */
  .portrait,
  .lines li::before {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
