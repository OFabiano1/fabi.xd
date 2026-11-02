import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'
import '../styles/secret-room.css'

const base = import.meta.env.BASE_URL
const LOFI_STREAM_ID = 'jfKfPfyJRdk'

/** Código ctrl + alt + shift + w — ou `sala --abrir` no terminal secreto. */
export default function SecretRoom() {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.code === 'KeyW') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('fabi:room:open', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('fabi:room:open', onOpen)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('locked', open)
  }, [open])

  return (
    <>
      <button
        className="room-dot"
        data-cursor
        aria-label="Papel preto — sala secreta"
        title="papel preto"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="room" role="dialog" aria-label="Sala secreta — papel preto">
          <div className="room-backdrop" aria-hidden="true">
            <img src={`${base}assets/graffiti.png`} alt="" loading="eager" />
          </div>

          <button className="room-close" onClick={() => setOpen(false)} aria-label="Fechar sala">
            <X size={20} />
          </button>

          <div className="room-stage">
            <span className="room-tag mono">:: canal reservado</span>
            <h2 className="room-title">
              PAPEL
              <br />
              PRETO<span className="room-title-dot">.</span>
            </h2>
            <p className="room-note mono">
              24/7 lofi — fita nº 05. nenhum shortcut, só a vibe.
            </p>

            {playing ? (
              <iframe
                className="room-player"
                title="lofi hip hop radio — papel preto fm"
                src={`https://www.youtube.com/embed/${LOFI_STREAM_ID}?rel=0`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button className="room-play" onClick={() => setPlaying(true)}>
                <Play size={22} />
                <span className="mono">tocar a fita</span>
              </button>
            )}

            <div className="room-hint mono">
              esc fecha · código de entrada: ctrl + alt + shift + w
            </div>
          </div>
        </div>
      )}
    </>
  )
}
