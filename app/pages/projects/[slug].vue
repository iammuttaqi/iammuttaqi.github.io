<script setup lang="ts">
import { findProject, projectStatusMeta, projects } from '~/data/projects'
import { site } from '~/data/site'

const current = findProject(String(useRoute().params.slug))

if (!current) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const statusMeta = projectStatusMeta[current.status]

const siblings = projects.filter(item => item.slug !== current.slug).slice(0, 2)

useSeoMeta({
  title: current.title,
  description: current.summary,
  ogTitle: `${current.title} — case study`,
  ogDescription: current.summary,
  ogImage: current.screenshots[0]
    ? absoluteUrl(current.screenshots[0].src, site.domain)
    : absoluteUrl(site.ogImage, site.domain)
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': current.title,
      'description': current.summary,
      'url': absoluteUrl(`/projects/${current.slug}`, site.domain),
      'dateCreated': current.timeline.start,
      'keywords': current.stack.join(', ')
    })
  }]
})
</script>

<template>
  <article>
    <!-- Header -->
    <section class="relative overflow-hidden border-b border-default">
      <div
        class="pointer-events-none absolute inset-0 bg-dot-grid opacity-70"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-ember"
        aria-hidden="true"
      />

      <UContainer class="relative py-16">
        <UButton
          to="/projects"
          variant="link"
          color="neutral"
          icon="i-lucide-arrow-left"
          label="All work"
          class="-ml-2 mb-8"
        />

        <div class="flex flex-wrap items-center gap-3">
          <UBadge
            :color="statusMeta.color"
            variant="subtle"
            :label="statusMeta.label"
          />
          <span class="font-mono text-xs text-dimmed">{{ current.timeline.label }}</span>
          <span class="font-mono text-xs text-dimmed">· {{ current.category }}</span>
        </div>

        <h1 class="mt-5 max-w-3xl text-4xl font-semibold text-balance-tight text-highlighted sm:text-5xl">
          {{ current.title }}
        </h1>

        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-toned">
          {{ current.summary }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <UButton
            v-if="current.liveUrl"
            :to="current.liveUrl"
            target="_blank"
            rel="noopener"
            label="Visit live site"
            trailing-icon="i-lucide-external-link"
            class="font-medium"
          />
          <UButton
            v-if="current.repoUrl"
            :to="current.repoUrl"
            target="_blank"
            rel="noopener"
            label="Source"
            icon="i-simple-icons-github"
            color="neutral"
            variant="subtle"
          />
        </div>
      </UContainer>
    </section>

    <!-- Fact strip -->
    <div class="border-b border-default bg-elevated/30">
      <UContainer>
        <dl class="grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
          <div>
            <dt class="font-mono text-[11px] uppercase tracking-[0.16em] text-dimmed">
              Role
            </dt>
            <dd class="mt-1 text-sm text-toned">
              {{ current.role }}
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[11px] uppercase tracking-[0.16em] text-dimmed">
              Team size
            </dt>
            <dd class="mt-1 text-sm text-toned">
              {{ current.teamSize }} {{ current.teamSize === 1 ? 'person' : 'people' }}
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[11px] uppercase tracking-[0.16em] text-dimmed">
              Timeline
            </dt>
            <dd class="mt-1 text-sm text-toned">
              {{ current.timeline.label }}
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[11px] uppercase tracking-[0.16em] text-dimmed">
              Status
            </dt>
            <dd class="mt-1 text-sm text-toned">
              {{ statusMeta.label }}
            </dd>
          </div>
        </dl>
      </UContainer>
    </div>

    <UContainer class="py-16">
      <div class="grid gap-14 lg:grid-cols-[1fr_18rem]">
        <div class="min-w-0 space-y-14">
          <!-- Problem -->
          <section>
            <SectionEyebrow as="h2">
              The problem
            </SectionEyebrow>
            <p class="mt-5 text-lg leading-[1.7] text-toned">
              {{ current.problem }}
            </p>
          </section>

          <!-- Body -->
          <section v-if="current.body.length">
            <ProseBlocks :blocks="current.body" />
          </section>

          <!-- Architecture -->
          <section v-if="current.architecture.length">
            <SectionEyebrow as="h2">
              Architecture decisions
            </SectionEyebrow>

            <div class="mt-6 space-y-4">
              <div
                v-for="decision in current.architecture"
                :key="decision.choice"
                class="panel"
              >
                <h3 class="text-base font-semibold leading-snug text-highlighted">
                  {{ decision.choice }}
                </h3>
                <p class="mt-2.5 text-sm leading-relaxed text-toned">
                  <span class="font-mono text-xs uppercase tracking-wider text-primary">Why · </span>
                  {{ decision.rationale }}
                </p>
                <p
                  v-if="decision.tradeoff"
                  class="mt-2 text-sm leading-relaxed text-muted"
                >
                  <span class="font-mono text-xs uppercase tracking-wider text-dimmed">Trade-off · </span>
                  {{ decision.tradeoff }}
                </p>
              </div>
            </div>
          </section>

          <!-- Challenges -->
          <section v-if="current.challenges.length">
            <SectionEyebrow as="h2">
              What broke, and how it was fixed
            </SectionEyebrow>

            <div class="mt-6 space-y-6">
              <div
                v-for="challenge in current.challenges"
                :key="challenge.problem"
                class="border-l-2 border-default pl-5"
              >
                <p class="text-sm font-medium leading-relaxed text-highlighted">
                  {{ challenge.problem }}
                </p>
                <p class="mt-2.5 flex gap-2.5 text-sm leading-relaxed text-toned">
                  <UIcon
                    name="i-lucide-corner-down-right"
                    class="mt-0.5 size-4 shrink-0 text-primary"
                  />
                  {{ challenge.solution }}
                </p>
              </div>
            </div>
          </section>

          <!-- Outcomes -->
          <section v-if="current.outcomes.length">
            <SectionEyebrow as="h2">
              Outcomes
            </SectionEyebrow>

            <dl class="mt-6 grid gap-4 sm:grid-cols-2">
              <div
                v-for="outcome in current.outcomes"
                :key="outcome.metric"
                class="panel"
              >
                <dt class="font-mono text-[11px] uppercase tracking-[0.16em] text-dimmed">
                  {{ outcome.metric }}
                </dt>
                <dd class="mt-1.5 text-3xl font-semibold tracking-tight text-primary">
                  {{ outcome.value }}
                </dd>
                <dd
                  v-if="outcome.detail"
                  class="mt-1.5 text-sm text-muted"
                >
                  {{ outcome.detail }}
                </dd>
              </div>
            </dl>
          </section>

          <!-- Demo -->
          <section v-if="current.demo">
            <SectionEyebrow as="h2">
              Demo
            </SectionEyebrow>

            <video
              v-if="current.demo.type === 'video'"
              :src="current.demo.src"
              :poster="current.demo.poster"
              :aria-label="current.demo.alt"
              controls
              muted
              playsinline
              preload="none"
              class="mt-6 w-full rounded-xl border border-default bg-elevated"
            />
            <!--
              Stays a plain img. This branch is the animated GIF demo, and IPX
              would flatten it to a still frame on the way to WebP.
            -->
            <img
              v-else
              :src="current.demo.src"
              :alt="current.demo.alt"
              loading="lazy"
              class="mt-6 w-full rounded-xl border border-default bg-elevated"
            >
          </section>

          <!-- Screenshots -->
          <section v-if="current.screenshots.length">
            <SectionEyebrow as="h2">
              Screens
            </SectionEyebrow>

            <div class="mt-6 space-y-6">
              <figure
                v-for="shot in current.screenshots"
                :key="shot.src"
              >
                <!-- Body column of the lg grid, once the 18rem aside is taken out. -->
                <NuxtImg
                  :src="shot.src"
                  :alt="shot.alt"
                  :width="shot.width"
                  :height="shot.height"
                  sizes="100vw lg:872px"
                  loading="lazy"
                  class="w-full rounded-xl border border-default bg-elevated"
                />
                <figcaption class="mt-2 font-mono text-xs text-dimmed">
                  {{ shot.alt }}
                </figcaption>
              </figure>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              What I owned
            </p>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="item in current.owned"
                :key="item"
                class="flex gap-2.5 text-sm leading-relaxed text-toned"
              >
                <UIcon
                  name="i-lucide-check"
                  class="mt-0.5 size-4 shrink-0 text-primary"
                />
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Stack
            </p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span
                v-for="tech in current.stack"
                :key="tech"
                class="tag-pill"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </UContainer>

    <!-- Next projects -->
    <div class="border-t border-default bg-elevated/20">
      <UContainer class="py-16">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Keep reading
        </p>
        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <ProjectCard
            v-for="item in siblings"
            :key="item.slug"
            :project="item"
            compact
          />
        </div>
      </UContainer>
    </div>
  </article>
</template>
