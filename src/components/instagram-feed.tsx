import { useEffect, useRef } from 'react'
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
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = track.current
    if (!element) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let previous = 0
    let position = element.scrollLeft
    let direction = 1
    let hovered = false
    let focused = false
    let touching = false
    let resumeAt = 0

    const pauseBriefly = () => { resumeAt = performance.now() + 2500 }
    const pointerEnter = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') hovered = true
    }
    const pointerLeave = () => { hovered = false }
    const pointerDown = () => { touching = true }
    const pointerUp = () => { touching = false; pauseBriefly() }
    const focusIn = () => { focused = true }
    const focusOut = (event: FocusEvent) => {
      focused = element.contains(event.relatedTarget as Node | null)
    }

    const animate = (now: number) => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0
      previous = now
      const max = element.scrollWidth - element.clientWidth
      if (reducedMotion.matches || document.hidden || hovered || focused || touching || now < resumeAt || max <= 0) {
        position = element.scrollLeft
      } else {
        position = Math.max(0, Math.min(max, position + direction * elapsed * 0.025))
        element.scrollLeft = position
        if (position >= max || position <= 0) {
          direction = position >= max ? -1 : 1
          resumeAt = now + 900
        }
      }
      frame = requestAnimationFrame(animate)
    }

    element.addEventListener('pointerenter', pointerEnter)
    element.addEventListener('pointerleave', pointerLeave)
    element.addEventListener('pointerdown', pointerDown)
    window.addEventListener('pointerup', pointerUp)
    window.addEventListener('pointercancel', pointerUp)
    element.addEventListener('focusin', focusIn)
    element.addEventListener('focusout', focusOut)
    element.addEventListener('wheel', pauseBriefly, { passive: true })
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointerenter', pointerEnter)
      element.removeEventListener('pointerleave', pointerLeave)
      element.removeEventListener('pointerdown', pointerDown)
      window.removeEventListener('pointerup', pointerUp)
      window.removeEventListener('pointercancel', pointerUp)
      element.removeEventListener('focusin', focusIn)
      element.removeEventListener('focusout', focusOut)
      element.removeEventListener('wheel', pauseBriefly)
    }
  }, [])

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

      {/* A single row at every screen size, automatically drifting back and forth. */}
      <div ref={track} id="around-blassa-photos" role="region" aria-label="Around BLASSA photos" tabIndex={0} className="mt-6 flex flex-nowrap gap-2.5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-3 md:scroll-px-10 md:px-10">
        {tiles.map((tile) => (
          <a
            key={tile.photo}
            href={tile.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative w-[68vw] shrink-0 sm:w-[42vw] md:w-[30vw] lg:w-[26vw]"
          >
            <Frame
              photo={tile.photo}
              ratio="slab"
              className="w-full [&>img]:absolute [&>img]:inset-0"
              radius="card"
              width={560}
              zoom
              sizes="(min-width: 1024px) 26vw, (min-width: 768px) 30vw, (min-width: 640px) 42vw, 68vw"
            />
            <span className="pointer-events-none absolute inset-0 flex items-end bg-espresso/0 p-3 opacity-0 transition-all duration-500 group-hover:bg-espresso/45 group-hover:opacity-100 group-focus-visible:bg-espresso/45 group-focus-visible:opacity-100">
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
