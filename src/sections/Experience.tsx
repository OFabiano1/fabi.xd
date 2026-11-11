import { Briefcase, Grip } from 'lucide-react'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { experience } from '../data/experience.ts'
import '../styles/experience.css'

/** Experience — cargos e tecnologias, sem CV corporativo. */
export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHeading
          title={
            <>
              Onde eu <em>colo pra funcionar</em>.
            </>
          }
        />

        <div className="experience-list">
          {experience.map((job, i) => (
            <Reveal
              key={job.company}
              delay={90 + i * 110}
              className={`experience-row${i === 0 ? ' first' : ''}`}
            >
              <span className="experience-node" aria-hidden="true" />

              <div className="experience-card">
                <div className="experience-head">
                  <h3 className="experience-company">
                    {job.href ? (
                      <a href={job.href} target="_blank" rel="noopener noreferrer" data-cursor>
                        {job.company}
                        <Grip size={14} className="experience-arrow" aria-hidden="true" />
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  <span className={`experience-status mono${job.status === 'active' ? ' live' : ''}`}>
                    {job.status === 'active' ? 'active' : 'paused'}
                  </span>
                </div>

                <p className="experience-role">
                  <Briefcase size={13} />
                  {job.role}
                  <span className="experience-period mono">· {job.period}</span>
                </p>

                <p className="experience-desc">{job.description}</p>

                <div className="experience-tech mono">
                  {job.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
