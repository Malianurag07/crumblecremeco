import type { RouteRecord } from 'vite-react-ssg'
import Layout, { NotFound } from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import { ALL_CATEGORIES, PRODUCTS } from './data/products'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, Component: Home },
      { path: 'shop', Component: Shop },
      { path: 'shop/:category', Component: Shop, getStaticPaths: () => ALL_CATEGORIES.map((c) => `shop/${c.slug}`) },
      { path: 'product/:slug', Component: ProductPage, getStaticPaths: () => PRODUCTS.map((p) => `product/${p.slug}`) },
      { path: 'about', Component: About },
      { path: '404', Component: NotFound },
      { path: '*', Component: NotFound },
    ],
  },
]
