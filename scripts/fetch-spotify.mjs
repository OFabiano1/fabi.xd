#!/usr/bin/env node
/**
 * Busca as últimas faixas do Spotify (recently played) e grava
 * `src/data/spotify.json` — depois um commit automático pelo GitHub Actions.
 *
 * Secrets exigidos no Actions:
 *   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 *
 * Como criar o refresh token: registre um app no Spotify Developer,
 * rode /v1/authorize com scope user-read-recently-played/ user-read-currently-
 * playing e troque o code pelo refresh (Authorization Code com PKCE off).
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outFile = resolve(root, 'src/data/spotify.json')

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const authRes = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
  }),
})
const auth = await authRes.json()

if (!auth.access_token) {
  console.error('spotify: falha ao obter token:', auth.error ?? auth)
  process.exit(1)
}

const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=6', {
  headers: { Authorization: `Bearer ${auth.access_token}` },
})

const raw = await res.json()
const items = Array.isArray(raw?.items) ? raw.items : []
const seen = new Set()
const tracks = items
  .map((i) => ({
    name: i.track.name,
    artist: i.track.artists?.[0]?.name ?? '',
    album: i.track.album?.name ?? '',
    image: i.track.album?.images?.[1]?.url ?? i.track.album?.images?.[0]?.url ?? '',
    url: i.track.external_urls?.spotify ?? 'https://open.spotify.com/',
    playedAt: Math.floor(new Date(i.played_at).getTime() / 1000),
  }))
  .filter((t) => {
    const key = `${t.name}|${t.playedAt}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  .slice(0, 6)

const fallback = existsSync(outFile)
  ? JSON.parse(readFileSync(outFile, 'utf8'))
  : { isMocked: true, updated: 0, tracks: [] }

writeFileSync(
  outFile,
  `${JSON.stringify(
    {
      isMocked: false,
      updated: Math.floor(Date.now() / 1000),
      tracks: tracks.length ? tracks : fallback.tracks,
    },
    null,
    2,
  )}\n`,
)
console.log('spotify.json atualizado com', tracks.length, 'faixas')
