# AGENTS — fabi.xd (portfólio pessoal, não é Axolotl BR)

## Marca (atenção)

- Este projeto tem **identidade visual própria** do fabi (developer & creator). Usa o sistema Axolotl como referência técnica, mas NÃO aplicar tagline/voz/paleta Axolotl BR aqui.
- Segue os princípios gerais (visual construído, dark premium, PT-BR direto, sem inventar dados), mas o conteúdo é pessoal.
- `github.ts` usa dados mockados — manter o formato ao trocar por reais. Nunca inventar projetos/clientes.

## Stack / comandos

- React 18 + TS + Vite 5 + CSS puro por seção (`src/styles/`) + Lucide. Sem Tailwind.
- `npm install` / `npm run dev` (5173) / `npm run build` (`tsc --noEmit && vite build`) / `npm run preview`. Aqui build inclui typecheck, diferente do AxolotlBR.
- QUIRK: mesmo problema de caminho com `#`. Rodar de `C:\Temp` se `dev/build` quebrar.
- `vite.config.ts`: `base:'/fabi.xd/'` (Pages desse repo). Não mudar para `'./'` sem motivo.

## Onde mexer

- Conteúdo editável só em `src/data/`: `projects.ts`, `timeline.ts`, `stack.ts`, `socials.ts`, `github.ts`, marquee.
- `src/sections/` (Hero, About, Projects, Stack, Timeline, GitHub, Links, Contact), `src/components/` (Navbar, Reveal, ProjectCard, Footer...), `src/pages/` = Home, `src/hooks/` = `useTheme`/`useScrollSpy`/`useReveal`.
- Deploy: `.github/workflows/deploy.yml` publica `dist/` no Pages.
