import { Frame } from '@/components/media'
import { Container, SectionHead } from '@/components/ui/primitives'
import type { PhotoKey } from '@/data/photos'
import { site } from '@/data/site'

/**
 * Instagram strip.
 *
 * A curated static grid rather than a live feed: pulling real posts needs a
 * long-lived Instagram Graph API token, which is a deploy-time decision the
 * studio has to make. Swap `tiles` for fetched posts and everything below
 * keeps working — see AGENTS.md.
 */

type Tile = { photo: PhotoKey; caption: string }

const tiles: Tile[] = [
  { photo: 'coffeeShadow', caption: 'Four o’clock light, every day this week' },
  { photo: 'clothingSage', caption: 'Souk Overshirt — sage, back in all sizes' },
  { photo: 'spaceCounter', caption: 'New shelf, same mess' },
  { photo: 'coffeePourOver', caption: 'Guji on filter from Thursday' },
  { photo: 'clothingKnitFlatlay', caption: 'Nass-Nass crewneck, third yarn lot' },
  { photo: 'spaceTable', caption: 'Sunday long table — 14 people, one pot' },
  { photo: 'coffeeIced', caption: 'Orange blossom cold brew, last of the season' },
  { photo: 'spacePlants', caption: 'The monstera has taken the corner' },
]

export function InstagramFeed({ index = '07' }: { index?: string }) {
  return (
    <section className="mt-24 md:mt-32">
      <Container>
        <SectionHead
          index={index}
          label="From the feed"
          aside={
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="link-rule"
            >
              {site.social.instagramHandle}
            </a>
          }
        />
      </Container>

      {/* Horizontal scroll on small screens, 8-up ribbon on desktop. */}
      <div className="mt-6 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-4 md:overflow-visible md:px-10 lg:grid-cols-8">
        {tiles.map((tile) => (
          <a
            key={tile.photo}
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-auto"
          >
            <Frame
              photo={tile.photo}
              ratio="square"
              radius="card"
              width={560}
              zoom
              sizes="(min-width: 1024px) 12vw, (min-width: 768px) 24vw, 68vw"
            />
            <span className="pointer-events-none absolute inset-0 flex items-end bg-espresso/0 p-3 opacity-0 transition-all duration-500 group-hover:bg-espresso/45 group-hover:opacity-100">
              <span className="text-[12px] leading-snug text-linen">
                {tile.caption}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
