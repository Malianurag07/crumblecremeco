import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Crumbie from './Crumbie'
import { useBag } from './BagContext'
import { ArrowIcon, BagIcon, CloseIcon, MenuIcon, SearchIcon } from './Icons'
import { BlobPattern } from './art'

const NAV = [
  { to: '/shop', label: 'Shop', end: true },
  { to: '/shop/cookies', label: 'Cookies' },
  { to: '/shop/cakes', label: 'Cakes' },
  { to: '/shop/cupcakes', label: 'Cupcakes' },
  { to: '/shop/pies', label: 'Pies' },
  { to: '/shop/little-drops', label: 'Little Drops' },
]

export default function Header() {
  const { count, openBag, openSearch } = useBag()
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  return (
    <>
      <header className="on-cherry sticky top-0 z-40 bg-cherry text-cream" style={{ height: 'var(--header-h)' }}>
        <div className="container-shell flex h-full items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-[14px] font-medium tracking-wide transition hover:bg-cream/10 ${isActive ? 'text-gold' : 'text-cream'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={openSearch}
              aria-label="Search the menu"
              className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-cream/10"
            >
              <SearchIcon />
            </button>
            <button
              onClick={openBag}
              aria-label={`Open your bag, ${count} item${count === 1 ? '' : 's'}`}
              className="relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-cream/10"
            >
              <BagIcon />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-gold px-1 text-[11px] font-bold leading-none text-cocoa">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-cream/10 lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* mobile navigation drawer */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${menu ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menu}
      >
        <div
          className={`absolute inset-0 bg-cocoa/50 transition-opacity duration-300 ${menu ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenu(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`on-cherry absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col overflow-hidden bg-cherry text-cream transition-transform duration-300 ease-out ${menu ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <BlobPattern className="absolute inset-0 h-full w-full opacity-[0.07]" bg="transparent" />
          <div className="relative flex items-center justify-between px-5 py-4">
            <span className="eyebrow text-blush">Menu</span>
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full hover:bg-cream/10">
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center gap-1 px-6">
            {[...NAV, { to: '/about', label: 'Our Story' }].map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                tabIndex={menu ? 0 : -1}
                className="group flex items-baseline justify-between border-b border-cream/15 py-3 font-display text-[1.7rem] uppercase leading-none tracking-tight transition hover:text-gold"
                style={{ transitionDelay: menu ? `${i * 30}ms` : '0ms' }}
              >
                {n.label}
                <ArrowIcon className="h-5 w-5 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
          <div className="relative flex items-end justify-between px-6 pb-6">
            <p className="max-w-[12rem] text-sm text-cream/80">A little crumble. A lot of love.</p>
            <Crumbie className="-mb-1 h-24 w-24 -rotate-6" />
          </div>
        </div>
      </div>
    </>
  )
}
