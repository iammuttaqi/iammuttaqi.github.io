<script setup lang="ts">
import { projects } from '~/data/projects'
import type { ProjectCategory } from '~/types/content'

useSeoMeta({
  title: 'Work',
  description: 'Case studies: multi-tenant SaaS, a double-entry billing engine, event-sourced logistics, and open-source Laravel packages.'
})

const categoryLabels: Record<ProjectCategory | 'all', string> = {
  'all': 'Everything',
  'saas': 'SaaS',
  'client': 'Client work',
  'open-source': 'Open source',
  'internal-tool': 'Internal tools',
  'experiment': 'Experiments'
}

const activeCategory = ref<ProjectCategory | 'all'>('all')

const categories: (ProjectCategory | 'all')[] = ['all', ...new Set(projects.map(project => project.category))]

const visibleProjects = computed(() =>
  activeCategory.value === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory.value)
)
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Selected work"
      title="Every project here shipped, and every one of them broke at least once."
      lede="Each case study covers the problem, what I owned, the architecture decisions and their trade-offs, the failures worth remembering, and the numbers afterwards."
    />

    <UContainer class="py-16">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="rounded-full border px-4 py-1.5 font-mono text-xs transition-colors"
          :class="activeCategory === category
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-default text-muted hover:text-highlighted'"
          @click="activeCategory = category"
        >
          {{ categoryLabels[category] }}
        </button>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="project in visibleProjects"
          :key="project.slug"
          :project="project"
        />
      </div>

      <p
        v-if="!visibleProjects.length"
        class="mt-10 font-mono text-sm text-dimmed"
      >
        // nothing here yet
      </p>
    </UContainer>
  </div>
</template>
