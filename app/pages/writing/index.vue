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
    <PageHeader
      eyebrow="Writing"
      title="Notes from production, not from theory"
      lede="Queue design, double-entry ledgers, tenancy trade-offs and the Postgres features that quietly replace whole services. Everything here came out of something that broke first."
    >
      <UButton
        v-if="publishedPosts.length"
        :to="site.feeds.rss"
        external
        variant="subtle"
        color="neutral"
        icon="i-lucide-rss"
        label="Subscribe via RSS"
        size="sm"
        class="mt-8"
      />
    </PageHeader>

    <UContainer class="py-16">
      <!-- Nothing published yet. The page still resolves, it just says so. -->
      <p
        v-if="!publishedPosts.length"
        class="text-base text-muted"
      >
        Nothing published yet. The first posts are being written.
      </p>

      <div
        v-if="publishedPosts.length"
        class="flex flex-wrap gap-2"
      >
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
