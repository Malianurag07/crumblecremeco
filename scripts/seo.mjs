// Generates public/sitemap.xml + robots.txt from the product data and SITE config.
import { readFile, writeFile } from 'node:fs/promises'

const site = await readFile('src/config/site.ts', 'utf8')
const products = await readFile('src/data/products.ts', 'utf8')
const url = (site.match(/url:\s*'([^']+)'/) ?? [])[1] ?? 'https://crumblecremeco.com'

const productSlugs = [...products.matchAll(/^\s{4}slug: '([^']+)',\n\s{4}name:/gm)].map((m) => m[1])
const categorySlugs = [...products.matchAll(/^\s{4}slug: '([^']+)',\n\s{4}title:/gm)].map((m) => m[1])
categorySlugs.push(...[...products.matchAll(/slug: '(little-drops)',\n\s{2}title:/g)].map((m) => m[1]))

const today = new Date().toISOString().slice(0, 10)
const entry = (path, priority, freq) =>
  `  <url>\n    <loc>${url}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`

const urls = [
  entry('/', '1.0', 'weekly'),
  entry('/shop', '0.9', 'weekly'),
  ...[...new Set(categorySlugs)].map((s) => entry(`/shop/${s}`, '0.8', 'weekly')),
  ...productSlugs.map((s) => entry(`/product/${s}`, '0.7', 'weekly')),
  entry('/about', '0.6', 'monthly'),
]

await writeFile(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
await writeFile('public/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`)
console.log(`sitemap: ${urls.length} urls (${productSlugs.length} products)`)
