import { Play } from 'lucide-react'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import spotifyJson from '../data/spotify.json'
import type { SpotifyData } from '../types'
import '../styles/spotify.css'

function SpotifyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.51 17.28c-.22.36-.68.47-1.04.25-2.87-1.74-6.47-2.14-10.71-1.17-.41.1-.82-.16-.91-.57-.1-.41.16-.82.57-.91 4.64-1.06 8.63-.6 11.85 1.36.36.21.46.68.24 1.04zm1.47-3.27c-.27.45-.86.58-1.31.31-3.28-2.02-8.28-2.6-12.16-1.42-.5.15-1.03-.13-1.18-.63-.15-.5.13-1.03.63-1.18 4.42-1.34 9.91-.69 13.71 1.62.44.27.58.86.31 1.3zm.13-3.4C15.24 8.3 8.75 8.09 5.03 9.22c-.6.18-1.23-.16-1.41-.76-.18-.6.16-1.23.76-1.41 4.26-1.29 11.4-1.04 15.9 1.6.54.31.71.99.4 1.52-.32.53-1.01.71-1.54.44z" />
    </svg>
  )
}

const data = spotifyJson as SpotifyData

function timeAgo(unix: number): string {
  if (!unix) return '--'
  const m = Math.floor(Math.max(0, Date.now() - unix * 1000) / 60000)
  if (m < 1) return 'agora'
  if (m < 60) return `há ${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `há ${h}h`
  return `há ${Math.floor(h / 24)}d`
}

/** Currently listening — Spotify recently played (live via GitHub Action). */
export default function Spotify() {
  return (
    <section id="spotify" className="section">
      <div className="wrap">
        <SectionHeading
          index="04"
          tag="currently listening"
          title={
            <>
              Tocando <em>enquanto codifica</em>.
            </>
          }
        />

        <div className="spotify-grid">
          <Reveal className="spotify-side" delay={80}>
            <div className="spotify-card">
              <div className="spotify-card-bar">
                <span className="dot r" aria-hidden="true" />
                <span className="dot g" aria-hidden="true" />
                <span className="dot b" aria-hidden="true" />
                <span className="mono">spotify.recently</span>
              </div>

              <div className="spotify-note">
                {data.isMocked ? (
                  <p className="mono">dados mockados — troque por dados da API mantendo o formato.</p>
                ) : (
                  <p className="mono">recently played · live integration</p>
                )}
              </div>

              <a
                className="spotify-open mono"
                href="https://open.spotify.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
              >
                <SpotifyIcon size={14} />
                open spotify
              </a>

              {data.isMocked ? (
                <div className="spotify-hint mono">
                  integração real — `scripts/fetch-spotify.mjs` roda no deploy
                  (secrets no Actions).
                </div>
              ) : (
                <div className="spotify-hint mono">
                  atualizado {timeAgo(data.updated)} via GitHub Action
                </div>
              )}
            </div>
          </Reveal>

          <ol className="spotify-tracks">
            {data.tracks.map((track, i) => (
              <Reveal key={`${track.name}-${i}`} delay={100 + i * 60}>
                <li className="spotify-track">
                  {track.image ? (
                    <img src={track.image} alt={`capa de ${track.name}`} loading="lazy" />
                  ) : (
                    <span className="spotify-cover-fallback" aria-hidden="true">
                      <SpotifyIcon size={20} />
                    </span>
                  )}
                  <div className="spotify-meta">
                    <a href={track.url} target="_blank" rel="noopener noreferrer" className="spotify-track-link">
                      <span className="spotify-name">{track.name}</span>
                      <span className="spotify-artist">{track.artist}</span>
                    </a>
                    <span className="spotify-album mono">{track.album}</span>
                  </div>
                  <div className="spotify-side-b mono">
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`ouvir ${track.name} no spotify`}
                      className="spotify-play"
                    >
                      <Play size={14} />
                    </a>
                    <span>{timeAgo(track.playedAt)}</span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
