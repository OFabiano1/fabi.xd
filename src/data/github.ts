import type { GithubMock } from '../types'

/**
 * Mocked GitHub data.
 * Swap this file for a real API fetch later (e.g. call the GitHub REST API)
 * keeping the same shape — the section only reads from `githubData`.
 */
export const githubData: GithubMock = {
  username: 'OFabiano1',
  isMocked: true,
  stats: {
    repos: 6,
    commits: 1284,
    contributions: 2026,
    stars: 12,
  },
  pinned: [
    {
      name: 'fabi.xd',
      description: 'Personal site / portfolio — React, TypeScript, Vite.',
      language: 'TypeScript',
      stars: 4,
      forks: 0,
    },
    {
      name: 'axolotl-langs',
      description: '"axolotl" written in 101 programming languages.',
      language: 'Python',
      stars: 6,
      forks: 1,
    },
    {
      name: 'friday',
      description: 'Intelligent local file organizer (Python + Tkinter).',
      language: 'Python',
      stars: 2,
      forks: 0,
    },
  ],
}