import { createFileRoute } from '@tanstack/react-router'

import { PieceCard } from '@/components/piece-card'
import { Reveal } from '@/components/reveal'
import { Container } from '@/components/ui/primitives'
import { collection } from '@/data/collection'
import { site } from '@/data/site'

export const Route = createFileRoute('/shop/')({
  head: () => ({
    meta: [
      { title: `Shop | ${collection.name} | ${site.name}` },
      { name: 'description', content: collection.intro },
    ],
  }),
  component: Shop,
})

function Shop() {
  return (
    <section className="pt-28 md:pt-36">
      <Container>
        <p className="t-label text-ink-faint">{collection.season} · {collection.pieces.length} pieces</p>
        <h1 className="t-display mt-4 text-[clamp(42px,6vw,80px)]">{collection.name}</h1>
        <p className="t-body mt-5 max-w-xl">Everyday pieces in the colours of the café. Find your favourite and make it your own.</p>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-8">
          {collection.pieces.map((piece, index) => (
            <Reveal key={piece.slug} delay={(index % 3) * 60}>
              <PieceCard piece={piece} index={index} ratio="portrait" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
