'use client'

import { Children, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapsibleProps {
  children: React.ReactNode
  /** How many items to show before the expand toggle. Defaults to 8. */
  initialCount?: number
  /** Optional override for the singular/plural label. */
  label?: string
}

/**
 * Wraps a list of <li> rows and shows the first N. Renders a "Show n more"
 * trigger as the last <li> when there are more items to reveal. Lives inside
 * the parent <ul>, so it inherits list rhythm without breaking semantics.
 */
export function Collapsible({ children, initialCount = 8, label = 'release' }: CollapsibleProps) {
  const [expanded, setExpanded] = useState(false)
  const items = Children.toArray(children)
  const total = items.length

  if (total <= initialCount) return <>{items}</>

  const visible = expanded ? items : items.slice(0, initialCount)
  const hidden = total - initialCount

  return (
    <>
      {visible}
      <li className="list-none mt-2">
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="group inline-flex items-center gap-1.5 py-2 text-[12px] uppercase tracking-[0.22em] font-light text-foreground/50 hover:text-foreground transition-colors"
        >
          {expanded ? (
            <>
              Show less
              <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.25} />
            </>
          ) : (
            <>
              Show {hidden} more
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.25} />
            </>
          )}
        </button>
      </li>
    </>
  )
}
