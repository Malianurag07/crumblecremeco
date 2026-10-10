/**
 * One place for everything you'll want to change before launch.
 * - whatsappNumber: country code + number, digits only (e.g. India: 919876543210)
 * - url: your real domain (used for canonical links, sitemap and social previews)
 */
export const SITE = {
  name: 'Crumble Creme Co.',
  handle: 'crumblecremeco',
  tagline: 'A Little Crumble. A Lot of Love.',
  url: 'https://crumblecremeco.com',
  whatsappNumber: '91XXXXXXXXXX',
  email: 'hello@crumblecremeco.com',
  city: '', // e.g. 'Pune' — fill in for local SEO
  social: {
    instagram: '', // paste your Instagram URL
    facebook: '',
    pinterest: '',
  },
} as const

export const isWhatsAppConfigured = /^\d{10,15}$/.test(SITE.whatsappNumber)
