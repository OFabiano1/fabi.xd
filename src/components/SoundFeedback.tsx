import { useEffect } from 'react'
import { play } from '../lib/sounds.ts'

/**
 * Feedback sonoro global (base bero.land): um "tick" quando você clica em
 * qualquer coisa interativa, um tick fininho no hover e um "blip" em navegação
 * (menu / lab). Silencioso por padrão — liga no botão SOM da barra.
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

    // hover: tick fininho ao ENTRAR em algo interativo (com gap pra não metralhar)
    let lastHover = 0
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      if (!t?.closest) return
      if (!t.closest('a, button, [role="button"], [data-cursor], label, summary')) return
      const now = performance.now()
      if (now - lastHover < 55) return
      lastHover = now
      play('hover')
    }

    document.addEventListener('click', onClick, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('pointerover', onOver)
    }
  }, [])

  return null
}
