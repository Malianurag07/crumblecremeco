# Crumble Creme Co.

Frontend-only bakery website (React + TypeScript + Tailwind, prerendered to static HTML for SEO).
Orders are placed through **WhatsApp**: customers fill name / phone / address, press *Send order*, and WhatsApp opens
with the full order already typed out to the owner's number. Payment and delivery are handled manually in the chat.

## Before you launch

Edit **`src/config/site.ts`**:

| Setting | What to put |
| --- | --- |
| `whatsappNumber` | Owner's number, country code + digits only, e.g. `919876543210` |
| `url` | Your real domain (canonical links, sitemap, social previews) |
| `email`, `social`, `city` | Contact email, social links, and your city (helps local search) |

Products, prices and copy live in `src/data/products.ts` (all prices and ingredient lists are samples).

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # static site in dist/ (also regenerates sitemap.xml + robots.txt)
npm run assets    # re-optimise photos in assets-src/ and regenerate icons + share image
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## SEO checklist

- Every page is prerendered with its own title, description, canonical URL, Open Graph / Twitter tags and JSON-LD
  (Bakery, WebSite, Product with INR offers, BreadcrumbList, ItemList, FAQPage).
- After deploying: add the site to Google Search Console, submit `/sitemap.xml`, and create a **Google Business Profile**
  (the biggest lever for "bakery near me" searches).
- Replace the stock photography with your own bakes when you have it: put JPEGs in `assets-src/` using the same file
  names, then run `npm run assets`.

## Photography

Placeholder photos come from Unsplash (free licence). Swap in your own for the real launch.
