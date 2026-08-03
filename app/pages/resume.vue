<script setup lang="ts">
import { identity } from '~/data/identity'
import { certifications, education, talks } from '~/data/credentials'
import { roles } from '~/data/roles'
import { site } from '~/data/site'
import { groupedSkills } from '~/data/skills'

useSeoMeta({
  title: 'Resume',
  description: `Printable resume for ${identity.fullName}, ${identity.title}.`,
  robots: 'noindex'
})

/**
 * 283px is 300 dpi at the 24mm the sheet draws the portrait at.
 */
const portraitPx = 283

/**
 * The sheet is what modules/resume-pdf.ts prints, and Chrome embeds a JPEG source
 * in the PDF untouched but decodes WebP and re-embeds it losslessly — which put
 * 764 kB of Flate-compressed bitmap in the file before. So this one image asks for
 * JPEG explicitly, overriding the site-wide `format: ['webp']`.
 *
 * Calling useImage() during SSR also queues the URL for prerendering, so the file
 * is on disk before the PDF is printed. See runtime/image.js in @nuxt/image.
 */
const portraitSrc = useImage()(identity.photo.src, {
  format: 'jpeg',
  quality: 82,
  width: portraitPx,
  height: portraitPx
})

/** Only the profiles worth a line on paper — the rest live on the site. */
const printableSocials = site.socials.filter(social => ['GitHub', 'LinkedIn'].includes(social.label))

const bareDomain = site.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')

/** Talks read as filler past a handful; the site carries the full list. */
const selectedTalks = talks.slice(0, 3)
</script>

<template>
  <div class="resume-page">
    <!-- Screen-only chrome, never printed. Matches /biodata/print. -->
    <div class="chrome print:hidden">
      <div class="chrome-inner flex flex-wrap items-center justify-between gap-3">
        <UButton
          to="/about"
          label="Back to about"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="ghost"
        />

        <!--
          The PDF is printed from this page on every build, so the download is
          always this sheet — no reason to make anyone run their own print.

          data-print-pdf is how modules/print-pdf.ts finds where to write it.
          Without it the module takes the header's "Download resume" href, which
          happens to be this same file — so dropping the attribute would break
          silently here and loudly on /biodata/print.
        -->
        <UButton
          :to="site.resume.file"
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
              One URL, one size, one file in the PDF.
            -->
            <img
              class="portrait"
              :src="portraitSrc"
              :alt="identity.photo.alt"
              :width="portraitPx"
              :height="portraitPx"
            >
            <div>
              <h1 class="name">
                {{ identity.fullName }}
              </h1>
              <p class="role">
                {{ identity.title }}
              </p>
            </div>
          </div>
          <ul class="contact">
            <li>{{ site.contact.email }}</li>
            <li>{{ identity.location.city }}, {{ identity.location.country }}<span v-if="identity.location.remoteFriendly"> · Remote-friendly</span></li>
            <li>{{ bareDomain }}</li>
            <li
              v-for="social in printableSocials"
              :key="social.label"
            >
              {{ social.label.toLowerCase() }}.com/{{ social.handle.replace(/^@/, '').replace(/^in\//, 'in/') }}
            </li>
          </ul>
        </header>

        <section class="block">
          <h2>Profile</h2>
          <p class="lede">
            {{ identity.heroBio }}
          </p>
          <p class="status">
            {{ identity.status.label }} — {{ identity.status.detail }}
          </p>
        </section>

        <section class="block">
          <h2>Experience</h2>
          <div
            v-for="role in roles"
            :key="`${role.company}-${role.startDate}`"
            class="entry"
          >
            <div class="entry-head">
              <h3>
                {{ role.title }} <span class="at">·</span> {{ role.company }}
              </h3>
              <span class="dates">{{ formatRange(role.startDate, role.endDate) }}</span>
            </div>
            <p class="meta">
              {{ role.location }}<span v-if="role.remote"> · Remote</span> · {{ role.employmentType }} · {{ formatDuration(role.startDate, role.endDate) }}
            </p>
            <p class="summary">
              {{ role.summary }}
            </p>
            <ul class="bullets">
              <li
                v-for="achievement in role.achievements"
                :key="achievement"
              >
                {{ achievement }}
              </li>
            </ul>
            <p
              v-if="role.stack.length"
              class="stack"
            >
              <span class="stack-label">Stack</span> {{ role.stack.join(' · ') }}
            </p>
          </div>
        </section>

        <section class="block">
          <h2>Skills</h2>
          <dl class="skills">
            <template
              v-for="group in groupedSkills"
              :key="group.category"
            >
              <dt>{{ group.label }}</dt>
              <dd>{{ group.items.map(skill => skill.name).join(' · ') }}</dd>
            </template>
          </dl>
        </section>

        <section class="block">
          <h2>Education</h2>
          <div
            v-for="entry in education"
            :key="entry.institution"
            class="entry compact"
          >
            <div class="entry-head">
              <h3>{{ entry.degree }}<span v-if="entry.field">, {{ entry.field }}</span></h3>
              <span class="dates">{{ formatRange(entry.startDate, entry.endDate) }}</span>
            </div>
            <p class="meta">
              {{ entry.institution }} · {{ entry.location }}<!-- Grade stays in app/data/credentials.ts but is not printed. Uncomment to bring it back.
              <span v-if="entry.grade"> · {{ entry.grade }}</span>
              -->
            </p>
            <p
              v-if="entry.finalProject"
              class="summary"
            >
              Final project: {{ entry.finalProject }}
            </p>
          </div>
        </section>

        <section
          v-if="certifications.length"
          class="block"
        >
          <h2>Certifications</h2>
          <ul class="bullets">
            <li
              v-for="certification in certifications"
              :key="certification.name"
            >
              {{ certification.name }} — {{ certification.issuer }}, {{ formatDate(certification.issuedAt) }}
            </li>
          </ul>
        </section>

        <section
          v-if="selectedTalks.length"
          class="block"
        >
          <h2>Speaking</h2>
          <ul class="bullets">
            <li
              v-for="talk in selectedTalks"
              :key="talk.title"
            >
              “{{ talk.title }}” — {{ talk.event }}, {{ formatDate(talk.date) }}
            </li>
          </ul>
        </section>

        <footer class="colophon">
          Updated {{ formatDate(site.resume.updatedAt, true) }} · {{ bareDomain }}
        </footer>
      </article>
    </div>
  </div>
</template>

<style scoped>
/*
 * The sheet is authored in millimetres and points rather than rem, so what
 * renders on screen is what lands on the page. A4 is 210mm wide; 15mm margins
 * leave a 180mm text column.
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

.contact {
  text-align: right;
  font-size: 8.5pt;
  color: #3e3e3a;
  list-style: none;
}

.block {
  margin-top: 6mm;
  break-inside: auto;
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

.lede {
  font-size: 10pt;
}

.status {
  margin-top: 1.5mm;
  font-size: 8.5pt;
  color: #56554f;
}

/* Keep a job and its bullets on one page wherever the flow allows. */
.entry {
  margin-top: 4mm;
  break-inside: avoid;
}

.entry:first-of-type {
  margin-top: 0;
}

.entry.compact {
  margin-top: 3mm;
}

.entry-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2mm;
  align-items: baseline;
}

.entry-head h3 {
  font-size: 10.5pt;
  font-weight: 600;
}

.at {
  color: #a1a09a;
}

.dates {
  font-family: var(--font-mono);
  font-size: 8pt;
  color: #56554f;
  white-space: nowrap;
}

.meta {
  font-size: 8.5pt;
  color: #706f6c;
}

.summary {
  margin-top: 1.5mm;
}

.bullets {
  margin-top: 1.5mm;
  padding-left: 4.5mm;
  list-style: none;
}

.bullets li {
  position: relative;
  margin-top: 1mm;
}

.bullets li::before {
  content: "";
  position: absolute;
  left: -3.5mm;
  top: 1.7mm;
  width: 1.2mm;
  height: 1.2mm;
  border-radius: 50%;
  background: #f53003;
}

.stack {
  margin-top: 1.5mm;
  font-size: 8pt;
  color: #56554f;
}

.stack-label {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #a1a09a;
}

.skills {
  display: grid;
  grid-template-columns: 28mm 1fr;
  gap: 1.5mm 4mm;
}

.skills dt {
  font-family: var(--font-mono);
  font-size: 7.5pt;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #706f6c;
  padding-top: 0.4mm;
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

  /* The portrait, masthead rule and bullet dots are the only colour worth forcing. */
  .portrait,
  .masthead,
  .role,
  .bullets li::before {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
