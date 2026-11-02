import { useEffect, useRef } from 'react'
import '../styles/cursor-glow.css'

/**
 * Custom cursor (desktop only): glow + dot + trailing ring.
 * Replaces the native cursor on fine pointers; restores it over text inputs.
 * Pure transform updates — cheap and disabled on touch.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!glow || !dot || !ring) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    let raf = 0
    const mouse = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let hot = false

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      const t = e.target as HTMLElement | null
      hot = Boolean(
        t?.closest?.('a, button, [data-cursor], label, summary, [role="button"]'),
      )
      const overText = Boolean(t?.closest?.('input, textarea, select, [contenteditable]'))
      dot.classList.toggle('is-hidden', overText)
      ring.classList.toggle('is-hidden', overText)
    }

    const onDown = () => dot.classList.add('is-down')
    const onUp = () => dot.classList.remove('is-down')
    const onLeave = () => {
      dot.classList.add('is-out')
      ring.classList.add('is-out')
    }
    const onEnter = () => {
      dot.classList.remove('is-out')
      ring.classList.remove('is-out')
    }

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16
      ringPos.y += (mouse.y - ringPos.y) * 0.16

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
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
