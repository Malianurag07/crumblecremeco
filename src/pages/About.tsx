import { Link } from 'react-router-dom'
import Seo, { abs, breadcrumbJsonLd } from '../components/Seo'
import Photo from '../components/Photo'
import Crumbie from '../components/Crumbie'
import Marquee from '../components/Marquee'
import { BlobPattern, Crumb, Squiggle, SwirlLines } from '../components/art'
import { ChevronIcon, WhatsAppIcon } from '../components/Icons'
import { SITE } from '../config/site'
import { chatLink } from '../lib/whatsapp'

const FAQ = [
  ['How do I order?', 'Add your favourites to the bag, enter your name, number and address, and press Send order. WhatsApp opens with your order already written out for us. Tap send and we will take it from there.'],
  ['How do I pay?', 'There is no online checkout. Once we have confirmed your order on WhatsApp, we will share payment details with you personally.'],
  ['Do you deliver?', 'Delivery areas, timing and charges are confirmed with you on WhatsApp once we have your address.'],
  ['How far ahead should I order?', 'Cookies and cupcakes are baked fresh, usually within a day. Cakes and pies are best ordered two days ahead. We will confirm timing for your date.'],
  ['Can I add a message or a special request?', 'Yes. Use the notes box when you order, and we will tell you what is possible.'],
  ['What about allergies?', 'Our bakes contain gluten, dairy and eggs, and may contain nuts. Please mention any allergies in your notes so we can advise you honestly.'],
] as const

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="Our Story — The Little Bakery Behind the Crumbs"
        description="Crumble Creme Co. is a modern bakery for cookies, cakes, cupcakes and pies. Crumble plus creme, made together, with a lot of love. Meet Crumbie and read our story."
        image="cookie-crumb"
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Our story', path: '/about' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
          },
          { '@context': 'https://schema.org', '@type': 'AboutPage', url: abs('/about'), name: `About ${SITE.name}` },
        ]}
      />

      {/* intro */}
      <section className="relative overflow-hidden">
        <SwirlLines className="pointer-events-none absolute -left-40 -top-10 h-[700px] w-[700px] max-w-none opacity-[0.07]" />
        <div className="container-shell relative grid items-center gap-10 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 flex items-center gap-3 text-cherry">
              <Crumb className="h-4 w-4" /> Our little story
            </p>
            <h1 className="display text-[clamp(2.7rem,9.6vw,8rem)] text-cherry">
              Hello.
              <br />
              We&apos;re the
              <br />
              crumbs.
            </h1>
            <p className="mt-7 max-w-lg text-[18px] leading-relaxed text-cocoa/80">
              A small bakery with a simple belief: the best part of anything sweet is the bit that falls apart.
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <div className="drop-shadow-[0_22px_26px_rgba(56,37,33,0.2)]">
              <div className="clip-pebble photo-wash relative aspect-[4/4.4] w-full overflow-hidden">
                <Photo name="cookie-crumb" alt="A cookie with a bite missing and crumbs scattered around it" sizes="(min-width:1024px) 40vw, 92vw" priority pos="55% 50%" />
              </div>
            </div>
            <Crumbie className="absolute -bottom-6 -left-2 h-28 w-28 -rotate-6 sm:h-36 sm:w-36 lg:-left-10" label="Crumbie, the crumbling cookie mascot" />
          </div>
        </div>
      </section>

      {/* the name */}
      <section className="on-cherry relative overflow-hidden bg-cherry py-20 text-cream md:py-28" aria-labelledby="name-title">
        <BlobPattern className="absolute inset-0 h-full w-full opacity-[0.08]" bg="transparent" />
        <div className="container-shell relative">
          <p className="eyebrow mb-4 text-blush">What&apos;s in a name</p>
          <h2 id="name-title" className="display text-[clamp(2.2rem,6vw,5rem)]">
            Crumble. Creme. <span className="text-gold">Co.</span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-6">
            <NameCard word="Crumble" body="Golden cookie edges, buttery crumbs, the happy mess of breaking into something warm." />
            <Op>+</Op>
            <NameCard word="Creme" body="Silky frosting, soft fillings and the kind of cream that arrives whether you planned for it or not." />
            <Op>=</Op>
            <NameCard word="Co." body="The two working together. Crisp and creamy, a little messy, always made with company in mind." gold />
          </div>
        </div>
      </section>

      {/* story blocks */}
      <section className="container-shell space-y-24 py-24 md:space-y-40 md:py-40">
        <Block
          num="01"
          title="It starts with a crumb."
          body="One cookie, broken in half, the edges still crisp and the middle still soft. We built a whole bakery around that moment."
          image="cookie-rack"
          alt="Chocolate chip cookies cooling on a wire rack"
          shape="clip-pebble-b"
        />
        <Block
          num="02"
          title="Then comes the cream."
          body="Because sweet things deserve a soft landing. Frosting swirled by hand, fillings that give a little, layers that hold, then melt."
          image="cake-drip"
          alt="A cake with a chocolate drip over cream frosting"
          shape="clip-pebble-c"
          flip
        />
        <Block
          num="03"
          title="Always made to share."
          body="Birthdays, Tuesdays, apologies and thank-yous. Every box is packed like a small gift, because that is exactly what it is."
          image="ingredients"
          alt="Flour, eggs and butter on a striped cloth"
          shape="clip-pebble"
        />
      </section>

      {/* closer strip */}
      <Marquee
        className="bg-gold py-4 text-cocoa"
        itemClassName="font-display text-[clamp(1.4rem,3vw,2.4rem)] uppercase"
        items={['Baked with love', 'Fresh from our oven', 'Good things come in crumbs']}
      />

      {/* FAQ */}
      <section id="faq" className="container-shell grid gap-12 py-24 md:py-36 lg:grid-cols-12" aria-labelledby="faq-title">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4 text-cherry">Good to know</p>
          <h2 id="faq-title" className="display text-[clamp(2.1rem,4.6vw,3.8rem)] text-cherry">
            Ordering, explained
          </h2>
          <Squiggle className="mt-5 h-3 w-32 text-gold" />
        </div>
        <div className="divide-y divide-cocoa/15 border-y border-cocoa/15 lg:col-span-8">
          {FAQ.map(([q, a], i) => (
            <details key={q} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-bold [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronIcon className="shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-cocoa/75">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="container-shell pb-8" aria-labelledby="contact-title">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-blush/55 p-8 md:flex-row md:items-center md:rounded-[3rem] md:p-14">
          <div>
            <h2 id="contact-title" className="display text-[clamp(1.9rem,4.2vw,3.4rem)] text-cherry">
              Say hello. We'd love to hear from you.
            </h2>
            <p className="mt-3 text-[16px] text-cocoa/75">
              WhatsApp is the quickest way to reach us, or write to{' '}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-cherry underline underline-offset-4">
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <a href={chatLink()} target="_blank" rel="noopener noreferrer" className="btn btn-cherry shrink-0">
            <WhatsAppIcon width={20} height={20} /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* closing line */}
      <section className="container-shell pb-4 pt-24 text-center md:pt-36">
        <Crumbie className="mx-auto h-28 w-28 md:h-36 md:w-36" />
        <p className="display mt-6 text-[clamp(2.2rem,7.6vw,6.6rem)] text-cherry">
          Made with love.
          <br />
          <span className="text-cocoa">Remembered in crumbs.</span>
        </p>
        <Link to="/shop" className="btn btn-cherry mt-10">
          Go find something sweet
        </Link>
      </section>
    </>
  )
}

function NameCard({ word, body, gold }: { word: string; body: string; gold?: boolean }) {
  return (
    <div className={`rounded-[1.8rem] p-7 md:p-8 ${gold ? 'bg-gold text-cocoa' : 'bg-cream text-cocoa'}`}>
      <p className={`font-display text-[2.2rem] uppercase leading-none ${gold ? 'text-cocoa' : 'text-cherry'}`}>{word}</p>
      <p className="mt-4 text-[16px] leading-relaxed text-cocoa/80">{body}</p>
    </div>
  )
}
function Op({ children }: { children: string }) {
  return <span className="grid place-items-center font-display text-[2.6rem] leading-none text-gold max-md:py-0">{children}</span>
}

function Block({ num, title, body, image, alt, shape, flip }: { num: string; title: string; body: string; image: string; alt: string; shape: string; flip?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`relative lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
        <div className="drop-shadow-[0_20px_24px_rgba(56,37,33,0.18)]">
          <div className={`${shape} photo-wash relative aspect-[4/3.5] w-full overflow-hidden`}>
            <Photo name={image} alt={alt} sizes="(min-width:1024px) 48vw, 92vw" />
          </div>
        </div>
      </div>
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1 lg:pr-6' : 'lg:col-start-8'}`}>
        <span className="font-display text-[3.4rem] leading-none text-transparent [-webkit-text-stroke:2px_#A51F2B]">{num}</span>
        <h2 className="display mt-3 text-[clamp(2rem,4.4vw,3.8rem)] text-cherry">{title}</h2>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-cocoa/80">{body}</p>
      </div>
    </div>
  )
}
