<script setup lang="ts">
import { about, identity } from '~/data/identity'
import { certifications, education, talks } from '~/data/credentials'
import { roles } from '~/data/roles'
import { repos } from '~/data/repos'
import { site } from '~/data/site'

// careerNarrative is a heading now, too generic to sell the page in a search
// result, so the description comes from heroBio instead.
useSeoMeta({
  title: 'About',
  description: identity.heroBio,
  ogTitle: `About ${identity.fullName}`,
  ogDescription: identity.heroBio
})

const talkTypeIcon = {
  talk: 'i-lucide-mic',
  workshop: 'i-lucide-presentation',
  podcast: 'i-lucide-radio',
  meetup: 'i-lucide-users'
} as const
</script>

<template>
  <div>
    <PageHeader
      eyebrow="About"
      :title="about.careerNarrative"
    >
      <p class="mt-6 font-mono text-xs text-dimmed">
        {{ identity.fullName }} <span v-if="identity.pronunciation">· {{ identity.pronunciation }}</span> · {{ about.yearsOfExperience }} years · {{ identity.location.city }} ({{ identity.location.utcOffset }})
      </p>
    </PageHeader>

    <UContainer class="py-20">
      <div class="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <div class="space-y-5">
          <p
            v-for="(paragraph, index) in about.bio"
            :key="index"
            class="text-base leading-[1.8] text-toned"
          >
            {{ paragraph }}
          </p>

          <div class="flex flex-wrap gap-3 pt-4">
            <UButton
              :to="site.resume.file"
              external
              download
              label="Download resume"
              trailing-icon="i-lucide-arrow-down-to-line"
              class="font-medium"
            />
            <UButton
              to="/contact"
              color="neutral"
              variant="subtle"
              label="Contact"
              icon="i-lucide-mail"
            />
          </div>
        </div>

        <aside class="space-y-6">
          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Currently working on
            </p>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="item in about.currentFocus"
                :key="item"
                class="flex gap-2.5 text-sm leading-relaxed text-toned"
              >
                <UIcon
                  name="i-lucide-hammer"
                  class="mt-0.5 size-4 shrink-0 text-primary"
                />
                {{ item }}
              </li>
            </ul>

            <p class="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Currently learning
            </p>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="item in about.currentlyLearning"
                :key="item"
                class="flex gap-2.5 text-sm leading-relaxed text-toned"
              >
                <UIcon
                  name="i-lucide-book-open"
                  class="mt-0.5 size-4 shrink-0 text-primary"
                />
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Languages
            </p>
            <ul class="mt-4 space-y-3">
              <li
                v-for="language in about.languages"
                :key="language.name"
              >
                <div class="flex items-baseline justify-between gap-3 text-sm">
                  <span class="text-toned">{{ language.name }}</span>
                  <span class="font-mono text-xs text-dimmed">{{ language.proficiency }}</span>
                </div>
                <p
                  v-if="language.note"
                  class="mt-0.5 text-xs text-dimmed"
                >
                  {{ language.note }}
                </p>
              </li>
            </ul>
          </div>

          <div class="panel">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Away from the keyboard
            </p>
            <ul class="mt-4 space-y-2.5">
              <li
                v-for="interest in about.interests"
                :key="interest"
                class="flex gap-2.5 text-sm leading-relaxed text-toned"
              >
                <UIcon
                  name="i-lucide-dot"
                  class="mt-0.5 size-4 shrink-0 text-primary"
                />
                {{ interest }}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </UContainer>

    <!-- Experience -->
    <div class="border-y border-default bg-elevated/20">
      <UContainer class="py-20">
        <SectionHeading
          id="experience"
          eyebrow="Experience"
          title="Roles, in reverse"
        />

        <div class="mt-12 max-w-3xl">
          <RoleEntry
            v-for="role in roles"
            :key="`${role.company}-${role.startDate}`"
            :role="role"
          />
        </div>
      </UContainer>
    </div>

    <!-- Skills -->
    <UContainer class="py-20">
      <SectionHeading
        eyebrow="Toolkit"
        title="Skills and proficiency"
      />
      <div class="mt-12">
        <SkillGroups />
      </div>
    </UContainer>

    <!-- Open source -->
    <div
      id="open-source"
      class="scroll-mt-24 border-y border-default bg-elevated/20"
    >
      <UContainer class="py-20">
        <SectionHeading
          eyebrow="Open source"
          title="Packages I maintain, patches I have landed"
        />

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <RepoCard
            v-for="repo in repos"
            :key="repo.name"
            :repo="repo"
          />
        </div>
      </UContainer>
    </div>

    <!-- Education & certifications -->
    <UContainer class="py-20">
      <!-- Drops to one column when there are no certifications to sit beside education. -->
      <div
        class="grid gap-14"
        :class="{ 'lg:grid-cols-2': certifications.length }"
      >
        <div>
          <SectionHeading
            eyebrow="Education"
            title="Where I studied"
          />

          <div class="mt-10 space-y-8">
            <article
              v-for="entry in education"
              :key="entry.institution"
            >
              <h3 class="text-lg font-semibold tracking-tight text-highlighted">
                {{ entry.institution }}
              </h3>
              <p class="mt-1 text-sm text-toned">
                {{ entry.degree }} · {{ entry.field }}
              </p>
              <p class="mt-1.5 font-mono text-xs text-dimmed">
                {{ formatRange(entry.startDate, entry.endDate) }} · {{ entry.location }}
                <!-- Grade stays in app/data/credentials.ts but is not shown. Uncomment to bring it back.
                <template v-if="entry.grade">
                  · {{ entry.grade }}
                </template>
                -->
              </p>
              <p
                v-if="entry.finalProject"
                class="mt-3 text-sm leading-relaxed text-muted"
              >
                <span class="text-dimmed">Final project:</span> {{ entry.finalProject }}
              </p>
              <div
                v-if="entry.coursework.length"
                class="mt-3 flex flex-wrap gap-1.5"
              >
                <span
                  v-for="course in entry.coursework"
                  :key="course"
                  class="tag-pill"
                >
                  {{ course }}
                </span>
              </div>
            </article>
          </div>
        </div>

        <div v-if="certifications.length">
          <SectionHeading
            eyebrow="Certifications"
            title="Verified credentials"
          />

          <ul class="mt-10 space-y-4">
            <li
              v-for="certification in certifications"
              :key="certification.name"
              class="panel"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="text-sm font-semibold text-highlighted">
                    {{ certification.name }}
                  </h3>
                  <p class="mt-1 text-sm text-muted">
                    {{ certification.issuer }}
                  </p>
                </div>
                <UButton
                  v-if="certification.verificationUrl"
                  :to="certification.verificationUrl"
                  target="_blank"
                  rel="noopener"
                  icon="i-lucide-badge-check"
                  :aria-label="`Verify ${certification.name}`"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                />
              </div>
              <p class="mt-3 font-mono text-xs text-dimmed">
                Issued {{ formatDate(certification.issuedAt) }}
                <template v-if="certification.expiresAt">
                  · expires {{ formatDate(certification.expiresAt) }}
                </template>
                <template v-if="certification.credentialId">
                  · ID {{ certification.credentialId }}
                </template>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </UContainer>

    <!-- Speaking -->
    <div
      v-if="talks.length"
      class="border-t border-default bg-elevated/20"
    >
      <UContainer class="py-20">
        <SectionHeading
          eyebrow="Speaking & community"
          title="Talks, workshops and meetups"
        />

        <ul class="mt-12 divide-y divide-default border-y border-default">
          <li
            v-for="talk in talks"
            :key="talk.title"
            class="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-start gap-3">
              <UIcon
                :name="talkTypeIcon[talk.type]"
                class="mt-1 size-4 shrink-0 text-primary"
              />
              <div>
                <h3 class="text-sm font-medium text-highlighted">
                  {{ talk.title }}
                </h3>
                <p class="mt-0.5 font-mono text-xs text-dimmed">
                  {{ talk.event }} · {{ formatDate(talk.date, true) }} · {{ talk.location }}
                </p>
              </div>
            </div>

            <div class="flex shrink-0 gap-2 pl-7 sm:pl-0">
              <UButton
                v-if="talk.slidesUrl"
                :to="talk.slidesUrl"
                target="_blank"
                rel="noopener"
                label="Slides"
                icon="i-lucide-presentation"
                color="neutral"
                variant="subtle"
                size="xs"
              />
              <UButton
                v-if="talk.recordingUrl"
                :to="talk.recordingUrl"
                target="_blank"
                rel="noopener"
                label="Recording"
                icon="i-lucide-play"
                color="neutral"
                variant="subtle"
                size="xs"
              />
            </div>
          </li>
        </ul>
      </UContainer>
    </div>

    <!-- Resume -->
    <UContainer class="py-20">
      <SectionHeading
        eyebrow="Resume"
        title="The whole thing, on two pages"
        :description="`Last updated ${formatDate(site.resume.updatedAt, true)}.`"
      />

      <div class="mt-10 flex flex-wrap gap-3">
        <UButton
          :to="site.resume.file"
          external
          download
          label="Download PDF"
          trailing-icon="i-lucide-arrow-down-to-line"
          class="font-medium"
        />
        <UButton
          to="/resume"
          label="Read it in the browser"
          trailing-icon="i-lucide-arrow-up-right"
          color="neutral"
          variant="subtle"
        />
      </div>
    </UContainer>
  </div>
</template>
