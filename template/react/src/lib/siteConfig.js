// ---------------------------------------------------------------------------
// SITE CONFIG — edit this file to rebrand the whole template.
//
// This file ships pre-filled with realistic demo copy for "LUMEN", a fake
// mobile photography studio, so you can see the template fully populated.
// LUMEN, its number, handle, and prices are all made up — replace every
// field below with your real business details before launch.
// ---------------------------------------------------------------------------

export const SITE = {
  brandName: "LUMEN", // ← replace with your business name
  brandInitials: "LUMEN",
  tagline: "Portrait & reel photography — emotion held still.",
  metaTitle: "LUMEN — Mobile Photographer | Book on WhatsApp",
  metaDescription:
    "LUMEN (@lumen.studio) is a mobile photographer available for portrait and reel shoots. Available to travel. Book a session on WhatsApp: +1 555 010 1234.",
  themeColor: "#f0ece4",
}

export const CONTACT = {
  whatsappNumber: "15550101234", // ← digits only, country code first, e.g. 15551234567
  phoneDisplay: "+1 555 010 1234", // ← e.g. +1 555 123 4567
  instagramHandle: "@lumen.studio", // ← e.g. @yourbrand
  instagramUrl: "https://instagram.com/lumen.studio", // ← e.g. https://instagram.com/yourbrand
}

export const NAV_LINKS = [
  ["#film-zone", "Work"],
  ["#about", "About"],
  ["#packages", "Pricing"],
  ["#policy", "Booking Policy"],
  ["#faq", "FAQ"],
  ["#contact", "Contact"],
]

export const HERO = {
  eyebrow: "Mobile Photographer · Available to Travel",
  headlineLine1: "Light.",
  headlineLine2: "Moment.",
  headlineEmphasis: "Memory.",
  subcopy: "Portrait & reel photography — emotion held still.",
  quoteLine1: "Every frame",
  quoteEmphasis: "confession.",
  ctaEyebrow: "Ready to be seen?",
  ctaHeadline1: "Let's make",
  ctaHeadlineEmphasis: "something real.",
  ctaSubcopy: "A feeling, a moment — preserved in a single frame.",
}

export const TICKER_ITEMS = [
  "Portrait",
  "Reels & Video",
  "Editorial Style",
  "Mobile Photographer",
  "Available to Travel",
  "@lumen.studio",
]

export const ABOUT = {
  eyebrow: "About",
  headline: "I photograph what light",
  headlineEmphasis: "reveals.",
  body: "LUMEN is a mobile photography studio built around portraits and reels that feel like you — no fixed studio, just good light and an eye for the moment worth keeping.",
  quote: "A photograph is a secret about a secret. The more it tells you, the less you know.",
  ctaLabel: "Book a session",
}

export const PACKAGES = [
  {
    name: "Portraits",
    price: "$150",
    sub: "4 edited pictures",
    features: ["4 final edited images", "1 outfit", "Online delivery"],
    message: "Hi LUMEN! I'd like to book the Portraits package ($150).",
  },
  {
    name: "Signature ✦",
    price: "$260",
    sub: "8 edited pictures · 2 looks",
    features: ["8 final edited images", "Up to 2 outfits", "Online delivery"],
    feat: true,
    message: "Hi LUMEN! I'd like to book the Signature package ($260).",
  },
  {
    name: "Reels",
    price: "$90",
    sub: "Edited reel video",
    features: ["Reel-ready video", "Shot on location", "Online delivery"],
    message: "Hi LUMEN! I'd like to book the Reels package ($90).",
  },
]

export const PACKAGES_NOTE = "Extra pictures beyond your package come at a fee of $20 each."

export const RATES = PACKAGES.map((p) => ({ name: p.sub, price: p.price }))

export const POLICIES = [
  "Please kindly note that a shoot is scheduled for an hour — for the sake of my next client(s), kindly keep to time, as a $20 lateness fee will be charged.",
  "LUMEN doesn't offer refunds.",
  "It is advisable to make your bookings in advance.",
  "All shoots end by 10pm — any time after that attracts a fee.",
]

export const FAQS = [
  { q: "Do you have a studio?", a: "No, I am a mobile photographer." },
  {
    q: "Can I wear more than one outfit for my shoot?",
    a: "Yes, you can — as long as it doesn't exceed the number of pictures that will be edited.",
  },
  { q: "Are you available to travel?", a: "Yes, I am." },
  { q: "Do you shoot events?", a: "No, I don't." },
  { q: "Do you shoot reels videos?", a: "Yes, I do." },
  { q: "Do you teach, and can you edit outside pictures?", a: "No, I don't." },
]

export const REVIEWS = [
  {
    quote: "I wasn't expecting less but you blew my mind. Every shot felt like it knew me better than I did.",
    name: "Amaka O.",
    location: "Lagos, NG",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
  },
  {
    quote: "They are so so beautiful! Thank you so much. Booking again before I even left the shoot.",
    name: "Bisi A.",
    location: "Abuja, NG",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80&auto=format&fit=crop",
  },
  {
    quote: "Perfect from start to finish. Relaxed, patient, and the final gallery still gives me chills.",
    name: "Chidi E.",
    location: "Port Harcourt, NG",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
  },
]

export const FOOTER = {
  copyright: "© 2026 LUMEN. All rights reserved.",
}

// ---------------------------------------------------------------------------
// DEMO PHOTOS
// Free-to-use stock photography (Unsplash) used only so the template looks
// finished out of the box. Replace every one of these with your own work
// before launch — swap the URLs below, or point them at local files in
// /public/portfolio and update the paths here.
// ---------------------------------------------------------------------------

const u = (id, w = 1000) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

// Wider/editorial-leaning shots — used in hero side columns & film strip
export const DEMO_COLLAGE = [
  u("1531891437562-4301cf35b7e4"),
  u("1531746020798-e6953c6e8e04"),
  u("1507003211169-0a1dd7228f2d"),
  u("1539109136881-3be0616acf4b"),
  u("1469334031218-e382a71b716b"),
  u("1521341957697-b93449760f30"),
  u("1508214751196-bcfd4ca60f91"),
  u("1494790108377-be9c29b29330"),
  u("1520813792240-56fc4a3765a7"),
  u("1524504388940-b1c1722653e1"),
]

// Tighter portrait crops — used in hero center column & CTA sides
export const DEMO_PORTRAITS = [
  u("1531427186611-ecfd6d936c79"),
  u("1506794778202-cad84cf45f1d"),
  u("1500648767791-00dcc994a43e"),
  u("1511285560929-80b456fea0bc"),
  u("1519741497674-611481863552"),
  u("1552374196-c4e7ffc6e126"),
]

export const SEO_JSONLD = {
  name: "LUMEN",
  alternateName: "@lumen.studio",
  image: DEMO_COLLAGE[0],
  telephone: "+15550101234",
  priceRange: "$90–$260",
  areaServed: "United States", // ← e.g. "United States", "Lagos, Nigeria"
}
