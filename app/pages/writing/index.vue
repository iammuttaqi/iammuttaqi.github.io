<script setup lang="ts">
import { postTags, publishedPosts } from '~/data/posts'
import { site } from '~/data/site'

useSeoMeta({
  title: 'Writing',
  description: 'Essays on queue design, ledgers, multi-tenancy and PHP performance — written from production, not from theory.'
})

const activeTag = ref<string | null>(null)

const visiblePosts = computed(() =>
  activeTag.value
    ? publishedPosts.filter(post => post.tags.includes(activeTag.value!))
    : publishedPosts
)
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-default">
      <div
        class="pointer-events-none absolute inset-0 bg-dot-grid opacity-70"
        aria-hidden="true"
      />
      <UContainer class="relative py-20">
        <p class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
          <span class="inline-block h-px w-6 bg-primary" />
          Writing
        </p>
        <h1 class="mt-4 max-w-3xl text-4xl font-semibold text-balance-tight text-highlighted sm:text-5xl">
          Notes from production, not from theory
        </h1>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          Queue design, double-entry ledgers, tenancy trade-offs and the Postgres features that quietly
          replace whole services. Everything here came out of something that broke first.
        </p>

        <UButton
          :to="site.feeds.rss"
          external
          variant="subtle"
          color="neutral"
          icon="i-lucide-rss"
          label="Subscribe via RSS"
          size="sm"
          class="mt-8"
        />
      </UContainer>
    </section>

    <UContainer class="py-16">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full border px-4 py-1.5 font-mono text-xs transition-colors"
          :class="activeTag === null ? 'border-primary bg-primary/10 text-primary' : 'border-default text-muted hover:text-highlighted'"
          @click="activeTag = null"
        >
          All
        </button>
        <button
          v-for="tag in postTags"
          :key="tag"
          type="button"
          class="rounded-full border px-4 py-1.5 font-mono text-xs transition-colors"
          :class="activeTag === tag ? 'border-primary bg-primary/10 text-primary' : 'border-default text-muted hover:text-highlighted'"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PostCard
          v-for="post in visiblePosts"
          :key="post.slug"
          :post="post"
        />
      </div>
    </UContainer>
  </div>
</template>
