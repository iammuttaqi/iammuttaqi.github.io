<script setup lang="ts">
import { biodata, unfilledFields } from '~/data/biodata'

/**
 * The readable version of the marriage biodata. /biodata/print carries the same
 * data on an A4 sheet, and the PDF is printed from that page on every build —
 * so nothing here is a second copy of anything. Edit app/data/biodata.ts.
 *
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

/**
 * An email or a phone number in a contact row should be tappable — that section
 * is the whole point of sending someone the link. Matched on the value rather
 * than the label so it keeps working whatever the labels get renamed to.
 */
function fieldHref(value: string): string | undefined {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return `mailto:${value}`
  }

  if (/^\+?[\d\s-]{7,}$/.test(value)) {
    return `tel:${value.replace(/\s/g, '')}`
  }

  return undefined
}
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Biodata"
      :title="biodata.fullName"
      :lede="biodata.lede"
      ember
    >
      <div class="mt-8 flex flex-wrap gap-3">
        <UButton
          to="/biodata/print"
          label="Printable version"
          trailing-icon="i-lucide-arrow-up-right"
          class="font-medium"
        />
        <UButton
          :to="biodata.pdfFile"
          external
          download
          label="Download PDF"
          trailing-icon="i-lucide-arrow-down-to-line"
          color="neutral"
          variant="subtle"
        />
      </div>

      <p class="mt-8 font-mono text-xs text-dimmed">
        {{ biodata.subtitle }} · Updated {{ formatDate(biodata.updatedAt, true) }}
      </p>

      <template
        v-if="biodata.photo"
        #aside
      >
        <div class="relative mx-auto max-w-64 lg:max-w-none">
          <div
            class="absolute -inset-3 rounded-2xl bg-primary/10 blur-2xl"
            aria-hidden="true"
          />
          <NuxtImg
            :src="biodata.photo.src"
            :alt="biodata.photo.alt"
            :width="biodata.photo.width"
            :height="biodata.photo.height"
            sizes="256px lg:384px"
            loading="eager"
            class="relative aspect-square w-full rounded-2xl border border-default bg-elevated object-cover"
          />
        </div>
      </template>
    </PageHeader>

    <UContainer v-if="pendingFields.length">
      <UAlert
        color="warning"
        variant="subtle"
        icon="i-lucide-triangle-alert"
        class="mt-10"
        :title="`${pendingFields.length} fields still empty`"
        :description="pendingFields.join(' · ')"
      />
    </UContainer>

    <!--
      Every section is the same shape, so they alternate bands rather than each
      one inventing a layout: label in a sticky rail on the left, records on the
      right. Nine sections and seventy-odd rows read as a document this way and
      as a wall any other way.
    -->
    <section
      v-for="(section, index) in biodata.sections"
      :id="section.id"
      :key="section.id"
      class="scroll-mt-24"
      :class="index % 2 === 1 && 'border-y border-default bg-elevated/20'"
    >
      <UContainer class="py-16">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
          <SectionEyebrow
            as="h2"
            class="lg:sticky lg:top-24 lg:self-start"
          >
            {{ section.title }}
          </SectionEyebrow>

          <div class="max-w-3xl space-y-10">
            <div
              v-for="(group, groupIndex) in section.groups"
              :key="group.title ?? groupIndex"
            >
              <h3
                v-if="group.title"
                class="text-lg font-semibold tracking-tight text-highlighted"
              >
                {{ group.title }}
              </h3>

              <dl
                class="divide-y divide-default border-y border-default"
                :class="group.title && 'mt-4'"
              >
                <div
                  v-for="field in group.fields"
                  :key="field.label"
                  class="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-6"
                >
                  <dt class="font-mono text-xs uppercase tracking-[0.14em] text-dimmed sm:pt-1">
                    {{ field.label }}
                  </dt>

                  <dd class="text-sm leading-relaxed text-toned">
                    <ul
                      v-if="Array.isArray(field.value) && field.value.length"
                      class="space-y-1.5"
                    >
                      <li
                        v-for="line in field.value"
                        :key="line"
                        class="flex gap-2.5"
                      >
                        <UIcon
                          name="i-lucide-dot"
                          class="mt-0.5 size-4 shrink-0 text-primary"
                        />
                        <span>{{ line }}</span>
                      </li>
                    </ul>

                    <span
                      v-else-if="Array.isArray(field.value) || !field.value"
                      class="text-dimmed"
                    >—</span>

                    <ULink
                      v-else-if="fieldHref(field.value)"
                      :to="fieldHref(field.value)"
                      class="text-primary hover:underline"
                    >{{ field.value }}</ULink>

                    <span v-else>{{ field.value }}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-20">
      <SectionHeading
        eyebrow="Print"
        title="The same thing, on one sheet"
        :description="`Updated ${formatDate(biodata.updatedAt, true)}. The PDF is printed from the sheet on every build, so it never falls behind this page.`"
      />

      <div class="mt-10 flex flex-wrap gap-3">
        <UButton
          :to="biodata.pdfFile"
          external
          download
          label="Download PDF"
          trailing-icon="i-lucide-arrow-down-to-line"
          class="font-medium"
        />
        <UButton
          to="/biodata/print"
          label="Open the printable sheet"
          trailing-icon="i-lucide-arrow-up-right"
          color="neutral"
          variant="subtle"
        />
      </div>
    </UContainer>
  </div>
</template>
