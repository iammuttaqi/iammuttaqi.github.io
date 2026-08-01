import type { Skill, SkillCategory } from '~/types/content'

/**
 * Tiers are self-assessed and deliberately conservative: `expert` means daily
 * use on production code for years, `familiar` means shipped something with it.
 * Years are counted from professional use, starting Feb 2020.
 */
export const skills: Skill[] = [
  // Languages
  { name: 'PHP', category: 'language', tier: 'expert', yearsUsed: 6, icon: 'i-simple-icons-php', order: 1 },
  { name: 'SQL', category: 'language', tier: 'advanced', yearsUsed: 6, icon: 'i-lucide-database', order: 2 },
  { name: 'JavaScript', category: 'language', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-javascript', order: 3 },
  { name: 'TypeScript', category: 'language', tier: 'proficient', yearsUsed: 2, icon: 'i-simple-icons-typescript', order: 4 },
  { name: 'HTML & CSS', category: 'language', tier: 'advanced', yearsUsed: 7, icon: 'i-simple-icons-html5', order: 5 },

  // Frameworks
  { name: 'Laravel', category: 'framework', tier: 'expert', yearsUsed: 6, icon: 'i-simple-icons-laravel', order: 1 },
  { name: 'Livewire', category: 'framework', tier: 'advanced', yearsUsed: 4, icon: 'i-lucide-zap', order: 2 },
  { name: 'Filament', category: 'framework', tier: 'advanced', yearsUsed: 3, icon: 'i-lucide-panels-top-left', order: 3 },
  { name: 'Inertia', category: 'framework', tier: 'advanced', yearsUsed: 4, icon: 'i-lucide-layers', order: 4 },
  { name: 'Vue', category: 'framework', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-vuedotjs', order: 5 },
  { name: 'Alpine.js', category: 'framework', tier: 'proficient', yearsUsed: 4, icon: 'i-simple-icons-alpinedotjs', order: 6 },
  { name: 'Nuxt', category: 'framework', tier: 'proficient', yearsUsed: 2, icon: 'i-simple-icons-nuxtdotjs', order: 7 },
  { name: 'Tailwind CSS', category: 'framework', tier: 'advanced', yearsUsed: 5, icon: 'i-simple-icons-tailwindcss', order: 8 },
  { name: 'Bootstrap', category: 'framework', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-bootstrap', order: 9 },
  { name: 'Pest', category: 'framework', tier: 'proficient', yearsUsed: 2, icon: 'i-lucide-flask-conical', order: 10 },

  // Databases
  { name: 'MySQL', category: 'database', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-mysql', order: 1 },
  { name: 'Eloquent ORM', category: 'database', tier: 'expert', yearsUsed: 6, icon: 'i-lucide-table-2', order: 2 },
  { name: 'SQLite', category: 'database', tier: 'proficient', yearsUsed: 4, icon: 'i-simple-icons-sqlite', order: 3 },

  // Infrastructure
  { name: 'GitHub Actions', category: 'infra', tier: 'proficient', yearsUsed: 3, icon: 'i-simple-icons-githubactions', order: 1 },
  { name: 'Vercel', category: 'infra', tier: 'proficient', yearsUsed: 3, icon: 'i-simple-icons-vercel', order: 2 },
  { name: 'Netlify', category: 'infra', tier: 'familiar', yearsUsed: 2, icon: 'i-simple-icons-netlify', order: 3 },
  { name: 'GitHub Pages', category: 'infra', tier: 'proficient', yearsUsed: 5, icon: 'i-simple-icons-github', order: 4 },

  // Tools
  { name: 'Git', category: 'tool', tier: 'expert', yearsUsed: 7, icon: 'i-simple-icons-git', order: 1 },
  { name: 'Composer', category: 'tool', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-composer', order: 2 },
  { name: 'Vite', category: 'tool', tier: 'advanced', yearsUsed: 4, icon: 'i-simple-icons-vite', order: 3 },
  { name: 'Laravel Pint', category: 'tool', tier: 'advanced', yearsUsed: 3, icon: 'i-lucide-sparkles', order: 4 },
  { name: 'Figma', category: 'tool', tier: 'familiar', yearsUsed: 3, icon: 'i-simple-icons-figma', order: 5 }
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
  items: skills.filter(skill => skill.category === category).sort((a, b) => a.order - b.order)
}))
