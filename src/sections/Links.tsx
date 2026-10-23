import { ArrowUpRight, Github, Instagram, Youtube } from 'lucide-react'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { socials } from '../data/socials.ts'
import '../styles/links.css'

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 13.8 13.8 0 0 0-.65-1.28 19.74 19.74 0 0 0-4.93 1.51C.96 9.06.1 14 1.53 18.59a19.9 19.9 0 0 0 6.07 3.06c.49-.67.92-1.38 1.3-2.12a12.85 12.85 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.22 14.22 0 0 0 12.1 0c.16.13.34.26.5.38-.65.39-1.34.72-2.06.98.37.74.81 1.45 1.3 2.12a19.86 19.86 0 0 0 6.07-3.06c1.74-5.3-.3-10.2-3.44-14.22zM8.02 15.33c-1.19 0-2.16-1.08-2.16-2.42 0-1.34.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.34.96-2.42 2.16-2.42 1.2 0 2.17 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.94 6.06-6.94zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.4z" />
    </svg>
  )
}

function iconFor(label: string) {
  switch (label) {
    case 'GitHub':
      return <Github size={18} />
    case 'Discord':
      return <DiscordIcon />
    case 'X / Twitter':
      return <XIcon />
    case 'Instagram':
      return <Instagram size={18} />
    default:
      return <Youtube size={18} />
  }
}

export default function Links() {
  return (
    <section id="links" className="section">
      <div className="wrap">
        <SectionHeading
          index="06"
          tag="find me"
          title={
            <>
              Reach me on the <em>internet</em>.
            </>
          }
          description="Same person, different windows. Pick the one you prefer."
        />

        <div className="links-grid">
          {socials.map((social, i) => (
            <Reveal key={social.label} delay={(i % 3) * 60}>
              <a
                className="link-card"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="link-card-icon">{iconFor(social.label)}</span>
                <span className="link-card-body">
                  <span className="link-card-label">{social.label}</span>
                  <span className="link-card-handle mono">{social.handle}</span>
                </span>
                <ArrowUpRight size={16} className="link-card-arrow" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}