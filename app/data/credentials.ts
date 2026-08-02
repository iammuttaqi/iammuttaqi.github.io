import type { Certification, Education, Talk, Testimonial } from '../types/content'

export const education: Education[] = [
  {
    institution: 'Northern University Bangladesh',
    degree: 'BSc',
    field: 'Computer Science and Engineering',
    startDate: '2020-08',
    endDate: '2024-09',
    location: 'Dhaka, Bangladesh',
    grade: 'CGPA 3.42 / 4.00',
    // TODO(muttaqi): replace with the title as it is registered with the department.
    finalProject: 'Aurora: verifying product authenticity through per-unit serial numbers and a QR-backed chain of custody',
    // TODO(muttaqi): these are the courses this section would normally list — cut
    // anything you did not take and add the ones I have missed.
    coursework: [
      'Data Structures and Algorithms',
      'Database Management Systems',
      'Object-Oriented Programming',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering'
    ]
  },
  {
    institution: 'Feni Computer Institute',
    degree: 'Diploma In Engineering',
    field: 'Computer Science and Technology',
    startDate: '2014-08',
    endDate: '2019-01',
    location: 'Feni, Bangladesh',
    grade: 'GPA 3.20 / 4.00',
    finalProject: 'A multi-vendor e-commerce platform — seller accounts, per-seller catalogues and a shared checkout',
    // TODO(muttaqi): drawn from the standard BTEB Computer Science and Technology
    // syllabus — cut anything that was not on yours and add what I have missed.
    coursework: [
      'Structured Programming in C',
      'Digital Electronics',
      'Microprocessor and Assembly Language',
      'Data Communication and Computer Networking',
      'Computer Peripherals and Interfacing',
      'Web Design and Development',
      'System Analysis and Design'
    ]
  }
]

/**
 * Placeholder entries, commented out until there are real ones to put here.
 * The pages that consume these arrays hide their whole section when the array
 * is empty, so nothing renders while this stays as it is.
 */
export const certifications: Certification[] = [
  // {
  //   name: 'AWS Certified Solutions Architect — Associate',
  //   issuer: 'Amazon Web Services',
  //   issuedAt: '2024-03',
  //   expiresAt: '2027-03',
  //   credentialId: 'AWS-SAA-000000',
  //   verificationUrl: 'https://aws.amazon.com/verification'
  // },
  // {
  //   name: 'Laravel Certified Developer',
  //   issuer: 'Laravel',
  //   issuedAt: '2023-08',
  //   credentialId: 'LCD-0000',
  //   verificationUrl: 'https://certification.laravel.com/verify'
  // },
  // {
  //   name: 'HashiCorp Certified: Terraform Associate',
  //   issuer: 'HashiCorp',
  //   issuedAt: '2024-10',
  //   expiresAt: '2026-10',
  //   credentialId: 'HCTA-000000',
  //   verificationUrl: 'https://credentials.hashicorp.com/verify'
  // }
]

export const talks: Talk[] = [
  // {
  //   title: 'Idempotency is a product feature',
  //   event: 'Laracon EU',
  //   date: '2026-02-11',
  //   location: 'Amsterdam, Netherlands',
  //   slidesUrl: 'https://speakerdeck.com/muttaqi/idempotency-is-a-product-feature',
  //   recordingUrl: 'https://youtube.com/watch?v=000000',
  //   type: 'talk'
  // },
  // {
  //   title: 'Debugging queues you cannot see',
  //   event: 'PHP Dhaka Meetup',
  //   date: '2025-09-06',
  //   location: 'Dhaka, Bangladesh',
  //   slidesUrl: 'https://speakerdeck.com/muttaqi/debugging-queues',
  //   type: 'meetup'
  // },
  // {
  //   title: 'Event sourcing without the framework',
  //   event: 'Laravel Worldwide Meetup',
  //   date: '2025-04-22',
  //   location: 'Online',
  //   recordingUrl: 'https://youtube.com/watch?v=000001',
  //   type: 'talk'
  // },
  // {
  //   title: 'Building a billing engine in a weekend (and why you should not)',
  //   event: 'The PHP Roundtable',
  //   date: '2024-11-15',
  //   location: 'Online',
  //   recordingUrl: 'https://phproundtable.example.com/000',
  //   type: 'podcast'
  // },
  // {
  //   title: 'Testing Laravel applications with Pest — full-day workshop',
  //   event: 'Laracon India',
  //   date: '2024-06-08',
  //   location: 'Bengaluru, India',
  //   slidesUrl: 'https://speakerdeck.com/muttaqi/pest-workshop',
  //   type: 'workshop'
  // }
]

export const testimonials: Testimonial[] = [
  // {
  //   quote:
  //     'Muntaser rewrote a projection layer we had all quietly agreed was untouchable. Rebuilds went from fourteen hours to forty minutes, and he left behind documentation good enough that the team shipped schema changes without him the week he left.',
  //   author: 'Priya Raman',
  //   authorTitle: 'VP Engineering',
  //   company: 'Meridian Freight',
  //   photo: { src: '/images/testimonials/priya.svg', alt: 'Portrait of Priya Raman', width: 96, height: 96 },
  //   sourceUrl: 'https://linkedin.com/in/example'
  // },
  // {
  //   quote:
  //     'We hired him to fix billing bugs. He told us the bugs were a symptom of the schema and rebuilt it as a proper ledger. Eighteen months later we have had zero double-charges and our month-end close takes an afternoon.',
  //   author: 'Daniel Okafor',
  //   authorTitle: 'CTO',
  //   company: 'Northgate Digital',
  //   photo: { src: '/images/testimonials/daniel.svg', alt: 'Portrait of Daniel Okafor', width: 96, height: 96 }
  // },
  // {
  //   quote:
  //     'The most useful code reviewer I have worked with. He does not just say what is wrong — he explains which failure mode you are about to meet in production and roughly when.',
  //   author: 'Sana Iqbal',
  //   authorTitle: 'Backend Engineer',
  //   company: 'Meridian Freight',
  //   photo: { src: '/images/testimonials/sana.svg', alt: 'Portrait of Sana Iqbal', width: 96, height: 96 }
  // },
  // {
  //   quote:
  //     'His Laracon talk on idempotency changed how our team writes webhook handlers. We deleted a deduplication service because of it.',
  //   author: 'Tomas Lindqvist',
  //   authorTitle: 'Principal Engineer',
  //   company: 'Nordflow',
  //   sourceUrl: 'https://x.com/example/status/000'
  // }
]
