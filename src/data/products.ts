export type CategorySlug = 'cookies' | 'cakes' | 'cupcakes' | 'pies' | 'little-drops'

export interface Variant {
  label: string
  price: number
}

export interface Product {
  slug: string
  name: string
  category: CategorySlug
  image: string
  gallery: string[]
  label?: 'Bestseller' | 'New' | 'Fan favourite' | 'Little Drop'
  tagline: string
  description: string
  variants: Variant[]
  ingredients: string
  allergens: string
  leadTime: string
}

export interface Category {
  slug: CategorySlug
  title: string
  line: string
  image: string
  seoTitle: string
  seoDescription: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'cookies',
    title: 'Cookies',
    line: 'Little bites. Big feelings.',
    image: 'cookie-rack',
    seoTitle: 'Fresh-Baked Cookies',
    seoDescription:
      'Chewy, crackly-edged cookies baked fresh to order — midnight chocolate chip, brown butter and more. Order on WhatsApp.',
  },
  {
    slug: 'cakes',
    title: 'Cakes',
    line: 'Made for your sweetest moments.',
    image: 'cake-drip',
    seoTitle: 'Cakes for Every Celebration',
    seoDescription:
      'Chocolate fudge, vanilla celebration and drip cakes made with real butter and silky frosting. Order on WhatsApp.',
  },
  {
    slug: 'cupcakes',
    title: 'Cupcakes',
    line: 'Small cakes, extra love.',
    image: 'cupcake-strawberry',
    seoTitle: 'Cupcakes',
    seoDescription:
      'Soft, tall-swirled cupcakes — strawberry cream, red velvet and rose cream — baked fresh and boxed with care.',
  },
  {
    slug: 'pies',
    title: 'Pies',
    line: 'A golden crust of comfort.',
    image: 'pie-slice',
    seoTitle: 'Pies & Crumbles',
    seoDescription:
      'Golden-crusted apple crumble and lattice pies, baked warm and spiced. Order a whole pie or a slice on WhatsApp.',
  },
]

export const DROPS_CATEGORY: Category = {
  slug: 'little-drops',
  title: 'Little Drops',
  line: 'A little something unexpected.',
  image: 'cookie-melt',
  seoTitle: 'Little Drops — Limited-Edition Bakes',
  seoDescription:
    'Small-run seasonal boxes and experimental bakes from Crumble Creme Co. Gone when they are gone.',
}

export const ALL_CATEGORIES: Category[] = [...CATEGORIES, DROPS_CATEGORY]

const withNote = (core: string) => `${core} Sample ingredient list — final details to be confirmed by Crumble Creme Co.`
const baseAllergens =
  'Contains gluten, dairy and eggs. May contain nuts. (Sample information — to be confirmed.)'

export const PRODUCTS: Product[] = [
  {
    slug: 'midnight-chocolate-chip-cookie',
    name: 'Midnight Chocolate Chip Cookie',
    category: 'cookies',
    image: 'cookie-midnight',
    gallery: ['cookie-midnight', 'cookie-fudge', 'cookie-crumb'],
    label: 'Bestseller',
    tagline: 'Dark, fudgy and a little bit dangerous.',
    description:
      'Deep cocoa dough folded with pools of dark chocolate and finished with flaky salt. Crackled on top, molten in the middle — best eaten warm, preferably alone.',
    variants: [
      { label: 'Single', price: 149 },
      { label: 'Box of 4', price: 549 },
      { label: 'Box of 6', price: 799 },
    ],
    ingredients: withNote('Butter, dark cocoa, dark chocolate, brown sugar, eggs, flour, flaky sea salt, vanilla.'),
    allergens: baseAllergens,
    leadTime: 'Baked fresh — ready in 24 hours',
  },
  {
    slug: 'brown-butter-cookie',
    name: 'Brown Butter Cookie',
    category: 'cookies',
    image: 'cookie-brownbutter',
    gallery: ['cookie-brownbutter', 'cookie-bite', 'cookie-crumb'],
    label: 'Fan favourite',
    tagline: 'Nutty, golden, and impossible to stop at one.',
    description:
      'We brown the butter until it smells like toffee, then fold it into a soft, chewy dough with generous chocolate. Golden edges, tender centre, a finish that lingers.',
    variants: [
      { label: 'Single', price: 139 },
      { label: 'Box of 4', price: 499 },
      { label: 'Box of 6', price: 729 },
    ],
    ingredients: withNote('Brown butter, flour, brown sugar, eggs, milk chocolate chunks, vanilla, sea salt.'),
    allergens: baseAllergens,
    leadTime: 'Baked fresh — ready in 24 hours',
  },
  {
    slug: 'double-fudge-break-apart-cookie',
    name: 'Double Fudge Break-Apart Cookie',
    category: 'cookies',
    image: 'cookie-break',
    gallery: ['cookie-break', 'cookie-fudge', 'cookie-drizzle'],
    label: 'New',
    tagline: 'Pull it apart. Watch it give way.',
    description:
      'A thick brownie-style cookie with a gooey centre that stretches as you break it open. Two kinds of chocolate, zero restraint.',
    variants: [
      { label: 'Single', price: 169 },
      { label: 'Box of 4', price: 619 },
    ],
    ingredients: withNote('Butter, cocoa, dark and milk chocolate, sugar, eggs, flour, vanilla.'),
    allergens: baseAllergens,
    leadTime: 'Baked fresh — ready in 24 hours',
  },
  {
    slug: 'crumble-cookie-box',
    name: 'The Crumble Cookie Box',
    category: 'cookies',
    image: 'cookie-stack',
    gallery: ['cookie-stack', 'cookie-drizzle', 'cookie-rack'],
    tagline: 'A mixed box for sharing. Or not.',
    description:
      'A curated box of our house cookies, tucked in together and tied up simply. A thoughtful gift, or a very good Tuesday.',
    variants: [
      { label: 'Box of 6', price: 849 },
      { label: 'Box of 12', price: 1599 },
    ],
    ingredients: withNote('Assorted house cookies — see individual cookie listings.'),
    allergens: baseAllergens,
    leadTime: 'Baked fresh — ready in 24 hours',
  },
  {
    slug: 'chocolate-fudge-cake',
    name: 'Chocolate Fudge Cake',
    category: 'cakes',
    image: 'cake-fudge',
    gallery: ['cake-fudge', 'cake-choc-cherry', 'cake-drip'],
    label: 'Bestseller',
    tagline: 'Dense, glossy, dangerously rich.',
    description:
      'Three tender layers of cocoa sponge sandwiched with whipped fudge ganache and finished with a glossy, spoon-swirled coat. Cut a slice and the layers hold, then melt.',
    variants: [
      { label: '500 g', price: 1199 },
      { label: '1 kg', price: 2199 },
    ],
    ingredients: withNote('Flour, cocoa, butter, eggs, sugar, dark chocolate, cream, vanilla.'),
    allergens: baseAllergens,
    leadTime: 'Order 2 days ahead',
  },
  {
    slug: 'vanilla-celebration-cake',
    name: 'Vanilla Celebration Cake',
    category: 'cakes',
    image: 'cake-vanilla',
    gallery: ['cake-vanilla', 'cake-floral', 'cake-drip'],
    tagline: 'Soft vanilla layers made for candles.',
    description:
      'Light, buttery vanilla sponge with silky cream frosting and a slow chocolate drip. The one you bring when the moment matters.',
    variants: [
      { label: '500 g', price: 1099 },
      { label: '1 kg', price: 1999 },
    ],
    ingredients: withNote('Flour, butter, eggs, sugar, vanilla bean, cream, dark chocolate.'),
    allergens: baseAllergens,
    leadTime: 'Order 2 days ahead',
  },
  {
    slug: 'cherry-cocoa-drip-cake',
    name: 'Cherry Cocoa Drip Cake',
    category: 'cakes',
    image: 'cake-choc-cherry',
    gallery: ['cake-choc-cherry', 'cake-fudge', 'cake-drip'],
    label: 'New',
    tagline: 'Dark chocolate, bright cherry.',
    description:
      'Cocoa sponge, chocolate cream and a crown of cherries over a ganache drip. Dramatic on the table, softer than it looks on the fork.',
    variants: [
      { label: '500 g', price: 1399 },
      { label: '1 kg', price: 2499 },
    ],
    ingredients: withNote('Flour, cocoa, butter, eggs, sugar, chocolate, cream, cherries.'),
    allergens: baseAllergens,
    leadTime: 'Order 2 days ahead',
  },
  {
    slug: 'strawberry-cream-cupcake',
    name: 'Strawberry Cream Cupcake',
    category: 'cupcakes',
    image: 'cupcake-strawberry',
    gallery: ['cupcake-strawberry', 'cupcake-pink', 'cupcake-sprinkle'],
    label: 'Fan favourite',
    tagline: 'Pink swirl, white-chocolate drizzle, fresh berry.',
    description:
      'A tender vanilla cupcake piled high with strawberry cream, finished with a thread of white chocolate and a berry on top. Pretty, then gone.',
    variants: [
      { label: 'Single', price: 129 },
      { label: 'Box of 4', price: 479 },
      { label: 'Box of 6', price: 699 },
    ],
    ingredients: withNote('Flour, butter, eggs, sugar, strawberry, cream, white chocolate.'),
    allergens: baseAllergens,
    leadTime: 'Baked fresh — ready in 24 hours',
  },
  {
    slug: 'red-velvet-cupcake',
    name: 'Red Velvet Cupcake',
    category: 'cupcakes',
    image: 'cupcake-red',
    gallery: ['cupcake-red', 'cupcake-pink', 'cupcake-pipe'],
    tagline: 'Velvet crumb, tangy cream cheese swirl.',
    description:
      'Plush red velvet crumb under a tall swirl of cream cheese frosting, crowned with velvet crumbs. Sweet, tangy, a little theatrical.',
    variants: [
      { label: 'Single', price: 139 },
      { label: 'Box of 4', price: 519 },
      { label: 'Box of 6', price: 759 },
    ],
    ingredients: withNote('Flour, cocoa, buttermilk, butter, eggs, sugar, cream cheese.'),
    allergens: baseAllergens,
    leadTime: 'Baked fresh — ready in 24 hours',
  },
  {
    slug: 'classic-apple-crumble-pie',
    name: 'Classic Apple Crumble Pie',
    category: 'pies',
    image: 'pie-crumble',
    gallery: ['pie-crumble', 'pie-slice', 'pie-hazel'],
    label: 'Bestseller',
    tagline: 'Warm spice, buttery crumble, golden crust.',
    description:
      'Tart apples slow-cooked with cinnamon and brown sugar under a buttery oat crumble. Served warm it is a hug; served cold it is a secret.',
    variants: [
      { label: 'Slice', price: 189 },
      { label: 'Whole pie (8 in)', price: 799 },
    ],
    ingredients: withNote('Apples, butter, flour, oats, brown sugar, cinnamon, nutmeg.'),
    allergens: baseAllergens,
    leadTime: 'Order 2 days ahead',
  },
  {
    slug: 'lattice-apple-pie',
    name: 'Lattice Apple Pie',
    category: 'pies',
    image: 'pie-lattice',
    gallery: ['pie-lattice', 'pie-slice', 'pie-crumble'],
    tagline: 'A woven crust over honeyed apples.',
    description:
      'Flaky all-butter pastry woven by hand over cinnamon apples. Crisp, caramelised edges, soft and syrupy within.',
    variants: [
      { label: 'Slice', price: 199 },
      { label: 'Whole pie (8 in)', price: 849 },
    ],
    ingredients: withNote('Apples, butter, flour, sugar, cinnamon, lemon, vanilla.'),
    allergens: baseAllergens,
    leadTime: 'Order 2 days ahead',
  },
  {
    slug: 'hazelnut-crumble-slice',
    name: 'Hazelnut Crumble Slice',
    category: 'pies',
    image: 'pie-hazel',
    gallery: ['pie-hazel', 'pie-tart', 'pie-slice'],
    tagline: 'Toasted nuts, buttery crumb.',
    description:
      'A generous wedge of spiced crumble pie scattered with toasted hazelnuts. Rustic, crunchy, deeply comforting.',
    variants: [{ label: 'Slice', price: 209 }],
    ingredients: withNote('Apples, hazelnuts, butter, flour, brown sugar, cinnamon.'),
    allergens: 'Contains gluten, dairy, eggs and tree nuts. (Sample information — to be confirmed.)',
    leadTime: 'Order 2 days ahead',
  },
  {
    slug: 'midnight-crumble-box',
    name: 'The Midnight Crumble Box',
    category: 'little-drops',
    image: 'cookie-melt',
    gallery: ['cookie-melt', 'cookie-crumb', 'cookie-fudge'],
    label: 'Little Drop',
    tagline: 'Six cookies. One dark mood.',
    description:
      'A limited run of broken-in, gooey chocolate cookies with shards of dark chocolate and a dusting of flaky salt, boxed while they are still warm-hearted.',
    variants: [{ label: 'Box of 6', price: 899 }],
    ingredients: withNote('Butter, dark chocolate, cocoa, brown sugar, eggs, flour, sea salt.'),
    allergens: baseAllergens,
    leadTime: 'Limited batch — while it lasts',
  },
  {
    slug: 'rose-cream-cupcake-box',
    name: 'Rose Cream Cupcake Box',
    category: 'little-drops',
    image: 'cupcake-pipe',
    gallery: ['cupcake-pipe', 'cupcake-pink', 'cupcake-strawberry'],
    label: 'Little Drop',
    tagline: 'Soft pink swirls with a floral whisper.',
    description:
      'Small vanilla cupcakes piped with delicate rose cream. A seasonal box made for gifting, and for keeping a little for yourself.',
    variants: [{ label: 'Box of 6', price: 649 }],
    ingredients: withNote('Flour, butter, eggs, sugar, cream, rose essence.'),
    allergens: baseAllergens,
    leadTime: 'Limited batch — while it lasts',
  },
]

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
export const categoryBySlug = (slug: string) => ALL_CATEGORIES.find((c) => c.slug === slug)
export const fromPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price))
export const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
