import { Head } from 'vite-react-ssg'
import { SITE } from '../config/site'
import { photoUrl } from './Photo'

interface SeoProps {
  title: string
  description: string
  path: string
  image?: string
  /** photo name from the image manifest */
  type?: 'website' | 'product' | 'article'
  jsonLd?: object | object[]
  noindex?: boolean
}

export const abs = (path: string) => `${SITE.url}${path === '/' ? '' : path}`

/** Per-page <head>: title, description, canonical, Open Graph, Twitter and JSON-LD. */
export default function Seo({ title, description, path, image = 'og', type = 'website', jsonLd, noindex }: SeoProps) {
  const full = title.includes('Crumble Creme') ? title : `${title} | ${SITE.name}`
  const url = path === '/' ? `${SITE.url}/` : abs(path)
  const img = image === 'og' ? `${SITE.url}/og.jpg` : `${SITE.url}${photoUrl(image, 900)}`
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  return (
    <Head>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type === 'product' ? 'product' : type} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(b)}
        </script>
      ))}
    </Head>
  )
}

export const bakeryJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  '@id': `${SITE.url}/#bakery`,
  name: SITE.name,
  url: SITE.url,
  slogan: SITE.tagline,
  description:
    'A modern bakery making small-batch cookies, cakes, cupcakes and pies, baked fresh and ordered on WhatsApp.',
  image: `${SITE.url}${photoUrl('cookie-bite', 900)}`,
  email: SITE.email,
  priceRange: '₹₹',
  servesCuisine: 'Bakery',
  currenciesAccepted: 'INR',
  areaServed: SITE.city || 'India',
  sameAs: Object.values(SITE.social).filter(Boolean),
  potentialAction: {
    '@type': 'OrderAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/shop`, actionPlatform: 'https://schema.org/DesktopWebPlatform' },
  },
})

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE.url}/#bakery` },
})

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path) || SITE.url,
  })),
})
