import { useEffect, useRef, useState } from 'react'

const COLS = 20
const ROWS = 20
const SPEED = 140

function randPos() {
  return {
    x: Math.floor(Math.random() * COLS),
    y: Math.floor(Math.random() * ROWS),
  }
}

function placeFood(snake) {
  let p
  do {
    p = randPos()
  } while (snake.some((s) => s.x === p.x && s.y === p.y))
  return p
}

export default function Snake() {
  const [snake, setSnake] = useState([{ x: 9, y: 9 }])
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const [food, setFood] = useState(() => randPos())
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false)
  const [over, setOver] = useState(false)

  const dirRef = useRef(dir)
  dirRef.current = dir
  const snakeRef = useRef(snake)
  snakeRef.current = snake

  const reset = () => {
    setSnake([{ x: 9, y: 9 }])
    setDir({ x: 1, y: 0 })
    setFood(placeFood([{ x: 9, y: 9 }]))
    setScore(0)
    setOver(false)
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      const prev = snakeRef.current
      const head = {
        x: prev[0].x + dirRef.current.x,
        y: prev[0].y + dirRef.current.y,
      }
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= COLS ||
        head.y >= ROWS ||
        prev.some((s) => s.x === head.x && s.y === head.y)
      ) {
        setOver(true)
        setRunning(false)
        return
      }
      const ate = head.x === food.x && head.y === food.y
      const next = [head, ...prev]
      if (!ate) next.pop()
      setSnake(next)
      if (ate) {
        setScore((s) => s + 1)
        setFood(placeFood(next))
      }
    }, SPEED)
    return () => clearInterval(id)
  }, [running, food])

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      }
      const d = map[e.key]
      if (!d) return
      const cur = dirRef.current
      if (d.x === -cur.x && d.y === -cur.y) return
      e.preventDefault()
      setDir(d)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cells = []
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const isHead = snake[0].x === x && snake[0].y === y
      const isSnake = snake.some((s) => s.x === x && s.y === y)
      const isFood = food.x === x && food.y === y
      cells.push(
        <div
          key={`${x}-${y}`}
          className={[
            's-cell',
            isHead ? 's-head' : isSnake ? 's-snake' : '',
            isFood ? 's-food' : '',
          ].join(' ')}
        />
      )
    }
  }

  return (
    <div className="snake">
      <div className="snake-hud">
        <span>SCORE * {score}</span>
        <span>{over ? 'GAME OVER *' : running ? 'JOGANDO *' : 'PARADO *'}</span>
        <button className="snake-rst" onClick={over ? reset : running ? () => setRunning(false) : reset}>
          {over ? 'REINICIAR' : running ? 'PAUSAR' : 'JOGAR'}
        </button>
      </div>
      <div className="snake-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {cells}
      </div>
      <div className="snake-hint">setas / wasd pra mover * se bater, perdeu</div>
    </div>
  )
}