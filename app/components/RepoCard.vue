<script setup lang="ts">
import type { Repo } from '~/types/content'

defineProps<{ repo: Repo }>()

const roleColor = {
  author: 'primary',
  maintainer: 'info',
  contributor: 'neutral'
} as const
</script>

<template>
  <article class="flex flex-col rounded-xl border border-default bg-elevated/40 p-6 transition-colors hover:border-primary/50">
    <div class="flex items-start justify-between gap-3">
      <h3 class="font-mono text-sm font-medium text-highlighted">
        {{ repo.name }}
      </h3>
      <UBadge
        :color="roleColor[repo.role]"
        variant="subtle"
        size="sm"
        :label="repo.role"
      />
    </div>

    <p class="mt-3 text-sm leading-relaxed text-muted">
      {{ repo.description }}
    </p>

    <ul
      v-if="repo.contributions.length"
      class="mt-4 space-y-2.5 border-t border-default pt-4"
    >
      <li
        v-for="contribution in repo.contributions"
        :key="contribution.url"
        class="text-sm"
      >
        <a
          :href="contribution.url"
          target="_blank"
          rel="noopener"
          class="font-mono text-xs text-primary hover:underline underline-offset-4"
        >
          {{ contribution.repo }}
        </a>
        <UBadge
          v-if="!contribution.merged"
          color="neutral"
          variant="subtle"
          size="sm"
          label="open"
          class="ml-2 align-middle"
        />
        <p class="mt-0.5 text-sm leading-relaxed text-muted">
          {{ contribution.description }}
        </p>
      </li>
    </ul>

    <div
      v-if="repo.stats.stars || repo.stats.downloads"
      class="mt-5 flex flex-wrap items-center gap-4 font-mono text-xs text-dimmed"
    >
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-star"
          class="size-3.5"
        />
        {{ formatCompact(repo.stats.stars) }}
      </span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-git-fork"
          class="size-3.5"
        />
        {{ formatCompact(repo.stats.forks) }}
      </span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-arrow-down-to-line"
          class="size-3.5"
        />
        {{ formatCompact(repo.stats.downloads) }}
      </span>
      <span class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-code"
          class="size-3.5"
        />
        {{ repo.language }}
      </span>
    </div>

    <div class="mt-5 flex flex-wrap gap-2 pt-1">
      <UButton
        :to="repo.repoUrl"
        target="_blank"
        rel="noopener"
        icon="i-simple-icons-github"
        label="Repository"
        color="neutral"
        variant="subtle"
        size="xs"
      />
      <UButton
        v-if="repo.packageUrl"
        :to="repo.packageUrl"
        target="_blank"
        rel="noopener"
        :icon="repo.registry === 'npm' ? 'i-simple-icons-npm' : 'i-simple-icons-packagist'"
        :label="repo.registry === 'npm' ? 'npm' : 'Packagist'"
        color="neutral"
        variant="subtle"
        size="xs"
      />
    </div>
  </article>
</template>
