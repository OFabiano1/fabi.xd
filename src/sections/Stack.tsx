import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { stack } from '../data/stack.ts'
import '../styles/stack.css'

/** Stack — dez itens flat, cada um com uma nota pequena. Sem score. */
export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHeading
          title={
            <>
              The tools I <em>ship</em> with.
            </>
          }
          description="What I actually pick up — languages and tools, no corporate score."
        />

        <ol className="stack-flat">
          {stack.map((item, i) => (
            <Reveal key={item.name} delay={60 + i * 40} className="stack-cell">
              <span className="stack-cell-idx mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="stack-cell-name">{item.name}</span>
              <span className="stack-cell-note">{item.note}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
