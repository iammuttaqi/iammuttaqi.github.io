<script setup lang="ts">
import type { NuxtError } from '#app'

import { site } from '~/data/site'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

const heading = computed(() => (isNotFound.value ? site.notFound.title : 'Something went wrong'))
const description = computed(() =>
  isNotFound.value ? site.notFound.description : 'An unexpected error occurred. It has been logged.'
)

useHead({ title: isNotFound.value ? '404' : 'Error' })
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <section class="relative overflow-hidden">
        <div
          class="pointer-events-none absolute inset-0 bg-dot-grid opacity-70"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-ember"
          aria-hidden="true"
        />

        <UContainer class="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <p class="font-mono text-7xl font-bold tracking-tight text-primary sm:text-8xl">
            {{ error?.statusCode ?? 500 }}
          </p>

          <h1 class="mt-6 max-w-xl text-3xl font-semibold text-balance-tight text-highlighted sm:text-4xl">
            {{ heading }}
          </h1>

          <p class="mt-4 max-w-md text-base text-muted">
            {{ description }}
          </p>

          <div class="mt-8 inline-flex items-center gap-2 rounded-lg border border-default bg-default px-4 py-2.5 font-mono text-xs text-muted">
            <span class="text-primary">$</span>
            {{ site.notFound.hint }}
          </div>

          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <UButton
              to="/"
              label="Back home"
              icon="i-lucide-arrow-left"
              class="font-medium"
              @click="clearError({ redirect: '/' })"
            />
            <UButton
              to="/projects"
              color="neutral"
              variant="subtle"
              label="Browse work"
            />
            <UButton
              to="/contact"
              color="neutral"
              variant="subtle"
              label="Report a broken link"
            />
          </div>
        </UContainer>
      </section>
    </UMain>

    <AppFooter />
  </UApp>
</template>
