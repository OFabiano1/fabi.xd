#!/usr/bin/env node
/**
 * Busca as últimas faixas do Spotify (recently played) e grava
 * `src/data/spotify.json` antes do build. Roda dentro do deploy.yml.
 *
 * Secrets no Actions: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * (refresh token com scope user-read-recently-played).
 *
 * Nunca derruba o deploy: sem secret ou com erro na API, mantém o JSON atual.
 */
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const outFile = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/spotify.json')
const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env

function skip(msg) {
  console.log(`::warning::spotify: ${msg} — mantendo spotify.json atual`)
  process.exit(0)
}

if (!id || !secret || !refresh) skip('secrets ausentes')

try {
  const authRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
  })
  const auth = await authRes.json()
  if (!auth.access_token) skip(`token falhou (${auth.error ?? authRes.status})`)

  const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
    headers: { Authorization: `Bearer ${auth.access_token}` },
  })
  if (!res.ok) skip(`recently-played respondeu ${res.status}`)

  const { items = [] } = await res.json()
  const seen = new Set()
  const tracks = items
    .filter((i) => i.track && !seen.has(i.track.id) && seen.add(i.track.id)) // sem repetir a mesma faixa
    .slice(0, 6)
    .map(({ track, played_at }) => ({
      name: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      album: track.album?.name ?? '',
      image: track.album?.images?.[1]?.url ?? track.album?.images?.[0]?.url ?? '',
      url: track.external_urls?.spotify ?? 'https://open.spotify.com/',
      playedAt: Math.floor(new Date(played_at).getTime() / 1000),
    }))

  if (!tracks.length) skip('nenhuma faixa recente')

  const data = { isMocked: false, updated: Math.floor(Date.now() / 1000), tracks }
  writeFileSync(outFile, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`spotify.json atualizado com ${tracks.length} faixas`)
} catch (err) {
  skip(`erro de rede (${err.message})`)
}
