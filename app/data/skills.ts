import type { Skill, SkillCategory } from '../types/content'

/**
 * Tiers are self-assessed and deliberately conservative: `expert` means daily
 * use on production code for years, `familiar` means shipped something with it.
 * Years are counted from professional use, starting Feb 2020.
 */
export const skills: Skill[] = [
  // Languages
  { name: 'PHP', category: 'language', tier: 'expert', yearsUsed: 6, icon: 'i-simple-icons-php' },
  { name: 'SQL', category: 'language', tier: 'advanced', yearsUsed: 6, icon: 'i-lucide-database' },
  { name: 'JavaScript', category: 'language', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-javascript' },
  { name: 'TypeScript', category: 'language', tier: 'proficient', yearsUsed: 2, icon: 'i-simple-icons-typescript' },
  { name: 'HTML & CSS', category: 'language', tier: 'advanced', yearsUsed: 7, icon: 'i-simple-icons-html5' },

  // Frameworks
  { name: 'Laravel', category: 'framework', tier: 'expert', yearsUsed: 6, icon: 'i-simple-icons-laravel' },
  { name: 'Livewire', category: 'framework', tier: 'advanced', yearsUsed: 4, icon: 'i-lucide-zap' },
  { name: 'Filament', category: 'framework', tier: 'advanced', yearsUsed: 3, icon: 'i-lucide-panels-top-left' },
  { name: 'Inertia', category: 'framework', tier: 'advanced', yearsUsed: 4, icon: 'i-lucide-layers' },
  { name: 'Vue', category: 'framework', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-vuedotjs' },
  { name: 'Alpine.js', category: 'framework', tier: 'proficient', yearsUsed: 4, icon: 'i-simple-icons-alpinedotjs' },
  { name: 'Nuxt', category: 'framework', tier: 'proficient', yearsUsed: 2, icon: 'i-simple-icons-nuxtdotjs' },
  { name: 'Tailwind CSS', category: 'framework', tier: 'advanced', yearsUsed: 5, icon: 'i-simple-icons-tailwindcss' },
  { name: 'Bootstrap', category: 'framework', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-bootstrap' },
  { name: 'Pest', category: 'framework', tier: 'proficient', yearsUsed: 2, icon: 'i-lucide-flask-conical' },

  // Databases
  { name: 'MySQL', category: 'database', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-mysql' },
  { name: 'Eloquent ORM', category: 'database', tier: 'expert', yearsUsed: 6, icon: 'i-lucide-table-2' },
  { name: 'SQLite', category: 'database', tier: 'proficient', yearsUsed: 4, icon: 'i-simple-icons-sqlite' },

  // Infrastructure
  { name: 'GitHub Actions', category: 'infra', tier: 'proficient', yearsUsed: 3, icon: 'i-simple-icons-githubactions' },
  { name: 'Vercel', category: 'infra', tier: 'proficient', yearsUsed: 3, icon: 'i-simple-icons-vercel' },
  { name: 'Netlify', category: 'infra', tier: 'familiar', yearsUsed: 2, icon: 'i-simple-icons-netlify' },
  { name: 'GitHub Pages', category: 'infra', tier: 'proficient', yearsUsed: 5, icon: 'i-simple-icons-github' },

  // Tools
  { name: 'Git', category: 'tool', tier: 'expert', yearsUsed: 7, icon: 'i-simple-icons-git' },
  { name: 'Composer', category: 'tool', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-composer' },
  { name: 'Vite', category: 'tool', tier: 'advanced', yearsUsed: 4, icon: 'i-simple-icons-vite' },
  { name: 'Laravel Pint', category: 'tool', tier: 'advanced', yearsUsed: 3, icon: 'i-lucide-sparkles' },
  { name: 'Figma', category: 'tool', tier: 'familiar', yearsUsed: 3, icon: 'i-simple-icons-figma' }
]

export const skillCategoryLabels: Record<SkillCategory, string> = {
  language: 'Languages',
  framework: 'Frameworks',
  database: 'Data stores',
  infra: 'Infrastructure',
  tool: 'Tooling'
}

export const skillCategoryOrder: SkillCategory[] = ['language', 'framework', 'database', 'infra', 'tool']

export const groupedSkills = skillCategoryOrder.map(category => ({
  category,
  label: skillCategoryLabels[category],
  items: skills.filter(skill => skill.category === category)
}))
