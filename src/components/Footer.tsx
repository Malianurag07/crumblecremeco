import { Link } from 'react-router-dom'
import Crumbie from './Crumbie'
import Logo from './Logo'
import { BlobPattern } from './art'
import { FacebookIcon, InstagramIcon, PinterestIcon, WhatsAppIcon } from './Icons'
import { CATEGORIES } from '../data/products'
import { SITE } from '../config/site'
import { chatLink } from '../lib/whatsapp'

const social = [
  { label: 'Instagram', href: SITE.social.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: SITE.social.facebook, Icon: FacebookIcon },
  { label: 'Pinterest', href: SITE.social.pinterest, Icon: PinterestIcon },
]

export default function Footer() {
  return (
    <footer className="on-cherry relative mt-24 bg-cherry text-cream md:mt-32">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <BlobPattern className="h-full w-full opacity-[0.06]" bg="transparent" />
      </div>

      {/* Crumbie rests on the top edge, peering over */}
      <Crumbie className="absolute right-[6%] top-0 z-10 h-24 w-24 -translate-y-[58%] rotate-6 sm:h-32 sm:w-32 lg:right-[12%] lg:h-40 lg:w-40" label="Crumbie, our crumbling cookie mascot" />

      <div className="container-shell relative pb-0 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="display text-[clamp(2.2rem,5.5vw,4.6rem)]">
              A little crumble.
              <br />
              <span className="text-gold">A lot of love.</span>
            </p>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-cream/80">
              Order in a few taps. We confirm everything with you personally on WhatsApp, from delivery to payment.
            </p>
            <a href={chatLink()} target="_blank" rel="noopener noreferrer" className="btn btn-cream mt-8">
              <WhatsAppIcon width={20} height={20} /> Order on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pl-10">
            <FooterCol title="Shop">
              {CATEGORIES.map((c) => (
                <FooterLink key={c.slug} to={`/shop/${c.slug}`}>
                  {c.title}
                </FooterLink>
              ))}
              <FooterLink to="/shop/little-drops">Little Drops</FooterLink>
            </FooterCol>
            <FooterCol title="Crumble Co.">
              <FooterLink to="/about">Our story</FooterLink>
              <FooterLink to="/shop">All bakes</FooterLink>
              <FooterLink to="/about#faq">How ordering works</FooterLink>
              <FooterLink to="/about#contact">Contact</FooterLink>
            </FooterCol>
            <FooterCol title="Say hello" className="col-span-2 sm:col-span-1">
              <li>
                <a href={chatLink('Hi! I have a question.')} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-gold">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-2 pt-2">
                {social.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href || '#'}
                    aria-label={label}
                    {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/30 transition hover:border-gold hover:bg-gold hover:text-cocoa"
                  >
                    <Icon width={18} height={18} />
                  </a>
                ))}
              </li>
            </FooterCol>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/20 py-6 text-[13px] text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <Logo className="sm:hidden" />
          <p>© {new Date().getFullYear()} {SITE.name} · Made with love, remembered in crumbs.</p>
          <p className="font-label text-[12px] uppercase tracking-[0.22em]">Sample prices · Prototype</p>
        </div>
      </div>

      {/* oversized wordmark, cropped at the bottom edge like a shopfront sign */}
      <div aria-hidden="true" className="relative select-none overflow-hidden text-center">
        <span className="-mb-[4.2vw] block whitespace-nowrap font-display text-[17.4vw] uppercase leading-[0.86] tracking-[-0.02em] text-cream/[0.1]">
          Crumble
        </span>
      </div>
    </footer>
  )
}

function FooterCol({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-4 text-blush">{title}</h2>
      <ul className="space-y-2.5 text-[15px]">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="transition hover:text-gold">
        {children}
      </Link>
    </li>
  )
}
