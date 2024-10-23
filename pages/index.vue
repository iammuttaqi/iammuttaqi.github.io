<script setup lang="ts">
// onMounted(() => {
//   localStorage.removeItem('nuxt-color-mode')
// })
</script>


<template>
  <div class="m-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-4">
    <div class="col-span-1">
      <div class="h-full space-y-10 bg-blue-800 px-5 py-10 md:p-5">
        <div class="flex justify-center">
          <img alt="Muntaser Muttaqi" class="w-48 rounded-full" src="/avatar.png">
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
              <div class="gap-1 flex items-center">
                <UIcon name="i-mdi-envelope" class="size-5" />
                <a class="transition-all hover:underline" href="mailto:muntasermuttaqi@gmail.com"
                  target="_blank">muntasermuttaqi@gmail.com</a>
              </div>
            </div>
          </div>

          <div class="space-y-5 py-10 text-white">
            <h3 class="flex gap-1 font-bold uppercase items-center">
              <UIcon name="i-mdi-link" class="size-6" />
              <span>Links</span>
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex gap-1 items-center">
                <UIcon name="i-mdi-globe" class="size-5" />
                <a class="transition-all hover:underline" href="https://iammuttaqi.vercel.app"
                  target="_blank">https://iammuttaqi.vercel.app</a>
              </div>
              <div class="flex gap-1 items-center">
                <UIcon name="i-mdi-github" class="size-5" />
                <a class="transition-all hover:underline" href="https://github.com/iammuttaqi"
                  target="_blank">https://github.com/iammuttaqi</a>
              </div>
              <div class="flex gap-1 items-center">
                <UIcon name="i-mdi-twitter" class="size-5" />
                <a class="transition-all hover:underline" href="https://x.com/iammuttaqi"
                  target="_blank">https://x.com/iammuttaqi</a>
              </div>
              <div class="flex gap-1 items-center">
                <UIcon name="i-mdi-linkedin" class="size-5" />
                <a class="transition-all hover:underline" href="https://linkedin.com/in/iammuttaqi"
                  target="_blank">https://linkedin.com/in/iammuttaqi</a>
              </div>
            </div>
          </div>

          <div class="space-y-5 pt-10 text-white">
            <h3 class="flex gap-1 font-bold uppercase items-center">
              <UIcon name="i-mdi-translate" class="size-6" />
              <span>Languages</span>
            </h3>
            <div class="space-y-2 text-sm">
              <div class="space-y-1">
                <p>English</p>
                <div class="bg-gray-500">
                  <div class="h-2 w-2/3 bg-white"></div>
                </div>
              </div>
              <div class="space-y-1">
                <p>Bengali</p>
                <div class="bg-gray-500">
                  <div class="w-1/1 h-2 bg-white"></div>
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
              <h1 class="text-3xl font-semibold md:text-5xl">Muntaser Muttaqi</h1>
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

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0">August 2021 - Present</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">Lead Web Engineer, Full Stack Developer</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">Gymscanner</span>
                      (<a class="text-gray-600 transition-all hover:underline" href="https://gymscanner.com"
                        target="_blank">https://gymscanner.com</a>)
                    </p>
                    <p class="text-xs text-gray-600 flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="size-4" />
                      <span>Delaware City, USA</span>
                    </p>
                  </div>
                </div>
                <div class="text-gray-600">
                  <h5 class="font-bold">My involvement as a Full Stack Developer : </h5>
                  <ul class="list-disc px-5 py-2">
                    <li>Developed and maintained multiple web applications using Laravel and VueJs
                    </li>
                    <li>Utilized Laravel Eloquent and MySQL to manage database operations and
                      perform complex queries</li>
                    <li>Implemented responsive and user-friendly interfaces using TailwindCSS and
                      Bootstrap</li>
                    <li>Utilized Laravel Livewire and InertiaJs to build dynamic and interactive
                      experiences</li>
                    <li>Managed version control using Git</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0">April 2020 - Present</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">Freelancer</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">Fiverr, Upwork</span>
                    </p>
                  </div>
                </div>
                <div class="text-gray-600">
                  <h5 class="font-bold">My involvement as a Freelancer : </h5>
                  <ul class="list-disc px-5 py-2">
                    <li>Worked on a variety of web development projects using Laravel and VueJs</li>
                    <li>Utilized Laravel Eloquent and MySQL to manage database operations and
                      perform complex queries</li>
                    <li>Implemented responsive and user-friendly interfaces using TailwindCSS and
                      Bootstrap</li>
                    <li>Utilized Laravel Livewire and InertiaJs to build dynamic and interactive
                      experiences</li>
                    <li>Managed version control using Git</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0">February 2020 - July 2021</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">Web Developer</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">Ontik Technology</span>
                      (<a class="text-gray-600 transition-all hover:underline" href="https://ontiktechnology.com"
                        target="_blank">https://ontiktechnology.com</a>)
                    </p>
                    <p class="text-xs text-gray-600 flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="size-4" />
                      <span>Gulshan, Dhaka</span>
                    </p>
                  </div>
                </div>
                <div class="text-gray-600">
                  <h5 class="font-bold">My involvement as a Full Stack Developer : </h5>
                  <ul class="list-disc px-5 py-2">
                    <li>Developed and maintained multiple web applications using Laravel and VueJs
                    </li>
                    <li>Utilized Laravel Eloquent and MySQL to manage database operations and
                      perform complex queries</li>
                    <li>Implemented responsive and user-friendly interfaces using TailwindCSS and
                      Bootstrap</li>
                    <li>Utilized Laravel Livewire and InertiaJs to build dynamic and interactive
                      experiences</li>
                    <li>Managed version control using Git</li>
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
                  <ul class="list-disc px-5 py-2">
                    <li><strong>Laravel:</strong> Experienced in building web applications using the
                      Laravel framework. Proficient in implementing controllers, routes, views,
                      and models, and comfortable with Laravel's MVC architecture.</li>
                    <li><strong>Laravel Livewire:</strong> Experienced in using Laravel Livewire to
                      build dynamic and
                      interactive experiences without writing JavaScript. Proficient in
                      implementing Livewire components, handling events, and implementing reactive
                      data binding.</li>
                    <li><strong>VueJs:</strong> Skilled in building interactive and dynamic user
                      interfaces using
                      VueJs. Proficient in implementing Vue components, handling events, and
                      implementing reactive data binding.</li>
                    <li><strong>InertiaJs:</strong> Skilled in using InertiaJs to build full-stack
                      single-page
                      applications (SPAs) using Laravel and VueJs. Proficient in implementing
                      Inertia controllers and routes, and comfortable with Inertia's API-based
                      architecture.</li>
                    <li><strong>AlpineJs:</strong> Proficient in using AlpineJs to build lightweight
                      and interactive
                      user interfaces. Skilled in implementing Alpine directives and handling
                      events.</li>
                    <li><strong>VanillaJs:</strong> Experienced in using VanillaJs to build web
                      applications and
                      manipulate the DOM. Proficient in implementing event listeners, handling
                      events, and manipulating DOM elements.</li>
                    <li><strong>TailwindCSS:</strong> Skilled in using TailwindCSS to build
                      responsive and
                      user-friendly interfaces. Proficient in implementing layout, text,
                      background, and other styles using Tailwind's utility-based approach.</li>
                    <li><strong>Bootstrap:</strong> Experienced in using Bootstrap to build
                      responsive and
                      mobile-first interfaces. Proficient in implementing layout, text,
                      background, and other styles using Bootstrap's grid system and pre-designed
                      components.</li>
                    <li><strong>Laravel Eloquent:</strong> Experienced in using Laravel Eloquent to
                      manage database
                      operations and perform complex queries. Proficient in implementing Eloquent
                      models and relationships, and comfortable with Eloquent's ORM architecture.
                    </li>
                    <li><strong>MySQL:</strong> Skilled in using MySQL to design and implement
                      database schemas, and
                      perform CRUD operations. Proficient in implementing MySQL queries, indexes,
                      and constraints.</li>
                    <li><strong>Git:</strong> Experienced in using Git for version control.
                      Proficient in
                      implementing Git commands and workflows, and comfortable with Git's
                      branching and merging model</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0">April 2020 - Present</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">Freelancer</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">Fiverr, Upwork</span>
                    </p>
                  </div>
                </div>
                <div class="text-gray-600">
                  <h5 class="font-bold">My involvement as a Freelancer : </h5>
                  <ul class="list-disc px-5 py-2">
                    <li>Worked on a variety of web development projects using Laravel and VueJs</li>
                    <li>Utilized Laravel Eloquent and MySQL to manage database operations and
                      perform complex queries</li>
                    <li>Implemented responsive and user-friendly interfaces using TailwindCSS and
                      Bootstrap</li>
                    <li>Utilized Laravel Livewire and InertiaJs to build dynamic and interactive
                      experiences</li>
                    <li>Managed version control using Git</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0">February 2020 - July 2021</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">Web Developer</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">Ontik Technology</span>
                      (<a class="text-gray-600 transition-all hover:underline" href="https://ontiktechnology.com"
                        target="_blank">https://ontiktechnology.com</a>)
                    </p>
                    <p class="text-xs text-gray-600 flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="size-4" />
                      <span>Gulshan, Dhaka</span>
                    </p>
                  </div>
                </div>
                <div class="text-gray-600">
                  <h5 class="font-bold">My involvement as a Full Stack Developer : </h5>
                  <ul class="list-disc px-5 py-2">
                    <li>Developed and maintained multiple web applications using Laravel and VueJs
                    </li>
                    <li>Utilized Laravel Eloquent and MySQL to manage database operations and
                      perform complex queries</li>
                    <li>Implemented responsive and user-friendly interfaces using TailwindCSS and
                      Bootstrap</li>
                    <li>Utilized Laravel Livewire and InertiaJs to build dynamic and interactive
                      experiences</li>
                    <li>Managed version control using Git</li>
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

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
            <div class="col-span-1 pb-5 md:pb-0">August 2020 - September 2023</div>
            <div class="relative col-span-3 pl-5 md:pl-10">
              <div class="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-700">
              </div>
              <div class="space-y-3">
                <div class="space-y-2">
                  <h4 class="text-lg font-bold">BSC in Computer Science and Engineering</h4>
                  <div class="flex flex-col justify-between gap-2 md:flex-row md:gap-0">
                    <p>
                      <span class="font-bold text-blue-800">Northern University Bangladesh</span>
                    </p>
                    <p class="text-xs text-gray-600 flex items-center">
                      <UIcon name="i-heroicons-map-pin" class="size-4" />
                      <span>Dhaka, Bangladesh</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 divide-x-2 divide-gray-300 md:grid-cols-4">
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