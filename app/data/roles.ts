import type { Role } from '../types/content'

export const roles: Role[] = [
  {
    company: 'Gymscanner',
    companyUrl: 'https://gymscanner.com',
    title: 'Lead Web Engineer',
    employmentType: 'Full-time',
    startDate: '2021-08',
    location: 'Remote',
    remote: true,
    summary:
      'Lead the web stack for a global platform that lets people book gym memberships, tourist passes and personal training sessions across a hundred-plus cities. Laravel on the server, Livewire and Vue on the front, working with a team spread across the US, Kuwait and Romania.',
    achievements: [
      'Own the web application end to end — schema, application code, interface and release',
      'Built the booking and listing flows used by both sides of the marketplace: people looking for a gym, and the gyms and trainers selling access',
      'Keep the codebase current across successive Laravel, Livewire and Filament major versions rather than letting it calcify',
      'Work asynchronously across a UTC-5 to UTC+6 spread, which puts the burden on written decisions rather than meetings'
    ],
    stack: ['Laravel', 'Livewire', 'Filament', 'Vue', 'Inertia', 'Alpine.js', 'Tailwind CSS', 'MySQL', 'Eloquent', 'Git'],
    highlights: []
  },
  {
    company: 'Ontik Technology',
    title: 'Web Developer',
    employmentType: 'Full-time',
    startDate: '2020-02',
    endDate: '2021-07',
    location: 'Gulshan, Dhaka, Bangladesh',
    remote: false,
    summary:
      'First full-time engineering role. Built client web applications on a Laravel and Vue stack, in an office where the feedback loop was short and the deadlines were someone else\'s.',
    achievements: [
      'Delivered client applications on Laravel with Vue and Blade front-ends',
      'Learned the framework properly — Eloquent, queues, validation, auth — on projects that had to actually work',
      'Moved from writing features to owning them through review, deploy and the bug reports that followed'
    ],
    stack: ['Laravel', 'Vue', 'Blade', 'Bootstrap', 'MySQL', 'jQuery', 'Git'],
    highlights: []
  },
  {
    company: 'Fiverr',
    companyUrl: 'https://www.fiverr.com/iammuttaqi',
    title: 'Freelance Web Developer',
    employmentType: 'Freelance',
    startDate: '2020-04',
    location: 'Remote',
    remote: true,
    summary:
      'Ongoing freelance work alongside the day job. Laravel applications, Vue front-ends and the unglamorous maintenance jobs — upgrades, bug hunts and features bolted onto codebases someone else wrote.',
    achievements: [
      'Scope, quote, build and hand over projects solo, including the parts that are not code',
      'Work directly with non-technical clients, which is its own skill and mostly consists of asking better questions',
      'Maintain a rating good enough that most work now arrives through repeat clients'
    ],
    stack: ['Laravel', 'Livewire', 'Vue', 'Tailwind CSS', 'Bootstrap', 'MySQL'],
    highlights: []
  }
]
