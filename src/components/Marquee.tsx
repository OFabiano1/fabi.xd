import '../styles/marquee.css'

interface MarqueeItem {
  text: string
  ghost?: boolean
}

interface MarqueeProps {
  items: MarqueeItem[]
}

export default function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item.text}-${i}`} className={`marquee-item${item.ghost ? ' ghost' : ''}`}>
            <span>{item.text}</span>
            <span className="marquee-star">*</span>
          </span>
        ))}
      </div>
    </div>
  )
}