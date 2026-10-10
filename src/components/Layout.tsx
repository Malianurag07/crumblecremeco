import { useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { BagProvider, useBag } from './BagContext'
import { AnnouncementBar } from './Marquee'
import Header from './Header'
import Footer from './Footer'
import BagDrawer from './BagDrawer'
import SearchOverlay from './SearchOverlay'
import { ClipDefs } from './art'
import { CheckIcon, WhatsAppIcon } from './Icons'
import { chatLink } from '../lib/whatsapp'
import Seo from './Seo'

function Toast() {
  const { toast, openBag, open } = useBag()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[95] flex justify-center px-4" aria-live="polite">
      {toast && !open && (
        <div key={toast.id} className="pointer-events-auto flex animate-rise items-center gap-3 rounded-full bg-cocoa py-2.5 pl-3 pr-2 text-cream shadow-xl">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-cocoa">
            <CheckIcon width={16} height={16} />
          </span>
          <span className="max-w-[48vw] truncate text-[14px] sm:max-w-sm">{toast.text}</span>
          <button onClick={openBag} className="whitespace-nowrap rounded-full bg-cream px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-cherry hover:bg-gold hover:text-cocoa">
            View bag
          </button>
        </div>
      )}
    </div>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <BagProvider>
      <ClipDefs />
      <ScrollManager />
      <a href="#main" className="sr-only z-[100] rounded-full bg-cocoa px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <BagDrawer />
      <SearchOverlay />
      <Toast />
      <a
        href={chatLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-4 right-4 z-30 flex h-12 items-center md:h-14 gap-2 rounded-full bg-cocoa pl-4 pr-4 text-cream shadow-lg transition hover:bg-cherry md:bottom-6 md:right-6"
      >
        <WhatsAppIcon width={22} height={22} />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-300 group-hover:max-w-[8rem] md:inline">Chat with us</span>
      </a>
    </BagProvider>
  )
}

export function NotFound() {
  return (
    <>
    <Seo title="Page not found" description="This page could not be found. Browse the Crumble Creme Co. bakes instead." path="/404" noindex />
    <section className="container-shell py-28 text-center">
      <p className="eyebrow text-cherry">404</p>
      <h1 className="display mt-4 text-[clamp(2.6rem,8vw,6rem)] text-cherry">This crumb got away.</h1>
      <p className="mx-auto mt-5 max-w-md text-cocoa/70">We couldn&apos;t find that page, but the good stuff is just a click away.</p>
      <Link to="/shop" className="btn btn-cherry mt-8">
        Browse the bakes
      </Link>
    </section>
    </>
  )
}
