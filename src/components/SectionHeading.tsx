import Reveal from './Reveal.tsx'
import '../styles/section-heading.css'

interface SectionHeadingProps {
  title: React.ReactNode
  description?: string
}

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <Reveal className="section-head">
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </Reveal>
  )
}