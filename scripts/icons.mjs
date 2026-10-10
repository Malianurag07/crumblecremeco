// Renders PNG icons from favicon.svg and a 1200x630 social share image.
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const svg = await readFile('public/favicon.svg')
for (const [name, size] of [['apple-touch-icon', 180], ['icon-192', 192], ['icon-512', 512]]) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(`public/${name}.png`)
}

// OG card: photo on the right, cherry panel + wordmark on the left
const W = 1200
const H = 630
const photo = await sharp('assets-src/cookie-bite.jpg').resize(620, H, { fit: 'cover', position: 'attention' }).toBuffer()
const panel = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#A51F2B"/>
  <path d="M0 0H640C600 120 690 240 630 330S600 520 650 630H0Z" fill="#A51F2B"/>
  <g font-family="Impact, 'Arial Black', sans-serif" fill="#FFF7E9">
    <text x="64" y="212" font-size="104">CRUMBLE</text>
    <text x="64" y="316" font-size="104" fill="#EBCBC2">CREME CO.</text>
  </g>
  <rect x="64" y="352" width="120" height="8" rx="4" fill="#E9C978"/>
  <g font-family="Arial, Helvetica, sans-serif" fill="#FFF7E9" font-size="34" font-weight="700">
    <text x="64" y="428">A little crumble.</text>
    <text x="64" y="474">A lot of love.</text>
  </g>
  <text x="64" y="568" font-family="Arial, sans-serif" font-size="22" letter-spacing="5" fill="#EBCBC2">COOKIES · CAKES · CUPCAKES · PIES</text>
</svg>`)
await sharp({ create: { width: W, height: H, channels: 3, background: '#A51F2B' } })
  .composite([
    { input: photo, left: W - 620, top: 0 },
    { input: panel, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84 })
  .toFile('public/og.jpg')
console.log('icons + og.jpg done')
