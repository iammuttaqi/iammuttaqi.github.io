<script setup lang="ts">
import { projectStatusMeta } from '~/data/projects'
import type { Project } from '~/types/content'

const props = defineProps<{ project: Project, compact?: boolean }>()

const statusMeta = projectStatusMeta[props.project.status]
</script>

<template>
  <article class="relative flex flex-col overflow-hidden rounded-xl border border-default bg-elevated/40 transition-colors hover:border-primary/50">
    <div
      v-if="!compact && project.screenshots[0]"
      class="border-b border-default bg-elevated"
    >
      <!-- One card per column at lg, half the grid at md, full bleed below. -->
      <NuxtImg
        :src="project.screenshots[0].src"
        :alt="project.screenshots[0].alt"
        :width="project.screenshots[0].width"
        :height="project.screenshots[0].height"
        sizes="100vw md:50vw lg:389px"
        loading="lazy"
        class="aspect-[16/10] w-full object-cover"
      />
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-center gap-3">
        <UBadge
          :color="statusMeta.color"
          variant="subtle"
          size="sm"
          :label="statusMeta.label"
        />
        <span class="font-mono text-xs text-dimmed">{{ project.timeline.label }}</span>
      </div>

      <h3 class="mt-4 text-xl font-semibold tracking-tight text-highlighted">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="after:absolute after:inset-0"
        >
          {{ project.title }}
        </NuxtLink>
      </h3>

      <p class="mt-2 text-sm leading-relaxed text-muted">
        {{ project.summary }}
      </p>

      <dl
        v-if="!compact"
        class="mt-5 grid grid-cols-2 gap-3 border-t border-default pt-5"
      >
        <div
          v-for="outcome in project.outcomes.slice(0, 2)"
          :key="outcome.metric"
        >
          <dt class="font-mono text-[11px] uppercase tracking-wider text-dimmed">
            {{ outcome.metric }}
          </dt>
          <dd class="mt-0.5 text-lg font-semibold tracking-tight text-primary">
            {{ outcome.value }}
          </dd>
        </div>
      </dl>

      <div class="mt-auto flex flex-wrap gap-1.5 pt-5">
        <span
          v-for="tech in project.stack.slice(0, compact ? 3 : 5)"
          :key="tech"
          class="tag-pill"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.stack.length > (compact ? 3 : 5)"
          class="rounded-md px-2 py-0.5 font-mono text-[11px] text-dimmed"
        >
          +{{ project.stack.length - (compact ? 3 : 5) }}
        </span>
      </div>
    </div>
  </article>
</template>
