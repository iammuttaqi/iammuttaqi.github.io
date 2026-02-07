<script setup lang="ts">
const data = ref()
data.value = await import('./../../data/resume.json')
</script>

<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-[380px_1fr] bg-linear-to-br from-indigo-500 via-purple-500 to-purple-600" v-if="data">
    <!-- Sidebar -->
    <aside class="relative bg-linear-to-b from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
      <div class="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent pointer-events-none"></div>
      <div class="relative z-10 p-8 md:p-12 space-y-10">
        <!-- Avatar -->
        <div class="relative w-48 h-48 mx-auto mb-10 animate-[fadeInDown_1s_ease-out]">
          <div class="absolute -inset-2 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-400 animate-spin-slow"></div>
          <NuxtImg :alt="data.name" class="relative z-10 w-48 h-48 rounded-full border-4 border-white object-cover shadow-2xl transition-transform duration-300 hover:scale-105" :src="data.avatar" width="190" height="190" placeholder
            format="webp" fit="cover" />
        </div>

        <!-- About Me -->
        <section class="pb-8 border-b border-white/20 animate-[fadeInLeft_1s_ease-out]">
          <h3 class="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
            <span class="text-xl">👤</span>
            <span>About Me</span>
          </h3>
          <p class="text-sm leading-relaxed opacity-95">{{ data.about }}</p>
        </section>

        <!-- Contact Info -->
        <section class="py-8 border-b border-white/20 animate-[fadeInLeft_1s_ease-out]">
          <h3 class="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
            <span class="text-xl">📞</span>
            <span>Contact Info</span>
          </h3>
          <div class="space-y-3">
            <a v-for="contact in data.contacts" :href="contact.href" target="_blank" class="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5 hover:bg-white/15 transition-all hover:translate-x-1 duration-300">
              <span class="text-lg">✉️</span>
              <span class="break-all">{{ contact.value }}</span>
            </a>
          </div>
        </section>

        <!-- Links -->
        <section class="py-8 border-b border-white/20 animate-[fadeInLeft_1s_ease-out]">
          <h3 class="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
            <span class="text-xl">🔗</span>
            <span>Links</span>
          </h3>
          <div class="space-y-3">
            <a v-for="link in data.links" :href="link.value" target="_blank" class="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5 hover:bg-white/15 transition-all hover:translate-x-1 duration-300">
              <span class="text-lg">{{ link.title === 'github' ? '🐙' : link.title === 'twitter' ? '🐦' : link.title === 'linkedin' ? '💼' : '🌐' }}</span>
              <span class="text-xs break-all">{{ link.value }}</span>
            </a>
          </div>
        </section>

        <!-- Languages -->
        <section class="pt-8 animate-[fadeInLeft_1s_ease-out]">
          <h3 class="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
            <span class="text-xl">🌍</span>
            <span>Languages</span>
          </h3>
          <div class="space-y-5">
            <div v-for="language in data.languages" class="space-y-2">
              <div class="flex justify-between items-center text-sm font-medium">
                <span>{{ language.title }}</span>
                <span class="font-bold text-amber-400">{{ language.value }}%</span>
              </div>
              <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                <div class="h-full bg-linear-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out" :style="{ width: language.value + '%' }"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="bg-white relative">
      <div class="max-w-6xl mx-auto p-8 md:p-12 lg:p-16 space-y-16">
        <!-- Header -->
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b-4 border-gray-200 animate-[fadeInUp_1s_ease-out]">
          <div class="flex-1">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2 leading-tight">{{ data.name }}</h1>
            <p class="text-base md:text-lg text-gray-600 font-medium">{{ data.summary }}</p>
          </div>
          <a :href="data.pdf" target="_blank" download class="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold text-sm shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/60 hover:-translate-y-0.5 transition-all duration-300">
            <span class="text-base">⬇</span>
            <span>Download CV</span>
          </a>
        </header>

        <!-- Work Experiences -->
        <section class="animate-[fadeInUp_1s_ease-out]">
          <div class="flex items-center gap-4 mb-10 pb-4 border-b-2 border-gray-200">
            <span class="text-3xl">💼</span>
            <h2 class="text-3xl font-bold text-gray-900">Work Experiences</h2>
          </div>

          <div class="space-y-8">
            <div v-for="(experience, index) in data.experiences" :key="index" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
              <div class="text-sm text-gray-600 font-semibold pt-1">{{ experience.timeline }}</div>
              <div class="relative pl-8 md:pl-10 md:border-l-2 md:border-gray-200">
                <div class="absolute left-0 md:-left-1.5 top-1.5 w-3 h-3 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-[0_0_0_3px_#e5e7eb] z-10"></div>
                <div class="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md border border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/15 hover:border-indigo-500 transition-all duration-300">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">{{ experience.position }}</h3>
                  <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
                    <span class="font-bold text-indigo-600 text-base">{{ experience.company }}</span>
                    <a v-if="experience.link" :href="experience.link" target="_blank" class="text-xs text-gray-600 hover:text-indigo-600 hover:underline transition-colors">{{ experience.link }}</a>
                  </div>
                  <div v-if="experience.location" class="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <span class="text-base">📍</span>
                    <span>{{ experience.location }}</span>
                  </div>
                  <div class="mt-4 pt-4 border-t border-gray-200">
                    <h4 class="font-bold text-sm text-gray-700 mb-3">Responsibilities:</h4>
                    <ul class="space-y-2">
                      <li v-for="(responsibility, idx) in experience.responsibilities" :key="idx" class="pl-6 relative text-sm text-gray-600 leading-relaxed before:content-['▹'] before:absolute before:left-0 before:text-indigo-600 before:font-bold">{{ responsibility }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section class="animate-[fadeInUp_1s_ease-out]">
          <div class="flex items-center gap-4 mb-10 pb-4 border-b-2 border-gray-200">
            <span class="text-3xl">⚡</span>
            <h2 class="text-3xl font-bold text-gray-900">Skills</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
            <div></div>
            <div class="relative pl-8 md:pl-10 md:border-l-2 md:border-gray-200">
              <div class="absolute left-0 md:-left-1.5 top-1.5 w-3 h-3 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-[0_0_0_3px_#e5e7eb] z-10"></div>
              <div class="bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md border border-gray-200">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Technical Skills</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="(skill, index) in data.skills" :key="index" class="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/15 hover:border-indigo-500 transition-all duration-300">
                    <h4 class="text-base font-bold text-indigo-600 mb-2">{{ skill.title }}</h4>
                    <p class="text-sm text-gray-600 leading-relaxed">{{ skill.details }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section class="animate-[fadeInUp_1s_ease-out]">
          <div class="flex items-center gap-4 mb-10 pb-4 border-b-2 border-gray-200">
            <span class="text-3xl">🎓</span>
            <h2 class="text-3xl font-bold text-gray-900">Education</h2>
          </div>

          <div class="space-y-8">
            <div v-for="(education, index) in data.educations" :key="index" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
              <div class="text-sm text-gray-600 font-semibold pt-1">{{ education.timeline }}</div>
              <div class="relative pl-8 md:pl-10 md:border-l-2 md:border-gray-200">
                <div class="absolute left-0 md:-left-1.5 top-1.5 w-3 h-3 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-[0_0_0_3px_#e5e7eb] z-10"></div>
                <div class="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md border border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/15 hover:border-indigo-500 transition-all duration-300">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">{{ education.degree }}</h3>
                  <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <span class="font-bold text-indigo-600 text-base">{{ education.institution }}</span>
                    <div v-if="education.location" class="flex items-center gap-1 text-sm text-gray-600">
                      <span class="text-base">📍</span>
                      <span>{{ education.location }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

div {
  font-family: Poppins, sans-serif;
}
</style>