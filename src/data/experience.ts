export interface ExperienceItem {
  company: string
  role: string
  status: 'active' | 'paused'
  period: string
  description: string
  tech: string[]
  href?: string
}

// Editable experience list — real, no CV- Corporate vibes.
export const experience: ExperienceItem[] = [
  {
    company: 'Axolotl BR',
    role: 'Founder & Developer',
    status: 'active',
    period: '2020 — now',
    description: 'Community, projects and ecosystem development. Discord, bots, web hub and the SMP.',
    tech: ['Python', 'C#', 'Kotlin'],
    href: 'https://dsc.gg/axolotlbr',
  },
  {
    company: 'FarmaScale',
    role: 'Developer',
    status: 'active',
    period: '2025 — now',
    description: 'Front-end work: interfaces, flows and product tooling.',
    tech: ['React', 'PHP'],
  },
]
