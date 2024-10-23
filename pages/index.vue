<script setup lang="ts">
const data = ref()
import('./../data/resume.json')
  .then((response) => {
    data.value = response
  })
</script>

<template>
  <div class="m-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-4" v-if="data">
    <div class="col-span-1">
      <div class="h-full space-y-10 bg-blue-800 px-5 py-10 md:p-5">
        <div class="flex justify-center">
          <img :alt="data.name" class="w-48 rounded-full" src="/avatar.png">
        </div>

        <div class="divide-y divide-gray-400">
          <div class="space-y-5 pb-10 text-white">
            <h3 class="gap-1 font-bold uppercase flex items-center">
              <UIcon name="i-mdi-user" class="size-6" />
              <span>About Me</span>
            </h3>
            <p>Full-stack Developer with over three years of experience in building modern web applications.
            </p>
          </div>

          <div class="space-y-5 py-10 text-white">
            <h3 class="gap-1 font-bold uppercase flex items-center">
              <UIcon name="i-mdi-phone" class="size-6" />
              <span>Contact Info</span>
            </h3>
            <div class="space-y-2 text-sm">
              <div class="gap-1 flex items-center" v-for="contact in data.contacts">
                <UIcon :name="contact.icon" class="size-5" />
                <a class="transition-all hover:underline" :href="contact.href" target="_blank">{{
                  contact.value }}</a>
              </div>
            </div>
          </div>

          <div class="space-y-5 py-10 text-white">
            <h3 class="flex gap-1 font-bold uppercase items-center">
              <UIcon name="i-mdi-link" class="size-6" />
              <span>Links</span>
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex gap-1 items-center" v-for="link in data.links">
                <UIcon :name="link.icon" class="size-5" />
                <a class="transition-all hover:underline" :href="link.value" target="_blank">{{
                  link.value }}</a>
              </div>
            </div>
          </div>

          <div class="space-y-5 pt-10 text-white">
            <h3 class="flex gap-1 font-bold uppercase items-center">
              <UIcon name="i-mdi-translate" class="size-6" />
              <span>Languages</span>
            </h3>
            <div class="space-y-4 text-sm">
              <div class="space-y-1" v-for="language in data.languages">
                <p>{{ language.title }}</p>
                <div class="bg-gray-500">
                  <div class="h-2 bg-white" :class="language.value"></div>
                </div>
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
              <h4 class="text-xs md:text-base"><strong>3+ years</strong> of experience | <strong>Web
                  Development</strong></h4>
            </div>
            <a class="rounded-md border border-dashed border-gray-500 px-2 py-1 text-sm transition-all hover:bg-gray-100 flex gap-1 items-center"
              download href="/muntaser-muttaq-resume.pdf" target="_blank">
              <UIcon name="i-heroicons-arrow-down-tray" class="size-4" />Download
            </a>
          </div>
        </div>

        <!-- Work Experiences -->
        <div class="space-y-5 text-sm">
          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <h3 class="-ml-3 space-x-2 text-xl md:col-start-2 flex items-center">
              <UIcon name="i-heroicons-briefcase" class="size-6" />
              <span>Work Experiences</span>
            </h3>
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
                    <p class="text-xs text-gray-600 flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="size-4" />
                      <span>Delaware City, USA</span>
                    </p>
                  </div>
                </div>
                <div class="text-gray-600">
                  <h5 class="font-bold">Responsibilities : </h5>
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
            <h3 class="-ml-3 space-x-2 text-xl md:col-start-2 flex items-center">
              <UIcon name="i-heroicons-folder-open" class="size-6" />
              <span>Skills</span>
            </h3>
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
            <h3 class="-ml-3 space-x-2 text-xl md:col-start-2 flex items-center">
              <UIcon name="i-heroicons-academic-cap" class="size-6" />
              <span>Education</span>
            </h3>
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4" v-for="education in data.educations">
            <div class="col-span-1 pb-5 md:pb-0">{{ education.timeline }}</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">{{ education.degree }}</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">{{ education.institution }}</span>
                    </p>
                    <p class="text-xs text-gray-600 flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="size-4" />
                      <span>{{ education.location }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0">August 2014 - January 2019</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">Diploma in Computer Science and Technology</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">Feni Computer Institute</span>
                    </p>
                    <p class="text-xs text-gray-600 flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="size-4" />
                      <span>Feni, Bangladesh</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
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