import type { About, Identity } from '../types/content'

export const identity: Identity = {
  fullName: 'Muntaser Muttaqi',
  title: 'Software Engineer',
  tagline: 'I build web applications in Laravel, and I ship them.',
  pronunciation: 'moon-TAH-ser moo-TAH-kee',
  status: {
    state: 'open-to-work',
    label: 'Open to offers',
    detail: 'Lead Web Engineer at Gymscanner · happy where I am, but listening'
  },
  location: {
    city: 'Feni',
    country: 'Bangladesh',
    timezone: 'Asia/Dhaka',
    utcOffset: 'UTC+6',
    remoteFriendly: true
  },
  photo: {
    src: '/images/profile.webp',
    alt: 'Muntaser Muttaqi, wearing glasses and a dark shirt, against a plain grey backdrop',
    width: 750,
    height: 750
  },
  heroBio:
    'Six years of building web applications in Laravel — five of them leading the web stack at Gymscanner, a global gym and trainer booking platform. Laravel and Livewire on the server, Vue and Inertia where the page needs to think for itself.'
}

export const about: About = {
  yearsOfExperience: 6,
  bio: [
    'I am a software engineer working mostly in PHP and Laravel. Since 2021 I have led web engineering at Gymscanner, a platform for booking gym memberships and personal training across a hundred-plus cities, which means I have spent five years living with my own decisions on a single product rather than handing codebases off and moving on. That is the part of the job I would recommend to anyone: you learn far more from the second year of a system than the first.',
    'My default stack is Laravel with Livewire and Filament, Inertia and Vue when the interface earns it, Tailwind on top, MySQL underneath. I like the parts of the framework most people skip past — Eloquent relationships that model the domain instead of the tables, form requests that make invalid state unrepresentable, queues that do not lose work when a worker dies mid-job.',
    'Outside the day job I build things and put them online. Filament Fakester is a small package on Packagist that fills form fields with sensible fake data in development. Al Quran is an ad-free reader I built for myself and then kept polishing. Most of the rest are experiments — a real-time audio monitor, a chess analyser, a handful of things that exist because I wanted to know whether they would work.'
  ],
  // The about page h1 and the home page's About section title, so it has to read
  // as a headline in both. No full stop — every other heading on the site goes
  // without one. The meta description comes from identity.heroBio, not this.
  careerNarrative: 'Who I am, and what I build',
  specialization: [
    'Laravel application development, end to end',
    'Livewire and Filament admin interfaces',
    'Inertia and Vue front-ends on a Laravel backend',
    'Eloquent data modelling and MySQL schema design',
    'Shipping and maintaining a product over years, not sprints'
  ],
  // Drives the "// currently" strip on the home page, rendered as "Working on
  // {item}". It is what has the attention now, which is not the same as what is
  // new — Gymscanner has been the answer for years. Keep entries to a couple of
  // words; the strip is one line of mono type.
  currentFocus: [
    'Gymscanner'
  ],
  // The home page strip renders only the first entry, prefixed with "Learning",
  // so keep whatever has most of the attention at the top. Same length rule as
  // currentFocus above.
  currentlyLearning: [
    'AI tooling'
  ],
  languages: [
    { name: 'Bengali', proficiency: 'Native' },
    { name: 'English', proficiency: 'Professional', note: 'Daily working language on a distributed team' }
  ],
  interests: [
    'Building small tools nobody asked for',
    'Islamic study apps — Quran readers, tarbiyah tooling',
    'Chess',
    'Music, and the software around it'
  ]
}
