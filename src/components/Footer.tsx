import { Github } from 'lucide-react'
import '../styles/footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            fabi<span>.xd</span>
          </span>
          <span className="footer-note">built with curiosity &amp; caffeine.</span>
        </div>

        <div className="footer-links">
          <a href="#home">top</a>
          <span className="footer-sep">/</span>
          <a href="mailto:ofabino1.literalmente@gmail.com">email</a>
          <a
            href="https://github.com/OFabiano1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://dsc.gg/axolotlbr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
          >
            <DiscordIcon />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <YouTubeIcon />
          </a>
        </div>

        <div className="footer-year mono">&copy; {year} fabi.xd</div>
      </div>
    </footer>
  )
}

function DiscordIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 13.8 13.8 0 0 0-.65-1.28 19.74 19.74 0 0 0-4.93 1.51C.96 9.06.1 14 1.53 18.59a19.9 19.9 0 0 0 6.07 3.06c.49-.67.92-1.38 1.3-2.12a12.85 12.85 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.22 14.22 0 0 0 12.1 0c.16.13.34.26.5.38-.65.39-1.34.72-2.06.98.37.74.81 1.45 1.3 2.12a19.86 19.86 0 0 0 6.07-3.06c1.74-5.3-.3-10.2-3.44-14.22zM8.02 15.33c-1.19 0-2.16-1.08-2.16-2.42 0-1.34.95-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.34.96-2.42 2.16-2.42 1.2 0 2.17 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  )
}