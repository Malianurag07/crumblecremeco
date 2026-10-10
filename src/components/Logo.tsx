import { Link } from 'react-router-dom'
import { CookieMark } from './art'

interface Props {
  tone?: 'cream' | 'cherry'
  className?: string
  to?: string
}

/** Crumble Creme Co. wordmark: bitten-cookie mark + stacked display type. */
export default function Logo({ tone = 'cream', className = '', to = '/' }: Props) {
  const main = tone === 'cream' ? 'text-cream' : 'text-cherry'
  const sub = tone === 'cream' ? 'text-blush' : 'text-cocoa'
  return (
    <Link to={to} aria-label="Crumble Creme Co. — home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <CookieMark
        className={`h-9 w-9 shrink-0 transition-transform duration-300 group-hover:-rotate-12 lg:h-10 lg:w-10 ${tone === 'cherry' ? '[&_path:first-child]:fill-cherry [&_g]:fill-cream [&_path:last-child]:fill-gold' : ''}`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] uppercase tracking-[0.01em] lg:text-[22px] ${main}`}>Crumble</span>
        <span className={`-mt-[2px] flex items-baseline gap-1.5 font-display text-[19px] uppercase tracking-[0.01em] lg:text-[22px] ${sub}`}>
          Creme
          <span className="font-label text-[11px] font-semibold tracking-[0.3em] lg:text-[12px]">CO.</span>
        </span>
      </span>
    </Link>
  )
}
