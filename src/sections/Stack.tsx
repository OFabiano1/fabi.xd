import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { stack, stackGroups } from '../data/stack.ts'
import '../styles/stack.css'

const levelHint =
  '▮ = favorite · ▐ = daily · ░ = exploring'

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHeading
          index="03"
          tag="stack"
          title={
            <>
              The tools I <em>ship</em> with.
            </>
          }
          description="What I actually pick up on a daily basis — and what I keep poking at when curiosity wins."
        />

        <div className="stack-groups">
          {stackGroups.map((group, gi) => (
            <Reveal key={group} delay={gi * 70} className="stack-group">
              <div className="stack-group-head">
                <h3 className="stack-group-title mono">{group}</h3>
                <span className="stack-group-count mono">
                  {String(stack.filter((s) => s.group === group).length).padStart(2, '0')}
                </span>
              </div>
              <div className="stack-pills">
                {stack
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <span className={`stack-pill${item.level ? ` level-${item.level}` : ''}`} key={item.name}>
                      <span className="stack-pill-name mono">{item.name}</span>
                      <span className="stack-pill-mark" aria-hidden="true">
                        {item.level === 'favorite' ? '▮' : item.level === 'daily' ? '▐' : '░'}
                      </span>
                    </span>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="stack-hint mono" delay={120}>
          {levelHint}
        </Reveal>
      </div>
    </section>
  )
}