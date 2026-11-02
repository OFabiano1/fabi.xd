import { useEffect, useRef, useState } from 'react'

const COLORS = ['#9645f4', '#c26bff', '#ececf6', '#7c2ee0']
const MAX_PARTICLES = 260

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  color: string
}

/** Playground de partículas — força do cursor, bursts ao clicar, trilhas de tinta. */
export default function ParticlePlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<'attract' | 'repel'>('attract')
  const [trails, setTrails] = useState(true)

  // refs para o loop ler os controles sem reiniciar tudo
  const modeRef = useRef(mode)
  const trailsRef = useRef(trails)
  modeRef.current = mode
  trailsRef.current = trails

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: -9999, y: -9999, active: false }
    let particles: Particle[] = []
    let raf = 0
    let w = 0
    let h = 0

    const seed = () => {
      const count = Math.round(Math.min(MAX_PARTICLES, Math.max(110, (w * h) / 9000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1 + Math.random() * 2.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!particles.length) seed()
    }

    const frame = () => {
      const sign = modeRef.current === 'attract' ? 1 : -1
      ctx.fillStyle = trailsRef.current ? 'rgba(4, 2, 9, 0.16)' : 'rgba(4, 2, 9, 1)'
      ctx.fillRect(0, 0, w, h)

      for (const p of particles) {
        if (pointer.active) {
          const dx = pointer.x - p.x
          const dy = pointer.y - p.y
          const dist = Math.hypot(dx, dy) || 1
          if (dist < 460) {
            const f = (sign * 340) / (dist * dist)
            p.vx += dx * f * dist * 0.06
            p.vy += dy * f * dist * 0.06
          }
        }

        p.vx *= 0.965
        p.vy *= 0.965
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > w) p.vx *= -0.85
        if (p.y < 0 || p.y > h) p.vy *= -0.85
      }

      for (const p of particles) {
        ctx.globalAlpha = 0.75
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (!reduced) raf = requestAnimationFrame(frame)
    }

    const burst = (x: number, y: number) => {
      for (const p of particles) {
        const dx = p.x - x
        const dy = p.y - y
        const dist = Math.hypot(dx, dy) || 1
        if (dist < 220) {
          p.vx += (dx / dist) * (6 + Math.random() * 5)
          p.vy += (dy / dist) * (6 + Math.random() * 5)
        }
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      burst(e.clientX - rect.left, e.clientY - rect.top)
    }

    resize()
    frame()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onDown)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onDown)
    }
  }, [])

  const reset = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="lab-toy">
      <canvas ref={canvasRef} className="lab-canvas" aria-label="Playground de partículas" />

      <div className="lab-controls">
        <button
          className="lab-chip mono"
          onClick={() => setMode((m) => (m === 'attract' ? 'repel' : 'attract'))}
          data-cursor
        >
          força: {mode === 'attract' ? 'atrair' : 'repelir'}
        </button>
        <button
          className={`lab-chip mono${trails ? ' on' : ''}`}
          onClick={() => setTrails((v) => !v)}
          data-cursor
        >
          trilhas: {trails ? 'on' : 'off'}
        </button>
        <button className="lab-chip mono" onClick={reset} data-cursor>
          limpar
        </button>
      </div>

      <span className="lab-caption mono">clique pra explodir · o cursor é a força</span>
    </div>
  )
}
