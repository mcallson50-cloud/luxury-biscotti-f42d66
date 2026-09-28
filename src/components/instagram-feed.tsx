import { Frame } from '@/components/media'
import { Container, SectionHead } from '@/components/ui/primitives'
import aroundBlassa from '../../content/settings/around-blassa.json'
import { site } from '@/data/site'

type AroundPhoto = { id: string; alt: string; caption?: string; instagramUrl?: string }

function instagramLink(value?: string) {
  try {
    const url = new URL(value?.trim() || site.social.instagram)
    if (url.protocol === 'https:' && (url.hostname === 'instagram.com' || url.hostname.endsWith('.instagram.com'))) return url.href
  } catch { /* Use the studio profile when the link is missing or invalid. */ }
  return site.social.instagram
}

const tiles = (aroundBlassa.photos as AroundPhoto[])
  .map((photo, index) => ({ photo: `aroundBlassa:${index}`, caption: photo.caption, id: photo.id, href: instagramLink(photo.instagramUrl) }))
  .filter((photo) => photo.id)

export function InstagramFeed({ index }: { index?: string } = {}) {
  if (!tiles.length) return null

  return (
    <section className="mt-16 md:mt-24">
      <Container>
        <SectionHead
          index={index}
          label="Around BLASSA"
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

      {/* Curated images, with horizontal scrolling on small screens. */}
      <div className="mt-6 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-4 md:overflow-visible md:px-10 ">
        {tiles.map((tile) => (
          <a
            key={tile.photo}
            href={tile.href}
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
              sizes="(min-width: 768px) 24vw, 68vw"
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
