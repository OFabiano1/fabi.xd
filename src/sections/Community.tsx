import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal.tsx'
import '../styles/community.css'

const chips = ['JOGAR.', 'CRIAR.', 'CONECTAR.']

/** Community — Axolotl BR, PT-BR, o coletivo que iniciou tudo. */
export default function Community() {
  return (
    <section id="community" className="community">
      <div className="wrap community-inner">
        <Reveal>
          <span className="community-tag mono">07 / community · axolotl br</span>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="community-title">
            AXOLOTL
            <span className="community-title-accent">BR</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="community-tagline">
            Sua comunidade na internet. De player para player.
          </p>
        </Reveal>

        <Reveal delay={230}>
          <div className="community-chips">
            {chips.map((c) => (
              <span key={c} className="community-chip mono">
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="community-actions">
            <a
              href="https://dsc.gg/axolotlbr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              data-cursor
            >
              entrar no discord <ArrowUpRight size={15} />
            </a>
            <a
              href="https://github.com/OFabiano1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              data-cursor
            >
              ver o código <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={370}>
          <div className="community-foot mono">
            &copy; 2020&ndash;2026 fabi &middot; made on the internet
          </div>
        </Reveal>
      </div>
    </section>
  )
}
