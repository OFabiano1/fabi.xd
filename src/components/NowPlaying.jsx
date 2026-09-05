import '../styles/nowplaying.css'
import { spotify } from '../data/spotify.js'

export default function NowPlaying() {
  return (
    <section id="musica" className="nowplaying">
      <div className="wrap">
        <span className="tag reveal">NOW PLAYING</span>
        <h2 className="section-title reveal">
          A trilha do <em>rolê.</em>
        </h2>

        <div className="np-grid">
          <div className="np-player reveal d1">
            <div className="np-head">
              <span className="np-eq">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="np-status">
                LISTENING * {spotify.title} — {spotify.artist}
              </span>
            </div>
            <iframe
              title={`${spotify.title} - ${spotify.artist}`}
              src={spotify.embedUrl}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
              loading="lazy"
            />
            <a
              className="np-open"
              href={spotify.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              ABRIR NO SPOTIFY *
            </a>
          </div>

          <div className="np-side reveal d2">
            <p>
              Cada projeto tem a própria trilha sonora. Na dessa sessão não pode faltar:{' '}
              <b>sintetizador</b>, <b>baixo gordo</b> e <b>voz no escuro</b>.
            </p>
            <p className="np-side-note">
              * pra trocar a música é só trocar o link da track no{' '}
              <span className="hl">src/data/spotify.js</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}