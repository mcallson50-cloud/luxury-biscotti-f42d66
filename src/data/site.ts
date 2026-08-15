/**
 * Single source of truth for the studio's real-world details.
 *
 * ⚠️ PLACEHOLDER DATA — the address, phone number, email, coordinates and
 * opening hours below are stand-ins so the Visit page renders completely.
 * Replace them with BLASSA Studio's actual details before going live; nothing
 * else in the codebase hard-codes them.
 */

export const site = {
  name: 'BLASSA STUDIO',
  tagline: 'Coffee. Community. Clothing.',
  description:
    'A café and clothing studio built around one idea: a place worth staying in. Slow coffee, a small in-house collection, and a room that fills up with regulars.',
  url: 'https://blassastudio.com',

  address: {
    street: 'Weichselstraße 14',
    postcode: '12045',
    city: 'Berlin',
    country: 'Germany',
    neighbourhood: 'Neukölln',
  },

  /** Used for the embedded map — update alongside the address. */
  coordinates: { lat: 52.4813, lng: 13.4374 },

  contact: {
    email: 'hej@blassastudio.com',
    press: 'press@blassastudio.com',
    phone: '+49 30 1234 5678',
    phoneHref: '+493012345678',
  },

  social: {
    instagram: 'https://www.instagram.com/blassastudio',
    instagramHandle: '@blassastudio',
  },

  hours: [
    { days: 'Monday', open: 'Closed', note: 'Roasting + restock' },
    { days: 'Tuesday — Thursday', open: '08:00 — 17:00' },
    { days: 'Friday', open: '08:00 — 18:00' },
    { days: 'Saturday', open: '09:00 — 18:00' },
    { days: 'Sunday', open: '10:00 — 16:00', note: 'Kitchen until 15:00' },
  ],

  /** Shown on the Visit page under the hours block. */
  hoursNote:
    'The clothing rail is open whenever the café is. Fittings after 16:00 are easiest — the room is quieter and someone can actually help you.',
} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Journal', to: '/journal' },
  { label: 'Visit', to: '/visit' },
] as const
