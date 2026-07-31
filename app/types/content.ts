/**
 * Content model for the portfolio.
 *
 * Every page reads from `app/data/*` — nothing is hardcoded in templates.
 * Edit the data files, not the components.
 */

/* -------------------------------------------------------------------------- */
/* Shared                                                                      */
/* -------------------------------------------------------------------------- */

export interface Image {
  src: string
  alt: string
  width?: number
  height?: number
}

/**
 * Long-form bodies (case studies, blog posts) are authored as typed blocks
 * so they render without a markdown dependency and stay type-checked.
 */
export type Block
  = | { type: 'heading', text: string, id?: string }
    | { type: 'paragraph', text: string }
    | { type: 'list', ordered?: boolean, items: string[] }
    | { type: 'quote', text: string, cite?: string }
    | { type: 'code', language: string, filename?: string, code: string }
    | { type: 'image', image: Image, caption?: string }
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
  photo: Image
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
  currentlyBuilding: string[]
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
  decision: string
  rationale: string
  tradeoff?: string
}

export interface Challenge {
  challenge: string
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
  body: Block[]
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
  screenshots: Image[]
  demo?: {
    type: 'video' | 'gif'
    src: string
    poster?: string
    alt: string
  }
  category: ProjectCategory
  featured: boolean
  order: number
}

/* -------------------------------------------------------------------------- */
/* Work experience                                                             */
/* -------------------------------------------------------------------------- */

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship'

export interface RoleProject {
  name: string
  description: string
  url?: string
}

export interface Experience {
  company: string
  companyUrl?: string
  logo?: Image
  title: string
  employmentType: EmploymentType
  startDate: string
  endDate?: string
  location: string
  remote: boolean
  summary: string
  achievements: string[]
  stack: string[]
  projects: RoleProject[]
  order: number
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
  order: number
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

export interface OpenSourceItem {
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
  order: number
}

/* -------------------------------------------------------------------------- */
/* Writing                                                                     */
/* -------------------------------------------------------------------------- */

export interface Post {
  title: string
  slug: string
  excerpt: string
  body: Block[]
  publishedAt: string
  updatedAt?: string
  tags: string[]
  readingTime: number
  coverImage?: Image
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
  thesis?: string
  coursework: string[]
  order: number
}

export interface Certification {
  name: string
  issuer: string
  issuedAt: string
  expiresAt?: string
  credentialId?: string
  verificationUrl?: string
  order: number
}

export interface Talk {
  title: string
  event: string
  date: string
  location: string
  slidesUrl?: string
  recordingUrl?: string
  type: 'talk' | 'workshop' | 'podcast' | 'meetup'
  order: number
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string
  author: string
  authorTitle: string
  company: string
  photo?: Image
  sourceUrl?: string
  order: number
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
  external?: boolean
}

export interface ResumeVariant {
  label: string
  file: string
  audience: string
}

export interface SiteConfig {
  domain: string
  title: string
  description: string
  ogImage: string
  locale: string
  themePreference: 'light' | 'dark' | 'system'
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
    variants: ResumeVariant[]
  }
  notFound: {
    code: string
    title: string
    description: string
    hint: string
  }
  feeds: {
    rss: string
    sitemap: string
  }
}
