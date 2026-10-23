import type { Project } from '../types'

export const projectFilters = ['All', 'Web', 'Tools', 'Bots', 'Experiments'] as const

export const projects: Project[] = [
  {
    id: 'FABI_XD',
    name: 'fabi.xd',
    tagline: 'this site — my stake on the internet',
    status: 'live',
    categories: ['Web', 'Experiments'],
    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    description:
      'The personal corner of the internet I build everything from. Design, code and a lot of curiosity living in the same place.',
    gradient: 'violet',
    mono: 'fabi.xd/',
    links: {
      github: 'https://github.com/OFabiano1',
    },
  },
  {
    id: 'FRIDAY',
    name: 'F.R.I.D.A.Y.',
    tagline: 'an intelligent file organizer',
    status: 'building',
    categories: ['Tools'],
    tech: ['Python', 'Tkinter', 'Offline'],
    description:
      'Smart local file organizing — videos, projects and files sorted by your own rules. Understands first, organizes after, never deletes.',
    gradient: 'teal',
    mono: 'friday.py',
    links: {
      github: 'https://github.com/OFabiano1',
    },
  },
  {
    id: 'AXL',
    name: 'AXL BOT',
    tagline: 'the community keeps itself online',
    status: 'live',
    categories: ['Bots'],
    tech: ['Python', 'Discord', 'Cogs'],
    description:
      'Discord bot that holds the community together — tickets, minigames, levels and auto-responses. Online 24/7 so nobody has to.',
    gradient: 'red',
    mono: 'axl.bot',
    links: {
      demo: 'https://dsc.gg/axolotlbr',
      github: 'https://github.com/OFabiano1',
    },
  },
  {
    id: 'AXOLOTL_BR',
    name: 'Axolotl BR',
    tagline: 'your community on the internet',
    status: 'live',
    categories: ['Web'],
    tech: ['Community', 'Discord', 'Hub'],
    description:
      'A community built around tech, games and building stuff together. From server to SMP, this is the home base of the rolê.',
    gradient: 'pink',
    mono: 'axolotl_br/',
    links: {
      demo: 'https://dsc.gg/axolotlbr',
    },
  },
  {
    id: 'AXOLOTL_SMP',
    name: 'Axolotl SMP',
    tagline: 'survival, the real one',
    status: 'paused',
    categories: ['Experiments'],
    tech: ['Minecraft', 'SMP', 'Survival'],
    description:
      'The community Minecraft server. Real survival, no shortcuts — a digital place to hang out and build things together.',
    gradient: 'green',
    mono: 'smp/',
    links: {
      demo: 'https://dsc.gg/axolotlbr',
    },
  },
  {
    id: 'AXOLOTL_LANGS',
    name: 'AXOLOTL*',
    tagline: 'obsession, documented',
    status: 'open-source',
    categories: ['Experiments'],
    tech: ['101 langs', 'Repo', 'Fun'],
    description:
      'Wrote the word "axolotl" in every programming language I could find. Zero practical reason. Absolutely necessary.',
    gradient: 'blue',
    mono: 'axolotl.langs',
    links: {
      github: 'https://github.com/OFabiano1',
    },
  },
]