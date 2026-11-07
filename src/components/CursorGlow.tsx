import { useEffect, useRef } from 'react'
import '../styles/cursor-glow.css'

/**
 * Custom cursor (desktop only): glow + dot + trailing ring + ink trail (canvas).
 * Replaces the native cursor on fine pointers; restores it over text inputs.
 * Pure transform/canvas updates — cheap and disabled on touch.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    const trail = trailRef.current
    if (!glow || !dot || !ring || !trail) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    const ctx = trail.getContext('2d')

    let raf = 0
    const mouse = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    const lastInk = { x: 0, y: 0 }
    let hot = false

    const sizeCanvas = () => {
      if (!ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      trail.width = Math.floor(window.innerWidth * dpr)
      trail.height = Math.floor(window.innerHeight * dpr)
      ctx.scale(dpr, dpr)
    }
    sizeCanvas()
    window.addEventListener('resize', sizeCanvas)

    // gotas de tinta roxa deixadas no caminho
    type Ink = { x: number; y: number; r: number; life: number }
    const inks: Ink[] = []

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      const moved = Math.hypot(mouse.x - lastInk.x, mouse.y - lastInk.y)
      if (moved > 7 && inks.length < 140) {
        lastInk.x = mouse.x
        lastInk.y = mouse.y
        inks.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          r: 2 + Math.random() * 4,
          life: 1,
        })
      }

      const t = e.target as HTMLElement | null
      hot = Boolean(
        t?.closest?.('a, button, [data-cursor], label, summary, [role="button"]'),
      )
      const overText = Boolean(t?.closest?.('input, textarea, select, [contenteditable]'))
      dot.classList.toggle('is-hidden', overText)
      ring.classList.toggle('is-hidden', overText)
      trail.classList.toggle('is-hidden', overText)
    }

    const drawTrail = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = inks.length - 1; i >= 0; i--) {
        const ink = inks[i]
        ink.life -= 0.022
        if (ink.life <= 0) {
          inks.splice(i, 1)
          continue
        }
        ink.r += 0.16
        const a = ink.life * ink.life * (hot ? 0.5 : 0.3)
        const g = ctx.createRadialGradient(ink.x, ink.y, 0, ink.x, ink.y, ink.r + 8)
        g.addColorStop(0, `rgba(190, 120, 255, ${a})`)
        g.addColorStop(0.55, `rgba(150, 69, 244, ${a * 0.7})`)
        g.addColorStop(1, 'rgba(150, 69, 244, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(ink.x, ink.y, ink.r + 8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const onDown = () => dot.classList.add('is-down')
    const onUp = () => dot.classList.remove('is-down')
    const onLeave = () => {
      dot.classList.add('is-out')
      ring.classList.add('is-out')
      trail.classList.add('is-out')
    }
    const onEnter = () => {
      dot.classList.remove('is-out')
      ring.classList.remove('is-out')
      trail.classList.remove('is-out')
    }

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16
      ringPos.y += (mouse.y - ringPos.y) * 0.16

      drawTrail()

      dot.style.transform = `translate3d(${mouse.x - 4}px, ${mouse.y - 4}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x - 18}px, ${ringPos.y - 18}px, 0) ${
        hot ? 'scale(1.7)' : 'scale(1)'
      }`
      glow.style.transform = `translate3d(${ringPos.x - 90}px, ${ringPos.y - 90}px, 0)`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      root.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', sizeCanvas)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <canvas ref={trailRef} className="cursor-trail" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
