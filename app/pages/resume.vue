<script setup lang="ts">
import { identity } from '~/data/identity'
import { sortedCertifications, sortedEducation, sortedTalks } from '~/data/credentials'
import { sortedExperience } from '~/data/experience'
import { site } from '~/data/site'
import { groupedSkills } from '~/data/skills'

useSeoMeta({
  title: 'Resume',
  description: `Printable resume for ${identity.fullName}, ${identity.title}.`,
  robots: 'noindex'
})

/** Only the profiles worth a line on paper — the rest live on the site. */
const printableSocials = site.socials.filter(social => ['GitHub', 'LinkedIn'].includes(social.label))

const bareDomain = site.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')

/** Talks read as filler past a handful; the site carries the full list. */
const selectedTalks = sortedTalks.slice(0, 3)

function printSheet() {
  window.print()
}
</script>

<template>
  <div class="resume-page">
    <!-- Screen-only toolbar. Never printed. -->
    <UContainer class="py-10 print:hidden">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Resume
          </p>
          <p class="mt-2 max-w-xl text-sm text-muted">
            The downloadable PDF is printed from this page on every build, so it always matches the data.
            Print it yourself only if you want a one-off copy.
          </p>
        </div>

        <div class="flex gap-3">
          <UButton
            label="Print / Save as PDF"
            icon="i-lucide-printer"
            @click="printSheet"
          />
          <UButton
            :to="site.resume.file"
            external
            download
            label="Current PDF"
            icon="i-lucide-file-text"
            color="neutral"
            variant="subtle"
          />
        </div>
      </div>
    </UContainer>

    <!-- The sheet. Sized in millimetres so screen and paper agree. -->
    <div class="sheet-wrap">
      <article class="sheet">
        <header class="masthead">
          <div class="identity">
            <img
              class="portrait"
              :src="identity.photo.src"
              :alt="identity.photo.alt"
              :width="identity.photo.width"
              :height="identity.photo.height"
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
            v-for="role in sortedExperience"
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
            v-for="entry in sortedEducation"
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
              v-if="entry.thesis"
              class="summary"
            >
              Thesis: {{ entry.thesis }}
            </p>
          </div>
        </section>

        <section class="block">
          <h2>Certifications</h2>
          <ul class="bullets">
            <li
              v-for="certification in sortedCertifications"
              :key="certification.name"
            >
              {{ certification.name }} — {{ certification.issuer }}, {{ formatDate(certification.issuedAt) }}
            </li>
          </ul>
        </section>

        <section class="block">
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
