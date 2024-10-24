<script setup lang="ts">
const data = ref()
const response = await import('./../data/resume.json')
data.value = response
</script>

<template>
  <div class="m-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-4" v-if="data">
    <div class="col-span-1">
      <div class="h-full space-y-10 bg-blue-800 px-5 py-10 md:p-5">
        <div class="flex justify-center">
          <NuxtImg :alt="data.name" class="w-48 rounded-full" src="/avatar.png" width="190" placeholder format="webp"
            fit="cover" />
        </div>

        <div class="divide-y divide-gray-400">
          <div class="space-y-4 pb-8 text-white">
            <UButton color="white" class="uppercase p-0 hover:no-underline" variant="link"
              icon="i-heroicons-user-circle">About Me
            </UButton>
            <p class="text-sm">Full-stack Developer with over three years of experience in building modern web
              applications.</p>
          </div>

          <div class="space-y-4 py-8 text-white">
            <UButton color="white" class="uppercase p-0 hover:no-underline" variant="link" icon="i-heroicons-phone">
              Contact Info</UButton>

            <div class="space-y-2 text-sm">
              <div class="gap-1 flex items-center" v-for="contact in data.contacts">
                <UButton color="white" class="p-0 text-sm" variant="link" :icon="contact.icon" :to="contact.href"
                  target="_blank">{{ contact.value }}</UButton>
              </div>
            </div>
          </div>

          <div class="space-y-4 py-8 text-white">
            <UButton color="white" class="uppercase p-0 hover:no-underline" variant="link" icon="i-heroicons-link">Links
            </UButton>

            <div class="space-y-2 text-sm">
              <div class="flex gap-1 items-center" v-for="link in data.links">
                <UButton color="white" class="p-0 text-sm" variant="link" :icon="link.icon" :to="link.value"
                  target="_blank">{{ link.value }}</UButton>
              </div>
            </div>
          </div>

          <div class="space-y-4 pt-8 text-white">
            <UButton color="white" class="uppercase p-0 hover:no-underline" variant="link" icon="i-heroicons-language">
              Languages</UButton>
            <div class="space-y-4 text-sm">
              <div class="space-y-2" v-for="language in data.languages">
                <p>{{ language.title }}</p>
                <UProgress :value="language.value" color="green" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-3">
      <div class="space-y-10 px-5 py-10 md:space-y-20 md:p-10">
        <div class="space-y-1">
          <div class="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
            <div class="space-y-2 md:space-y-0">
              <h1 class="text-3xl font-semibold md:text-5xl">{{ data.name }}</h1>
              <h4 class="text-xs md:text-base">{{ data.summary }}</h4>
            </div>
            <UButton icon="i-heroicons-arrow-down-tray" size="2xs" color="gray"
              class="border border-dashed border-gray-500 hover:bg-gray-100 transition-all hover:no-underline"
              variant="link" label="Download" :trailing="false" download to="/muntaser-muttaq-resume.pdf"
              target="_blank" />
          </div>
        </div>

        <!-- Work Experiences -->
        <div class="space-y-5 text-sm">
          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <UButton icon="i-heroicons-briefcase" size="xl" color="black" variant="link" label="Work Experiences"
              :trailing="false" class="flex items-center -ml-3 md:col-start-2 hover:no-underline p-0" />
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4"
            v-for="experience in data.experiences">
            <div class="col-span-1 pb-5 md:pb-0">{{ experience.timeline }}</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">{{ experience.position }}</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p class="space-x-1">
                      <span class="font-bold text-blue-800">{{ experience.company }}</span>
                      <span class="text-xs" v-if="experience.link">(<a
                          class="text-gray-600 transition-all hover:underline" :href="experience.link"
                          target="_blank">{{ experience.link }}</a>)</span>
                    </p>
                    <UButton icon="i-heroicons-map-pin" size="2xs" color="black" variant="link"
                      :label="experience.location" :trailing="false" class="p-0" v-if="experience.location" />
                  </div>
                </div>
                <div class="text-gray-600">
                  <h5 class="font-bold">Responsibilities: </h5>
                  <ul class="list-disc px-5 py-2 space-y-2">
                    <li v-for="responsibility in experience.responsibilities">{{ responsibility }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div class="space-y-5 text-sm">
          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <UButton icon="i-heroicons-folder-open" size="xl" color="black" variant="link" label="Skills"
              :trailing="false" class="flex items-center -ml-3 md:col-start-2 hover:no-underline p-0" />
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0"></div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">Technical Skill</h4>
                </div>
                <div class="text-gray-600">
                  <ul class="list-disc px-5 py-2 space-y-4">
                    <li v-for="skill in data.skills"><strong class="font-bold">{{ skill.title }}:</strong> {{
                      skill.details }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="space-y-5 text-sm">
          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <UButton icon="i-heroicons-academic-cap" size="xl" color="black" variant="link" label="Education"
              :trailing="false" class="flex items-center -ml-3 md:col-start-2 hover:no-underline p-0" />
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4" v-for="education in data.educations">
            <div class="col-span-1 pb-5 md:pb-0">{{ education.timeline }}</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700"></div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">{{ education.degree }}</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p class="font-bold text-blue-800">{{ education.institution }}</p>
                    <UButton icon="i-heroicons-map-pin" size="2xs" color="black" variant="link"
                      :label="education.location" :trailing="false" class="p-0" v-if="education.location" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  font-family: Poppins, sans-serif;
}
</style>