<script setup lang="ts">
import type { Testimonial } from '~/types/content'

defineProps<{ testimonial: Testimonial }>()
</script>

<template>
  <figure class="flex flex-col rounded-xl border border-default bg-elevated/40 p-6">
    <UIcon
      name="i-lucide-quote"
      class="size-5 text-primary"
    />

    <blockquote class="mt-4 flex-1 text-sm leading-[1.7] text-toned">
      {{ testimonial.quote }}
    </blockquote>

    <figcaption class="mt-6 flex items-center gap-3 border-t border-default pt-5">
      <UAvatar
        :src="testimonial.photo?.src"
        :alt="testimonial.photo?.alt ?? testimonial.author"
        :text="testimonial.author.split(' ').map(part => part[0]).join('')"
        size="md"
      />
      <div class="min-w-0">
        <p class="truncate text-sm font-medium text-highlighted">
          {{ testimonial.author }}
        </p>
        <p class="truncate font-mono text-xs text-dimmed">
          {{ testimonial.authorTitle }}, {{ testimonial.company }}
        </p>
      </div>
      <a
        v-if="testimonial.sourceUrl"
        :href="testimonial.sourceUrl"
        target="_blank"
        rel="noopener"
        class="ml-auto text-dimmed transition-colors hover:text-primary"
        :aria-label="`Source of testimonial from ${testimonial.author}`"
      >
        <UIcon
          name="i-lucide-external-link"
          class="size-4"
        />
      </a>
    </figcaption>
  </figure>
</template>
