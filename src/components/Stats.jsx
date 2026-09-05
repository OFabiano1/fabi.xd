import '../styles/stats.css'

const stats = [
  { value: <>&#8734;</>, label: 'Ideias em andamento', delay: '' },
  { value: <>24<sup>/7</sup></>, label: 'Build mode', delay: ' d1' },
  { value: <>100<sup>%</sup></>, label: 'Curiosidade', delay: ' d2' },
  { value: <>2026</>, label: 'Online', delay: ' d3' },
]

export default function Stats() {
  return (
    <section className="stats" id="stats">
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className={`stat reveal${stat.delay}`} key={stat.label}>
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}