import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBag } from './BagContext'
import Photo from './Photo'
import { CloseIcon, SearchIcon } from './Icons'
import { ALL_CATEGORIES, PRODUCTS, fromPrice, inr } from '../data/products'

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useBag()
  const [q, setQ] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchOpen) {
      setQ('')
      setTimeout(() => input.current?.focus(), 60)
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeSearch()
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, closeSearch])

  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    return PRODUCTS.filter((p) => `${p.name} ${p.tagline} ${p.category} ${p.description}`.toLowerCase().includes(t)).slice(0, 6)
  }, [q])

  return (
    <div className={`fixed inset-0 z-[90] ${searchOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!searchOpen}>
      <div className={`absolute inset-0 bg-cocoa/55 transition-opacity duration-200 ${searchOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeSearch} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className={`absolute inset-x-0 top-0 max-h-[92vh] overflow-y-auto bg-cream px-5 pb-8 pt-5 transition-transform duration-300 ease-out md:px-8 ${searchOpen ? 'translate-y-0 shadow-2xl' : '-translate-y-full'}`}
      >
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (results[0]) {
                navigate(`/product/${results[0].slug}`)
                closeSearch()
              }
            }}
            className="flex items-center gap-3 border-b-2 border-cocoa pb-3"
            role="search"
          >
            <SearchIcon className="shrink-0 text-cherry" width={26} height={26} />
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cookies, cakes, pies…"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent font-display text-[1.5rem] uppercase tracking-tight placeholder:text-cocoa/30 focus:outline-none md:text-[2rem]"
            />
            <button type="button" onClick={closeSearch} aria-label="Close search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-cocoa/5">
              <CloseIcon />
            </button>
          </form>

          {q.trim() === '' ? (
            <div className="pt-6">
              <p className="eyebrow mb-3 text-cocoa/55">Or just wander</p>
              <div className="flex flex-wrap gap-2.5">
                {ALL_CATEGORIES.map((c) => (
                  <Link key={c.slug} to={`/shop/${c.slug}`} onClick={closeSearch} className="rounded-full border-[1.5px] border-cocoa/25 px-5 py-2.5 text-[14px] font-semibold transition hover:border-cherry hover:bg-cherry hover:text-cream">
                    {c.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="pt-8 text-[15px] text-cocoa/70">Nothing matches &ldquo;{q}&rdquo; yet. Try &ldquo;chocolate&rdquo; or &ldquo;pie&rdquo;.</p>
          ) : (
            <ul className="divide-y divide-cocoa/10 pt-2">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link to={`/product/${p.slug}`} onClick={closeSearch} className="flex items-center gap-4 py-3 transition hover:pl-1">
                    <span className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-blush/40">
                      <Photo name={p.image} alt="" sizes="60px" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[16px] font-semibold">{p.name}</span>
                      <span className="block truncate text-[13px] text-cocoa/60">{p.tagline}</span>
                    </span>
                    <span className="text-[14px] font-semibold text-cherry">{inr(fromPrice(p))}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
