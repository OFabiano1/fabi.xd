export interface StackItem {
  name: string
  /** nota de uso — alguma história pequena por trás da linguagem */
  note: string
}

// As dez linguagens/ferramentas que aparecem na home. Sem grupos, sem score.
export const stack: StackItem[] = [
  { name: 'C#', note: 'principal para apps e ferramentas' },
  { name: 'Kotlin', note: 'desktop e ferramentas pequenas' },
  { name: 'Python', note: 'bots, automação e scripts rápidos' },
  { name: 'Elixir', note: 'curiosidade séria de 2026' },
  { name: 'TypeScript', note: 'a web inteira do fabi.xd' },
  { name: 'JavaScript', note: 'o dia a dia antes do TS' },
  { name: 'React', note: 'a base do front' },
  { name: 'HTML', note: 'estrutura antes de tudo' },
  { name: 'CSS', note: 'papel preto mora aqui' },
  { name: 'Git', note: 'história versionada' },
]
