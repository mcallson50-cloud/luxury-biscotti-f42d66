import { defineConfig, type TinaField } from 'tinacms'

const text = (name: string, label: string, required = true) => ({
  type: 'string' as const, name, label, required,
})
const object = (name: string, label: string, fields: TinaField[]): TinaField => ({
  type: 'object', name, label, fields, required: true,
})
const imageSlot = (name: string, label: string): TinaField => object(name, label, [
  { type: 'image', name: 'id', label: 'Photo', required: true },
  text('alt', 'Photo description for accessibility'),
])
const singleton = { allowedActions: { create: false, delete: false } }
const menuItems = (name: string, label: string): TinaField => ({
  type: 'object', name, label, list: true, required: true,
  ui: { itemProps: (item) => ({ label: item.name }) },
  fields: [text('name', 'Name'), text('price', 'Price (include currency)'), text('note', 'Description', false)],
})

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'media', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'aroundBlassa', label: 'Around Blassa photos', path: 'content/settings',
        format: 'json', match: { include: 'around-blassa' }, ui: singleton,
        fields: [{
          type: 'object', name: 'photos', label: 'Photos', list: true,
          ui: { itemProps: (item) => ({ label: item.caption || item.alt || 'New photo' }) },
          fields: [
            { type: 'image', name: 'id', label: 'Photo', required: true },
            text('alt', 'Photo description for accessibility'),
            text('caption', 'Hover caption', false),
            { ...text('instagramUrl', 'Instagram link', false), description: 'Paste the full Instagram post or reel URL. Leave blank to link to the studio profile.' },
          ],
        }],
      },
      {
        name: 'visitPage', label: 'Visit text', path: 'content/settings',
        format: 'json', match: { include: 'visit' }, ui: singleton,
        fields: [
          text('headingLineOne', 'First heading: line 1'), text('headingLineTwo', 'First heading: line 2'),
          text('addressHeading', 'Address heading'), text('directionsLabel', 'Directions button'),
          text('gettingHereHeading', 'Getting here heading'), text('gettingHereText', 'Getting here paragraph'),
          text('contactHeading', 'Contact heading'), text('writeHeading', 'Write to us label'),
          text('replyNote', 'Reply-time note'), text('writeTitle', 'Write to us heading'),
          { ...text('writeText', 'Write to us paragraph'), ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'products', label: 'Shop products', path: 'content/settings',
        format: 'json', match: { include: 'products' }, ui: singleton,
        fields: [{
          type: 'object', name: 'products', label: 'Products', list: true,
          ui: {
            itemProps: (item) => ({ label: item.name || 'New product' }),
            defaultItem: { name: 'New product', slug: 'new-product', colour: '', price: '', status: 'available',
              summary: '', story: '', storyHeading: 'Why it exists', salesNote: '', placeholderText: 'Not yet photographed',
              badge: '', photo: { id: '', alt: '' }, gallery: [], sizes: [], spec: [] },
          },
          fields: [
            text('name', 'Product name'),
            { ...text('slug', 'URL slug'), description: 'Unique lowercase words separated by hyphens. Changing it changes the product URL.',
              ui: { validate: (value: string | undefined) => !value || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? 'Use lowercase words separated by hyphens.' : undefined } },
            text('colour', 'Colour', false), text('price', 'Price (include currency)'),
            { ...text('status', 'Availability'), options: ['available', 'low-stock', 'coming-soon'] },
            text('badge', 'Badge text', false),
            { ...text('summary', 'Short description'), ui: { component: 'textarea' } },
            text('storyHeading', 'Description heading'),
            { ...text('story', 'Full description'), ui: { component: 'textarea' } },
            text('salesNote', 'Availability / reservation note', false), text('placeholderText', 'Text when no photo is provided'),
            { type: 'object', name: 'photo', label: 'Main product photo', fields: [
              { type: 'image', name: 'id', label: 'Photo' }, text('alt', 'Photo description', false),
            ] },
            { type: 'object', name: 'gallery', label: 'Additional gallery photos', list: true,
              fields: [{ type: 'image', name: 'id', label: 'Photo', required: true }, text('alt', 'Photo description')] },
            { type: 'string', name: 'sizes', label: 'Sizes', list: true },
            { type: 'object', name: 'spec', label: 'Specifications', list: true,
              ui: { itemProps: (item) => ({ label: item.label }) },
              fields: [text('label', 'Label'), text('value', 'Value')] },
          ],
        }],
      },

      {
        name: 'visitImages', label: 'Visit photos', path: 'content/settings',
        format: 'json', match: { include: 'visit-images' }, ui: singleton,
        fields: [imageSlot('hero', 'First Visit photo'), imageSlot('main', 'Write to us photo')],
      },

      {
        name: 'shopPage', label: 'Shop page', path: 'content/settings',
        format: 'json', match: { include: 'shop' }, ui: singleton,
        fields: [
          text('name', 'Collection title'),
          text('season', 'Season label'),
          { ...text('intro', 'Introduction'), ui: { component: 'textarea' } },
          { type: 'boolean', name: 'showPieceCount', label: 'Show product count', description: 'The number is calculated automatically from the products.' },
        ],
      },
      {
        name: 'homepage', label: 'Homepage text', path: 'content/settings',
        format: 'json', match: { include: 'home' }, ui: singleton,
        fields: [
          text('heroLineOne', 'Hero heading: first line'),
          text('heroLineTwo', 'Hero heading: second line'),
          text('heroLineThree', 'Hero heading: third line'),
          text('heroDescription', 'Hero description'),
          text('placeLabel', 'Place section label'), text('placeHeading', 'Place heading'),
          text('placeDescription', 'Place description'),
          text('menuCurrencyNote', 'Menu currency note'),
          text('clothingLabel', 'Clothing section label'), text('clothingHeading', 'Clothing heading'),
          text('clothingDescription', 'Clothing description'), text('visitHeading', 'Visit heading'),
        ],
      },
      {
        name: 'studio', label: 'Studio details', path: 'content/settings',
        format: 'json', match: { include: 'site' }, ui: singleton,
        fields: [
          text('copyrightYear', 'Copyright year'), text('name', 'Studio name'), text('tagline', 'Tagline'),
          { ...text('description', 'Site description'), ui: { component: 'textarea' } },
          text('url', 'Website URL'), text('locationLabel', 'Location label'),
          text('hoursSummary', 'Short opening-hours text'), text('hoursNote', 'Opening-hours note'),
          text('mapsUrl', 'Google Maps link'),
          object('address', 'Address', [text('street', 'Street', false), text('postcode', 'Postcode', false), text('city', 'City'), text('country', 'Country'), text('neighbourhood', 'Neighbourhood')]),
          object('coordinates', 'Map coordinates', [
            { type: 'number', name: 'lat', label: 'Latitude', required: true },
            { type: 'number', name: 'lng', label: 'Longitude', required: true },
          ]),
          object('contact', 'Contact details (replace existing placeholders)', [text('email', 'Email'), text('press', 'Press email'), text('phone', 'Phone display'), text('phoneHref', 'Phone link (international format)')]),
          object('social', 'Instagram', [text('instagram', 'Profile URL'), text('instagramHandle', 'Handle')]),
          {
            type: 'object', name: 'hours', label: 'Daily opening hours', list: true, required: true,
            ui: { itemProps: (item) => ({ label: item.days }) },
            fields: [
              { ...text('days', 'Day'), options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
              text('open', 'Hours or Closed'),
            ],
          },
        ],
      },
      {
        name: 'cafeMenu', label: 'Café menu', path: 'content/settings',
        format: 'json', match: { include: 'menu' }, ui: singleton,
        fields: [menuItems('coffee', 'COFFEE'), menuItems('beans', 'EXTRAS'), menuItems('nonCoffee', 'NON COFFEE'), menuItems('specials', 'BLASSA SPECIALS')],
      },
      {
        name: 'homeImages', label: 'Homepage photos', path: 'content/settings',
        format: 'json', match: { include: 'images' }, ui: singleton,
        fields: [
          ['heroPicnic', 'Main hero photo'], ['placeShopDog', 'The Place / Vertical'],
          ['menuIcedPour', 'Menu photo'], ['clothingCrew', 'Clothing photo'],
        ].map(([name, label]) => object(name, label, [
          { type: 'image', name: 'id', label: 'Photo', required: true },
          text('alt', 'Photo description for accessibility'),
        ])),
      },
    ],
  },
})
