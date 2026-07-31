import type { Skill, SkillCategory } from '~/types/content'

export const skills: Skill[] = [
  // Languages
  { name: 'PHP', category: 'language', tier: 'expert', yearsUsed: 8, icon: 'i-simple-icons-php', order: 1 },
  { name: 'SQL', category: 'language', tier: 'expert', yearsUsed: 8, icon: 'i-lucide-database', order: 2 },
  { name: 'TypeScript', category: 'language', tier: 'advanced', yearsUsed: 5, icon: 'i-simple-icons-typescript', order: 3 },
  { name: 'JavaScript', category: 'language', tier: 'advanced', yearsUsed: 8, icon: 'i-simple-icons-javascript', order: 4 },
  { name: 'Bash', category: 'language', tier: 'proficient', yearsUsed: 6, icon: 'i-lucide-terminal', order: 5 },
  { name: 'Rust', category: 'language', tier: 'familiar', yearsUsed: 1, icon: 'i-simple-icons-rust', order: 6 },

  // Frameworks
  { name: 'Laravel', category: 'framework', tier: 'expert', yearsUsed: 7, icon: 'i-simple-icons-laravel', order: 1 },
  { name: 'Livewire', category: 'framework', tier: 'advanced', yearsUsed: 4, icon: 'i-lucide-zap', order: 2 },
  { name: 'Inertia', category: 'framework', tier: 'advanced', yearsUsed: 4, icon: 'i-lucide-layers', order: 3 },
  { name: 'Vue 3', category: 'framework', tier: 'advanced', yearsUsed: 5, icon: 'i-simple-icons-vuedotjs', order: 4 },
  { name: 'Nuxt', category: 'framework', tier: 'proficient', yearsUsed: 3, icon: 'i-simple-icons-nuxtdotjs', order: 5 },
  { name: 'Tailwind CSS', category: 'framework', tier: 'advanced', yearsUsed: 5, icon: 'i-simple-icons-tailwindcss', order: 6 },
  { name: 'Pest', category: 'framework', tier: 'expert', yearsUsed: 4, icon: 'i-lucide-flask-conical', order: 7 },

  // Databases
  { name: 'Postgres', category: 'database', tier: 'expert', yearsUsed: 6, icon: 'i-simple-icons-postgresql', order: 1 },
  { name: 'MySQL', category: 'database', tier: 'expert', yearsUsed: 8, icon: 'i-simple-icons-mysql', order: 2 },
  { name: 'Redis', category: 'database', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-redis', order: 3 },
  { name: 'Elasticsearch', category: 'database', tier: 'proficient', yearsUsed: 3, icon: 'i-simple-icons-elasticsearch', order: 4 },
  { name: 'SQLite', category: 'database', tier: 'advanced', yearsUsed: 7, icon: 'i-simple-icons-sqlite', order: 5 },

  // Infrastructure
  { name: 'Docker', category: 'infra', tier: 'advanced', yearsUsed: 6, icon: 'i-simple-icons-docker', order: 1 },
  { name: 'Terraform', category: 'infra', tier: 'proficient', yearsUsed: 3, icon: 'i-simple-icons-terraform', order: 2 },
  { name: 'AWS (ECS, RDS, S3)', category: 'infra', tier: 'advanced', yearsUsed: 5, icon: 'i-simple-icons-amazonwebservices', order: 3 },
  { name: 'GitHub Actions', category: 'infra', tier: 'advanced', yearsUsed: 5, icon: 'i-simple-icons-githubactions', order: 4 },
  { name: 'Nginx', category: 'infra', tier: 'proficient', yearsUsed: 6, icon: 'i-simple-icons-nginx', order: 5 },
  { name: 'Laravel Forge', category: 'infra', tier: 'advanced', yearsUsed: 5, icon: 'i-lucide-server', order: 6 },

  // Tools
  { name: 'Git', category: 'tool', tier: 'expert', yearsUsed: 8, icon: 'i-simple-icons-git', order: 1 },
  { name: 'Horizon', category: 'tool', tier: 'expert', yearsUsed: 5, icon: 'i-lucide-activity', order: 2 },
  { name: 'Datadog', category: 'tool', tier: 'proficient', yearsUsed: 3, icon: 'i-lucide-line-chart', order: 3 },
  { name: 'OpenTelemetry', category: 'tool', tier: 'familiar', yearsUsed: 2, icon: 'i-lucide-radar', order: 4 },
  { name: 'Figma', category: 'tool', tier: 'familiar', yearsUsed: 4, icon: 'i-simple-icons-figma', order: 5 }
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
