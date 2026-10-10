import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useBag } from './BagContext'
import Photo from './Photo'
import Crumbie from './Crumbie'
import { ArrowIcon, CheckIcon, CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from './Icons'
import { inr } from '../data/products'
import { buildOrderMessage, lineData, whatsappLink, type Customer } from '../lib/whatsapp'
import { SITE, isWhatsAppConfigured } from '../config/site'

type Step = 'bag' | 'details' | 'sent'
const EMPTY: Customer = { name: '', phone: '', address: '', pincode: '', date: '', notes: '' }
const CUSTOMER_KEY = 'ccc-customer-v1'

const tomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

export default function BagDrawer() {
  const { open, closeBag, lines, total, count, setQty, remove, clear } = useBag()
  const [step, setStep] = useState<Step>('bag')
  const [c, setC] = useState<Customer>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({})
  const [link, setLink] = useState('')
  const [ref, setRef] = useState('')
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CUSTOMER_KEY)
      if (raw) setC({ ...EMPTY, ...(JSON.parse(raw) as Customer), date: '', notes: '' })
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (open) {
      panel.current?.focus()
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeBag()
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    const t = setTimeout(() => setStep((s) => (s === 'sent' ? 'bag' : s === 'details' ? 'bag' : s)), 350)
    return () => clearTimeout(t)
  }, [open, closeBag])

  const set = (k: keyof Customer) => (e: { target: { value: string } }) => setC((p) => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e: typeof errors = {}
    if (c.name.trim().length < 2) e.name = 'Please tell us your name'
    const digits = c.phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number'
    if (c.address.trim().length < 8) e.address = 'Add a full delivery address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate() || lines.length === 0) return
    const { message, ref: r } = buildOrderMessage(lines, c)
    const url = whatsappLink(message)
    try {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify({ name: c.name, phone: c.phone, address: c.address, pincode: c.pincode }))
    } catch {
      /* ignore */
    }
    setLink(url)
    setRef(r)
    setStep('sent')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const newOrder = () => {
    clear()
    setStep('bag')
    closeBag()
  }

  return (
    <div className={`fixed inset-0 z-[80] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-cocoa/55 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeBag}
      />
      <aside
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-cream outline-none transition-transform duration-300 ease-out ${open ? 'translate-x-0 shadow-[-20px_0_60px_-20px_rgba(56,37,33,.4)]' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-cocoa/10 px-5 py-4">
          <div>
            <h2 className="font-display text-[1.45rem] uppercase leading-none text-cherry">
              {step === 'details' ? 'Your details' : step === 'sent' ? 'Nearly there' : 'Your bag'}
            </h2>
            {step !== 'sent' && (
              <p className="mt-1.5 font-label text-[13px] font-semibold uppercase tracking-[0.2em] text-cocoa/55">
                {count} {count === 1 ? 'treat' : 'treats'} · {inr(total)}
              </p>
            )}
          </div>
          <button onClick={closeBag} aria-label="Close bag" className="grid h-11 w-11 place-items-center rounded-full hover:bg-cocoa/5">
            <CloseIcon />
          </button>
        </div>

        {/* STEP 1 — the bag */}
        {step === 'bag' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 pb-16 text-center">
                  <Crumbie className="h-32 w-32" />
                  <div>
                    <p className="font-display text-2xl uppercase text-cherry">Nothing in here yet</p>
                    <p className="mx-auto mt-2 max-w-[17rem] text-[15px] text-cocoa/70">Crumbie is a bit nervous about the empty bag. Let&apos;s fix that.</p>
                  </div>
                  <Link to="/shop" onClick={closeBag} className="btn btn-cherry">
                    Browse the bakes
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-cocoa/10">
                  {lines.map((l) => {
                    const d = lineData(l)
                    if (!d) return null
                    return (
                      <li key={l.slug + l.variant} className="flex gap-4 py-4">
                        <Link to={`/product/${d.product.slug}`} onClick={closeBag} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-blush/40">
                          <Photo name={d.product.image} alt={d.product.name} sizes="80px" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[15px] font-semibold leading-snug">{d.product.name}</p>
                              <p className="mt-0.5 text-[13px] text-cocoa/60">{d.variant.label}</p>
                            </div>
                            <p className="shrink-0 text-[15px] font-semibold">{inr(d.total)}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center rounded-full border-[1.5px] border-cocoa/20 bg-white">
                              <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-cocoa/5" aria-label={`Decrease ${d.product.name}`} onClick={() => setQty(l.slug, l.variant, l.qty - 1)}>
                                <MinusIcon width={16} height={16} />
                              </button>
                              <span className="w-7 text-center text-[14px] font-semibold tabular-nums" aria-live="polite">{l.qty}</span>
                              <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-cocoa/5" aria-label={`Increase ${d.product.name}`} onClick={() => setQty(l.slug, l.variant, l.qty + 1)}>
                                <PlusIcon width={16} height={16} />
                              </button>
                            </div>
                            <button onClick={() => remove(l.slug, l.variant)} className="text-[12px] font-bold uppercase tracking-[0.14em] text-cocoa/50 underline-offset-4 hover:text-cherry hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-cocoa/10 bg-white/60 px-5 pb-5 pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-label text-[14px] font-semibold uppercase tracking-[0.2em] text-cocoa/60">Subtotal</span>
                  <span className="font-display text-[1.6rem] text-cherry">{inr(total)}</span>
                </div>
                <p className="mb-4 mt-1 text-[13px] leading-snug text-cocoa/60">
                  No online payment. We&apos;ll confirm your order, delivery and payment personally on WhatsApp.
                </p>
                <button onClick={() => setStep('details')} className="btn btn-cherry w-full">
                  Continue to order <ArrowIcon width={18} height={18} />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2 — details → WhatsApp */}
        {step === 'details' && (
          <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              <p className="text-[15px] leading-relaxed text-cocoa/75">
                Tell us where to bring the goodness. Pressing the button opens WhatsApp with your order already typed out for us.
              </p>
              <Field label="Your name" error={errors.name}>
                <input className="field" autoComplete="name" value={c.name} onChange={set('name')} placeholder="Aarav Sharma" />
              </Field>
              <Field label="Phone / WhatsApp number" error={errors.phone}>
                <input className="field" type="tel" inputMode="tel" autoComplete="tel" value={c.phone} onChange={set('phone')} placeholder="98765 43210" />
              </Field>
              <Field label="Delivery address" error={errors.address}>
                <textarea className="field min-h-[96px] resize-y" autoComplete="street-address" value={c.address} onChange={set('address')} placeholder="Flat / house no., street, area, city" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pincode">
                  <input className="field" inputMode="numeric" autoComplete="postal-code" value={c.pincode} onChange={set('pincode')} placeholder="411001" />
                </Field>
                <Field label="Needed on">
                  <input className="field" type="date" min={tomorrow()} value={c.date} onChange={set('date')} />
                </Field>
              </div>
              <Field label="Notes (optional)">
                <textarea className="field min-h-[72px] resize-y" value={c.notes} onChange={set('notes')} placeholder="Message on the cake, allergies, gift note…" />
              </Field>
              {!isWhatsAppConfigured && (
                <p className="rounded-2xl border border-gold bg-gold/25 px-4 py-3 text-[13px] leading-snug">
                  Preview note: the owner&apos;s WhatsApp number isn&apos;t set yet. Add it in <code className="font-mono">src/config/site.ts</code> to go live.
                </p>
              )}
            </div>
            <div className="border-t border-cocoa/10 bg-white/60 px-5 pb-5 pt-4">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-label text-[14px] font-semibold uppercase tracking-[0.2em] text-cocoa/60">Total</span>
                <span className="font-display text-[1.4rem] text-cherry">{inr(total)}</span>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('bag')} className="btn btn-line text-cocoa">
                  Back
                </button>
                <button type="submit" className="btn btn-cherry flex-1">
                  <WhatsAppIcon width={20} height={20} /> Send order
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3 — handed off */}
        {step === 'sent' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 overflow-y-auto px-8 pb-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-cherry text-cream">
              <CheckIcon width={26} height={26} />
            </span>
            <div>
              <p className="font-display text-[1.7rem] uppercase leading-tight text-cherry">Tap send in WhatsApp</p>
              <p className="mx-auto mt-3 max-w-[20rem] text-[15px] leading-relaxed text-cocoa/75">
                Your order <strong className="font-semibold text-cocoa">{ref}</strong> is typed out and ready. Press send in WhatsApp and we&apos;ll reply to confirm everything, payment included.
              </p>
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-cherry">
              <WhatsAppIcon width={20} height={20} /> Open WhatsApp again
            </a>
            <button onClick={newOrder} className="link-u text-cocoa/70">
              Start a fresh bag
            </button>
            <Crumbie className="mt-2 h-24 w-24 -rotate-3" />
          </div>
        )}
      </aside>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-[13px] font-medium text-cherry">
          {error}
        </span>
      )}
    </label>
  )
}
