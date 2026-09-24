import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Page gutter. Wide by default; `narrow` for reading columns. */
export function Container({
  children,
  className,
  width = 'wide',
}: {
  children: ReactNode
  className?: string
  width?: 'wide' | 'narrow' | 'full'
}) {
  return (
    <div
      className={cn(
        'mx-auto px-5 md:px-10',
        width === 'wide' && 'max-w-[1560px]',
        width === 'narrow' && 'max-w-[760px]',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Section heading with a plain text label above a rule. */
export function SectionHead({
  label,
  aside,
  className,
}: {
  index?: string
  label: string
  aside?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-6 border-t border-ink/15 pt-3',
        className,
      )}
    >
      <h2 className="t-label flex items-baseline gap-3">
        <span>{label}</span>
      </h2>
      {aside ? <div className="t-label text-ink-faint">{aside}</div> : null}
    </div>
  )
}

/** Full-bleed hairline. */
export function Rule({ className }: { className?: string }) {
  return <hr className={cn('border-0 border-t border-ink/12', className)} />
}
