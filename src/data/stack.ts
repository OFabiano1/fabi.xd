import type { StackItem } from '../types'

export const stackGroups = ['Frontend', 'Backend', 'Tools & Ops'] as const

export const stack: StackItem[] = [
  { name: 'React', group: 'Frontend', level: 'favorite' },
  { name: 'TypeScript', group: 'Frontend', level: 'favorite' },
  { name: 'JavaScript', group: 'Frontend', level: 'daily' },
  { name: 'HTML', group: 'Frontend', level: 'daily' },
  { name: 'CSS', group: 'Frontend', level: 'daily' },
  { name: 'Vite', group: 'Frontend', level: 'daily' },
  { name: 'Python', group: 'Backend', level: 'favorite' },
  { name: 'Node.js', group: 'Backend', level: 'daily' },
  { name: 'PostgreSQL', group: 'Backend', level: 'exploring' },
  { name: 'Discord API', group: 'Backend', level: 'daily' },
  { name: 'Git', group: 'Tools & Ops', level: 'daily' },
  { name: 'GitHub', group: 'Tools & Ops', level: 'daily' },
  { name: 'Docker', group: 'Tools & Ops', level: 'exploring' },
  { name: 'Linux', group: 'Tools & Ops', level: 'daily' },
]