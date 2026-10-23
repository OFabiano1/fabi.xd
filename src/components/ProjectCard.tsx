import { ArrowUpRight, Github } from 'lucide-react'
import type { Project, ProjectStatus } from '../types'
import Reveal from './Reveal.tsx'
import '../styles/projects.css'

const statusLabel: Record<ProjectStatus, string> = {
  live: '● live',
  building: '◐ building',
  paused: '○ paused',
  'open-source': '◎ open source',
}

export default function ProjectCard({ project }: { project: Project }) {
  const hasGithub = Boolean(project.links.github)
  const hasDemo = Boolean(project.links.demo)

  return (
    <Reveal delay={0} className="project-card">
      <article className="project">
        <div className={`project-preview grad-${project.gradient}`}>
          <div className="project-preview-noise" aria-hidden="true" />
          <span className="project-code mono">{project.mono}</span>
          <span className="project-category mono">{project.id}</span>
          <span className={`project-status mono st-${project.status}`}>
            {statusLabel[project.status]}
          </span>
          <div className="project-preview-corner" aria-hidden="true">
            <span>◆</span>
          </div>
        </div>

        <div className="project-body">
          <div className="project-head">
            <h3 className="project-name">{project.name}</h3>
            <div className="project-links">
              {hasGithub && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} no GitHub`}
                >
                  <Github size={16} />
                </a>
              )}
              {hasDemo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${project.name}`}
                >
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          <p className="project-tagline mono">{project.tagline}</p>
          <p className="project-description">{project.description}</p>

          <div className="project-tech">
            {project.tech.map((t) => (
              <span className="project-chip mono" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
}