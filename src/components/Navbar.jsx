import { useState } from 'react'
import '../styles/navbar.css'

const links = [
  { href: '#home', label: 'HOME' },
  { href: '#sobre', label: 'FABI' },
  { href: '#trabalho', label: 'TRABALHO' },
  { href: '#musica', label: 'MÚSICA' },
  { href: '#pc', label: 'PC' },
  { href: '#contato', label: 'CONTATO' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#home" className="logo" onClick={close}>
          <span className="logo-box">FAB!</span>
          <span className="logo-tag">CREATIVE DEVELOPER &amp; BUILDER</span>
        </a>
        <nav>
          <ul className={`nav-links${open ? ' open' : ''}`}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contato" className="nav-cta" onClick={close}>
          [ ENVIAR MENSAGEM ]
        </a>
        <button
          className="burger"
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          ≡
        </button>
      </div>
    </header>
  )
}