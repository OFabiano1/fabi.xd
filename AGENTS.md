# AGENTS — fabi.xd (portfólio pessoal, não é Axolotl BR)

## Marca

- Visual é **Prism** (`../prism`, pacote em `vendor/prism-*.tgz`): tokens `--prism-*` e papéis
  (`--background`, `--surface`, `--text-*`, `--border-*`), Inter + JetBrains Mono, tema escuro
  e claro pelo `DesignSystemProvider` (ligado ao toggle em `hooks/useTheme.tsx`).
- Proibido (regra do Prism): glow, glass/`backdrop-filter`, gradiente decorativo, `text-shadow`,
  sombra colorida, hex fora do shell em `styles/variables.css`.
- Ação vira `Button` do Prism (`href` para link). Não passe `className`/`style` para componente
  Prism nem mire `.prism-*` no CSS. Checagem: `node ../prism/scripts/check-consumer.mjs ../fabi.xd/src`.
- O conteúdo segue pessoal do fabi (developer & creator): sem tagline/voz institucional do
  Axolotl BR, sem inventar dados. `github.ts` usa dados mockados — manter o formato ao trocar por reais.

## Stack / comandos

- React 18 + TS + Vite 5 + CSS puro por seção (`src/styles/`) + Lucide. Sem Tailwind.
- `npm install` / `npm run dev` (5173) / `npm run build` (`tsc --noEmit && vite build`) / `npm run preview`. Aqui build inclui typecheck, diferente do AxolotlBR.
- QUIRK: mesmo problema de caminho com `#`. Rodar de `C:\Temp` se `dev/build` quebrar.
- `vite.config.ts`: `base:'/fabi.xd/'` (Pages desse repo). Não mudar para `'./'` sem motivo.

## Onde mexer

- Conteúdo editável só em `src/data/`: `projects.ts`, `timeline.ts`, `stack.ts`, `socials.ts`, `github.ts`, marquee.
- `src/sections/` (Hero, About, Projects, Stack, Timeline, GitHub, Links, Contact), `src/components/` (Navbar, Reveal, ProjectCard, Footer...), `src/pages/` = Home, `src/hooks/` = `useTheme`/`useScrollSpy`/`useReveal`.
- Deploy: `.github/workflows/deploy.yml` publica `dist/` no Pages a cada push e a cada 30 min
  (o passo `scripts/fetch-spotify.mjs` atualiza `src/data/spotify.json` antes do build).
