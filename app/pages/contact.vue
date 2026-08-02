<script setup lang="ts">
import { identity } from '~/data/identity'
import { site } from '~/data/site'

useSeoMeta({
  title: 'Contact',
  description: `Get in touch with ${identity.fullName}. ${site.contact.responseTime}.`
})

const localTime = useLocalTime(identity.location.timezone)
</script>

<template>
  <div>
    <PageHeader
      ember
      eyebrow="Contact"
      title="Tell me what is breaking"
      :lede="`Contract work, full-time roles, architecture reviews, or a second opinion on a design you are not sure about. ${site.contact.responseTime}.`"
    />

    <UContainer class="py-16">
      <div class="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 class="text-lg font-semibold tracking-tight text-highlighted">
            Send a message
          </h2>
          <p class="mt-1.5 text-sm text-muted">
            Everything here is required. The more specific the message, the more useful my reply.
          </p>

          <div class="mt-8">
            <ContactForm />
          </div>
        </div>

        <aside class="space-y-6">
          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Direct
            </p>

            <a
              :href="`mailto:${site.contact.email}`"
              class="mt-4 flex items-center gap-3 text-sm text-toned transition-colors hover:text-primary"
            >
              <UIcon
                name="i-lucide-mail"
                class="size-4 shrink-0 text-primary"
              />
              {{ site.contact.email }}
            </a>

            <a
              v-if="site.contact.bookingUrl"
              :href="site.contact.bookingUrl"
              target="_blank"
              rel="noopener"
              class="mt-3 flex items-center gap-3 text-sm text-toned transition-colors hover:text-primary"
            >
              <UIcon
                name="i-lucide-calendar"
                class="size-4 shrink-0 text-primary"
              />
              Book a 20-minute call
            </a>

            <div class="mt-5 space-y-1.5 border-t border-default pt-4 font-mono text-xs text-dimmed">
              <p class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-map-pin"
                  class="size-3.5"
                />
                {{ identity.location.city }}, {{ identity.location.country }}
              </p>
              <p class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-clock"
                  class="size-3.5"
                />
                <ClientOnly
                  fallback-tag="span"
                  :fallback="identity.location.utcOffset"
                >
                  {{ localTime }} local · {{ identity.location.utcOffset }}
                </ClientOnly>
              </p>
              <p class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-timer"
                  class="size-3.5"
                />
                {{ site.contact.responseTime }}
              </p>
            </div>
          </div>

          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Elsewhere
            </p>
            <ul class="mt-4 space-y-3">
              <li
                v-for="social in site.socials"
                :key="social.label"
              >
                <a
                  :href="social.url"
                  target="_blank"
                  rel="noopener me"
                  class="flex items-center gap-3 text-sm text-toned transition-colors hover:text-primary"
                >
                  <UIcon
                    :name="social.icon"
                    class="size-4 shrink-0"
                  />
                  <span class="flex-1">{{ social.label }}</span>
                  <span class="font-mono text-xs text-dimmed">{{ social.handle }}</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Resume
            </p>
            <p class="mt-3 text-sm text-muted">
              Last updated {{ formatDate(site.resume.updatedAt, true) }}.
            </p>
            <UButton
              :to="site.resume.file"
              external
              download
              label="Download PDF"
              trailing-icon="i-lucide-arrow-down-to-line"
              size="sm"
              block
              class="mt-4"
            />
          </div>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
