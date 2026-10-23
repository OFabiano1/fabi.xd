import type { TimelineItem } from '../types'

// Editable timeline of things built. Add/remove entries freely.
export const timeline: TimelineItem[] = [
  {
    year: '2026',
    title: 'fabi.xd',
    kind: 'website',
    description:
      'Redesigned the personal site from scratch — TypeScript, Vite and a much more curated identity.',
    stack: ['React', 'TypeScript', 'Vite'],
    status: 'live',
  },
  {
    year: '2026',
    title: 'Axolotl BR',
    kind: 'community',
    description:
      'Growing the community hub around tech, games and building things on the internet.',
    stack: ['Discord', 'Community'],
    status: 'live',
  },
  {
    year: '2026',
    title: 'F.R.I.D.A.Y.',
    kind: 'tool',
    description:
      'An intelligent file organizer in Python — it learns how I organize and does it for me.',
    stack: ['Python', 'Tkinter'],
    status: 'building',
  },
  {
    year: '2026',
    title: 'AXL BOT',
    kind: 'bot',
    description:
      'Discord bot powering the community — tickets, games, levels and auto-responses.',
    stack: ['Python', 'Discord'],
    status: 'live',
  },
  {
    year: '2026',
    title: 'Axolotl SMP',
    kind: 'server',
    description:
      'Real survival Minecraft server for the community. No shortcuts, just building.',
    stack: ['Minecraft', 'SMP'],
    status: 'paused',
  },
  {
    year: '2025',
    title: 'axolotl* · 101 langs',
    kind: 'experiment',
    description:
      'Wrote the word "axolotl" in every programming language found. Total obsession, zero reason.',
    stack: ['101 langs', 'Git'],
    status: 'open-source',
  },
]