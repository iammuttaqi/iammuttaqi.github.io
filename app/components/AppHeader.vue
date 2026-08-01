<script setup lang="ts">
import { site } from '~/data/site'

const route = useRoute()

const items = computed(() =>
  site.nav.map(item => ({
    label: item.label,
    to: item.to,
    icon: item.icon,
    active: item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)
  }))
)
</script>

<template>
  <UHeader
    :ui="{
      root: 'sticky top-0 z-50 border-b border-default bg-default/80 backdrop-blur-md',
      container: 'h-16'
    }"
    mode="slideover"
  >
    <template #left>
      <NuxtLink
        to="/"
        aria-label="Home"
      >
        <AppLogo />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{ link: 'text-sm font-medium' }"
    />

    <template #right>
      <UColorModeButton />

      <UButton
        :to="site.socials[0]?.url"
        target="_blank"
        rel="noopener"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
        class="hidden sm:inline-flex"
      />

      <UButton
        :to="site.resume.file"
        external
        download
        label="Resume"
        trailing-icon="i-lucide-arrow-down-to-line"
        size="sm"
        class="hidden font-medium sm:inline-flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-4" />

      <UButton
        :to="site.resume.file"
        external
        download
        label="Download resume"
        trailing-icon="i-lucide-arrow-down-to-line"
        block
      />

      <div class="mt-4 flex flex-wrap gap-1">
        <UButton
          v-for="social in site.socials"
          :key="social.label"
          :to="social.url"
          target="_blank"
          rel="noopener"
          :icon="social.icon"
          :aria-label="social.label"
          color="neutral"
          variant="ghost"
        />
      </div>
    </template>
  </UHeader>
</template>
