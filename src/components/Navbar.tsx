import { useEffect, useState } from 'react'
import { Button } from 'prism'
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.tsx'
import { useScrollSpy } from '../hooks/useScrollSpy.ts'
import { soundEnabled, setSoundEnabled, play } from '../lib/sounds.ts'
import '../styles/navbar.css'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'github', label: 'GitHub' },
]

const navLinks = [...links, { id: 'lab', label: 'Lab', href: '#lab' }]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sound, setSound] = useState(() => soundEnabled())
  const active = useScrollSpy(links.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="nav-logo" onClick={close}>
          fabi<span className="nav-dot">.xd</span>
        </a>

        <nav className="nav-menu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={'href' in link ? link.href : `#${link.id}`}
                  className={active === link.id ? 'active' : ''}
                >
                  <span className="nav-idx">
                    {String(navLinks.indexOf(link) + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="nav-sound"
            onClick={() => {
              const next = !sound
              setSoundEnabled(next)
              setSound(next)
              if (next) play('blip')
            }}
            aria-label={sound ? 'Desligar som do site' : 'Ligar som do site'}
            title="som do site"
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'
            }
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span className="nav-cta">
            <Button href="#community" onClick={close} variant="secondary" size="sm" label="axolotl br" />
          </span>
          <button
            className="nav-burger"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}