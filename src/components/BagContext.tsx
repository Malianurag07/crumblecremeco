import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { bagCount, bagTotal, type BagLine } from '../lib/whatsapp'
import { PRODUCTS, type Product } from '../data/products'

interface Toast {
  id: number
  text: string
}

interface BagState {
  lines: BagLine[]
  count: number
  total: number
  open: boolean
  searchOpen: boolean
  toast: Toast | null
  add: (product: Product, variant: string, qty?: number, openBag?: boolean) => void
  setQty: (slug: string, variant: string, qty: number) => void
  remove: (slug: string, variant: string) => void
  clear: () => void
  openBag: () => void
  closeBag: () => void
  openSearch: () => void
  closeSearch: () => void
}

const Ctx = createContext<BagState | null>(null)
const KEY = 'ccc-bag-v1'

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([])
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as BagLine[]
        setLines(parsed.filter((l) => PRODUCTS.some((p) => p.slug === l.slug) && l.qty > 0))
      }
    } catch {
      /* storage unavailable — bag simply starts empty */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* ignore */
    }
  }, [lines, hydrated])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    document.documentElement.style.overflow = open || searchOpen ? 'hidden' : ''
  }, [open, searchOpen])

  const add: BagState['add'] = useCallback((product, variant, qty = 1, openBag = false) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.slug === product.slug && l.variant === variant)
      if (i >= 0) return prev.map((l, idx) => (idx === i ? { ...l, qty: Math.min(l.qty + qty, 50) } : l))
      return [...prev, { slug: product.slug, variant, qty }]
    })
    if (openBag) setOpen(true)
    else setToast({ id: Date.now(), text: `${product.name} is in your bag` })
  }, [])

  const setQty = useCallback(
    (slug: string, variant: string, qty: number) =>
      setLines((prev) =>
        prev.flatMap((l) => (l.slug === slug && l.variant === variant ? (qty > 0 ? [{ ...l, qty: Math.min(qty, 50) }] : []) : [l])),
      ),
    [],
  )
  const remove = useCallback((slug: string, variant: string) => setQty(slug, variant, 0), [setQty])
  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<BagState>(
    () => ({
      lines,
      count: bagCount(lines),
      total: bagTotal(lines),
      open,
      searchOpen,
      toast,
      add,
      setQty,
      remove,
      clear,
      openBag: () => {
        setSearchOpen(false)
        setOpen(true)
      },
      closeBag: () => setOpen(false),
      openSearch: () => {
        setOpen(false)
        setSearchOpen(true)
      },
      closeSearch: () => setSearchOpen(false),
    }),
    [lines, open, searchOpen, toast, add, setQty, remove, clear],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useBag() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useBag must be used inside BagProvider')
  return v
}
