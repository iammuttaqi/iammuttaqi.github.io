<script setup lang="ts">
import { groupedSkills } from '~/data/skills'
import type { ProficiencyTier } from '~/types/content'

const tierMeta: Record<ProficiencyTier, { label: string, dots: number }> = {
  expert: { label: 'Expert', dots: 4 },
  advanced: { label: 'Advanced', dots: 3 },
  proficient: { label: 'Proficient', dots: 2 },
  familiar: { label: 'Familiar', dots: 1 }
}
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <section
      v-for="group in groupedSkills"
      :key="group.category"
      class="panel"
    >
      <h3 class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
        {{ group.label }}
      </h3>

      <ul class="mt-4 space-y-3">
        <li
          v-for="skill in group.items"
          :key="skill.name"
          class="flex items-center gap-3"
        >
          <UIcon
            v-if="skill.icon"
            :name="skill.icon"
            class="size-4 shrink-0 text-muted"
          />

          <span class="flex-1 truncate text-sm text-toned">{{ skill.name }}</span>

          <span class="font-mono text-[11px] text-dimmed">{{ skill.yearsUsed }}y</span>

          <span
            class="flex items-center gap-0.5"
            :title="`${tierMeta[skill.tier].label} · ${skill.yearsUsed} years`"
          >
            <span
              v-for="dot in 4"
              :key="dot"
              class="size-1.5 rounded-full"
              :class="dot <= tierMeta[skill.tier].dots ? 'bg-primary' : 'bg-accented'"
            />
            <span class="sr-only">{{ tierMeta[skill.tier].label }}</span>
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
