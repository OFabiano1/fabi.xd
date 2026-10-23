import { createElement } from 'react'
import type { CSSProperties, ElementType, ReactNode, Ref } from 'react'
import { useReveal } from '../hooks/useReveal.ts'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useReveal<HTMLElement>()
  const style = { '--d': `${delay}ms` } as CSSProperties

  return createElement(
    Tag,
    {
      ref: ref as Ref<HTMLElement>,
      className: `reveal ${className}`,
      style,
    },
    children
  )
}