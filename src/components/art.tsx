import type { CSSProperties } from 'react'

/** Hidden SVG defs: organic clip-paths shared by hero panel and photo frames. */
export function ClipDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="clip-panel" clipPathUnits="objectBoundingBox">
          <path d="M0.07,0.02C0.2,-0.005 0.3,0.03 0.5,0.018 0.7,0.006 0.82,-0.004 0.93,0.02 1.0,0.04 0.99,0.2 0.992,0.32 0.996,0.5 0.975,0.62 0.99,0.78 1.0,0.9 0.985,0.98 0.9,0.985 0.76,0.995 0.62,0.972 0.46,0.988 0.3,1.0 0.16,0.99 0.08,0.975 0.0,0.955 0.012,0.82 0.006,0.66 0,0.5 0.018,0.36 0.008,0.2 0.004,0.1 0.02,0.04 0.07,0.02Z" />
        </clipPath>
        <clipPath id="clip-pebble" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0.015C0.74,-0.01 0.96,0.12 0.985,0.38 1.02,0.64 0.93,0.92 0.68,0.98 0.44,1.03 0.14,0.95 0.04,0.7 -0.05,0.44 0.1,0.04 0.5,0.015Z" />
        </clipPath>
        <clipPath id="clip-pebble-b" clipPathUnits="objectBoundingBox">
          <path d="M0.12,0.04C0.35,-0.02 0.66,0.07 0.88,0.025 1.0,0.01 1.0,0.2 0.985,0.4 0.965,0.62 1.02,0.8 0.95,0.93 0.86,1.0 0.6,0.965 0.4,0.995 0.2,1.02 0.05,0.985 0.03,0.85 0,0.66 0.04,0.46 0.02,0.28 0.01,0.14 0.04,0.07 0.12,0.04Z" />
        </clipPath>
        <clipPath id="clip-pebble-c" clipPathUnits="objectBoundingBox">
          <path d="M0.08,0.2C0.15,0.02 0.5,-0.02 0.72,0.04 0.95,0.1 1.02,0.34 0.98,0.58 0.94,0.84 0.76,1.02 0.5,0.99 0.22,0.96 0.02,0.8 0.01,0.54 0,0.4 0.03,0.3 0.08,0.2Z" />
        </clipPath>
      </defs>
    </svg>
  )
}

/** Stylised crumb: three tiny blobs. Used as a bullet and as a decorative scatter. */
export function Crumb({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="currentColor">
      <path d="M12 2.5c3.6-.6 7 1.4 7.6 4.6.4 2-.6 3.6-2.2 4.6-1.2.7-1.4 1.8-.4 2.9 1.5 1.7.8 4.4-1.6 5.4-3 1.2-7.2-.3-8.6-3.3C5.5 14 6.6 12.2 6 10.3 5 7.2 7.4 3.2 12 2.5Z" />
    </svg>
  )
}

/**
 * Liquid S-curves in cream on cherry — the brand pattern, after the marbled
 * bakery-paper prints that inspired the identity.
 */
export function BlobPattern({ className, bg = '#A51F2B', fg = '#FFF7E9' }: { className?: string; bg?: string; fg?: string }) {
  return (
    <svg
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="600" height="900" fill={bg} />
      <g fill="none" stroke={fg} strokeLinecap="round" strokeLinejoin="round">
        <path strokeWidth="92" d="M-30 70C70 30 100 140 70 230S120 400 250 350 330 140 300 60" />
        <path strokeWidth="84" d="M420 -20C380 80 470 130 520 190S600 330 500 370 360 330 420 430 560 520 640 480" />
        <path strokeWidth="96" d="M-40 470C60 400 150 520 230 580S400 600 420 690 300 830 190 800 40 720 -50 780" />
        <path strokeWidth="78" d="M470 620C440 700 500 760 560 790S640 880 560 940" />
        <path strokeWidth="70" d="M300 -40C320 20 360 20 380 -30" />
      </g>
      <g fill={fg}>
        <ellipse cx="268" cy="272" rx="22" ry="28" transform="rotate(-18 268 272)" />
        <ellipse cx="108" cy="590" rx="54" ry="42" />
        <ellipse cx="528" cy="468" rx="30" ry="34" />
      </g>
      <circle cx="330" cy="786" r="56" fill={bg} />
    </svg>
  )
}

/** Fine marbled swirl lines (cherry on transparent). Used softly on cream. */
export function SwirlLines({ className, color = '#A51F2B' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 800 800" className={className} aria-hidden="true" focusable="false" fill="none" stroke={color} strokeLinecap="round">
      <path strokeWidth="22" d="M-20 260C120 120 320 60 470 120S700 260 840 180" />
      <path strokeWidth="6" d="M-20 300C140 170 320 110 470 164S700 300 840 226" />
      <path strokeWidth="3" d="M-20 322C150 200 330 140 470 190S700 320 840 250" />
      <path strokeWidth="16" d="M-20 520C160 380 420 340 560 420S760 640 840 600" />
      <path strokeWidth="4" d="M-20 556C170 420 420 376 560 456S760 674 840 636" />
      <path strokeWidth="26" d="M120 840C60 700 160 600 280 580S470 640 420 760" />
      <path strokeWidth="5" d="M160 840C100 710 190 626 290 610S440 664 396 780" />
    </svg>
  )
}

/** Hand-drawn wavy underline. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 14" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M3 8c10-8 18-8 28 0s18 8 28 0 18-8 28 0 18 8 28 0 18-8 28 0 18 8 28 0 18-8 22-2" />
    </svg>
  )
}

/** Small cookie icon with a bite — the Crumble Creme mark. */
export function CookieMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 3.5c4 0 6.5 2.5 9 2.8 3.2.4 5 3.2 4.6 6.4-.3 2.4 1.4 3.9 3.4 4.4 2.4 3.2 3.5 6.6 3.5 8.9 0 11-8.3 17.5-20.5 17.5S3.5 37 3.5 26 12 3.5 24 3.5Z"
        fill="#FFF7E9"
      />
      <g fill="#A51F2B">
        <path d="M14 16l5-2 2 5-5 2z" />
        <path d="M27 24l5-1 1 5-5 1z" />
        <path d="M13 31l5-1 1 5-5 1z" />
        <circle cx="26" cy="12" r="1.6" />
        <circle cx="38" cy="30" r="1.6" />
        <circle cx="22" cy="38" r="1.6" />
      </g>
      <path d="M39 8c3 4 3 7 0 8-3-1-3-5 0-8Z" fill="#E9C978" />
    </svg>
  )
}

/** Circular text stamp; rotates very slowly. */
export function Stamp({ text, className, spin = true }: { text: string; className?: string; spin?: boolean }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 200" className={`h-full w-full ${spin ? 'animate-spin360' : ''}`} aria-hidden="true">
        <defs>
          <path id="stamp-circle" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
        </defs>
        <text className="fill-current font-label text-[17px] font-semibold uppercase" letterSpacing="4.2">
          <textPath href="#stamp-circle" textLength="468" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <Crumb className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}
