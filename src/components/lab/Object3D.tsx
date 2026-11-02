import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'

const SIZE = 260
const GLYPHS = ['fabi', '.xd', 'papel', 'preto', 'v5', 'w']
const HOME = { rx: -14, ry: 32 }

/** Objeto 3D — cubo de tinta arrastável. CSS 3D puro, zero dependências. */
export default function Object3D() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const rot = useRef({ ...HOME }).current
  const vel = useRef({ x: 0, y: 0.2 }).current
  const [dragging, setDragging] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    const cube = cubeRef.current
    if (!scene || !cube || reduced.current) return

    let raf = 0
    let down = false
    let lastX = 0
    let lastY = 0

    const apply = () => {
      cube.style.transform = `rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`
    }

    const onDown = (e: PointerEvent) => {
      down = true
      setDragging(true)
      lastX = e.clientX
      lastY = e.clientY
      scene.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      rot.ry += dx * 0.4
      rot.rx = Math.max(-80, Math.min(80, rot.rx - dy * 0.35))
      vel.x = -dy * 0.04
      vel.y = dx * 0.05
      apply()
    }
    const onUp = () => {
      down = false
      setDragging(false)
    }
    const tick = () => {
      if (!down) {
        rot.ry += vel.y
        rot.rx = Math.max(-80, Math.min(80, rot.rx + vel.x))
        vel.x *= 0.985
        vel.y = vel.y * 0.995 + (0.2 - vel.y) * 0.012
        apply()
      }
      raf = requestAnimationFrame(tick)
    }

    apply()
    scene.addEventListener('pointerdown', onDown)
    scene.addEventListener('pointermove', onMove)
    scene.addEventListener('pointerup', onUp)
    scene.addEventListener('pointercancel', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      scene.removeEventListener('pointerdown', onDown)
      scene.removeEventListener('pointermove', onMove)
      scene.removeEventListener('pointerup', onUp)
      scene.removeEventListener('pointercancel', onUp)
    }
  }, [rot, vel])

  const reset = () => {
    const cube = cubeRef.current
    rot.rx = HOME.rx
    rot.ry = HOME.ry
    vel.x = 0
    vel.y = 0.2
    if (cube) cube.style.transform = `rotateX(${HOME.rx}deg) rotateY(${HOME.ry}deg)`
  }

  return (
    <div className="lab-toy obj3d-toy">
      <div className="obj3d-scene" ref={sceneRef}>
        <div
          ref={cubeRef}
          className="obj3d"
          style={{ width: SIZE, height: SIZE }}
        >
          {GLYPHS.map((g, i) => (
            <div
              key={g}
              className={`obj3d-face mono${i === 0 ? ' obj3d-face-ink' : ''}`}
              style={{ transform: faceTransform(i, SIZE) }}
            >
              <span>{g}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lab-controls">
        <button className="lab-chip mono" onClick={reset} data-cursor>
          <RotateCcw size={13} /> reset
        </button>
        <span className="lab-chip mono">{dragging ? 'arrastando…' : 'arrasta o cubo'}</span>
      </div>

      <span className="lab-caption mono">css 3d · sem three.js · tinta na rede</span>
    </div>
  )
}

function faceTransform(i: number, s: number): string {
  const h = s / 2
  switch (i) {
    case 0:
      return `translateZ(${h}px)`
    case 1:
      return `rotateY(180deg) translateZ(${h}px)`
    case 2:
      return `rotateY(90deg) translateZ(${h}px)`
    case 3:
      return `rotateY(-90deg) translateZ(${h}px)`
    case 4:
      return `rotateX(90deg) translateZ(${h}px)`
    default:
      return `rotateX(-90deg) translateZ(${h}px)`
  }
}
