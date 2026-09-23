/** Studio details. Contact email, phone and site URL remain placeholders. */

export const site = {
  name: 'BLASSA STUDIO',
  tagline: 'Culture • Café • Creative space',
  description:
    'Culture, café and creative space in Tamraght, Morocco. Open 9:30am to 5pm, Saturday to Thursday. Closed Friday.',
  url: 'https://blassastudio.com',

  address: {
    street: '',
    postcode: '',
    city: 'Tamraght',
    country: 'Morocco',
    neighbourhood: 'Tamraght',
  },

  /** Used for the embedded map — update alongside the address. */
  coordinates: { lat: 30.5114614, lng: -9.6764371 },

  locationLabel: 'Tamraght, Morocco',
  hoursSummary: 'Open 9:30am – 5pm • Friday closed',
  mapsUrl: 'https://www.google.com/maps/place/BLASSA+STUDIO/@30.5114614,-9.6764371,17z/data=!3m1!4b1!4m6!3m5!1s0xdb3b3ad17ad7dfb:0x614139f4b32b431d!8m2!3d30.5114614!4d-9.6764371!16s%2Fg%2F11yqb94cnk!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D',

  contact: {
    email: 'hej@blassastudio.com',
    press: 'press@blassastudio.com',
    phone: '+49 30 1234 5678',
    phoneHref: '+493012345678',
  },

  social: {
    instagram: 'https://www.instagram.com/blassa.studio/',
    instagramHandle: '@blassa.studio',
  },

  hours: [
    { days: 'Monday', open: '9:30am – 5pm' },
    { days: 'Tuesday', open: '9:30am – 5pm' },
    { days: 'Wednesday', open: '9:30am – 5pm' },
    { days: 'Thursday', open: '9:30am – 5pm' },
    { days: 'Friday', open: 'Closed' },
    { days: 'Saturday', open: '9:30am – 5pm' },
    { days: 'Sunday', open: '9:30am – 5pm' },
  ],
  hoursNote: 'Open Saturday to Thursday. Closed on Fridays.',

} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Visit', to: '/visit' },
] as const
