import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import '../styles/projects.css'

export default function Projects() {
  return (
    <section id="trabalho">
      <div className="wrap">
        <span className="tag reveal">Trabalho</span>
        <h2 className="section-title reveal">
          Conheça minhas
          <br />
          <em>criaturas.</em>
        </h2>

        <div className="work-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="work-more reveal">
          <a href="#contato" className="btn btn-ghost">
            SEU PROJETO NA PRÓXIMA LINHA&nbsp;→
          </a>
        </div>
      </div>
    </section>
  )
}