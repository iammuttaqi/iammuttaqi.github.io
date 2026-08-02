<script setup lang="ts">
import type { Role } from '~/types/content'

defineProps<{ role: Role }>()
</script>

<template>
  <article class="relative pl-8 pb-12 last:pb-0">
    <span class="absolute left-0 top-1.5 grid size-4 place-items-center rounded-full border border-default bg-default">
      <span class="size-1.5 rounded-full bg-primary" />
    </span>
    <span
      class="absolute left-2 top-6 h-[calc(100%-1.5rem)] w-px bg-default"
      aria-hidden="true"
    />

    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 class="text-lg font-semibold tracking-tight text-highlighted">
        {{ role.title }}
      </h3>
      <span
        class="text-dimmed"
        aria-hidden="true"
      >·</span>
      <component
        :is="role.companyUrl ? 'a' : 'span'"
        :href="role.companyUrl"
        :target="role.companyUrl ? '_blank' : undefined"
        :rel="role.companyUrl ? 'noopener' : undefined"
        class="text-lg font-medium text-primary"
        :class="role.companyUrl && 'hover:underline underline-offset-4'"
      >
        {{ role.company }}
      </component>
    </div>

    <p class="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-dimmed">
      <span>{{ formatRange(role.startDate, role.endDate) }}</span>
      <span aria-hidden="true">·</span>
      <span>{{ formatDuration(role.startDate, role.endDate) }}</span>
      <span aria-hidden="true">·</span>
      <span>{{ role.employmentType }}</span>
      <span aria-hidden="true">·</span>
      <span>{{ role.remote ? `${role.location} (remote)` : role.location }}</span>
    </p>

    <p class="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
      {{ role.summary }}
    </p>

    <ul class="mt-4 space-y-2">
      <li
        v-for="achievement in role.achievements"
        :key="achievement"
        class="flex gap-3 text-sm leading-relaxed text-toned"
      >
        <UIcon
          name="i-lucide-chevron-right"
          class="mt-1 size-3.5 shrink-0 text-primary"
        />
        <span>{{ achievement }}</span>
      </li>
    </ul>

    <div
      v-if="role.highlights.length"
      class="mt-5 space-y-2 rounded-lg border border-default bg-elevated/40 p-4"
    >
      <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-dimmed">
        Notable projects
      </p>
      <div
        v-for="project in role.highlights"
        :key="project.name"
        class="text-sm"
      >
        <component
          :is="project.url ? 'NuxtLink' : 'span'"
          :to="project.url"
          class="font-medium text-highlighted"
          :class="project.url && 'hover:text-primary transition-colors'"
        >
          {{ project.name }}
        </component>
        <span class="text-muted"> — {{ project.description }}</span>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-1.5">
      <span
        v-for="tech in role.stack"
        :key="tech"
        class="tag-pill"
      >
        {{ tech }}
      </span>
    </div>
  </article>
</template>
