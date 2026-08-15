import { Frame, type Ratio } from '@/components/media'
import type { PhotoKey } from '@/data/photos'
import { cn } from '@/lib/utils'

/**
 * Infinite image ribbon — the photographic sibling of `Marquee`.
 *
 * The row is rendered twice and the track translated by 50% of its own
 * width, so the loop is seamless. The spacing lives on the tiles rather
 * than in a flex `gap`, because a gap on the track makes the two halves
 * unequal and the seam visibly jumps.
 *
 * The duplicate half is `aria-hidden`, so the images are announced once.
 */
export function PhotoMarquee({
  photos,
  direction = 'right',
  seconds = 70,
  ratio = 'square',
  itemClassName,
  className,
}: {
  photos: PhotoKey[]
  /** Which way the images travel. */
  direction?: 'left' | 'right'
  /** One full loop, in seconds. Higher is slower. */
  seconds?: number
  ratio?: Ratio
  itemClassName?: string
  className?: string
}) {
  const run = [...photos, ...photos]

  return (
    <div className={cn('photo-marquee', className)}>
      <div
        className={cn(
          'photo-marquee-track',
          direction === 'right' && 'photo-marquee-right',
        )}
        style={{ animationDuration: `${seconds}s` }}
      >
        {run.map((photo, i) => (
          <div
            key={`${photo}-${i}`}
            className={cn(
              'group w-[58vw] shrink-0 pr-3 sm:w-[38vw] md:w-[27vw] lg:w-[19vw] md:pr-4',
              itemClassName,
            )}
            aria-hidden={i >= photos.length ? true : undefined}
          >
            <Frame
              photo={photo}
              ratio={ratio}
              radius="card"
              width={900}
              zoom
              sizes="(min-width: 1024px) 19vw, (min-width: 768px) 27vw, (min-width: 640px) 38vw, 58vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
