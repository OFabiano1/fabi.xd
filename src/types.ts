export type ProjectCategory = 'Web' | 'Tools' | 'Bots' | 'Experiments'

export type ProjectStatus = 'live' | 'building' | 'paused' | 'open-source'

export interface Project {
  id: string
  name: string
  tagline: string
  status: ProjectStatus
  categories: ProjectCategory[]
  tech: string[]
  description: string
  gradient: string
  mono: string
  links: {
    github?: string
    demo?: string
  }
}

export interface TimelineItem {
  year: string
  title: string
  kind: string
  description: string
  stack: string[]
  status?: ProjectStatus
}

export interface StackItem {
  name: string
  group: string
  level?: 'favorite' | 'daily' | 'exploring'
}

export interface SocialLink {
  label: string
  handle: string
  href: string
}

export interface GithubMock {
  username: string
  stats: { repos: number; commits: number; contributions: number; stars: number }
  pinned: { name: string; description: string; language: string; stars: number; forks: number }[]
  isMocked: boolean
}