<script setup lang="ts">
import type { Post } from '~/types/content'

defineProps<{ post: Post }>()
</script>

<template>
  <article class="group relative flex flex-col rounded-xl border border-default bg-elevated/40 p-6 transition-colors hover:border-primary/50">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-dimmed">
      <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt, true) }}</time>
      <span aria-hidden="true">·</span>
      <span>{{ post.readingTime }} min read</span>
      <template v-if="post.externalPublication">
        <span aria-hidden="true">·</span>
        <span class="text-primary">{{ post.externalPublication }}</span>
      </template>
    </div>

    <h3 class="mt-3 text-lg font-semibold tracking-tight text-highlighted">
      <NuxtLink
        :to="`/writing/${post.slug}`"
        class="after:absolute after:inset-0"
      >
        {{ post.title }}
      </NuxtLink>
    </h3>

    <p class="mt-2 text-sm leading-relaxed text-muted">
      {{ post.excerpt }}
    </p>

    <div class="mt-auto flex flex-wrap gap-1.5 pt-5">
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="rounded-md border border-default px-2 py-0.5 font-mono text-[11px] text-muted"
      >
        {{ tag }}
      </span>
    </div>
  </article>
</template>
