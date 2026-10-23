import { ArrowDown } from 'lucide-react'
import '../styles/hero.css'

const codeLines = [
  'const fabi = {',
  '  handles: ["code", "design", "music"],',
  '  status: "online",',
  '  building: "things on the internet",',
  '}',
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-badge anim-fade-up" style={{ '--d': '80ms' } as React.CSSProperties}>
          <span className="dot" />
          <span className="mono">fabi.xd v5</span>
          <span className="hero-badge-sep">/</span>
          <span className="hero-badge-on">online</span>
          <span className="hero-badge-dash mono">./things</span>
        </div>

        <h1
          className="hero-title anim-fade-up"
          style={{ '--d': '180ms' } as React.CSSProperties}
        >
          fabi<span className="hero-dot">.xd</span>
        </h1>

        <p className="hero-tagline anim-fade-up" style={{ '--d': '300ms' } as React.CSSProperties}>
          <span className="hero-tag-slash">{"//"}</span>
          <span className="hero-tag-strong">building things</span> on the internet.
          <span className="caret" />
        </p>

        <p className="hero-sub anim-fade-up" style={{ '--d': '420ms' } as React.CSSProperties}>
          Developer, creator and internet enthusiast. Design &lt;-&gt; code, a little
          automation, and a lot of curiosity.
        </p>

        <div className="hero-actions anim-fade-up" style={{ '--d': '540ms' } as React.CSSProperties}>
          <a href="#work" className="btn btn-primary">
            ver projetos <ArrowDown size={15} />
          </a>
          <a href="#about" className="btn btn-ghost">
            sobre mim
          </a>
        </div>

        <div className="hero-code anim-fade-in" style={{ '--d': '720ms' } as React.CSSProperties}>
          {codeLines.map((line, i) => (
            <div key={line} className="hero-code-line">
              <span className="hero-code-ln mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="mono">{line}</span>
            </div>
          ))}
          <span className="hero-code-caret" />
        </div>

        <a href="#about" className="hero-scroll mono" aria-label="Rolar para baixo">
          scroll
          <span className="hero-scroll-line" />
        </a>
      </div>
    </section>
  )
}