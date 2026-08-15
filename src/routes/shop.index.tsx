import { createFileRoute } from '@tanstack/react-router'

import { Figure } from '@/components/media'
import { PhotoMarquee } from '@/components/photo-marquee'
import { PieceCard } from '@/components/piece-card'
import { Reveal } from '@/components/reveal'
import { Container, SectionHead } from '@/components/ui/primitives'
import { collection } from '@/data/collection'
import type { PhotoKey } from '@/data/photos'
import { site } from '@/data/site'

/** Gallery ribbon — the capsule worn and shot in the room, on a loop. */
const galleryTop: PhotoKey[] = [
  'clothingRack',
  'clothingTee',
  'spaceGreenRoom',
  'clothingSage',
  'coffeeShadow',
  'clothingBomber',
  'spaceCounter',
  'clothingKnitFlatlay',
  'clothingWorn',
  'spaceLounge',
  'clothingStore',
]

export const Route = createFileRoute('/shop/')({
  head: () => ({
    meta: [
      { title: `Shop — ${collection.name} — ${site.name}` },
      { name: 'description', content: collection.intro },
    ],
  }),
  component: Shop,
})

function Shop() {
  const [first, second, ...rest] = collection.pieces

  return (
    <>
      {/* ── Masthead ───────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="t-label text-ink-faint">
                {collection.season} — {collection.pieces.length} pieces
              </p>
              <h1 className="t-display mt-5 text-[clamp(46px,8.5vw,142px)]">
                {collection.name}
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-24">
              <p className="t-lead">{collection.intro}</p>
              {collection.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="t-body mt-5">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Editorial opener: two pieces at different scales ───── */}
      <section className="mt-16 md:mt-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-7">
              <Figure
                photo="clothingRack"
                ratio="wide"
                caption="The full rail, hung in the order it was cut. Bone, sage, terracotta, clay, tobacco."
                index="Capsule 01"
                width={1600}
                sizes="(min-width: 768px) 56vw, 100vw"
              />
            </Reveal>
            <Reveal delay={110} className="md:col-span-5 md:pt-16">
              <Figure
                photo="clothingKnitFlatlay"
                ratio="slab"
                caption="Terracotta was the hardest colour to hit twice. This is the third yarn lot."
                index="Fig. 02"
                width={1100}
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The pieces ─────────────────────────────────────────── */}
      <section className="mt-24 md:mt-32">
        <Container>
          <SectionHead
            index="01"
            label="The pieces"
            aside="Runs of 120 — no restocks"
          />

          {/* Asymmetric grid: the first two run large, the rest fall
              into a three-up rhythm below. */}
          <div className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 md:gap-x-8">
            {first ? (
              <Reveal>
                <PieceCard
                  piece={first}
                  index={0}
                  ratio="slab"
                  sizes="(min-width: 768px) 46vw, 100vw"
                />
              </Reveal>
            ) : null}
            {second ? (
              <Reveal delay={100} className="md:pt-16">
                <PieceCard
                  piece={second}
                  index={1}
                  ratio="slab"
                  sizes="(min-width: 768px) 46vw, 100vw"
                />
              </Reveal>
            ) : null}
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
            {rest.map((piece, i) => (
              <Reveal key={piece.slug} delay={i * 90}>
                <PieceCard
                  piece={piece}
                  index={i + 2}
                  ratio="portrait"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Gallery ────────────────────────────────────────────── */}
      <section className="mt-24 md:mt-32">
        <Container>
          <SectionHead index="02" label="Gallery" aside="Capsule 01, in use" />
        </Container>

        {/* One ribbon drifting right — full-bleed, so it runs past the
            container on both sides. */}
        <div className="mt-8 md:mt-10">
          <PhotoMarquee photos={galleryTop} seconds={72} />
        </div>
      </section>
    </>
  )
}
