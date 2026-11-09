import { ArrowUpRight } from 'lucide-react'
import { Button } from 'prism'
import '../styles/hero.css'

const base = import.meta.env.BASE_URL

const into = ['code', 'design', 'music', 'automation', 'experiments']

const socials = [
  { label: 'GitHub', href: 'https://github.com/OFabiano1' },
  { label: 'Discord', href: 'https://dsc.gg/axolotlbr' },
  { label: 'X', href: 'https://x.com/ofabiano1x' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
]

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-media" aria-hidden="true">
        <video
          src={`${base}assets/papelpreto.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-media-veil" />
      </div>
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap hero-inner">
        <div className="hero-badge anim-fade-up" style={{ '--d': '80ms' } as React.CSSProperties}>
          <span className="dot r" />
          <span className="dot g" />
          <span className="dot b" />
          <span className="mono">fabi.xd/</span>
          <span className="hero-badge-on">online.</span>
          <span className="hero-badge-dash mono">/things</span>
        </div>

        <h1
          className="hero-title anim-fade-up"
          style={{ '--d': '180ms' } as React.CSSProperties}
        >
          hello world, i&apos;m fab
          <span className="hero-dot">.*</span>
        </h1>

        <p className="hero-tagline anim-fade-up" style={{ '--d': '260ms' } as React.CSSProperties}>
          <span className="hero-tag-strong">Building things</span> on the internet.
        </p>

        <p className="hero-sub anim-fade-up" style={{ '--d': '360ms' } as React.CSSProperties}>
          Developer, creator and curious mind. I explore the intersection of code,
          design and technology, turning random ideas into projects.
        </p>

        <div className="hero-actions anim-fade-up" style={{ '--d': '480ms' } as React.CSSProperties}>
          <Button href="#github" size="lg" label="explore projects" icon={ArrowUpRight} iconPosition="end" />
          <Button href="#about" size="lg" variant="secondary" label="about me" />
        </div>

        <div className="hero-soc anim-fade-up" style={{ '--d': '560ms' } as React.CSSProperties}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-soc-link mono"
              data-cursor
            >
              {s.label} <ArrowUpRight size={11} />
            </a>
          ))}
        </div>

        <div className="hero-into anim-fade-in" style={{ '--d': '680ms' } as React.CSSProperties}>
          <span className="hero-into-label mono">currently into:</span>
          <div className="hero-into-chips">
            {into.map((c) => (
              <span key={c} className="hero-into-chip mono">
                {c}
              </span>
            ))}
          </div>
        </div>

        <a href="#about" className="hero-scroll mono" aria-label="Scroll down">
          scroll
          <span className="hero-scroll-line" />
        </a>
      </div>
    </section>
  )
}
