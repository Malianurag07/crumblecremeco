import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo, { abs, breadcrumbJsonLd } from '../components/Seo'
import ProductCard from '../components/ProductCard'
import Crumbie from '../components/Crumbie'
import Marquee from '../components/Marquee'
import { SwirlLines } from '../components/art'
import { ChevronIcon } from '../components/Icons'
import { NotFound } from '../components/Layout'
import { ALL_CATEGORIES, PRODUCTS, categoryBySlug, fromPrice } from '../data/products'
import { imgPath } from '../components/Photo'
import { SITE } from '../config/site'

type Sort = 'featured' | 'low' | 'high' | 'az'
type Price = 'all' | 'u200' | 'mid' | 'o1000'

const PRICE_FILTERS: { id: Price; label: string; test: (n: number) => boolean }[] = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'u200', label: 'Under ₹200', test: (n) => n < 200 },
  { id: 'mid', label: '₹200 – ₹1,000', test: (n) => n >= 200 && n <= 1000 },
  { id: 'o1000', label: '₹1,000 +', test: (n) => n > 1000 },
]

export default function Shop() {
  const { category } = useParams()
  const cat = category ? categoryBySlug(category) : undefined
  const [sort, setSort] = useState<Sort>('featured')
  const [price, setPrice] = useState<Price>('all')
  const [best, setBest] = useState(false)

  const items = useMemo(() => {
    const test = PRICE_FILTERS.find((f) => f.id === price)!.test
    let list = PRODUCTS.filter((p) => (cat ? p.category === cat.slug : true))
    list = list.filter((p) => test(fromPrice(p)) && (!best || p.label === 'Bestseller' || p.label === 'Fan favourite'))
    if (sort === 'low') list = [...list].sort((a, b) => fromPrice(a) - fromPrice(b))
    if (sort === 'high') list = [...list].sort((a, b) => fromPrice(b) - fromPrice(a))
    if (sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [cat, sort, price, best])

  if (category && !cat) return <NotFound />

  const path = cat ? `/shop/${cat.slug}` : '/shop'
  const title = cat ? cat.seoTitle : 'Shop All Cookies, Cakes, Cupcakes & Pies'
  const desc = cat
    ? cat.seoDescription
    : 'Browse every Crumble Creme Co. bake: chewy cookies, silky cakes, cream-topped cupcakes and golden pies. Sample prices in INR. Order on WhatsApp.'

  const scope = PRODUCTS.filter((p) => (cat ? p.category === cat.slug : true))

  return (
    <>
      <Seo
        path={path}
        title={title}
        description={desc}
        image={cat?.image ?? 'cookie-rack'}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            ...(cat ? [{ name: cat.title, path }] : []),
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: title,
            description: desc,
            url: abs(path),
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: scope.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: abs(`/product/${p.slug}`),
                name: p.name,
                image: `${SITE.url}${imgPath(p.image, 900)}`,
              })),
            },
          },
        ]}
      />

      {/* masthead */}
      <section className="relative overflow-hidden bg-blush/50">
        <SwirlLines className="pointer-events-none absolute -right-32 -top-24 h-[620px] w-[620px] max-w-none opacity-[0.1]" />
        <div className="container-shell relative pb-12 pt-12 md:pb-16 md:pt-20">
          <nav aria-label="Breadcrumb" className="mb-6 font-label text-[13px] font-semibold uppercase tracking-[0.2em] text-cocoa/55">
            <Link to="/" className="hover:text-cherry">Home</Link> <span aria-hidden="true">/</span>{' '}
            <Link to="/shop" className="hover:text-cherry">Shop</Link>
            {cat && (
              <>
                {' '}<span aria-hidden="true">/</span> <span className="text-cherry">{cat.title}</span>
              </>
            )}
          </nav>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="display text-[clamp(2.8rem,10vw,8.4rem)] text-cherry">{cat ? cat.title : 'The good stuff'}</h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-cocoa/80 md:text-[19px]">
                {cat
                  ? cat.line
                  : 'Everything we bake, all in one place. Chewy, gooey, golden, silky. Start anywhere. We won’t judge where you end up.'}
              </p>
            </div>
            <Crumbie className="hidden h-36 w-36 shrink-0 -rotate-6 md:block lg:h-44 lg:w-44" />
          </div>
        </div>
        <Marquee
          className="border-y border-cherry/25 bg-cream py-2.5 text-cherry"
          itemClassName="font-label text-[13px] font-semibold uppercase tracking-[0.26em]"
          slow
          items={['Cookies', 'Cakes', 'Cupcakes', 'Pies', 'Little Drops']}
        />
      </section>

      <section className="container-shell pt-8 md:pt-12" aria-label="Products">
        {/* category tabs */}
        <nav aria-label="Categories" className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
          {[{ slug: '', title: 'All' }, ...ALL_CATEGORIES].map((c) => {
            const active = (cat?.slug ?? '') === c.slug
            return (
              <Link
                key={c.slug || 'all'}
                to={c.slug ? `/shop/${c.slug}` : '/shop'}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 rounded-full border-[1.5px] px-5 py-2.5 text-[14px] font-semibold transition ${active ? 'border-cherry bg-cherry text-cream' : 'border-cocoa/25 hover:border-cherry hover:text-cherry'}`}
              >
                {c.title}
              </Link>
            )
          })}
        </nav>

        {/* filters + sort */}
        <div className="mt-6 flex flex-col gap-4 border-y border-cocoa/10 py-4 md:flex-row md:items-center md:justify-between">
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {PRICE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setPrice(f.id)}
                aria-pressed={price === f.id}
                className={`shrink-0 rounded-full px-4 py-2 text-[13.5px] font-medium transition ${price === f.id ? 'bg-cocoa text-cream' : 'bg-white text-cocoa hover:bg-blush/60'}`}
              >
                {f.label}
              </button>
            ))}
            <button
              onClick={() => setBest((b) => !b)}
              aria-pressed={best}
              className={`shrink-0 rounded-full px-4 py-2 text-[13.5px] font-medium transition ${best ? 'bg-gold text-cocoa' : 'bg-white text-cocoa hover:bg-gold/40'}`}
            >
              Favourites only
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <p className="font-label text-[13px] font-semibold uppercase tracking-[0.2em] text-cocoa/55" aria-live="polite">
              {items.length} {items.length === 1 ? 'treat' : 'treats'}
            </p>
            <label className="relative">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="cursor-pointer appearance-none rounded-full border-[1.5px] border-cocoa/25 bg-transparent py-2.5 pl-4 pr-10 text-[14px] font-semibold focus:border-cherry focus:outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="az">Name: A to Z</option>
              </select>
              <ChevronIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width={18} height={18} />
            </label>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl uppercase text-cherry">No crumbs match that</p>
            <button
              onClick={() => {
                setPrice('all')
                setBest(false)
              }}
              className="btn btn-cherry mt-6"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-10 pt-10 md:grid-cols-3 md:gap-x-7 md:gap-y-14 xl:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 4} sizes="(min-width:1280px) 24vw, (min-width:768px) 32vw, 48vw" />
            ))}
          </div>
        )}
        <p className="mt-16 text-center text-[13px] text-cocoa/50">Prices shown are samples, in Indian rupees.</p>
      </section>
    </>
  )
}
