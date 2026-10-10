import type { ReactNode } from 'react'
import { Crumb } from './art'

interface Props {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  slow?: boolean
  reverse?: boolean
}

/** Seamless looping ticker. The duplicate half is hidden from assistive tech. */
export default function Marquee({ items, className = '', itemClassName = '', slow, reverse }: Props) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {it}
          <Crumb className="mx-5 h-3.5 w-3.5 shrink-0 opacity-80 md:mx-8" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${slow ? 'animate-marquee-slow' : 'animate-marquee'} hover:[animation-play-state:paused]`}
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  )
}

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-cream text-cherry" role="region" aria-label="Announcement">
      <Marquee
        className="py-2.5"
        itemClassName="font-label text-[13px] font-semibold uppercase tracking-[0.24em]"
        items={['Baked with love', 'Fresh from our oven', 'Good things come in crumbs']}
      />
    </div>
  )
}
