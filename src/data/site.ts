import settings from '../../content/settings/site.json'

export const site = settings

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Visit', to: '/visit' },
] as const
