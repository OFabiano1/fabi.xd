import '../styles/projects.css'

export default function ProjectCard({ project, index }) {
  const delay = index % 3 === 1 ? ' d1' : index % 3 === 2 ? ' d2' : ''
  const number = `${String(index + 1).padStart(2, '0')}.`
  const isSelf = project.href && project.href.startsWith('#')

  return (
    <a
      className={`proj reveal${delay}`}
      href={project.href}
      target={isSelf ? undefined : '_blank'}
      rel={isSelf ? undefined : 'noopener'}
    >
      <div className={`proj-thumb grad-${project.gradient}`}>
        <span className="corner tl">{project.id}</span>
        <span className="tcode">◢&nbsp;{project.code}&nbsp;◣</span>
        <span className="corner br">{project.tag}</span>
      </div>
      <div className="proj-body">
        <span className="proj-id">
          <span>{project.category}</span>
          <span className="n">{number}</span>
        </span>
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-desc">{project.description}</p>
        <div className="proj-tags">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <span className="proj-go">
          {project.cta}&nbsp;<span>{project.arrow}</span>
        </span>
      </div>
    </a>
  )
}