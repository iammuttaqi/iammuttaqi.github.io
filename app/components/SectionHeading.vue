<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="max-w-3xl">
    <SectionEyebrow>{{ eyebrow }}</SectionEyebrow>

    <h2 class="mt-4 text-3xl font-semibold text-balance-tight text-highlighted sm:text-4xl">
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="mt-4 text-base text-muted leading-relaxed"
    >
      {{ description }}
    </p>
  </div>
</template>
