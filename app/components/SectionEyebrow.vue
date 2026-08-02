<script setup lang="ts">
/**
 * The small mono label that introduces a section, with the short red rule in
 * front of it. Eleven places used to hand-copy these two elements.
 *
 * `as` exists because the same treatment is a `<p>` above an `<h1>` but an
 * `<h2>` when it is the section heading itself, as on the case-study pages.
 */
withDefaults(defineProps<{ as?: string }>(), { as: 'p' })
</script>

<template>
  <component
    :is="as"
    class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary"
  >
    <span class="inline-block h-px w-6 bg-primary" />
    <slot />
  </component>
</template>
