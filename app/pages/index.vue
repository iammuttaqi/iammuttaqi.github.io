<script setup lang="ts">
import { about, identity } from '~/data/identity'
import { sortedExperience } from '~/data/experience'
import { featuredProjects } from '~/data/projects'
import { openSourceTotals, sortedOpenSource } from '~/data/open-source'
import { publishedPosts } from '~/data/posts'
import { site } from '~/data/site'
import { sortedTestimonials } from '~/data/credentials'

useSeoMeta({
  title: site.title,
  description: site.description
})

const latestPosts = publishedPosts.slice(0, 3)
const highlightRepos = sortedOpenSource.filter(item => item.role !== 'contributor').slice(0, 3)
</script>

<template>
  <div>
    <HeroSection />

    <!-- Currently building strip -->
    <div class="border-b border-default bg-elevated/30">
      <UContainer class="flex flex-wrap items-center gap-x-8 gap-y-2 py-4 font-mono text-xs text-dimmed">
        <span class="text-primary">// currently</span>
        <span
          v-for="item in about.currentlyBuilding"
          :key="item"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-lucide-hammer"
            class="size-3.5"
          />
          {{ item }}
        </span>
        <span
          v-for="item in about.currentlyLearning.slice(0, 1)"
          :key="item"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-lucide-book-open"
            class="size-3.5"
          />
          Learning {{ item }}
        </span>
      </UContainer>
    </div>

    <!-- About -->
    <UContainer class="py-20">
      <div class="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            :title="`${about.yearsOfExperience} years in the same stack, on purpose`"
          />

          <div class="mt-8 space-y-5">
            <p
              v-for="(paragraph, index) in about.bio"
              :key="index"
              class="text-base leading-[1.75] text-toned"
            >
              {{ paragraph }}
            </p>
          </div>

          <UButton
            to="/about"
            variant="link"
            color="primary"
            label="Read the full story"
            trailing-icon="i-lucide-arrow-right"
            class="mt-6 px-0"
          />
        </div>

        <aside class="space-y-6">
          <div class="rounded-xl border border-default bg-elevated/40 p-5">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Specialisation
            </p>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="item in about.specialization"
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

          <div class="rounded-xl border border-default bg-elevated/40 p-5">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Languages
            </p>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="language in about.languages"
                :key="language.name"
                class="flex items-baseline justify-between gap-3 text-sm"
              >
                <span class="text-toned">{{ language.name }}</span>
                <span class="font-mono text-xs text-dimmed">{{ language.proficiency }}</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </UContainer>

    <!-- Selected work -->
    <div class="border-y border-default bg-elevated/20">
      <UContainer class="py-20">
        <SectionHeading
          eyebrow="Selected work"
          title="Systems I owned, and what they cost"
          description="Case studies with the architecture decisions, the things that broke, and the numbers afterwards."
        />

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.slug"
            :project="project"
          />
        </div>

        <UButton
          to="/projects"
          variant="subtle"
          color="neutral"
          label="All projects"
          trailing-icon="i-lucide-arrow-right"
          class="mt-10"
        />
      </UContainer>
    </div>

    <!-- Experience -->
    <UContainer class="py-20">
      <SectionHeading
        eyebrow="Experience"
        title="Where the years went"
      />

      <div class="mt-12 max-w-3xl">
        <ExperienceItem
          v-for="role in sortedExperience"
          :key="`${role.company}-${role.startDate}`"
          :role="role"
        />
      </div>
    </UContainer>

    <!-- Skills -->
    <div class="border-y border-default bg-elevated/20">
      <UContainer class="py-20">
        <SectionHeading
          eyebrow="Toolkit"
          title="What I reach for"
          description="Four dots is expert; one is familiar enough to be dangerous. Years are cumulative, not consecutive."
        />

        <div class="mt-12">
          <SkillMatrix />
        </div>
      </UContainer>
    </div>

    <!-- Open source -->
    <UContainer class="py-20">
      <SectionHeading
        eyebrow="Open source"
        title="Packages and patches"
        :description="`${formatCompact(openSourceTotals.stars)} stars and ${formatCompact(openSourceTotals.downloads)} installs across published packages, plus contributions upstream.`"
      />

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <RepoCard
          v-for="item in highlightRepos"
          :key="item.name"
          :item="item"
        />
      </div>

      <UButton
        to="/about#open-source"
        variant="link"
        color="primary"
        label="Including upstream contributions"
        trailing-icon="i-lucide-arrow-right"
        class="mt-6 px-0"
      />
    </UContainer>

    <!-- Writing -->
    <div class="border-y border-default bg-elevated/20">
      <UContainer class="py-20">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from production"
          description="Mostly queues, ledgers and the parts of Postgres that quietly solve problems people reach for services to fix."
        />

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <PostCard
            v-for="post in latestPosts"
            :key="post.slug"
            :post="post"
          />
        </div>

        <UButton
          to="/writing"
          variant="subtle"
          color="neutral"
          label="All posts"
          trailing-icon="i-lucide-arrow-right"
          class="mt-10"
        />
      </UContainer>
    </div>

    <!-- Testimonials -->
    <UContainer class="py-20">
      <SectionHeading
        eyebrow="References"
        title="What people I shipped with say"
      />

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <TestimonialCard
          v-for="testimonial in sortedTestimonials"
          :key="testimonial.author"
          :testimonial="testimonial"
        />
      </div>
    </UContainer>

    <!-- Contact CTA -->
    <div class="relative overflow-hidden border-t border-default">
      <div
        class="pointer-events-none absolute inset-0 bg-dot-grid opacity-70"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-ember"
        aria-hidden="true"
      />

      <UContainer class="relative py-24 text-center">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          {{ identity.status.label }}
        </p>

        <h2 class="mx-auto mt-5 max-w-2xl text-3xl font-semibold text-balance-tight text-highlighted sm:text-5xl">
          Got a backend that is starting to hurt?
        </h2>

        <p class="mx-auto mt-5 max-w-xl text-base text-muted">
          {{ site.contact.responseTime }}. Tell me what is breaking and I will tell you honestly whether I am the right person for it.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton
            to="/contact"
            size="lg"
            label="Start a conversation"
            trailing-icon="i-lucide-arrow-right"
            class="font-medium"
          />
          <UButton
            v-if="site.contact.bookingUrl"
            :to="site.contact.bookingUrl"
            target="_blank"
            rel="noopener"
            size="lg"
            color="neutral"
            variant="subtle"
            label="Book 20 minutes"
            icon="i-lucide-calendar"
            class="font-medium"
          />
        </div>
      </UContainer>
    </div>
  </div>
</template>
