# fabi.xd

Site pessoal / portfólio do **fabi** — developer & creator.
Identidade visual própria, feita em React + TypeScript + Vite.

## Stack

- React 18
- TypeScript
- Vite 5
- CSS puro organizado por seção (`src/styles/`)
- Lucide Icons

## Estrutura

```
src/
├── components/   # UI reutilizável (Navbar, Reveal, ProjectCard, Footer...)
├── sections/     # seções da página (Hero, About, Projects, Stack, Timeline, GitHub, Links, Contact)
├── pages/        # Home
├── hooks/        # useTheme, useScrollSpy, useReveal
├── data/         # dados editáveis (projects, stack, timeline, socials, github, marquee)
├── styles/       # CSS por componente + design system (variables/globals/animations/utilities)
├── assets/
├── types.ts
├── App.tsx
└── main.tsx
```

## Rodando

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Deploy

GitHub Actions em `.github/workflows/deploy.yml` publica o `dist/` no GitHub Pages.
`vite.config.ts` já usa `base: '/fabi.xd/'`.

## Editar conteúdo

Tudo fica em `src/data/`:

- `projects.ts` — cards de projetos (nome, descrição, tech, status, gradiente, links)
- `timeline.ts` — linha do tempo de coisas construídas
- `stack.ts` — tecnologias exibidas
- `socials.ts` — redes sociais + e-mail de contato
- `github.ts` — dados do perfil GitHub (mockados; só trocar mantendo o formato)