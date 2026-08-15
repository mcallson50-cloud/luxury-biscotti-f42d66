import { cn } from '@/lib/utils'

/**
 * Infinite text ribbon. The items are rendered twice and the track is
 * translated -50%, so the loop is seamless. Pauses on hover.
 */
export function Marquee({
  items,
  className,
  separator = '—',
}: {
  items: string[]
  className?: string
  separator?: string
}) {
  const run = [...items, ...items]

  return (
    <div
      className={cn(
        'marquee overflow-hidden border-y border-ink/12 py-4 select-none',
        className,
      )}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {run.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="t-display flex shrink-0 items-center text-[clamp(30px,4.4vw,60px)] whitespace-nowrap"
          >
            {item}
            <span className="mx-6 text-sage md:mx-10">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
