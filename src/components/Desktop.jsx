import { useState } from 'react'
import Snake from './Snake.jsx'
import '../styles/desktop.css'

const icons = [
  { id: 'notes', label: 'fabi.txt', ico: '📄' },
  { id: 'snake', label: 'snake.exe', ico: '🐍' },
]

export default function Desktop() {
  const [win, setWin] = useState('none')

  const open = (name) => setWin((w) => (w === name ? 'none' : name))
  const goMusica = () => {
    document.getElementById('musica')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pc">
      <div className="wrap">
        <span className="tag reveal">COMPUTER://FABI.XD</span>
        <h2 className="section-title reveal">
          Meu <em>desktop.</em>
        </h2>

        <div className="desk reveal d1">
          <div className="desk-bar">
            <span className="desk-title">FAB!_OS v4.2 * usuário: fabi</span>
            <span className="desk-btns">
              <i>—</i>
              <i>▢</i>
              <i>✕</i>
            </span>
          </div>

          <div className="desk-screen">
            <div className="desk-icons">
              {icons.map((ic) => (
                <button key={ic.id} className="desk-icon" onClick={() => open(ic.id)}>
                  <span className="desk-ico">{ic.ico}</span>
                  <span className="desk-lbl">{ic.label}</span>
                </button>
              ))}
              <button className="desk-icon" onClick={goMusica}>
                <span className="desk-ico">🎧</span>
                <span className="desk-lbl">spotify.lnk</span>
              </button>
            </div>

            {win === 'notes' && (
              <div className="os-win">
                <div className="win-bar">
                  <span>fabi.txt — bloco de notas</span>
                  <button className="win-close" onClick={() => setWin('none')}>
                    ✕
                  </button>
                </div>
                <div className="win-body notes">
                  <p>
                    who <b>is fabi?</b>
                  </p>
                  <p>
                    <span className="w-star">*</span> creative developer &amp; builder
                  </p>
                  <p>
                    <span className="w-star">*</span> fundador da axolotl br — sua comunidade
                    na internet
                  </p>
                  <p>
                    <span className="w-star">*</span> de player para player
                  </p>
                  <p>
                    <span className="w-star">*</span> friday, axl bot, smp e esse site
                  </p>
                  <p>
                    <span className="w-star">*</span> now playing * sempre no repeat
                  </p>
                  <p>
                    <span className="w-star">*</span> status: aceitando projetos
                  </p>
                </div>
              </div>
            )}

            {win === 'snake' && (
              <div className="os-win">
                <div className="win-bar">
                  <span>snake.exe — jogo.c</span>
                  <button className="win-close" onClick={() => setWin('none')}>
                    ✕
                  </button>
                </div>
                <Snake />
              </div>
            )}
          </div>

          <div className="desk-footer">
            <span>HOME * C:\FABI.XD</span>
            <span>NOW PLAYING * SPOTIFY</span>
          </div>
        </div>
      </div>
    </section>
  )
}