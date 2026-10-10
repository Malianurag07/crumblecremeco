import { SITE } from '../config/site'
import { PRODUCTS, inr } from '../data/products'

export interface BagLine {
  slug: string
  variant: string
  qty: number
}

export interface Customer {
  name: string
  phone: string
  address: string
  pincode: string
  date: string
  notes: string
}

export const lineData = (l: BagLine) => {
  const product = PRODUCTS.find((p) => p.slug === l.slug)
  const variant = product?.variants.find((v) => v.label === l.variant) ?? product?.variants[0]
  return product && variant ? { product, variant, total: variant.price * l.qty } : null
}

export const bagTotal = (lines: BagLine[]) => lines.reduce((s, l) => s + (lineData(l)?.total ?? 0), 0)
export const bagCount = (lines: BagLine[]) => lines.reduce((s, l) => s + l.qty, 0)

const orderRef = () => {
  const d = new Date()
  const stamp = `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}`
  return `CCC-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`
}

/** A tidy, pre-typed order message the owner can read at a glance in WhatsApp. */
export function buildOrderMessage(lines: BagLine[], c: Customer, ref = orderRef()) {
  const items = lines
    .map((l, i) => {
      const d = lineData(l)
      return d ? `${i + 1}. ${d.product.name} (${d.variant.label}) × ${l.qty} — ${inr(d.total)}` : ''
    })
    .filter(Boolean)
    .join('\n')

  const msg = [
    `*New order — ${SITE.name}*`,
    `Order ref: ${ref}`,
    '',
    '*Customer*',
    `Name: ${c.name.trim()}`,
    `Phone: ${c.phone.trim()}`,
    `Address: ${c.address.trim()}${c.pincode.trim() ? `, ${c.pincode.trim()}` : ''}`,
    `Needed on: ${c.date || 'As soon as possible'}`,
    c.notes.trim() ? `Notes: ${c.notes.trim()}` : '',
    '',
    '*Items*',
    items,
    '',
    `*Total: ${inr(bagTotal(lines))}* (delivery, if any, to be confirmed)`,
    '',
    'Please confirm availability and share payment details. Thank you!',
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n')

  return { ref, message: msg }
}

export const whatsappLink = (message: string) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`

export const chatLink = (text = `Hi ${SITE.name}! I'd love to place an order.`) => whatsappLink(text)
