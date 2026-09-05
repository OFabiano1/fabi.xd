import Skills from './Skills.jsx'
import '../styles/about.css'

const NBSP = '\u00A0'

const config = [
  { key: 'name', gap: `${NBSP}${NBSP}${NBSP}${NBSP}${NBSP}`, value: 'fabiano / fab!' },
  { key: 'role', gap: `${NBSP}${NBSP}${NBSP}${NBSP}${NBSP}`, value: 'creative developer & builder' },
  { key: 'org', gap: `${NBSP}${NBSP}${NBSP}${NBSP}${NBSP}`, value: 'axolotl br' },
  { key: 'stack', gap: `${NBSP}${NBSP}${NBSP}${NBSP}`, value: 'full-stack / TS + PY' },
  { key: 'vibe', gap: `${NBSP}${NBSP}${NBSP}${NBSP}${NBSP}`, value: 'digital underground' },
  { key: 'projetos', gap: `${NBSP}${NBSP}`, value: 'friday, axl, smp, site' },
  { key: 'musica', gap: `${NBSP}${NBSP}${NBSP}`, value: 'now playing * sempre' },
  { key: 'status', gap: `${NBSP}${NBSP}${NBSP}`, value: 'aceitando projetos' },
  { key: 'uptime', gap: `${NBSP}${NBSP}${NBSP}`, value: `24/7/365`, cursor: true },
]

export default function About() {
  return (
    <section id="sobre">
      <div className="wrap">
        <span className="tag reveal">WHO IS FABI?</span>
        <h2 className="section-title reveal">
          Site feio é <em>pecado.</em>
        </h2>

        <div className="about-grid">
          <div className="reveal d1">
            <p>
              Eu sou o <b>fab!</b> — creative developer &amp; builder. Faço a ponte entre{' '}
              <span className="hl">design</span> e <span className="hl">código</span>: interface
              afiada, sistema sólido, zero firula.
            </p>
            <p>
              Fundador da <b>Axolotl BR</b> — sua comunidade na internet. De player para
              player*. Daqui saem bot de Discord, organizador de arquivos, SMP e o repo em que
              escrevi &quot;axolotl&quot; em todas as linguagens (sim, eu sei).
            </p>
            <p>
              Do rascunho no figma até o deploy: front, back e infra com a mesma vibe. Sem
              template genérico, sem demo preguiçosa.
            </p>
            <p className="prompt">$ surf, build, ship, repeat</p>
            <Skills />
          </div>

          <div className="about-art reveal d2">
            <div>
              <span className="ln">// about.config</span>
            </div>
            {config.map((row) => (
              <div key={row.key}>
                <span className="kw">
                  {row.key}
                  {row.gap}:
                </span>{' '}
                <span className="str">&quot;{row.value}&quot;</span>
                {row.cursor && <span className="cur">&nbsp;</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}