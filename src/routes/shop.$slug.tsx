import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'

import { Frame } from '@/components/media'
import { Reveal } from '@/components/reveal'
import { Container, SectionHead } from '@/components/ui/primitives'
import { pieces } from '@/data/collection'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/shop/$slug')({
  loader: ({ params }) => {
    const index = pieces.findIndex((p) => p.slug === params.slug)
    if (index === -1) throw notFound()

    return {
      piece: pieces[index],
      next: pieces[(index + 1) % pieces.length],
      number: index + 1,
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.piece.name} — ${site.name}` },
          { name: 'description', content: loaderData.piece.summary },
        ]
      : [],
  }),
  component: PieceDetail,
})

function PieceDetail() {
  const { piece, next, number } = Route.useLoaderData()
  const [size, setSize] = useState<string | null>(null)

  const unavailable = piece.status === 'coming-soon'
  const mailSubject = encodeURIComponent(
    `${piece.name} — hold ${size ? `size ${size}` : 'a size'}`,
  )

  return (
    <article className="pt-28 md:pt-36">
      <Container>
        <nav className="t-label flex items-center gap-2.5 text-ink-faint">
          <Link to="/shop" className="link-rule">
            Capsule 01
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{piece.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Gallery — stacked, scrolls past the sticky column */}
          <div className="grid gap-4 lg:col-span-7">
            {piece.gallery.length > 0 ? (
              piece.gallery.map((photo, i) => (
                <Frame
                  key={`${photo}-${i}`}
                  photo={photo}
                  ratio={i === 0 ? 'slab' : 'landscape'}
                  priority={i === 0}
                  width={1600}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                />
              ))
            ) : (
              <div className="frame flex aspect-[4/5] items-center justify-center">
                <p className="t-label max-w-[22ch] text-center text-clay">
                  Photographed in October
                </p>
              </div>
            )}
          </div>

          {/* Info — sticks while the gallery moves */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="t-label text-ink-faint">
                Piece {String(number).padStart(2, '0')} — {piece.colour}
              </p>
              <h1 className="t-display mt-4 text-[clamp(38px,5vw,76px)]">
                {piece.name}
              </h1>
              <p className="t-lead mt-5">{piece.summary}</p>

              <p className="t-heading mt-8 text-[24px]">{piece.price}</p>

              {/* Sizes */}
              <fieldset className="mt-7 border-0 p-0" disabled={unavailable}>
                <legend className="t-label text-ink-faint">
                  {unavailable ? 'Sizing when it lands' : 'Select a size'}
                </legend>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {piece.sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSize(option === size ? null : option)}
                      aria-pressed={size === option}
                      className={cn(
                        'min-w-[3.25rem] rounded-full border px-4 py-2.5 text-[12px] tracking-[0.14em] uppercase transition-colors duration-300',
                        size === option
                          ? 'border-espresso bg-espresso text-linen'
                          : 'border-ink/20 text-ink-soft hover:border-ink hover:text-ink',
                        unavailable && 'cursor-not-allowed opacity-45',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7 flex flex-wrap gap-3">
                {unavailable ? (
                  <>
                    <a
                      href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`${piece.name} — tell me when it lands`)}`}
                      className="btn btn-solid"
                    >
                      Tell me when it lands
                    </a>
                    <Link to="/journal" className="btn btn-ghost">
                      Read the making-of
                    </Link>
                  </>
                ) : (
                  <>
                    <a
                      href={`mailto:${site.contact.email}?subject=${mailSubject}`}
                      className="btn btn-solid"
                    >
                      {size ? `Hold size ${size}` : 'Hold a size'}
                    </a>
                    <Link to="/visit" className="btn btn-ghost">
                      Try it on
                    </Link>
                  </>
                )}
              </div>

              <p className="t-body mt-4 text-[13px]">
                {piece.status === 'low-stock'
                  ? 'Last sizes of this run — once it is gone we are not re-cutting it.'
                  : 'Sold across the counter in ' +
                    site.address.city +
                    '. Email holds a size for three days.'}
              </p>

              {/* Story + spec */}
              <div className="mt-10 border-t border-ink/15 pt-6">
                <h2 className="t-label">Why it exists</h2>
                <p className="t-body mt-3.5">{piece.story}</p>
              </div>

              <dl className="mt-8 border-t border-ink/15 pt-1">
                {piece.spec.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[8rem_1fr] gap-4 border-b border-ink/8 py-3.5"
                  >
                    <dt className="t-label text-ink-faint">{row.label}</dt>
                    <dd className="text-[14px] text-ink-soft">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>

      {/* Next piece */}
      <section className="mt-24 md:mt-32">
        <Container>
          <SectionHead index="→" label="Next piece" aside={next.colour} />
          <Reveal>
            <Link
              to="/shop/$slug"
              params={{ slug: next.slug }}
              className="group mt-8 grid items-end gap-8 md:grid-cols-2"
            >
              <div>
                <h2 className="t-display text-[clamp(38px,6vw,96px)]">
                  {next.name}
                </h2>
                <p className="t-body mt-4 max-w-md">{next.summary}</p>
                <span className="t-label link-rule mt-6 inline-block text-clay">
                  See the piece
                </span>
              </div>
              <Frame
                photo={next.photo}
                ratio="landscape"
                zoom
                width={1200}
                sizes="(min-width: 768px) 48vw, 100vw"
                altText={
                  next.photo ? undefined : `${next.name} — not yet photographed`
                }
              />
            </Link>
          </Reveal>
        </Container>
      </section>
    </article>
  )
}
