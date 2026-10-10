import type { CSSProperties } from 'react'
import manifest from '../data/imageManifest.json'

type Manifest = Record<string, { w: number; h: number; widths: number[] }>
const M = manifest as Manifest

interface PhotoProps {
  name: string
  alt: string
  sizes?: string
  className?: string
  /** above-the-fold image: eager + high priority */
  priority?: boolean
  /** CSS object-position, e.g. "50% 30%" */
  pos?: string
}

/** site-relative path (for absolute SEO URLs, which are prefixed with SITE.url) */
export const imgPath = (name: string, w = 900) => `/images/${name}-${w}.webp`
/** URL the browser should load, honouring the deploy base path */
export const photoUrl = (name: string, w = 900) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${imgPath(name, w)}`

/** Responsive, lazily loaded photograph with intrinsic dimensions (no layout shift). */
export default function Photo({ name, alt, sizes = '100vw', className = '', priority, pos }: PhotoProps) {
  const m = M[name]
  if (!m) return null
  const mid = m.widths.includes(900) ? 900 : m.widths[m.widths.length - 1]
  const style: CSSProperties | undefined = pos ? { objectPosition: pos } : undefined
  return (
    <img
      src={photoUrl(name, mid)}
      srcSet={m.widths.map((w) => `${photoUrl(name, w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      draggable={false}
      className={`h-full w-full object-cover ${className}`}
      style={style}
    />
  )
}
