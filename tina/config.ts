import { defineConfig, type TinaField } from 'tinacms'

const text = (name: string, label: string, required = true) => ({
  type: 'string' as const, name, label, required,
})
const object = (name: string, label: string, fields: TinaField[]): TinaField => ({
  type: 'object', name, label, fields, required: true,
})
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
          text('name', 'Studio name'), text('tagline', 'Tagline'),
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
        fields: [menuItems('coffee', 'Drinks'), menuItems('beans', 'Beans to take away')],
      },
      {
        name: 'homeImages', label: 'Homepage photos', path: 'content/settings',
        format: 'json', match: { include: 'images' }, ui: singleton,
        fields: [
          ['heroPicnic', 'Main hero photo'], ['placeShopDog', 'The place photo'],
          ['menuIcedPour', 'Menu photo'], ['clothingCrew', 'Clothing photo'],
        ].map(([name, label]) => object(name, label, [
          { type: 'image', name: 'id', label: 'Photo', required: true },
          text('alt', 'Photo description for accessibility'),
        ])),
      },
    ],
  },
})
