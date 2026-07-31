<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'">
    <p
      class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary"
      :class="align === 'center' && 'justify-center'"
    >
      <span class="inline-block h-px w-6 bg-primary" />
      {{ eyebrow }}
    </p>

    <h2 class="mt-4 text-3xl font-semibold text-balance-tight text-highlighted sm:text-4xl">
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="mt-4 text-base text-muted leading-relaxed"
    >
      {{ description }}
    </p>

    <slot />
  </div>
</template>
