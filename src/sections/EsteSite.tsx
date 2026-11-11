import { ExternalLink, Heart } from 'lucide-react'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import '../styles/este-site.css'

interface SiteBlock {
  code: string
  title: string
  text?: string
  list?: string[]
  repo?: string
  repoHref?: string
}

const madeOf: SiteBlock[] = [
  {
    code: '06.1',
    title: 'O projeto',
    text: 'um lugar só pras coisas que eu faço: código, design, comunidade e experimentos. papel preto, tinta roxa e uns commands escondidos no meio.',
  },
  {
    code: '06.2',
    title: 'Como foi feito',
    list: [
      'React 18 + TypeScript + Vite — bundle: ~60kb gzip',
      'CSS puro por seção, sem Tailwind — cada arquivo um cômodo',
      'Lab de brinquedos (#lab): partículas, pong e objeto 3D — zero dependências',
      'Easter eggs: terminal secreto (Ctrl + `), sala de lofi (Ctrl + Alt + Shift + W)',
      'Som global que você desliga — como controle na barra do topo',
      'Deploy estático no GitHub Pages, base própria /fabi.xd/',
    ],
  },
  {
    code: '06.3',
    title: 'Repositório',
    text: 'o código é público. serve de referência pra quem quer montar uma página pessoal com personalidade própria — copia, forka, muda a tinta.',
    repo: 'github.com/OFabiano1',
    repoHref: 'https://github.com/OFabiano1',
  },
]

export default function EsteSite() {
  return (
    <section id="este-site" className="section">
      <div className="wrap">
        <SectionHeading
          title={
            <>
              Feito à mão, <em>no papel preto</em>.
            </>
          }
        />

        <div className="site-grid">
          {madeOf.map((block, bi) => (
            <Reveal key={block.code} className="site-card" delay={80 + bi * 90}>
              <span className="site-code mono">{block.code}</span>
              <h3 className="site-block-title">{block.title}</h3>

              {block.text && <p className="site-text">{block.text}</p>}

              {block.list && (
                <ul className="site-list">
                  {block.list.map((item) => (
                    <li key={item}>
                      <span className="site-bullet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {block.repoHref && (
                <a
                  className="site-repo mono"
                  href={block.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                >
                  <ExternalLink size={14} />
                  repo: {block.repo}
                  <Heart size={13} className="site-heart" />
                </a>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="site-foot mono" delay={380}>
          fabi.xd · código por cima do papel preto
        </Reveal>
      </div>
    </section>
  )
}
