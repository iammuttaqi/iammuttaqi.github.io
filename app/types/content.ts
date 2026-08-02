/**
 * Content model for the portfolio.
 *
 * Every page reads from `app/data/*` — nothing is hardcoded in templates.
 * Edit the data files, not the components.
 */

/* -------------------------------------------------------------------------- */
/* Shared                                                                      */
/* -------------------------------------------------------------------------- */

export interface ImageRef {
  src: string
  alt: string
  width?: number
  height?: number
}

/**
 * Long-form bodies (case studies, blog posts) are authored as typed blocks
 * so they render without a markdown dependency and stay type-checked.
 */
export type ProseBlock
  = | { type: 'heading', text: string, id?: string }
    | { type: 'paragraph', text: string }
    | { type: 'list', ordered?: boolean, items: string[] }
    | { type: 'quote', text: string, cite?: string }
    | { type: 'code', language: string, filename?: string, code: string }
    | { type: 'image', image: ImageRef, caption?: string }
    | { type: 'callout', tone?: 'info' | 'success' | 'warning', title?: string, text: string }

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export type AvailabilityState = 'open-to-work' | 'building' | 'freelance' | 'unavailable'

export interface Identity {
  fullName: string
  title: string
  tagline: string
  status: {
    state: AvailabilityState
    label: string
    detail?: string
  }
  location: {
    city: string
    country: string
    timezone: string
    utcOffset: string
    remoteFriendly: boolean
  }
  photo: ImageRef
  heroBio: string
  pronunciation?: string
}

export interface LanguageSkill {
  name: string
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic'
  note?: string
}

export interface About {
  bio: string[]
  yearsOfExperience: number
  careerNarrative: string
  specialization: string[]
  /** What has the attention right now — ongoing work counts, not just new builds. */
  currentFocus: string[]
  currentlyLearning: string[]
  languages: LanguageSkill[]
  interests: string[]
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type ProjectStatus = 'live' | 'in-development' | 'archived'
export type ProjectCategory = 'saas' | 'open-source' | 'client' | 'internal-tool' | 'experiment'

export interface ArchitectureDecision {
  choice: string
  rationale: string
  tradeoff?: string
}

export interface Challenge {
  problem: string
  solution: string
}

export interface Outcome {
  metric: string
  value: string
  detail?: string
}

export interface Project {
  title: string
  slug: string
  summary: string
  problem: string
  body: ProseBlock[]
  role: string
  owned: string[]
  teamSize: number
  timeline: {
    start: string
    end?: string
    label: string
  }
  status: ProjectStatus
  stack: string[]
  architecture: ArchitectureDecision[]
  challenges: Challenge[]
  outcomes: Outcome[]
  liveUrl?: string
  repoUrl?: string
  screenshots: ImageRef[]
  demo?: {
    type: 'video' | 'gif'
    src: string
    poster?: string
    alt: string
  }
  category: ProjectCategory
  featured: boolean
}

/* -------------------------------------------------------------------------- */
/* Roles                                                                       */
/* -------------------------------------------------------------------------- */

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship'

export interface RoleHighlight {
  name: string
  description: string
  url?: string
}

export interface Role {
  company: string
  companyUrl?: string
  title: string
  employmentType: EmploymentType
  startDate: string
  endDate?: string
  location: string
  remote: boolean
  summary: string
  achievements: string[]
  stack: string[]
  highlights: RoleHighlight[]
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export type SkillCategory = 'language' | 'framework' | 'database' | 'infra' | 'tool'
export type ProficiencyTier = 'expert' | 'advanced' | 'proficient' | 'familiar'

export interface Skill {
  name: string
  category: SkillCategory
  tier: ProficiencyTier
  yearsUsed: number
  icon?: string
}

/* -------------------------------------------------------------------------- */
/* Open source                                                                 */
/* -------------------------------------------------------------------------- */

export type OpenSourceRole = 'author' | 'maintainer' | 'contributor'

export interface ExternalContribution {
  repo: string
  url: string
  description: string
  merged: boolean
}

export interface Repo {
  name: string
  description: string
  repoUrl: string
  packageUrl?: string
  registry?: 'packagist' | 'npm'
  stats: {
    stars: number
    forks: number
    downloads: number
  }
  role: OpenSourceRole
  language: string
  contributions: ExternalContribution[]
}

/* -------------------------------------------------------------------------- */
/* Writing                                                                     */
/* -------------------------------------------------------------------------- */

export interface Post {
  title: string
  slug: string
  excerpt: string
  body: ProseBlock[]
  publishedAt: string
  updatedAt?: string
  tags: string[]
  readingTime: number
  coverImage?: ImageRef
  canonicalUrl?: string
  externalPublication?: string
  draft?: boolean
}

/* -------------------------------------------------------------------------- */
/* Education, certifications, speaking                                         */
/* -------------------------------------------------------------------------- */

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  location: string
  grade?: string
  finalProject?: string
  coursework: string[]
}

export interface Certification {
  name: string
  issuer: string
  issuedAt: string
  expiresAt?: string
  credentialId?: string
  verificationUrl?: string
}

export interface Talk {
  title: string
  event: string
  date: string
  location: string
  slidesUrl?: string
  recordingUrl?: string
  type: 'talk' | 'workshop' | 'podcast' | 'meetup'
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string
  author: string
  authorTitle: string
  company: string
  photo?: ImageRef
  sourceUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Site config                                                                 */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  label: string
  handle: string
  url: string
  icon: string
}

export interface NavItem {
  label: string
  to: string
  icon?: string
}

export interface SiteConfig {
  domain: string
  title: string
  description: string
  ogImage: string
  locale: string
  analyticsId?: string
  nav: NavItem[]
  footer: {
    text: string
    copyrightHolder: string
    startYear: number
  }
  contact: {
    email: string
    bookingUrl?: string
    responseTime: string
  }
  socials: SocialLink[]
  resume: {
    file: string
    updatedAt: string
  }
  notFound: {
    title: string
    description: string
    hint: string
  }
  feeds: {
    rss: string
    sitemap: string
  }
}
