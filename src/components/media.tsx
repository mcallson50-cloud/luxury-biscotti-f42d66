import { useEffect, useRef, type CSSProperties } from 'react'

import { alt as altFor, src, type PhotoKey } from '@/data/photos'
import { cn } from '@/lib/utils'

const ratios = {
  square: '1 / 1',
  portrait: '3 / 4',
  tall: '2 / 3',
  slab: '4 / 5',
  landscape: '4 / 3',
  wide: '16 / 10',
  cinema: '21 / 9',
} as const

export type Ratio = keyof typeof ratios

type FrameProps = {
  photo?: PhotoKey | string
  altText?: string
  ratio?: Ratio
  /** Rendered width hint passed to the image service. */
  width?: number
  /** Loads eagerly and skips lazy decoding — use for above-the-fold media only. */
  priority?: boolean
  drift?: boolean
  zoom?: boolean
  radius?: 'frame' | 'card' | 'flat'
  className?: string
  style?: CSSProperties
  sizes?: string
}

/**
 * An image in a fixed-ratio frame. While the file loads — or if it never
 * arrives — the frame shows a woven cream placeholder, so an absent asset
 * still reads as part of the layout.
 */
export function Frame({
  photo,
  altText,
  ratio = 'portrait',
  width = 1200,
  priority = false,
  drift = false,
  zoom = false,
  radius = 'frame',
  className,
  style,
  sizes,
}: FrameProps) {
  const ref = useRef<HTMLImageElement>(null)

  // Cached images can finish before hydration, so the load event never fires.
  useEffect(() => {
    const img = ref.current
    if (img?.complete && img.naturalWidth > 0) img.dataset.loaded = 'true'
  }, [])

  return (
    <div
      className={cn(
        'frame tone',
        radius === 'card' && 'frame-card',
        radius === 'flat' && 'frame-flat',
        drift && 'frame-drift',
        zoom && 'frame-zoom',
        className,
      )}
      style={{ aspectRatio: ratios[ratio], ...style }}
    >
      {photo ? (
        <img
          ref={ref}
          src={src(photo, width)}
          alt={altText ?? altFor(photo)}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={(e) => {
            e.currentTarget.dataset.loaded = 'true'
          }}
        />
      ) : null}
    </div>
  )
}

type FigureProps = FrameProps & { caption?: string; index?: string }

/** A frame with a hairline caption underneath. */
export function Figure({ caption, index, ...frame }: FigureProps) {
  return (
    <figure className="m-0">
      <Frame {...frame} />
      {caption ? (
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink/12 pt-2.5">
          <span className="t-body text-[13px] leading-snug">{caption}</span>
          {index ? <span className="t-label text-ink-faint">{index}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}

type VideoPanelProps = {
  /** Path under /public, e.g. "/media/hero.mp4". Drop the file in to activate. */
  video: string
  /** Still shown before playback and if the video is missing. */
  poster: PhotoKey | string
  altText?: string
  ratio?: Ratio
  radius?: 'frame' | 'card' | 'flat'
  className?: string
  priority?: boolean
  width?: number
}

/**
 * Looping ambient video with a photographic fallback.
 *
 * The poster is a real <img> beneath the <video>, so until an .mp4 exists at
 * `video` the panel simply shows the still — no black rectangles, no console
 * noise the visitor can see.
 */
export function VideoPanel({
  video,
  poster,
  altText,
  ratio = 'cinema',
  radius = 'flat',
  className,
  priority = true,
  width = 2000,
}: VideoPanelProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) img.dataset.loaded = 'true'
  }, [])

  return (
    <div
      className={cn(
        'frame frame-drift tone',
        radius === 'card' && 'frame-card',
        radius === 'flat' && 'frame-flat',
        className,
      )}
      style={{ aspectRatio: ratios[ratio] }}
    >
      <img
        ref={imgRef}
        src={src(poster, width)}
        alt={altText ?? altFor(poster)}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={(e) => {
          e.currentTarget.dataset.loaded = 'true'
        }}
      />
      <video
        className="frame-video"
        poster={src(poster, width)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={(e) => {
          e.currentTarget.dataset.loaded = 'true'
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  )
}
