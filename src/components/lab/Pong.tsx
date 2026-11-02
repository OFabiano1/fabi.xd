import { useEffect, useRef, useState } from 'react'

const W = 640
const H = 400
const PADDLE_H = 78
const PADDLE_W = 10
const WIN = 7

type Ball = { x: number; y: number; vx: number; vy: number }
type Paddle = { y: number }

/** Pong local — você (W/S, setas, mouse ou touch) contra a máquina da casa. */
export default function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState<[number, number]>([0, 0])
  const [over, setOver] = useState(0) // 0 jogando · 1 venceu · 2 cpu venceu

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let raf = 0
    let hidden = document.hidden
    let serveAt = 0
    let last = performance.now()

    const ball: Ball = { x: W / 2, y: H / 2, vx: 0, vy: 0 }
    const p1: Paddle = { y: H / 2 - PADDLE_H / 2 }
    const p2: Paddle = { y: H / 2 - PADDLE_H / 2 }
    const keys = { up: false, down: false }
    let sc: [number, number] = [0, 0]

    const serve = (dir: 1 | -1) => {
      ball.x = W / 2
      ball.y = H / 2
      const angle = (Math.random() * 0.6 - 0.3) * Math.PI
      const speed = 5.4
      ball.vx = Math.cos(angle) * speed * dir
      ball.vy = Math.sin(angle) * speed
      serveAt = performance.now() + 700
    }

    const point = (who: 0 | 1) => {
      sc = who === 0 ? [sc[0] + 1, sc[1]] : [sc[0], sc[1] + 1]
      setScore([...sc] as [number, number])
      if (sc[0] >= WIN) {
        setOver(1)
        return
      }
      if (sc[1] >= WIN) {
        setOver(2)
        return
      }
      serve(who === 0 ? -1 : 1)
    }

    const update = (dt: number) => {
      if (document.hidden) return
      if (performance.now() < serveAt) return
      // controles de verdade — teclado
      if (keys.up) p1.y -= 460 * dt
      if (keys.down) p1.y += 460 * dt
      p1.y = Math.max(0, Math.min(H - PADDLE_H, p1.y))

      // cpu: persegue a bola com folga (renta, mas existe)
      const target = ball.y - PADDLE_H / 2 + (ball.vx > 0 ? 0 : Math.sin(ball.x / 60) * 26)
      p2.y += (target - p2.y) * 0.055
      p2.y = Math.max(0, Math.min(H - PADDLE_H, p2.y))

      ball.x += ball.vx
      ball.y += ball.vy

      if (ball.y < 6 || ball.y > H - 6) ball.vy *= -1
      if (ball.y < 6) ball.y = 6
      if (ball.y > H - 6) ball.y = H - 6

      if (sc[0] >= WIN || sc[1] >= WIN) return

      // raquetes
      if (ball.vx < 0 && ball.x < 22 + PADDLE_W && ball.x > 20 && ball.y > p1.y && ball.y < p1.y + PADDLE_H) {
        const hit = (ball.y - (p1.y + PADDLE_H / 2)) / (PADDLE_H / 2)
        ball.vx = Math.abs(ball.vx) * 1.045 + 0.35
        ball.vy += hit * 2.6
        ball.x = 24 + PADDLE_W
      }
      if (ball.vx > 0 && ball.x > W - 32 - PADDLE_W && ball.x < W - 30 && ball.y > p2.y && ball.y < p2.y + PADDLE_H) {
        const hit = (ball.y - (p2.y + PADDLE_H / 2)) / (PADDLE_H / 2)
        ball.vx = -ball.vx * 1.045 - 0.35
        ball.vy += hit * 2.6
        ball.x = W - 34 - PADDLE_W
      }

      if (ball.x < -20) point(1)
      if (ball.x > W + 20) point(0)
    }

    const draw = () => {
      ctx.fillStyle = '#05020a'
      ctx.fillRect(0, 0, W, H)

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.28)'
      ctx.setLineDash([10, 12])
      ctx.beginPath()
      ctx.moveTo(W / 2, 0)
      ctx.lineTo(W / 2, H)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)'
      ctx.strokeRect(0.5, 0.5, W - 1, H - 1)

      ctx.fillStyle = '#a855f7'
      ctx.shadowColor = 'rgba(168, 85, 247, 0.7)'
      ctx.shadowBlur = 18
      ctx.fillRect(20, p1.y, PADDLE_W, PADDLE_H)
      ctx.fillRect(W - 30, p2.y, PADDLE_W, PADDLE_H)

      ctx.fillStyle = '#ececf6'
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.font = '700 42px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(236, 236, 246, 0.9)'
      ctx.textAlign = 'center'
      ctx.fillText(String(sc[0]), W / 2 - 46, 62)
      ctx.fillStyle = 'rgba(168, 85, 247, 0.75)'
      ctx.fillText(String(sc[1]), W / 2 + 46, 62)
    }

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reduced) update(dt)
      draw()
      if (!reduced && !hidden) raf = requestAnimationFrame(loop)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest?.('input, textarea, select')) return
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keys.up = true
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keys.down = true
      const k = e.key.toLowerCase()
      if (k === 'r' || k === 'enter') {
        sc = [0, 0]
        setScore([0, 0])
        setOver(0)
        serve(Math.random() > 0.5 ? 1 : -1)
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest?.('input, textarea, select')) return
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keys.up = false
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keys.down = false
    }

    const aim = (clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      const y = ((clientY - rect.top) / rect.height) * H
      p1.y = Math.max(0, Math.min(H - PADDLE_H, y - PADDLE_H / 2))
    }
    const onMouse = (e: MouseEvent) => aim(e.clientY)
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) aim(e.touches[0].clientY)
      e.preventDefault()
    }
    const onVisibility = () => {
      hidden = document.hidden
      if (!hidden && !reduced) {
        last = performance.now()
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(loop)
      }
    }

    serve(1)
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    raf = requestAnimationFrame(loop)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('touchmove', onTouch, { passive: false })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('touchmove', onTouch)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="lab-toy">
      <canvas ref={canvasRef} className="lab-canvas pong" width={640} height={400} aria-label="Pong — mini game" />

      <div className="lab-controls">
        <span className="lab-chip mono on">
          você {score[0]} × {score[1]} cpu
        </span>
        <span className="lab-chip mono">{over === 1 ? 'ganhou — r reinicia' : over === 2 ? 'cpu levou essa — r reinicia' : 'w/s · setas · mouse'}</span>
      </div>

      <span className="lab-caption mono">primeiro a 7 leva o shake</span>
    </div>
  )
}
