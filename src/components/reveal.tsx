import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Fades content up the first time it enters the viewport.
 *
 * The hidden state lives behind `[data-js]` in styles.css, so without
 * JavaScript the content just renders normally. `prefers-reduced-motion`
 * opts out entirely.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  /** Milliseconds of stagger. */
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.visible = 'true'
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          window.setTimeout(() => {
            el.dataset.visible = 'true'
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={cn('reveal', className)}>
      {children}
    </div>
  )
}
