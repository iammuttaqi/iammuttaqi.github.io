<script setup lang="ts">
import { identity } from '~/data/identity'

const initials = identity.fullName
  .split(' ')
  .map(part => part[0])
  .join('')
</script>

<template>
  <span class="flex items-center gap-2.5">
    <span class="grid size-7 shrink-0 place-items-center rounded-md bg-primary font-mono text-[11px] font-bold text-white">
      {{ initials }}
    </span>
    <span class="hidden text-sm font-semibold tracking-tight text-highlighted sm:block">
      {{ identity.fullName }}
    </span>
  </span>
</template>
