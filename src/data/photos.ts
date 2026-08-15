/**
 * Image sources.
 *
 * Every id below was checked to resolve, and the photo content was reviewed
 * so each slot matches its subject. Swap `unsplashId` for a local `/media/*`
 * path (or a Netlify Image CDN path) as the studio's own photography lands —
 * `src()` returns any string starting with `/` untouched.
 */

type Photo = {
  /** Unsplash photo id, or an absolute path to a local asset. */
  id: string
  alt: string
}

const photo = (id: string, alt: string): Photo => ({ id, alt })

export const photos = {
  // Café + space
  spaceGreenRoom: photo(
    'photo-1521017432531-fbd92d768814',
    'The green-panelled back room of the café, tables laid out along the window',
  ),
  spacePlants: photo(
    'photo-1554118811-1e0d58224f24',
    'Warm café interior with hanging plants and mismatched chairs',
  ),
  spaceCounter: photo(
    'photo-1559496417-e7f25cb247f3',
    'The espresso counter, timber shelving stacked with cups and bags of beans',
  ),
  spaceWindowTable: photo(
    'photo-1461988320302-91bde64fc8e4',
    'French press and small cups on a marble table beside a bright window',
  ),
  spaceDesk: photo(
    'photo-1534040385115-33dcb3acba5b',
    'A corner table by the window with a flat white, an open notebook and reading glasses',
  ),
  spaceLounge: photo(
    'photo-1524758631624-e2822e304c36',
    'The studio lounge — low chairs, a paper lamp and afternoon light',
  ),
  spaceTable: photo(
    'photo-1414235077428-338989a2e8c0',
    'A long shared table mid-service, plates and glasses in use',
  ),

  // Coffee
  coffeeToast: photo(
    'photo-1495474472287-4d71bcdd2085',
    'Two hands raising takeaway lattes above a table',
  ),
  coffeePourOver: photo(
    'photo-1442512595331-e89e73853f31',
    'Filter coffee being brewed by hand into glass carafes',
  ),
  coffeeCortado: photo(
    'photo-1509042239860-f550ce710b93',
    'Two cappuccinos in dark ceramic cups surrounded by potted herbs',
  ),
  coffeeIced: photo(
    'photo-1517701550927-30cf4ba1dba5',
    'Iced latte in a tall glass, milk still folding through the coffee',
  ),
  coffeeShadow: photo(
    'photo-1519455953755-af066f52f1a6',
    'A glass of coffee on a cream surface, leaf shadows falling across it',
  ),
  coffeeGrounds: photo(
    'photo-1497935586351-b67a49e012bf',
    'Portafilter, loose beans and a finished cappuccino laid out on a worn board',
  ),
  coffeeFarm: photo(
    'photo-1560493676-04071c5f467b',
    'Rows of green crop running to the horizon at first light',
  ),

  // Collection
  clothingRack: photo(
    'photo-1490481651871-ab68de25d43d',
    'A rail of undyed and stone-coloured garments against a white wall',
  ),
  clothingSage: photo(
    'photo-1523381210434-271e8be1f52b',
    'Sage green shirts hung close together on wooden hangers',
  ),
  clothingKnitFlatlay: photo(
    'photo-1556905055-8f358a7a47b2',
    'Rust-coloured ribbed knit folded beside denim and a wristwatch',
  ),
  clothingTee: photo(
    'photo-1521572163474-6864f9cf17ab',
    'Plain heavyweight cotton t-shirt worn straight on, cropped at the shoulders',
  ),
  clothingBomber: photo(
    'photo-1483985988355-763728e1935b',
    'Terracotta bomber jacket held up on a hanger against a pale wall',
  ),
  clothingWorn: photo(
    'photo-1487222477894-8943e31ef7b2',
    'Tan jacket worn open over a collared shirt on the street',
  ),
  clothingStore: photo(
    'photo-1441986300917-64674bd600d8',
    'Folded garments and shelving in the studio retail corner',
  ),
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

/** Build a sized, format-negotiated URL for a photo key or raw source. */
export function src(key: PhotoKey | string, width = 1200): string {
  const id = key in photos ? photos[key as PhotoKey].id : String(key)
  if (id.startsWith('/') || id.startsWith('http')) return id
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=72&w=${width}`
}

export function alt(key: PhotoKey | string): string {
  return key in photos ? photos[key as PhotoKey].alt : ''
}
