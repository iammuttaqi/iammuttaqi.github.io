<script setup lang="ts">
import { about, identity } from '~/data/identity'
import { site } from '~/data/site'

const localTime = useLocalTime(identity.location.timezone)

const statusColor = {
  'open-to-work': 'bg-green-500',
  'building': 'bg-primary',
  'freelance': 'bg-amber-500',
  'unavailable': 'bg-artisan-400'
}[identity.status.state]
</script>

<template>
  <section class="relative overflow-hidden border-b border-default">
    <div
      class="pointer-events-none absolute inset-0 bg-dot-grid opacity-70"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 bg-ember"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-default to-transparent"
      aria-hidden="true"
    />

    <UContainer class="relative py-20 sm:py-28">
      <div class="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div class="inline-flex items-center gap-2.5 rounded-full border border-default bg-elevated/70 py-1.5 pl-2.5 pr-4 backdrop-blur">
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full opacity-60"
                :class="statusColor"
              />
              <span
                class="relative inline-flex size-2 rounded-full"
                :class="statusColor"
              />
            </span>
            <span class="text-xs font-medium text-toned">{{ identity.status.label }}</span>
          </div>

          <h1 class="mt-6 text-4xl font-semibold text-balance-tight text-highlighted sm:text-6xl">
            {{ identity.fullName }}
          </h1>

          <p class="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-primary">
            {{ identity.title }}
          </p>

          <p class="mt-6 max-w-xl text-xl leading-snug text-balance-tight text-toned sm:text-2xl">
            {{ identity.tagline }}
          </p>

          <p class="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {{ identity.heroBio }}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <UButton
              to="/projects"
              size="lg"
              label="View selected work"
              trailing-icon="i-lucide-arrow-right"
              class="font-medium"
            />
            <UButton
              to="/contact"
              size="lg"
              color="neutral"
              variant="subtle"
              label="Get in touch"
              icon="i-lucide-mail"
              class="font-medium"
            />
          </div>

          <dl class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-dimmed">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-map-pin"
                class="size-3.5 text-primary"
              />
              <dt class="sr-only">
                Location
              </dt>
              <dd>{{ identity.location.city }}, {{ identity.location.country }}</dd>
            </div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-clock"
                class="size-3.5 text-primary"
              />
              <dt class="sr-only">
                Local time
              </dt>
              <dd>
                <ClientOnly
                  fallback-tag="span"
                  :fallback="identity.location.utcOffset"
                >
                  {{ localTime }} local · {{ identity.location.utcOffset }}
                </ClientOnly>
              </dd>
            </div>
            <div
              v-if="identity.location.remoteFriendly"
              class="flex items-center gap-2"
            >
              <UIcon
                name="i-lucide-globe"
                class="size-3.5 text-primary"
              />
              <dt class="sr-only">
                Availability
              </dt>
              <dd>Remote-friendly</dd>
            </div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-briefcase"
                class="size-3.5 text-primary"
              />
              <dt class="sr-only">
                Experience
              </dt>
              <dd>{{ about.yearsOfExperience }} years shipping</dd>
            </div>
          </dl>
        </div>

        <div>
          <div class="relative mx-auto max-w-xs lg:max-w-none">
            <div
              class="absolute -inset-3 rounded-2xl bg-primary/10 blur-2xl"
              aria-hidden="true"
            />
            <!--
              The largest thing above the fold, so it is the LCP element on the
              home page: preloaded, eager, and never lazy. `sizes` matches the
              two widths the layout actually gives it — 320px under `max-w-xs`,
              then the 1fr column of the lg grid.
            -->
            <NuxtImg
              :src="identity.photo.src"
              :alt="identity.photo.alt"
              :width="identity.photo.width"
              :height="identity.photo.height"
              sizes="320px lg:487px"
              preload
              loading="eager"
              fetchpriority="high"
              class="relative aspect-square w-full rounded-2xl border border-default bg-elevated object-cover"
            />
            <div class="relative -mt-6 ml-4 inline-flex items-center gap-2 rounded-lg border border-default bg-default px-3 py-2 font-mono text-xs text-muted shadow-sm">
              <span class="text-primary">$</span> php artisan about
            </div>
          </div>
        </div>
      </div>

      <p
        v-if="identity.status.detail"
        class="mt-12 font-mono text-xs text-dimmed"
      >
        {{ identity.status.detail }} · Replies {{ site.contact.responseTime.toLowerCase() }}
      </p>
    </UContainer>
  </section>
</template>
