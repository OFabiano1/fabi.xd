import Reveal from './Reveal.tsx'
import '../styles/section-heading.css'

interface SectionHeadingProps {
  index: string
  tag: string
  title: React.ReactNode
  description?: string
}

export default function SectionHeading({ index, tag, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="section-head">
      <span className="section-tag">
        <span className="section-idx">{index}</span>
        {tag}
      </span>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </Reveal>
  )
}