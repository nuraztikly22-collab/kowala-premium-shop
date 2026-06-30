// Add real customer reviews here. Each review renders into the masonry
// review wall on the homepage and product page. Leave the array empty until
// you have genuine reviews — fake reviews are deceptive and against policy.
//
// Image URLs can be either:
//  - a Lovable asset URL (import an .asset.json and pass `.url`), or
//  - any public https URL (e.g. from Shopify CDN / a reviews app).
//
// When you install a reviews app (Judge.me, Loox, Stamped, etc.) we'll
// replace this static list with a live fetch.

export interface Review {
  id: string;
  name: string;       // e.g. "Lerato M."
  city?: string;      // e.g. "Cape Town"
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
  image?: string;     // customer photo (optional)
  verified?: boolean; // shown as a "Verified" badge
  product?: string;   // e.g. "Kowala Sling Carrier"
  date?: string;      // ISO date
}

export const REVIEWS: Review[] = [
  // Example shape — remove and replace with real reviews:
  // {
  //   id: "1",
  //   name: "Lerato M.",
  //   city: "Johannesburg",
  //   stars: 5,
  //   text: "Honestly the best baby purchase I've made.",
  //   image: "https://...",
  //   verified: true,
  //   product: "Kowala Sling Carrier",
  //   date: "2026-05-12",
  // },
];
