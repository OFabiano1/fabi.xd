import { useState } from 'react'
import type { ProjectCategory } from '../types'
import { projects, projectFilters } from '../data/projects.ts'
import ProjectCard from '../components/ProjectCard.tsx'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import '../styles/projects.css'

type Filter = (typeof projectFilters)[number]

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')

  const visible =
    filter === 'All'
      ? projects
      : projects.filter((p) =>
          p.categories.includes(filter as ProjectCategory)
        )

  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHeading
          index="02"
          tag="selected projects"
          title={
            <>
              Things I&apos;ve made that <em>survived</em>.
            </>
          }
          description="A curated list of what lives on my corner of the internet. Bots, tools, communities and experiments — each one taught me something."
        />

        <Reveal delay={60}>
          <div className="work-filters" role="tablist" aria-label="Filtrar projetos">
            {projectFilters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`work-filter mono${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                <span className="work-filter-dot" />
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="work-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Reveal className="work-more" delay={80}>
          <p className="mono">more building in progress <span className="caret" /></p>
          <a
            href="https://github.com/OFabiano1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            ver tudo no github
          </a>
        </Reveal>
      </div>
    </section>
  )
}