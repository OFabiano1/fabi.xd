import { useEffect, useState } from 'react'
import '../styles/nowplaying.css'
import { now, fallback } from '../data/spotify.js'

const POLL_MS = 15000
const LANYARD = (id) => `https://api.lanyard.rest/v1/users/${id}`

function fmt(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function NowPlaying() {
  const [state, setState] = useState({ kind: 'loading' })
  const [clock, setClock] = useState(0)

  useEffect(() => {
    if (state.kind !== 'playing') return
    const id = setInterval(() => setClock(Date.now()), 1000)
    return () => clearInterval(id)
  }, [state])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(LANYARD(now.discordId))
        if (!res.ok) throw new Error(`lanyard ${res.status}`)
        const json = await res.json()
        if (cancelled) return
        if (json.success && json.data && json.data.listening_to_spotify && json.data.spotify) {
          setState({ kind: 'playing', data: json.data.spotify })
        } else if (json.success && json.data) {
          setState({ kind: 'idle', status: json.data.discord_status })
        } else {
          setState({ kind: 'error' })
        }
      } catch {
        if (!cancelled) setState({ kind: 'error' })
      }
    }
    load()
    const id = setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const elapsed =
    state.kind === 'playing' && state.data.timestamps
      ? (clock - state.data.timestamps.start) / 1000
      : 0
  const total =
    state.kind === 'playing' && state.data.timestamps
      ? (state.data.timestamps.end - state.data.timestamps.start) / 1000
      : 0
  const pct = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0

  return (
    <section id="musica" className="nowplaying">
      <div className="wrap">
        <span className="tag reveal">NOW PLAYING</span>
        <h2 className="section-title reveal">
          A trilha do <em>rolê.</em>
        </h2>

        <div className="np-grid">
          <div className="np-player reveal d1">
            {state.kind === 'playing' ? (
              <>
                <div className="np-head">
                  <span className="np-eq on">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="np-status">
                    NOW PLAYING * {state.data.song} — {state.data.artist}
                  </span>
                </div>
                <div
                  className="np-art"
                  style={{ backgroundImage: `url(${state.data.album_art_url})` }}
                >
                  <div className="np-art-shade" />
                  <div className="np-art-meta">
                    <span className="np-album">{state.data.album}</span>
                  </div>
                </div>
                <div className="np-body">
                  <div className="np-song">{state.data.song}</div>
                  <div className="np-artist">{state.data.artist}</div>
                  <div className="np-bar">
                    <i style={{ width: `${pct}%` }} />
                  </div>
                  <div className="np-times">
                    <span>{fmt(elapsed)}</span>
                    <span>{fmt(total)}</span>
                  </div>
                </div>
                <a
                  className="np-open"
                  href={`https://open.spotify.com/track/${state.data.track_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ABRIR NO SPOTIFY *
                </a>
              </>
            ) : (
              <>
                <div className="np-head">
                  <span className="np-eq">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="np-status">
                    {state.kind === 'loading'
                      ? 'CONECTANDO * DISCORD'
                      : state.kind === 'idle'
                        ? 'SEM MÚSICA AGORA *'
                        : 'FALLBACK * EMBED'}
                  </span>
                </div>
                {state.kind === 'error' ? (
                  <iframe
                    title={`${fallback.title} - ${fallback.artist}`}
                    src={fallback.embedUrl}
                    width="100%"
                    height="352"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
                    loading="lazy"
                  />
                ) : (
                  <div className="np-idle">
                    <span className="np-idle-disk">░</span>
                    <p>
                      {state.kind === 'idle'
                        ? 'Nada tocando agora — assim que eu der play no Spotify, aparece aqui automaticamente.'
                        : 'Checando a presença no Discord...'}
                    </p>
                  </div>
                )}
                <a
                  className="np-open"
                  href={fallback.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OUVIR NO SPOTIFY *
                </a>
              </>
            )}
          </div>

          <div className="np-side reveal d2">
            <p>
              Música ao vivo, direto do que eu tô escutando. Cada projeto tem a própria trilha
              sonora — nessa sessão não pode faltar: <b>sintetizador</b>, <b>baixo gordo</b> e{' '}
              <b>voz no escuro</b>.
            </p>
            <p className="np-side-note">
              * alimentado pelo Lanyard via Discord &mdash; Spotify linkado na conta. Pra parar de
              exibir, é só pausar a música ou tirar o Discord do ar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}