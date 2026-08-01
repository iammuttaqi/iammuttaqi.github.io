<script setup lang="ts">
import { identity } from '~/data/identity'
import { publishedPosts } from '~/data/posts'
import { currentYear, site, visibleNav } from '~/data/site'

const copyright = computed(() =>
  site.footer.startYear === currentYear
    ? `${currentYear}`
    : `${site.footer.startYear}—${currentYear}`
)
</script>

<template>
  <footer class="mt-24 border-t border-default">
    <UContainer class="py-14">
      <div class="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <AppLogo />
          <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {{ site.footer.text }}
          </p>
          <p class="mt-4 font-mono text-xs text-dimmed">
            {{ identity.location.city }}, {{ identity.location.country }} · {{ identity.location.utcOffset }}
          </p>
        </div>

        <nav aria-label="Footer">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-dimmed">
            Pages
          </p>
          <ul class="mt-4 space-y-2.5">
            <li
              v-for="item in visibleNav"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="text-sm text-muted transition-colors hover:text-primary"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
            <li v-if="publishedPosts.length">
              <a
                :href="site.feeds.rss"
                class="text-sm text-muted transition-colors hover:text-primary"
              >
                RSS feed
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-dimmed">
            Elsewhere
          </p>
          <ul class="mt-4 space-y-2.5">
            <li
              v-for="social in site.socials"
              :key="social.label"
            >
              <a
                :href="social.url"
                target="_blank"
                rel="noopener me"
                class="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
              >
                <UIcon
                  :name="social.icon"
                  class="size-4"
                />
                {{ social.label }}
                <span class="font-mono text-xs text-dimmed opacity-0 transition-opacity group-hover:opacity-100">
                  {{ social.handle }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 h-px rule-fade" />

      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="font-mono text-xs text-dimmed">
          © {{ copyright }} {{ site.footer.copyrightHolder }}. All rights reserved.
        </p>
        <p class="font-mono text-xs text-dimmed">
          Resume updated {{ formatDate(site.resume.updatedAt) }}
        </p>
      </div>
    </UContainer>
  </footer>
</template>
