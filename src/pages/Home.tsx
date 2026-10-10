import { Link } from 'react-router-dom'
import Seo, { bakeryJsonLd, websiteJsonLd } from '../components/Seo'
import Photo from '../components/Photo'
import Crumbie from '../components/Crumbie'
import ProductCard, { Label } from '../components/ProductCard'
import { BlobPattern, Crumb, Squiggle, Stamp, SwirlLines } from '../components/art'
import { ArrowIcon, PlusIcon, WhatsAppIcon } from '../components/Icons'
import { useBag } from '../components/BagContext'
import { CATEGORIES, bySlug, fromPrice, inr } from '../data/products'
import { chatLink } from '../lib/whatsapp'

const FEATURED = [
  'midnight-chocolate-chip-cookie',
  'brown-butter-cookie',
  'chocolate-fudge-cake',
  'vanilla-celebration-cake',
  'strawberry-cream-cupcake',
  'classic-apple-crumble-pie',
].map((s) => bySlug(s)!)

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Crumble Creme Co. | Fresh-Baked Cookies, Cakes, Cupcakes & Pies"
        description="Small-batch cookies, dreamy cakes, cupcakes and golden pies baked fresh to order. Choose your bakes and order in minutes on WhatsApp. A little crumble, a lot of love."
        jsonLd={[bakeryJsonLd(), websiteJsonLd()]}
      />
      <Hero />
      <Categories />
      <Featured />
      <Story />
      <LittleDrops />
      <Dough />
      <HowToOrder />
    </>
  )
}

/* ───────────────────────────── HERO ───────────────────────────── */

function Hero() {
  const { add } = useBag()
  const quick = [
    { p: bySlug('midnight-chocolate-chip-cookie')!, tone: 'bg-cocoa text-cream' },
    { p: bySlug('strawberry-cream-cupcake')!, tone: 'bg-cherry text-cream' },
    { p: bySlug('brown-butter-cookie')!, tone: 'bg-blush text-cocoa' },
    { p: bySlug('classic-apple-crumble-pie')!, tone: 'bg-cherry-deep text-cream' },
  ]
  return (
    <section className="on-cherry relative bg-cherry pb-3 pt-1 md:pb-6 md:pt-3" aria-labelledby="hero-title">
      <div className="mx-auto w-full max-w-[1480px] px-2.5 md:px-6">
        <div className="relative">
          {/* the cream, slightly wobbly panel */}
          <div className="clip-panel grain absolute inset-0 overflow-hidden bg-cream" aria-hidden="true">
            <SwirlLines className="absolute -right-24 -top-10 h-[130%] w-[120%] max-w-none opacity-[0.08]" />
          </div>

          <div className="relative grid gap-4 px-5 pb-8 pt-9 sm:px-9 md:px-12 lg:grid-cols-12 lg:gap-6 lg:pb-12 lg:pt-14">
            {/* type */}
            <div className="relative z-20 lg:col-span-7 lg:pt-4">
              <p className="eyebrow mb-5 flex items-center gap-3 text-cherry">
                <Crumb className="h-4 w-4" />
                Small-batch bakery · Baked to order
              </p>
              <h1 id="hero-title" className="display text-cherry text-[14vw] leading-[0.9] sm:text-[min(10.6vw,5.4rem)] lg:text-[clamp(4.6rem,8.3vw,8.6rem)]">
                <span className="block">A little</span>
                <span className="block">Crumble.</span>
                <span className="block lg:pl-[0.55em]">A lot of</span>
                <span className="block lg:pl-[0.55em]">Love.</span>
              </h1>
              <p className="mt-6 max-w-[27rem] text-[17px] leading-relaxed text-cocoa/85 lg:mt-8 lg:text-[19px]">
                Freshly baked cookies, dreamy cakes and little moments of happiness.
              </p>
              <p className="mt-2 font-label text-[15px] font-semibold uppercase tracking-[0.2em] text-cherry">
                Break one open. Let the middle melt.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <Link to="/shop" className="btn btn-cherry">
                  Explore our bakes
                </Link>
                <Link to="/about" className="link-u text-cocoa">
                  A little about us
                </Link>
              </div>
            </div>

            {/* photograph */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto mt-6 w-full max-w-[520px] lg:mt-0 lg:max-w-none">
                <div className="clip-pebble-b absolute inset-0 translate-x-[5%] translate-y-[4%] bg-blush" aria-hidden="true" />
                <div className="drop-shadow-[0_24px_28px_rgba(56,37,33,0.22)]">
                  <div className="clip-pebble photo-wash relative aspect-[4/4.6] w-full overflow-hidden lg:aspect-[4/5]">
                    <Photo name="cookie-bite" alt="A chocolate chunk cookie with a bite taken out, on parchment" sizes="(min-width:1024px) 40vw, 90vw" priority pos="50% 62%" />
                  </div>
                </div>

                <Stamp text="Baked fresh • Made with love • " className="absolute -left-2 top-2 h-[92px] w-[92px] rounded-full bg-cream text-cherry shadow-sm sm:-left-5 sm:h-[116px] sm:w-[116px] lg:-left-10 lg:top-4 lg:h-[132px] lg:w-[132px]" />

                <div className="absolute -bottom-3 -left-1 h-[88px] w-[88px] overflow-hidden rounded-full border-[5px] border-cream sm:h-[110px] sm:w-[110px] lg:-left-8 lg:bottom-4 lg:h-[130px] lg:w-[130px]">
                  <Photo name="cookie-crumb" alt="A cookie crumbling into crumbs" sizes="140px" pos="55% 45%" />
                </div>

                <Crumbie className="absolute -bottom-5 right-0 z-10 h-[104px] w-[104px] rotate-[7deg] sm:h-[130px] sm:w-[130px] lg:right-10 lg:bottom-[-22px] lg:h-[170px] lg:w-[170px]" label="Crumbie the crumbling cookie" />
              </div>
            </div>

            {/* quick picks, echoing a flavour list */}
            <ul className="no-scrollbar relative z-20 -mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-2 sm:-mx-9 sm:px-9 md:-mx-12 md:px-12 lg:col-span-12 lg:mx-0 lg:mt-2 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0">
              {quick.map(({ p, tone }) => (
                <li key={p.slug} className={`flex min-w-[238px] flex-1 items-center justify-between gap-3 rounded-full py-2.5 pl-6 pr-2.5 lg:min-w-0 ${tone}`}>
                  <Link to={`/product/${p.slug}`} className="min-w-0 py-1">
                    <span className="block truncate text-[15px] font-semibold leading-tight">{p.name.replace(' Cookie', '').replace('Classic ', '')}</span>
                    <span className="mt-0.5 block font-label text-[13px] font-semibold uppercase tracking-[0.18em] opacity-75">from {inr(fromPrice(p))}</span>
                  </Link>
                  <button
                    onClick={() => add(p, p.variants[0].label)}
                    aria-label={`Add ${p.name} to bag`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[1.5px] border-current transition hover:bg-cream hover:text-cherry"
                  >
                    <PlusIcon width={18} height={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── CATEGORIES ─────────────────────────── */

function Categories() {
  return (
    <section className="container-shell pt-20 md:pt-32" aria-labelledby="craving-title">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3 text-cherry">Shop by craving</p>
          <h2 id="craving-title" className="display text-[clamp(2.3rem,7vw,5.6rem)] text-cherry">
            What are you
            <br className="hidden md:block" /> craving?
          </h2>
        </div>
        <p className="max-w-xs text-[16px] leading-relaxed text-cocoa/70 md:pb-3">
          Four ways to say yes. Pick a corner of the bakery and follow your nose.
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-3.5 gap-y-9 md:mt-16 md:gap-x-6 lg:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <li key={c.slug} className={i % 2 === 1 ? 'lg:mt-14' : ''}>
            <Link to={`/shop/${c.slug}`} className="group block" aria-label={`Shop ${c.title}`}>
              <div className="photo-wash relative aspect-[3/4.1] overflow-hidden rounded-t-[999px] rounded-b-[1.4rem] bg-blush/50 md:rounded-b-[2rem]">
                <Photo name={c.image} alt={`${c.title} from Crumble Creme Co.`} sizes="(min-width:1024px) 22vw, 46vw" className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]" pos={c.slug === 'cookies' ? '50% 40%' : c.slug === 'pies' ? '50% 60%' : '50% 50%'} />
                <span className="absolute bottom-3 right-3 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-cream text-cherry opacity-0 shadow transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                  <ArrowIcon width={20} height={20} />
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[1.45rem] uppercase leading-none text-cherry md:text-[1.9rem]">{c.title}</h3>
                <span className="font-label text-[13px] font-semibold tracking-[0.2em] text-cocoa/40">0{i + 1}</span>
              </div>
              <p className="mt-1.5 text-[14px] leading-snug text-cocoa/70 md:text-[15px]">{c.line}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ──────────────────────────── FEATURED ──────────────────────────── */

function Featured() {
  return (
    <section className="container-shell pt-24 md:pt-40" aria-labelledby="featured-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="featured-title" className="display text-[clamp(2.3rem,7vw,5.6rem)] text-cherry">
          The crowd
          <br /> crumb-pleasers
        </h2>
        <div className="flex items-center gap-5 md:pb-3">
          <Squiggle className="hidden h-3 w-28 text-gold md:block" />
          <Link to="/shop" className="link-u text-cherry">
            See everything
          </Link>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-3.5 gap-y-10 md:mt-14 md:gap-x-7 md:gap-y-14 lg:grid-cols-3">
        {FEATURED.map((p, i) => (
          <ProductCard key={p.slug} product={p} className={i % 3 === 1 ? 'lg:translate-y-10' : ''} />
        ))}
      </div>
    </section>
  )
}

/* ────────────────────────────── STORY ───────────────────────────── */

function Story() {
  return (
    <section className="container-shell pt-28 md:pt-44" aria-labelledby="story-title">
      <div className="on-cherry relative isolate overflow-hidden rounded-[2rem] bg-cherry px-5 py-14 text-cream md:rounded-[3.2rem] md:px-14 md:py-20 lg:px-20">
        <BlobPattern className="absolute inset-0 -z-10 h-full w-full opacity-[0.1]" bg="transparent" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-4 -z-10 select-none font-display text-[34vw] uppercase leading-none text-transparent opacity-[0.16] [-webkit-text-stroke:2px_#FFF7E9] lg:text-[22rem]">
          Love
        </span>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <div className="drop-shadow-[0_18px_24px_rgba(0,0,0,0.25)]">
              <div className="clip-pebble-c photo-wash relative aspect-[1/1.05] w-full overflow-hidden">
                <Photo name="cookie-break" alt="Hands breaking open a fudgy chocolate cookie" sizes="(min-width:1024px) 38vw, 90vw" pos="40% 50%" />
              </div>
            </div>
            <div className="absolute -bottom-6 right-2 rotate-[-6deg] rounded-full bg-gold px-5 py-3 font-label text-[14px] font-semibold uppercase tracking-[0.2em] text-cocoa shadow lg:-right-4">
              Gooey centre guaranteed
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow mb-4 text-blush">Our little philosophy</p>
            <h2 id="story-title" className="display text-[clamp(2.4rem,6.4vw,5.4rem)]">
              Not just baked.
              <br />
              <span className="text-gold">Made with love.</span>
            </h2>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-cream/85 md:text-[19px]">
              From golden cookie edges to soft cake layers and creamy frosting, every little crumble is made for the moments that deserve something special.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {['Small batches', 'Real butter & chocolate', 'Baked to order'].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-full border border-cream/35 px-4 py-2 text-[14px] font-medium">
                  <Crumb className="h-3 w-3 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex items-center gap-6">
              <Link to="/about" className="btn btn-cream">
                Read our story
              </Link>
              <Crumbie className="hidden h-24 w-24 -rotate-6 sm:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── LITTLE DROPS ──────────────────────── */

function LittleDrops() {
  const hero = bySlug('midnight-crumble-box')!
  const second = bySlug('rose-cream-cupcake-box')!
  return (
    <section id="little-drops" className="on-cocoa relative mt-28 overflow-hidden bg-cocoa py-20 text-cream md:mt-44 md:py-32" aria-labelledby="drops-title">
      <SwirlLines className="pointer-events-none absolute -left-40 top-0 h-[900px] w-[900px] max-w-none opacity-[0.1]" color="#E9C978" />
      <div className="container-shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block -rotate-3 rounded-full bg-gold px-4 py-1.5 font-label text-[14px] font-semibold uppercase tracking-[0.24em] text-cocoa">
              Little Drop
            </span>
            <h2 id="drops-title" className="display mt-5 text-[clamp(2.4rem,7.4vw,6.6rem)]">
              A little something
              <br />
              <span className="text-gold">unexpected.</span>
            </h2>
          </div>
          <div className="flex items-end gap-5 lg:max-w-sm">
            <p className="text-[16px] leading-relaxed text-cream/75">
              Seasonal boxes and experimental bakes in tiny runs. When a drop is gone, it&apos;s gone.
            </p>
            <Crumbie className="-mb-1 hidden h-24 w-24 shrink-0 rotate-6 sm:block" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* feature drop */}
          <article className="group relative overflow-hidden rounded-[2rem] bg-cherry md:rounded-[2.6rem] lg:col-span-7">
            <div className="photo-wash relative aspect-[4/4.5] sm:aspect-[16/12] lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <Photo name={hero.image} alt={`${hero.name} — gooey chocolate cookies`} sizes="(min-width:1024px) 55vw, 94vw" className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" pos="50% 40%" />
            </div>
            <div className="absolute inset-x-3 bottom-3 rounded-[1.6rem] bg-cocoa/90 p-5 backdrop-blur-sm sm:inset-x-5 sm:bottom-5 sm:p-7 md:left-6 md:right-auto md:max-w-[26rem]">
              <Label>Little Drop</Label>
              <h3 className="mt-3 font-display text-[1.7rem] uppercase leading-[0.98] sm:text-[2.1rem]">{hero.name}</h3>
              <p className="mt-2 text-[15px] text-cream/75">{hero.tagline}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <span className="font-display text-[1.4rem] text-gold">{inr(fromPrice(hero))}</span>
                <Link to={`/product/${hero.slug}`} className="btn btn-gold">
                  Discover the drop
                </Link>
              </div>
            </div>
          </article>

          {/* second drop */}
          <article className="flex flex-col gap-5 lg:col-span-5">
            <div className="group relative flex-1 overflow-hidden rounded-[2rem] bg-blush md:rounded-[2.6rem]">
              <div className="photo-wash relative aspect-[4/3.4] lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <Photo name={second.image} alt={`${second.name} — pink rose cream cupcakes`} sizes="(min-width:1024px) 38vw, 94vw" className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" pos="50% 35%" />
              </div>
              <Label className="absolute left-4 top-4">Little Drop</Label>
            </div>
            <div className="flex items-end justify-between gap-4 rounded-[2rem] border border-cream/20 p-6">
              <div>
                <h3 className="font-display text-[1.5rem] uppercase leading-none">{second.name}</h3>
                <p className="mt-2 text-[15px] text-cream/70">{second.tagline}</p>
                <p className="mt-3 font-display text-[1.2rem] text-gold">{inr(fromPrice(second))}</p>
              </div>
              <Link to={`/product/${second.slug}`} aria-label={`Discover ${second.name}`} className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gold text-cocoa transition hover:bg-cream">
                <ArrowIcon />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── DOUGH ────────────────────────────── */

function Dough() {
  const steps = [
    ['01', 'Brown the butter until it smells like toffee.'],
    ['02', 'Chop the chocolate by hand. Big, uneven shards.'],
    ['03', 'Rest the dough. Good things take a little time.'],
  ]
  return (
    <section className="container-shell pt-28 md:pt-44" aria-labelledby="dough-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative lg:col-span-7">
          <div className="photo-wash relative aspect-[4/3.3] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
            <Photo name="dough-salt" alt="A salted ball of chocolate chip cookie dough ready for the oven" sizes="(min-width:1024px) 58vw, 94vw" pos="48% 50%" />
          </div>
          <div className="absolute -bottom-8 right-4 hidden h-40 w-40 overflow-hidden rounded-full border-[6px] border-cream sm:block md:-right-6 md:h-52 md:w-52">
            <Photo name="flour-yolk" alt="Egg yolks cracked into a well of flour" sizes="220px" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4 text-cherry">From the baking journal</p>
          <h2 id="dough-title" className="display text-[clamp(2.3rem,5.6vw,4.8rem)] text-cherry">
            Good things take a little dough.
          </h2>
          <ol className="mt-8 divide-y divide-cocoa/15 border-y border-cocoa/15">
            {steps.map(([n, t]) => (
              <li key={n} className="flex gap-5 py-4">
                <span className="font-display text-[1.3rem] leading-none text-gold [-webkit-text-stroke:1.5px_#A51F2B]">{n}</span>
                <span className="text-[16px] leading-snug text-cocoa/85">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── HOW TO ORDER ───────────────────────── */

function HowToOrder() {
  const steps = [
    ['1', 'Pick your bakes', 'Fill your bag with cookies, cakes, cupcakes and pies.'],
    ['2', 'Tell us where', 'Add your name, number and address. It takes under a minute.'],
    ['3', 'Confirm on WhatsApp', 'Your order lands in our chat, ready to go. We confirm and take it from there.'],
  ]
  return (
    <section className="container-shell pt-28 md:pt-44" aria-labelledby="order-title">
      <div className="relative overflow-hidden rounded-[2rem] bg-blush/55 px-5 py-12 md:rounded-[3rem] md:px-14 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="order-title" className="display text-[clamp(2.1rem,5vw,4.2rem)] text-cherry">
            Ordering, the easy way
          </h2>
          <a href={chatLink()} target="_blank" rel="noopener noreferrer" className="btn btn-cherry self-start md:self-auto">
            <WhatsAppIcon width={20} height={20} /> Chat with us
          </a>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map(([n, h, t]) => (
            <li key={n} className="rounded-[1.6rem] bg-cream p-6 md:p-8">
              <span className="font-display text-[3.4rem] leading-none text-transparent [-webkit-text-stroke:2px_#A51F2B]">{n}</span>
              <h3 className="mt-4 text-[18px] font-bold">{h}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-cocoa/70">{t}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
