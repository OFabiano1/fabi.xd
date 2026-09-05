import '../styles/marquee.css'

export default function Marquee({ items }) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item.text}-${i}`} className={item.cls}>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}