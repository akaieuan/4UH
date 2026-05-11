import { type ElementType, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface PixelateProps {
  /** The text to reveal pixel-by-pixel. */
  text: string
  /** Delay before resolving begins, in ms. */
  delay?: number
  /** Total resolve duration, in ms. */
  duration?: number
  /** When the animation plays. `mount` (default) fires on load; `hover` fires on self or parent `.group` hover. */
  trigger?: 'mount' | 'hover'
  /** Element tag. */
  as?: ElementType
  className?: string
}

function shuffledIndices(length: number): number[] {
  const arr: number[] = Array.from({ length }, (_, i) => i)
  let seed = length * 9301 + 49297
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280
    const j = Math.floor((seed / 233280) * (i + 1))
    const tmp = arr[i]!
    arr[i] = arr[j]!
    arr[j] = tmp
  }
  return arr
}

export function Pixelate({
  text,
  delay = 0,
  duration = 1400,
  trigger = 'mount',
  as: Component = 'span',
  className,
}: PixelateProps) {
  const order = shuffledIndices(text.length)
  const stepMs = text.length > 0 ? Math.max(20, Math.floor(duration / text.length)) : 0
  const isHover = trigger === 'hover'

  return (
    <Component
      className={cn('inline-block', isHover && 'trickle-pixelate-hover', className)}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            'inline-block whitespace-pre',
            isHover ? 'trickle-pixelate-char' : 'animate-trickle-pixelate'
          )}
          style={
            {
              animationDelay: `${delay + (order[i] ?? 0) * stepMs}ms`,
              animationDuration: `${stepMs * 2}ms`,
              animationFillMode: 'both',
            } as CSSProperties
          }
        >
          {char}
        </span>
      ))}
    </Component>
  )
}
