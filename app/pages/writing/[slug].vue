<script setup lang="ts">
import { identity } from '~/data/identity'
import { findPost, publishedPosts } from '~/data/posts'
import { site } from '~/data/site'

const route = useRoute()
const post = computed(() => findPost(String(route.params.slug)))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const current = post.value!

const related = publishedPosts
  .filter(item => item.slug !== current.slug && item.tags.some(tag => current.tags.includes(tag)))
  .slice(0, 2)

const canonical = current.canonicalUrl ?? absoluteUrl(`/writing/${current.slug}`, site.domain)

useSeoMeta({
  title: current.title,
  description: current.excerpt,
  ogType: 'article',
  ogTitle: current.title,
  ogDescription: current.excerpt,
  ogImage: current.coverImage
    ? absoluteUrl(current.coverImage.src, site.domain)
    : absoluteUrl(site.ogImage, site.domain),
  articlePublishedTime: current.publishedAt,
  articleModifiedTime: current.updatedAt,
  articleTag: current.tags
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': current.title,
      'description': current.excerpt,
      'datePublished': current.publishedAt,
      'dateModified': current.updatedAt ?? current.publishedAt,
      'keywords': current.tags.join(', '),
      'author': { '@type': 'Person', 'name': identity.fullName, 'url': site.domain },
      'mainEntityOfPage': canonical
    })
  }]
})
</script>

<template>
  <article>
    <section class="relative overflow-hidden border-b border-default">
      <div
        class="pointer-events-none absolute inset-0 bg-dot-grid opacity-70"
        aria-hidden="true"
      />
      <UContainer class="relative py-16">
        <UButton
          to="/writing"
          variant="link"
          color="neutral"
          icon="i-lucide-arrow-left"
          label="All writing"
          class="-ml-2 mb-8"
        />

        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-dimmed">
          <time :datetime="current.publishedAt">{{ formatDate(current.publishedAt, true) }}</time>
          <span aria-hidden="true">·</span>
          <span>{{ current.readingTime }} min read</span>
          <template v-if="current.updatedAt">
            <span aria-hidden="true">·</span>
            <span>updated {{ formatDate(current.updatedAt, true) }}</span>
          </template>
        </div>

        <h1 class="mt-4 max-w-3xl text-4xl font-semibold text-balance-tight text-highlighted sm:text-5xl">
          {{ current.title }}
        </h1>

        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-toned">
          {{ current.excerpt }}
        </p>

        <div class="mt-6 flex flex-wrap gap-1.5">
          <span
            v-for="tag in current.tags"
            :key="tag"
            class="rounded-md border border-default px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {{ tag }}
          </span>
        </div>

        <p
          v-if="current.externalPublication"
          class="mt-6 font-mono text-xs text-dimmed"
        >
          Originally published on
          <a
            :href="current.canonicalUrl"
            target="_blank"
            rel="noopener"
            class="text-primary hover:underline underline-offset-4"
          >
            {{ current.externalPublication }}
          </a>
        </p>
      </UContainer>
    </section>

    <UContainer class="py-16">
      <div class="mx-auto max-w-2xl">
        <NuxtImg
          v-if="current.coverImage"
          :src="current.coverImage.src"
          :alt="current.coverImage.alt"
          :width="current.coverImage.width"
          :height="current.coverImage.height"
          sizes="100vw md:672px"
          class="mb-12 w-full rounded-xl border border-default bg-elevated"
        />

        <ProseBlocks :blocks="current.body" />

        <div class="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-default pt-8">
          <div class="flex items-center gap-3">
            <UAvatar
              :src="identity.photo.src"
              :alt="identity.photo.alt"
              size="md"
            />
            <div>
              <p class="text-sm font-medium text-highlighted">
                {{ identity.fullName }}
              </p>
              <p class="font-mono text-xs text-dimmed">
                {{ identity.title }}
              </p>
            </div>
          </div>

          <UButton
            :to="site.feeds.rss"
            external
            icon="i-lucide-rss"
            label="Subscribe"
            color="neutral"
            variant="subtle"
            size="sm"
          />
        </div>
      </div>
    </UContainer>

    <div
      v-if="related.length"
      class="border-t border-default bg-elevated/20"
    >
      <UContainer class="py-16">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Related
        </p>
        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <PostCard
            v-for="item in related"
            :key="item.slug"
            :post="item"
          />
        </div>
      </UContainer>
    </div>
  </article>
</template>
