// Hosts look for dist/404.html; the prerendered NotFound page lives at dist/404/index.html
import { copyFile } from 'node:fs/promises'
await copyFile('dist/404/index.html', 'dist/404.html')
console.log('404.html ready')
