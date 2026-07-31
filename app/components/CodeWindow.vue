<script setup lang="ts">
withDefaults(defineProps<{
  filename?: string
  language?: string
  code: string
}>(), {
  filename: undefined,
  language: 'php'
})
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-default bg-artisan-50 dark:bg-artisan-950">
    <div class="flex items-center gap-2 border-b border-default bg-elevated/60 px-4 py-2.5">
      <span class="h-2.5 w-2.5 rounded-full bg-artisan-300 dark:bg-artisan-700" />
      <span class="h-2.5 w-2.5 rounded-full bg-artisan-300 dark:bg-artisan-700" />
      <span class="h-2.5 w-2.5 rounded-full bg-artisan-300 dark:bg-artisan-700" />

      <span class="ml-2 font-mono text-xs text-muted">
        {{ filename ?? language }}
      </span>
    </div>

    <pre class="overflow-x-auto p-4 text-[13px] leading-relaxed"><code class="font-mono text-default">{{ code }}</code></pre>
  </div>
</template>
