import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { timeline } from '../data/timeline.ts'
import '../styles/timeline.css'

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="wrap">
        <SectionHeading
          index="04"
          tag="things built"
          title={
            <>
              A short <em>history</em>.
            </>
          }
        />

        <ol className="timeline">
          {timeline.map((item, i) => (
            <li key={`${item.year}-${item.title}`} className="timeline-item">
              <Reveal delay={0} className="timeline-row">
                <span className="timeline-axis" aria-hidden="true">
                  <span className="timeline-node" />
                  {i < timeline.length - 1 && <span className="timeline-rule" />}
                </span>
                <div className="timeline-year mono">{item.year}</div>
                <div className="timeline-card">
                  <div className="timeline-card-top">
                    <h3 className="timeline-title">{item.title}</h3>
                    <span className="timeline-kind mono">{item.kind}</span>
                  </div>
                  <p className="timeline-desc">{item.description}</p>
                  <div className="timeline-stack">
                    {item.stack.map((s) => (
                      <span className="timeline-chip mono" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}