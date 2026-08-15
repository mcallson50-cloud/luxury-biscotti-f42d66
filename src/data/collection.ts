import type { PhotoKey } from './photos'

/**
 * The first capsule. Content, not persisted state — edit this file to change
 * what the Shop renders. `status: 'coming-soon'` renders the piece as an
 * unphotographed placeholder card, which is deliberate.
 */

export type Piece = {
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

export const pieces: Piece[] = [
  {
    slug: 'blassa-tee',
    name: 'Blassa Tee',
    colour: 'Bone',
    price: '€48',
    status: 'available',
    photo: 'clothingTee',
    gallery: ['clothingTee', 'clothingRack', 'spaceCounter'],
    summary:
      'The heavyweight tee the counter staff wear. 240gsm, boxy, holds its shape through a hundred washes.',
    story:
      'We went through four samples before we stopped fiddling with it. The first three were too soft — they looked worn out by the second shift. This one is a 240gsm loopback cotton with a taped neck and a slightly dropped shoulder, so it sits square rather than clinging. The wordmark is printed small on the left hem in a matte clay ink; you have to be close to read it.',
    spec: [
      { label: 'Fabric', value: '240gsm organic loopback cotton, undyed' },
      { label: 'Fit', value: 'Boxy, true to size — size down for a slim fit' },
      { label: 'Made in', value: 'Porto, Portugal' },
      { label: 'Care', value: 'Cold wash, dry flat. It will soften, not shrink.' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    slug: 'souk-overshirt',
    name: 'Souk Overshirt',
    colour: 'Sage',
    price: '€135',
    status: 'available',
    photo: 'clothingSage',
    gallery: ['clothingSage', 'spacePlants', 'clothingRack'],
    summary:
      'A linen-cotton overshirt you can wear as a jacket in September and a shirt in November.',
    story:
      'Cut long enough to cover the hem of a tee, with two patch pockets deep enough for a phone and a set of keys — which is the whole brief, really. The cloth is a 55/45 linen-cotton woven in Portugal that starts slightly crisp and collapses into something much softer after a month. The sage is pigment-dyed, so it will fade unevenly at the elbows and cuffs. That is the point.',
    spec: [
      { label: 'Fabric', value: '55% linen, 45% cotton, pigment-dyed' },
      { label: 'Fit', value: 'Relaxed, straight through the body' },
      { label: 'Made in', value: 'Porto, Portugal' },
      { label: 'Care', value: 'Cold wash with like colours. Expect honest fading.' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'nass-nass-crewneck',
    name: 'Nass-Nass Crewneck',
    colour: 'Terracotta',
    price: '€98',
    status: 'low-stock',
    photo: 'clothingKnitFlatlay',
    gallery: ['clothingKnitFlatlay', 'coffeeCortado', 'spaceDesk'],
    summary:
      'Ribbed cotton knit named after the half-espresso, half-milk order half our regulars make.',
    story:
      'Nass-nass means half-half — it is how you ask for a coffee that is neither one thing nor the other. The knit is the same: too fine to be a sweatshirt, too heavy to be a long-sleeve. A 12-gauge ribbed cotton with a flat-knit collar that does not stretch out. It is the piece we have re-ordered yarn for twice, because the terracotta is difficult to hit twice in a row.',
    spec: [
      { label: 'Fabric', value: '12-gauge ribbed cotton, garment-dyed' },
      { label: 'Fit', value: 'Regular with a short body — sits at the waistband' },
      { label: 'Made in', value: 'Bologna, Italy' },
      { label: 'Care', value: 'Hand wash cold, reshape damp, dry flat.' },
    ],
    sizes: ['S', 'M', 'L'],
  },
  {
    slug: 'zellige-bomber',
    name: 'Zellige Bomber',
    colour: 'Clay',
    price: '€245',
    status: 'available',
    photo: 'clothingBomber',
    gallery: ['clothingBomber', 'clothingWorn', 'spaceGreenRoom'],
    summary:
      'The one properly considered piece in the capsule. Cotton-nylon shell, cupro lining, no logo anywhere.',
    story:
      'Named after the cut tilework behind the counter, which is where the colour came from — that particular clay you only get from unglazed terracotta in low light. The shell is a tightly woven cotton-nylon that shrugs off drizzle; the lining is cupro, so it slides over a knit instead of dragging. Ribbed collar, two-way zip, one internal pocket sized for a passport. We made forty.',
    spec: [
      { label: 'Shell', value: '66% cotton, 34% nylon, water-repellent finish' },
      { label: 'Lining', value: 'Bemberg cupro' },
      { label: 'Made in', value: 'Kraków, Poland' },
      { label: 'Care', value: 'Spot clean. Dry clean once a season, not more.' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'regulars-jacket',
    name: "Regular's Jacket",
    colour: 'Tobacco',
    price: '€180',
    status: 'available',
    photo: 'clothingWorn',
    gallery: ['clothingWorn', 'clothingStore', 'spaceLounge'],
    summary:
      'An unlined chore jacket in brushed cotton twill. Three pockets, no lining, wears in fast.',
    story:
      'Built off a French workwear pattern from the fifties, with the armholes opened up so you can actually reach across a table. Brushed 10oz cotton twill in a tobacco brown that goes lighter at the seams within a season. Corozo buttons, felled seams, and no lining at all — it is meant to be a layer, not a coat.',
    spec: [
      { label: 'Fabric', value: '10oz brushed cotton twill' },
      { label: 'Fit', value: 'Roomy — wears well over the crewneck' },
      { label: 'Made in', value: 'Porto, Portugal' },
      { label: 'Care', value: 'Machine wash cold. Iron the collar, ignore the rest.' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    slug: 'service-apron',
    name: 'Service Apron',
    colour: 'Olive',
    price: '€62',
    status: 'coming-soon',
    gallery: [],
    summary:
      'The cross-back apron the team wears. Being re-cut in waxed canvas — photographed and listed in October.',
    story:
      'The current version is a prototype held together with the wrong hardware, which is why it is not for sale yet. The next run is waxed 12oz canvas with a cross-back strap that does not slide off a shoulder, a towel loop, and a pocket that fits a tamper. Ask at the counter if you want one held back for you.',
    spec: [
      { label: 'Fabric', value: '12oz waxed canvas (in development)' },
      { label: 'Fit', value: 'One size, cross-back, adjustable' },
      { label: 'Made in', value: 'Berlin, Germany' },
      { label: 'Status', value: 'Sampling — listed in October 2026' },
    ],
    sizes: ['One size'],
  },
]

export const collection = {
  name: 'Capsule 01 — Blassa',
  season: 'Autumn 2026',
  intro:
    'Six pieces, made in a run of 120. We designed them for the people who are actually in the room: staff pulling shots for eight hours, regulars who sit through a whole afternoon, someone cycling over in the cold for a cortado.',
  body: [
    'Everything is cut from undyed or naturally pigmented cloth — bone, sage, clay, terracotta. The palette came out of the café itself: the tiles behind the counter, the paper cups, the mint we keep on the windowsill.',
    'We are not trying to release a collection every season. This one exists because we kept being asked where the staff shirts came from. When the run is gone, it is gone, and we will make something else when there is a reason to.',
  ],
  pieces,
}

/** Café menu. Prices in euro, matching the Berlin location. */
export const menu = {
  coffee: [
    { name: 'Espresso', price: '€2.60', note: 'Single or double, same price' },
    { name: 'Cortado', price: '€3.40', note: 'The house default' },
    { name: 'Nass-Nass', price: '€3.80', note: 'Half espresso, half hot milk' },
    { name: 'Filter — single origin', price: '€4.20', note: 'Changes every fortnight' },
    { name: 'Cardamom latte', price: '€4.60', note: 'Ground fresh, never syrup' },
    { name: 'Orange blossom cold brew', price: '€4.90', note: 'Summer only' },
  ],
  beans: [
    { name: 'Kerinci — Sumatra, 250g', price: '€15.50', note: 'Washed. Plum, cocoa, tobacco.' },
    { name: 'Guji — Ethiopia, 250g', price: '€17.20', note: 'Natural. Apricot, jasmine, sherbet.' },
    { name: 'House blend — 1kg', price: '€44.00', note: 'What the espresso machine runs on.' },
  ],
} as const

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
