const KEY = 'fabi:sound'

export function soundEnabled(): boolean {
  try {
    return window.localStorage.getItem(KEY) === 'on'
  } catch {
    return false
  }
}

export function setSoundEnabled(on: boolean): void {
  try {
    window.localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    /* localStorage pode estar bloqueado — segue sem persistir */
  }
}

export function toggleSound(): boolean {
  const next = !soundEnabled()
  setSoundEnabled(next)
  return next
}

let audioCtx: AudioContext | null = null

export function play(kind: 'tap' | 'blip' | 'lo'): void {
  if (!soundEnabled()) return

  const ResolvedCtx: typeof AudioContext | null =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ?? null
  if (!ResolvedCtx) return

  audioCtx = audioCtx ?? new ResolvedCtx()
  if (audioCtx.state === 'suspended') void audioCtx.resume()

  const now = audioCtx.currentTime
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  const cfg = {
    tap: { freq: 240, freq2: 180, type: 'triangle' as OscillatorType, vol: 0.035, dur: 0.05 },
    blip: { freq: 620, freq2: 520, type: 'sine' as OscillatorType, vol: 0.045, dur: 0.08 },
    lo: { freq: 140, freq2: 120, type: 'sawtooth' as OscillatorType, vol: 0.02, dur: 0.06 },
  }[kind]

  osc.type = cfg.type
  osc.frequency.setValueAtTime(cfg.freq, now)
  osc.frequency.exponentialRampToValueAtTime(cfg.freq2, now + cfg.dur)
  gain.gain.setValueAtTime(cfg.vol, now)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.dur)

  osc.connect(gain).connect(audioCtx.destination)
  osc.start(now)
  osc.stop(now + cfg.dur + 0.02)
}
