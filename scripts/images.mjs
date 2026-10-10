// Builds responsive WebP variants + a size manifest from assets-src/*.jpg
import sharp from 'sharp'
import { readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'assets-src'
const OUT = 'public/images'
const WIDTHS = [480, 900, 1500]

await mkdir(OUT, { recursive: true })
const manifest = {}
for (const file of (await readdir(SRC)).filter((f) => f.endsWith('.jpg'))) {
  const name = path.basename(file, '.jpg')
  const img = sharp(path.join(SRC, file))
  const meta = await img.metadata()
  manifest[name] = { w: meta.width, h: meta.height, widths: [...new Set(WIDTHS.map((w) => Math.min(w, meta.width)))] }
  for (const w of manifest[name].widths) {
    await sharp(path.join(SRC, file)).resize({ width: w }).webp({ quality: 74 }).toFile(path.join(OUT, `${name}-${w}.webp`))
  }
}
await writeFile('src/data/imageManifest.json', JSON.stringify(manifest, null, 1))
console.log('images:', Object.keys(manifest).length)
