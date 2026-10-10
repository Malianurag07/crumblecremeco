import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo, { abs, breadcrumbJsonLd } from '../components/Seo'
import Photo, { imgPath } from '../components/Photo'
import ProductCard, { Label } from '../components/ProductCard'
import Crumbie from '../components/Crumbie'
import { useBag } from '../components/BagContext'
import { NotFound } from '../components/Layout'
import { CheckIcon, ChevronIcon, MinusIcon, PlusIcon, WhatsAppIcon } from '../components/Icons'
import { PRODUCTS, bySlug, categoryBySlug, inr } from '../data/products'
import { chatLink } from '../lib/whatsapp'
import { SITE } from '../config/site'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = bySlug(slug)
  const { add, openBag } = useBag()
  const [variant, setVariant] = useState(0)
  const [qty, setQty] = useState(1)
  const [shot, setShot] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) return <NotFound />
  const cat = categoryBySlug(product.category)!
  const v = product.variants[Math.min(variant, product.variants.length - 1)]
  const path = `/product/${product.slug}`
  const prices = product.variants.map((x) => x.price)
  const related = [
    ...PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...PRODUCTS.filter((p) => p.category !== product.category && p.slug !== product.slug),
  ].slice(0, 4)

  const onAdd = () => {
    add(product, v.label, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const offer =
    prices.length > 1
      ? { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: prices.length, availability: 'https://schema.org/InStock', url: abs(path) }
      : { '@type': 'Offer', priceCurrency: 'INR', price: prices[0], availability: 'https://schema.org/InStock', url: abs(path), itemCondition: 'https://schema.org/NewCondition' }

  return (
    <>
      <Seo
        path={path}
        type="product"
        image={product.image}
        title={`${product.name} — ${cat.title}`}
        description={`${product.tagline} ${product.description}`.slice(0, 158)}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: cat.title, path: `/shop/${cat.slug}` },
            { name: product.name, path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.gallery.map((g) => `${SITE.url}${imgPath(g, 900)}`),
            sku: product.slug,
            category: cat.title,
            brand: { '@type': 'Brand', name: SITE.name },
            offers: offer,
          },
        ]}
      />

      <div className="container-shell pt-6 md:pt-10">
        <nav aria-label="Breadcrumb" className="mb-6 font-label text-[13px] font-semibold uppercase tracking-[0.2em] text-cocoa/55">
          <Link to="/shop" className="hover:text-cherry">Shop</Link> <span aria-hidden="true">/</span>{' '}
          <Link to={`/shop/${cat.slug}`} className="hover:text-cherry">{cat.title}</Link> <span aria-hidden="true">/</span>{' '}
          <span className="text-cherry">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* gallery */}
          <div className="lg:col-span-7">
            <div className="photo-wash relative aspect-[4/4.4] overflow-hidden rounded-[2rem] bg-blush/50 md:rounded-[2.8rem]">
              <Photo key={shot} name={product.gallery[shot]} alt={`${product.name}, view ${shot + 1}`} sizes="(min-width:1024px) 56vw, 94vw" priority className="animate-rise" />
              {product.label && <Label className="absolute left-4 top-4 md:left-6 md:top-6">{product.label}</Label>}
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-3 md:gap-4">
              {product.gallery.map((g, i) => (
                <li key={g}>
                  <button
                    onClick={() => setShot(i)}
                    aria-label={`Show view ${i + 1}`}
                    aria-pressed={shot === i}
                    className={`photo-wash relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 transition ${shot === i ? 'border-cherry' : 'border-transparent opacity-80 hover:opacity-100'}`}
                  >
                    <Photo name={g} alt="" sizes="20vw" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* details */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <p className="eyebrow text-cherry">{cat.title}</p>
              <h1 className="display mt-3 text-[clamp(1.75rem,4.4vw,3.7rem)] text-cherry">{product.name}</h1>
              <p className="mt-3 text-[18px] font-medium text-cocoa/80">{product.tagline}</p>
              <p className="mt-5 font-display text-[2rem] leading-none text-cocoa">
                {inr(v.price * qty)}
                {qty > 1 && <span className="ml-2 font-sans text-[14px] font-medium text-cocoa/55">{inr(v.price)} each</span>}
              </p>
              <p className="mt-6 text-[16px] leading-relaxed text-cocoa/80">{product.description}</p>

              <fieldset className="mt-7">
                <legend className="field-label">Choose a size</legend>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((x, i) => (
                    <label key={x.label} className="cursor-pointer">
                      <input type="radio" name="variant" className="peer sr-only" checked={variant === i} onChange={() => setVariant(i)} />
                      <span className="block rounded-full border-[1.5px] border-cocoa/25 bg-white px-5 py-3 text-[14px] font-semibold transition peer-checked:border-cherry peer-checked:bg-cherry peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-cherry peer-focus-visible:ring-offset-2 hover:border-cherry">
                        {x.label} <span className="opacity-70">· {inr(x.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 flex items-stretch gap-3">
                <div className="flex items-center rounded-full border-[1.5px] border-cocoa/25 bg-white">
                  <button className="grid h-12 w-12 place-items-center rounded-full hover:bg-cocoa/5" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <MinusIcon width={18} height={18} />
                  </button>
                  <span className="w-8 text-center text-[16px] font-bold tabular-nums" aria-live="polite">{qty}</span>
                  <button className="grid h-12 w-12 place-items-center rounded-full hover:bg-cocoa/5" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))}>
                    <PlusIcon width={18} height={18} />
                  </button>
                </div>
                <button onClick={onAdd} className="btn btn-cherry flex-1">
                  {added ? (
                    <>
                      <CheckIcon width={18} height={18} /> Added
                    </>
                  ) : (
                    'Add to bag'
                  )}
                </button>
              </div>
              <button onClick={openBag} className="link-u mt-5 text-cocoa/70">
                View my bag
              </button>

              <p className="mt-6 flex items-center gap-2 text-[14px] text-cocoa/65">
                <span className="inline-block h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                {product.leadTime}
              </p>

              <div className="mt-8 divide-y divide-cocoa/15 border-y border-cocoa/15">
                <Detail title="What's inside" defaultOpen>
                  {product.ingredients}
                </Detail>
                <Detail title="Allergens">{product.allergens}</Detail>
                <Detail title="Delivery & care">
                  We confirm delivery area, timing and charges with you on WhatsApp once we have your address. Best enjoyed fresh; store in an airtight container and warm gently before serving. (Sample copy.)
                </Detail>
              </div>

              <a href={chatLink(`Hi! I have a question about the ${product.name}.`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-cherry hover:underline">
                <WhatsAppIcon width={18} height={18} /> Ask us anything on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* related */}
        <section className="pt-24 md:pt-36" aria-labelledby="related-title">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-title" className="display text-[clamp(2rem,5vw,4rem)] text-cherry">
              You might also crumble for
            </h2>
            <Crumbie className="hidden h-24 w-24 shrink-0 rotate-6 md:block" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-3.5 gap-y-10 md:gap-x-7 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} sizes="(min-width:1024px) 24vw, 48vw" />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

function Detail({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group py-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-bold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronIcon className="transition-transform group-open:rotate-180" width={20} height={20} />
      </summary>
      <p className="mt-3 text-[15px] leading-relaxed text-cocoa/75">{children}</p>
    </details>
  )
}
