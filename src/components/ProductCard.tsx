import { Link } from 'react-router-dom'
import Photo from './Photo'
import { PlusIcon } from './Icons'
import { useBag } from './BagContext'
import { fromPrice, inr, type Product } from '../data/products'

const LABEL_STYLE: Record<NonNullable<Product['label']>, string> = {
  Bestseller: 'bg-gold text-cocoa',
  New: 'bg-cherry text-cream',
  'Fan favourite': 'bg-blush text-cocoa',
  'Little Drop': 'bg-cocoa text-gold',
}

export function Label({ children, className = '' }: { children?: string; className?: string }) {
  if (!children) return null
  const tone = LABEL_STYLE[children as NonNullable<Product['label']>] ?? LABEL_STYLE['Little Drop']
  return (
    <span className={`inline-block rounded-full px-3 py-1 font-label text-[12.5px] font-semibold uppercase tracking-[0.18em] ${tone} ${className}`}>
      {children}
    </span>
  )
}

interface Props {
  product: Product
  sizes?: string
  priority?: boolean
  /** image ratio utility, defaults to portrait */
  ratio?: string
  className?: string
}

export default function ProductCard({ product, sizes = '(min-width:1024px) 30vw, 50vw', priority, ratio = 'aspect-[4/5]', className = '' }: Props) {
  const { add } = useBag()
  const multi = product.variants.length > 1
  return (
    <article className={`group relative ${className}`}>
      <Link to={`/product/${product.slug}`} className="block" aria-label={`${product.name}, from ${inr(fromPrice(product))}`}>
        <div className={`photo-wash relative overflow-hidden rounded-[1.6rem] bg-blush/50 md:rounded-[2rem] ${ratio}`}>
          <Photo
            name={product.image}
            alt={`${product.name} — ${product.tagline}`}
            sizes={sizes}
            priority={priority}
            className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="mt-4 pr-14">
          <h3 className="text-[15.5px] font-semibold leading-snug tracking-[-0.005em] md:text-[17px]">{product.name}</h3>
          <p className="mt-1 text-[14px] text-cocoa/65">
            {multi && <span className="font-label text-[12px] font-semibold uppercase tracking-[0.18em] text-cocoa/50">from </span>}
            <span className="font-semibold text-cherry">{inr(fromPrice(product))}</span>
          </p>
        </div>
      </Link>

      {product.label && <Label className="absolute left-3 top-3 shadow-sm md:left-4 md:top-4">{product.label}</Label>}

      <button
        type="button"
        onClick={() => add(product, product.variants[0].label)}
        aria-label={`Add ${product.name} (${product.variants[0].label}) to bag`}
        className="absolute bottom-0 right-0 grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-cherry text-cherry transition duration-200 hover:bg-cherry hover:text-cream active:scale-95 md:h-12 md:w-12"
      >
        <PlusIcon width={20} height={20} />
      </button>
    </article>
  )
}
