<script setup lang="ts">
/**
 * The banded header every top-level page opens with. `ember` adds the red bloom
 * behind it. Anything beyond the lede — /writing's RSS button, /about's meta
 * line — goes in the default slot.
 */
withDefaults(defineProps<{
  eyebrow: string
  title: string
  lede?: string
  ember?: boolean
}>(), { lede: undefined, ember: false })
</script>

<template>
  <section class="relative overflow-hidden border-b border-default">
    <div
      class="pointer-events-none absolute inset-0 bg-dot-grid opacity-70"
      aria-hidden="true"
    />
    <div
      v-if="ember"
      class="pointer-events-none absolute inset-0 bg-ember"
      aria-hidden="true"
    />
    <UContainer class="relative py-20">
      <SectionEyebrow>{{ eyebrow }}</SectionEyebrow>
      <h1 class="mt-4 max-w-3xl text-4xl font-semibold text-balance-tight text-highlighted sm:text-5xl">
        {{ title }}
      </h1>
      <p
        v-if="lede"
        class="mt-6 max-w-2xl text-base leading-relaxed text-muted"
      >
        {{ lede }}
      </p>
      <slot />
    </UContainer>
  </section>
</template>
