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