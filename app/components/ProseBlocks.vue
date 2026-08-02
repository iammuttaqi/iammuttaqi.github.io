<script setup lang="ts">
import type { Block } from '~/types/content'

defineProps<{ blocks: Block[] }>()

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const calloutIcon = {
  info: 'i-lucide-info',
  success: 'i-lucide-check-circle-2',
  warning: 'i-lucide-triangle-alert'
} as const
</script>

<template>
  <div class="space-y-6">
    <template
      v-for="(block, index) in blocks"
      :key="index"
    >
      <h2
        v-if="block.type === 'heading'"
        :id="block.id ?? slugify(block.text)"
        class="scroll-mt-24 pt-4 text-2xl font-semibold text-balance-tight text-highlighted"
      >
        {{ block.text }}
      </h2>

      <p
        v-else-if="block.type === 'paragraph'"
        class="text-base leading-[1.75] text-toned"
      >
        {{ block.text }}
      </p>

      <component
        :is="block.ordered ? 'ol' : 'ul'"
        v-else-if="block.type === 'list'"
        class="space-y-2.5 pl-1"
      >
        <li
          v-for="(item, itemIndex) in block.items"
          :key="itemIndex"
          class="flex gap-3 text-base leading-[1.7] text-toned"
        >
          <span class="mt-2 shrink-0 font-mono text-xs text-primary">
            {{ block.ordered ? `${itemIndex + 1}.` : '—' }}
          </span>
          <span>{{ item }}</span>
        </li>
      </component>

      <blockquote
        v-else-if="block.type === 'quote'"
        class="border-l-2 border-primary pl-5 text-lg italic leading-relaxed text-highlighted"
      >
        {{ block.text }}
        <footer
          v-if="block.cite"
          class="mt-2 font-mono text-xs not-italic text-muted"
        >
          — {{ block.cite }}
        </footer>
      </blockquote>

      <CodeWindow
        v-else-if="block.type === 'code'"
        :code="block.code"
        :language="block.language"
        :filename="block.filename"
      />

      <figure v-else-if="block.type === 'image'">
        <!-- Prose measure is max-w-2xl on every page that renders these. -->
        <NuxtImg
          :src="block.image.src"
          :alt="block.image.alt"
          :width="block.image.width"
          :height="block.image.height"
          sizes="100vw md:672px"
          loading="lazy"
          class="w-full rounded-xl border border-default bg-elevated"
        />
        <figcaption
          v-if="block.caption"
          class="mt-2 text-center font-mono text-xs text-muted"
        >
          {{ block.caption }}
        </figcaption>
      </figure>

      <div
        v-else-if="block.type === 'callout'"
        class="flex gap-3 rounded-xl border border-default bg-elevated/50 p-4"
      >
        <UIcon
          :name="calloutIcon[block.tone ?? 'info']"
          class="mt-0.5 size-5 shrink-0 text-primary"
        />
        <div>
          <p
            v-if="block.title"
            class="text-sm font-semibold text-highlighted"
          >
            {{ block.title }}
          </p>
          <p
            class="text-sm leading-relaxed text-toned"
            :class="block.title && 'mt-1'"
          >
            {{ block.text }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>
