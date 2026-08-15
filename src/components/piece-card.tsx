import { Link } from '@tanstack/react-router'

import { Frame } from '@/components/media'
import type { Piece } from '@/data/collection'
import { cn } from '@/lib/utils'

const statusLabel: Record<Piece['status'], string | null> = {
  available: null,
  'low-stock': 'Last sizes',
  'coming-soon': 'October',
}

export function PieceCard({
  piece,
  index,
  ratio = 'portrait',
  className,
  sizes,
}: {
  piece: Piece
  index?: number
  ratio?: 'portrait' | 'tall' | 'slab'
  className?: string
  sizes?: string
}) {
  const badge = statusLabel[piece.status]

  return (
    <Link
      to="/shop/$slug"
      params={{ slug: piece.slug }}
      className={cn('group block', className)}
    >
      <div className="relative">
        <Frame
          photo={piece.photo}
          ratio={ratio}
          zoom
          width={1000}
          sizes={sizes}
          altText={
            piece.photo
              ? undefined
              : `${piece.name} — photography coming in October`
          }
        />
        {badge ? (
          <span className="t-label absolute top-3 left-3 rounded-full bg-cream/90 px-3 py-1.5 text-ink">
            {badge}
          </span>
        ) : null}
        {!piece.photo ? (
          <span className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <span className="t-label text-clay">Not yet photographed</span>
          </span>
        ) : null}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-4 border-t border-ink/12 pt-2.5">
        <div>
          <h3 className="text-[15px] leading-tight">
            {typeof index === 'number' ? (
              <span className="mr-2 text-ink-faint">
                {String(index + 1).padStart(2, '0')}
              </span>
            ) : null}
            {piece.name}
          </h3>
          <p className="t-label mt-1.5 text-ink-faint">{piece.colour}</p>
        </div>
        <p className="text-[15px] whitespace-nowrap">{piece.price}</p>
      </div>
    </Link>
  )
}
