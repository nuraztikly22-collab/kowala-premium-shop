# Product page rebuild

Rebuild `/product` from top to bottom as a premium, Bambora-inspired product experience. Uses your existing brand tokens, the new photography already uploaded, and the live Shopify product for pricing/checkout.

## Page structure (top to bottom)

1. **Buy section** — split layout
   - Left: large image gallery, per-colour, with thumbnails
   - Right: sticky buy box (title, stars, price, colour selector, bundle selector, quantity, Add to Cart, Buy Now, trust badges, urgent shipping message)
2. **Trust bar** — 4 icon badges (Secure, SA Delivery, Premium, Support)
3. **Benefits grid** — 10 icon cards (hip position, weight distribution, comfort baby/parent, adjustable, washable, lightweight, travel, hands-free, secure)
4. **Long description** — editorial two-column: headline + premium body copy
5. **Why parents love it** — 6 premium cards
6. **How to use** — 4 numbered steps with illustration placeholders
7. **Specifications** — spec table (fabric, weight capacity, adjustable range 55–88 cm, age, care, includes)
8. **Reviews** — reuse existing `ReviewWall` (photo + text + star average)
9. **FAQ** — accordion (wash, adjustable, both parents, shipping, returns, newborn use)
10. **Delivery & Returns** — two side-by-side cards linking to full pages
11. **Mobile sticky Add-to-Cart bar** (kept from current build)

## Image gallery — per-colour

- Four colour swatches (Botanical, Houndstooth, Cocoa, Onyx) as circular buttons with the swatch colour, ring on selected, smooth scale + ring transition.
- Each colour owns its own image set from `COLORS` in `src/lib/brand.ts` (lifestyle + product).
- Clicking a swatch fades the entire gallery to that colour's images only. No mixing.
- Thumbnails row under the main image; arrows + dots on the main image.
- Gallery slide index resets to 0 on colour change.

## Pricing / bundle

- Two bundle cards:
  - **1 Sling — R499**
  - **2 Slings — R899** — badge "Most Popular", auto-selected, "Save R99" chip
- Selected bundle drives the Add-to-Cart quantity (1 or 2 of the chosen variant).
- Price line in the buy box reflects the bundle total.
- Pulls the live variant price from Shopify; the R499 / R899 labels are shown as the sling-count model on top of the live per-unit price.

## Buy box

- Eyebrow "Kowala" · H1 product title · 5-star row with review count copy.
- Live price (per sling) + bundle total.
- Colour selector (shared with gallery — single source of truth).
- Bundle selector (2 cards).
- Quantity stepper (multiplies the bundle).
- Primary **Add to Cart** (existing cart store).
- Secondary **Buy Now** — adds to cart then redirects to `checkoutUrl`.
- Trust badges row (Secure · SA Delivery · Premium · Support).
- Urgent shipping message block: "Processing: 1–3 business days · Delivery: 8–11 business days after processing".
- Sticky on desktop (`md:sticky md:top-24`).

## Content sections

- **Long description**: freedom, comfort, bonding, ergonomic support, ease of use, everyday convenience, suitable from newborn — no medical claims.
- **Why parents love it**: 6 cards (Comfortable all day, Keeps baby close, Easy to travel, Easy to wash, Premium materials, Minimal effort).
- **How to use**: 4 steps (Clip · Position · Adjust · Enjoy) with numbered circular markers and soft illustration placeholders on beige cards.
- **Specifications**: definition list (Fabric, Weight capacity 3.5–15 kg, Strap range 55–88 cm, Age from newborn with support, Care machine washable cold, Includes 1 sling carrier).
- **FAQ**: accordion using existing shadcn `Accordion` component.
- **Delivery & Returns**: two cards linking to `/shipping` and `/returns`.

## Technical notes

- File: rewrite `src/routes/product.tsx`.
- Keep `head()` meta, `ReviewWall`, cart integration, mobile sticky bar.
- Colour state lifted to the page; gallery and buy box both read/write it.
- Bundle state local to buy box; on Add to Cart, `quantity = qty * (bundle === "double" ? 2 : 1)`.
- Match colour swatch to the closest Shopify variant option (case-insensitive contains); if the store has a single default variant, all four swatches map to it and only the gallery visuals change.
- Buy Now: `await addItem(...)` then `window.location.href = checkoutUrl`.
- All colours/spacing via existing tokens (`bg-beige`, `text-primary`, `container-kw`, `btn-primary`, `section-pad`).
- No new packages.

## Out of scope

- No changes to `src/lib/shopify.ts`, cart store, header, footer, or other routes.
- No changes to Shopify product data.
