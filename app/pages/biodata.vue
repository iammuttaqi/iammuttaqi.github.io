<script setup lang="ts">
import { biodata, unfilledFields } from '~/data/biodata'

/**
 * Unlisted on purpose: no nav entry, no sitemap entry (the sitemap builds from
 * visibleNav), a robots.txt Disallow, and noindex/nofollow here. None of that
 * is access control — the HTML is public to anyone holding the URL.
 */
useSeoMeta({
  title: 'Biodata',
  description: 'Marriage biodata.',
  robots: 'noindex, nofollow, noarchive'
})

/**
 * Author's warning, not the reader's. Prerendering runs with `dev` false, so
 * this is an empty array in the built page and the alert never renders there —
 * the deployed document carries no notes addressed to whoever is maintaining it.
 */
const pendingFields = import.meta.dev ? unfilledFields : []

function printSheet() {
  window.print()
}
</script>

<template>
  <div>
    <!--
      Screen-only chrome, never printed. Whatever sits here is shown to everyone
      the link is sent to, so it holds nothing addressed to the person editing
      the page — those notes live in app/data/biodata.ts, and the empty-field
      warning below is dev-only.
    -->
    <div class="chrome print:hidden">
      <div class="chrome-inner">
        <div class="flex justify-end">
          <UButton
            label="Print / Save as PDF"
            icon="i-lucide-printer"
            @click="printSheet"
          />
        </div>

        <UAlert
          v-if="pendingFields.length"
          color="warning"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          class="mt-4"
          :title="`${pendingFields.length} fields still empty`"
          :description="pendingFields.join(' · ')"
        />
      </div>
    </div>

    <!-- The sheet. Sized in millimetres so screen and paper agree. -->
    <div class="sheet-wrap">
      <article class="sheet">
        <header class="masthead">
          <p class="kicker">
            Biodata
          </p>
          <h1 class="name">
            {{ biodata.fullName || '—' }}
          </h1>
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
          Updated {{ formatDate(biodata.updatedAt, true) }}
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
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 10.5pt;
  line-height: 1.55;
  border-radius: 4px;
  box-shadow: 0 24px 60px rgb(0 0 0 / 45%);
}

.masthead {
  padding-bottom: 4mm;
  border-bottom: 1.5pt solid #1b1b18;
  text-align: center;
}

.kicker {
  font-family: var(--font-mono);
  font-size: 8pt;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: #706f6c;
}

.name {
  margin-top: 2mm;
  font-size: 21pt;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.15;
}

.block {
  margin-top: 7mm;
}

.block h2 {
  padding-bottom: 1mm;
  border-bottom: 0.5pt solid #d0d0cc;
  font-family: var(--font-mono);
  font-size: 8.5pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #56554f;
}

/* Keep one record — a degree, a sibling — whole on a page where the flow allows. */
.group {
  margin-top: 3.5mm;
  break-inside: avoid;
}

.group h3 {
  margin-bottom: 1mm;
  font-size: 10pt;
  font-weight: 700;
}

.fields {
  display: grid;
  grid-template-columns: 52mm 1fr;
  column-gap: 5mm;
  row-gap: 1.2mm;
}

.fields dt {
  color: #56554f;
}

.fields dd {
  min-width: 0;
}

.lines {
  list-style: none;
}

.lines li {
  position: relative;
  padding-left: 4mm;
}

.lines li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: #a1a09a;
}

.empty {
  color: #c4c3be;
}

.colophon {
  margin-top: 8mm;
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
}
</style>
