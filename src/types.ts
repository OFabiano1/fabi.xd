export interface StackItem {
  name: string
  note: string
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

export interface ExperienceItem {
  company: string
  role: string
  status: 'active' | 'paused'
  period: string
  description: string
  tech: string[]
  href?: string
}

export interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  url: string
  playedAt: number
}

export interface SpotifyData {
  isMocked: boolean
  /** unix (segundos) da última coleta; 0 = mock */
  updated: number
  tracks: SpotifyTrack[]
}
