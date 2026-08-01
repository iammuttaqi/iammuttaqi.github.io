<script setup lang="ts">
import { identity } from '~/data/identity'

// Single-letter mark, mirrored by public/icon.svg, favicon.ico and apple-touch-icon.png.
const monogram = identity.fullName[0]
</script>

<template>
  <span class="flex items-center gap-2.5">
    <span class="grid size-7 shrink-0 place-items-center rounded-md bg-primary font-mono text-[11px] font-bold text-white">
      {{ monogram }}
    </span>
    <span class="hidden text-sm font-semibold tracking-tight text-highlighted sm:block">
      {{ identity.fullName }}
    </span>
  </span>
</template>
