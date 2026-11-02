import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import ParticlePlayground from './lab/ParticlePlayground.tsx'
import Pong from './lab/Pong.tsx'
import Object3D from './lab/Object3D.tsx'
import '../styles/lab.css'

const tabs = [
  { id: 'particles', label: 'partículas' },
  { id: 'pong', label: 'pong' },
  { id: 'obj3d', label: 'objeto 3d' },
] as const

export type LabTab = (typeof tabs)[number]['id']

/** lab — rota #lab. abre por link, pelo terminal (`lab`) ou pelo menu. */
export default function Lab() {
  const [open, setOpen] = useState(() => window.location.hash === '#lab')
  const [tab, setTab] = useState<LabTab>('particles')

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === '#lab')
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('locked', open)
    if (open) window.scrollTo({ top: 0 })
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && window.location.hash === '#lab') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!open) return null

  return (
    <div className="lab" role="dialog" aria-label="Lab do fabi.xd — playground">
      <header className="lab-head">
        <span className="lab-tag mono">lab::00 — papel preto</span>

        <nav className="lab-tabs" aria-label="Brinquedos do lab">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`lab-tab mono${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <button className="lab-close" onClick={closeLab} aria-label="Fechar lab" title="esc">
          <X size={20} />
        </button>
      </header>

      <div className="lab-stage">
        {tab === 'particles' && <ParticlePlayground />}
        {tab === 'pong' && <Pong />}
        {tab === 'obj3d' && <Object3D />}
      </div>

      <footer className="lab-foot mono">feito em casa · sem dependências · esc fecha</footer>
    </div>
  )
}

function closeLab() {
  history.pushState('', '', window.location.pathname + window.location.search)
  window.dispatchEvent(new Event('hashchange'))
}
