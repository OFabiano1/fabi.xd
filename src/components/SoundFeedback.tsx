import { useEffect } from 'react'
import { play } from '../lib/sounds.ts'

/**
 * Feedback sonoro global (base bero.land): um "tick" quando você clica em
 * qualquer coisa interativa, e um "blip" em navegação (menu / lab).
 * Silencioso por padrão — liga no botão SOM da barra.
 */
export default function SoundFeedback() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t?.closest) return
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return
      if (t.closest('.nav-menu a, .lab-tab, .marquee-item')) play('blip')
      else if (t.closest('a, button, [role="button"], [data-cursor]')) play('tap')
    }

    document.addEventListener('click', onClick, { passive: true })
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
