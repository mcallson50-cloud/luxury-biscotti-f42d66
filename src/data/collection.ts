import productContent from '../../content/settings/products.json'
import shopContent from '../../content/settings/shop.json'
import menuContent from '../../content/settings/menu.json'
import type { PhotoKey } from './photos'

/**
 * The first capsule. Content, not persisted state — edit this file to change
 * what the Shop renders. `status: 'coming-soon'` renders the piece as an
 * unphotographed placeholder card, which is deliberate.
 */

export type Piece = {
  badge?: string
  storyHeading: string
  salesNote: string
  placeholderText: string
  slug: string
  name: string
  colour: string
  price: string
  status: 'available' | 'low-stock' | 'coming-soon'
  /** Undefined renders the woven placeholder frame instead of a photo. */
  photo?: PhotoKey
  gallery: PhotoKey[]
  summary: string
  story: string
  spec: { label: string; value: string }[]
  sizes: string[]
}

type ProductContent = Omit<Piece, 'photo' | 'gallery'> & {
  photo?: { id: string; alt: string }
  gallery?: { id: string; alt: string }[]
}
const productRows = (productContent.products ?? []) as ProductContent[]
const productSlugs = new Set<string>()
export const pieces: Piece[] = productRows.map((p) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || productSlugs.has(p.slug)) {
    throw new Error(`Product URL must be unique and use lowercase words separated by hyphens: ${p.slug}`)
  }
  productSlugs.add(p.slug)
  const main = p.photo?.id ? `product:${p.slug}:main` : undefined
  return {
    ...p,
    photo: main,
    gallery: [
      ...(main ? [main] : []),
      ...(p.gallery ?? []).flatMap((image, i) => image.id ? [`product:${p.slug}:gallery:${i}`] : []),
    ],
    sizes: p.sizes ?? [],
    spec: p.spec ?? [],
  }
})

export const collection = {
  ...shopContent,
  body: [
    'Everything is cut from undyed or naturally pigmented cloth — bone, sage, clay, terracotta. The palette came out of the café itself: the tiles behind the counter, the paper cups, the mint we keep on the windowsill.',
    'We are not trying to release a collection every season. This one exists because we kept being asked where the staff shirts came from. When the run is gone, it is gone, and we will make something else when there is a reason to.',
  ],
  pieces,
}

/** Café menu. Prices in euro, matching the Berlin location. */
export const menu = menuContent

export const coffeeStory = {
  heading: 'We buy small and roast close.',
  body: [
    'Two origins at a time, bought in lots small enough that we know whose farm they came from, roasted by friends twenty minutes east of the café. Nothing sits in the hopper longer than nine days.',
    'The espresso is pulled a little shorter and sweeter than is fashionable, because most of it goes into milk. If you want the roaster to talk you through the current filter, come on a Wednesday morning — they are usually here dropping off bags.',
  ],
  facts: [
    { value: '2', label: 'Origins at a time' },
    { value: '9 days', label: 'Maximum rest in the hopper' },
    { value: '20 min', label: 'From roastery to counter' },
  ],
} as const
