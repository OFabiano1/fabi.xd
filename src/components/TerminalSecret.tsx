import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects.ts'
import { stack } from '../data/stack.ts'
import { socials, contactEmail } from '../data/socials.ts'
import { soundEnabled, setSoundEnabled, play } from '../lib/sounds.ts'
import '../styles/terminal.css'

/** Abrir o terminal de fora: footer sectarian ou evento fabi:terminal:open. */
export const TERMINAL_SHORTCUT = 'Ctrl + `'

type Line = { kind: 'in' | 'out' | 'sys'; text: string }

export default function TerminalSecret() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([
    { kind: 'sys', text: 'fabi.xd terminal — papel preto v5.0' },
    { kind: 'sys', text: 'digite "help" para ver os comandos.' },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.altKey && !e.shiftKey && (e.key === '`' || e.code === 'Backquote')) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpenEvent = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('fabi:terminal:open', onOpenEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('fabi:terminal:open', onOpenEvent)
    }
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const print = (kind: Line['kind'], text: string | string[]) => {
    const arr = Array.isArray(text) ? text : [text]
    setLines((prev) => [...prev, ...arr.map((t): Line => ({ kind, text: t }))])
  }

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    print('in', `fabi@papelpreto:~$ ${cmd}`)
    if (!cmd) return
    setHistory((h) => [...h, cmd])

    const [name] = cmd.split(/\s+/)
    switch (name) {
      case 'help':
        print('out', [
          'help        — este menu',
          'whoami      — quem eu sou (versão curta)',
          'projetos    — lista dos projetos',
          'stack       — ferramentas do dia a dia',
          'social      — onde me achar (' + contactEmail + ')',
          'tema        — alterna dark / light',
          'som         — liga / desliga o som do site',
          'lab         — abre o lab (partículas · pong · objeto 3d)',
          'sala        — a sala secreta (dica: ctrl + alt + shift + w)',
          'caos        — não me pergunte, digite',
          'clear       — limpa a tela',
          'exit        — fecha o terminal',
        ])
        break
      case 'whoami':
        print('out', [
          'fabi — developer & creator.',
          'code <-> design, automação no meio, curiosidade sobrando.',
          'fabi.xd v5 — "papel preto".',
        ])
        break
      case 'projetos':
        print(
          'out',
          projects.map((p) => `${p.mono.padEnd(14)} ${p.name} — ${p.tagline} [${p.status}]`),
        )
        break
      case 'stack':
        print(
          'out',
          stack.map((s) => `${s.group.padEnd(12)} ${s.name} (${s.level})`),
        )
        break
      case 'social':
        print(
          'out',
          socials.map((s) => `${s.label.padEnd(12)} ${s.handle}  ${s.href}`),
        )
        break
      case 'tema': {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        window.localStorage.setItem('fabi:theme', next)
        print('sys', `tema → ${next}`)
        break
      }
      case 'som': {
        const next = !soundEnabled()
        setSoundEnabled(next)
        if (next) play('blip')
        print('sys', `som → ${next ? 'ligado' : 'desligado'}`)
        break
      }
      case 'caos':
        print('sys', 'o caos chegou — 8 segundos de bug benigno.')
        document.body.classList.add('chaos')
        window.setTimeout(() => document.body.classList.remove('chaos'), 8000)
        break
      case 'lab':
        close()
        window.location.hash = '#lab'
        print('sys', 'abrindo o lab…')
        break
      case 'sala':
        print('sys', [
          'a sala abre com ctrl + alt + shift + w.',
          '…ou apenas deixe que eu abra: sala --abrir',
        ])
        if (cmd.startsWith('sala --abrir')) {
          close()
          window.dispatchEvent(new CustomEvent('fabi:room:open'))
        }
        break
      case 'clear':
        setLines([])
        break
      case 'exit':
        setOpen(false)
        break
      default:
        print('out', `comando não encontrado: ${name} — tente "help"`)
    }
  }

  const close = () => setOpen(false)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(value)
      setValue('')
      setHistIdx(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const i = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(i)
      setValue(history[i])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx < 0) return
      const i = histIdx + 1
      if (i >= history.length) {
        setHistIdx(-1)
        setValue('')
      } else {
        setHistIdx(i)
        setValue(history[i])
      }
    }
  }

  if (!open) return null

  return (
    <div className="terminal" role="dialog" aria-label="Terminal secreto do fabi.xd">
      <div className="terminal-frame">
        <button
          className="terminal-close"
          onClick={close}
          aria-label="Fechar terminal"
          title="esc"
        >
          ✕
        </button>

        <div className="terminal-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div key={i} className={`terminal-line terminal-line-${line.kind} mono`}>
              {line.text}
            </div>
          ))}
        </div>

        <div className="terminal-input-row">
          <span className="terminal-prompt mono">fabi@papelpreto:~$</span>
          <input
            ref={inputRef}
            className="terminal-input mono"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Comando do terminal"
          />
        </div>
      </div>
    </div>
  )
}
