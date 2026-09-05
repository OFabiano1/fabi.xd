import '../styles/skills.css'

const skills = ['REACT / NEXT', 'TYPESCRIPT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND', 'THREE.JS', 'FIGMA', 'VITE']

export default function Skills() {
  return (
    <div className="skills">
      {skills.map((skill) => (
        <span className="skill" key={skill}>
          {skill}
        </span>
      ))}
    </div>
  )
}