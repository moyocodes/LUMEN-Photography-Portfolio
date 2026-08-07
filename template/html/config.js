// ---------------------------------------------------------------------------
// SITE CONFIG — edit this file to rebrand the whole template.
//
// This file ships pre-filled with realistic demo copy for "LUMEN", a fake
// mobile photography studio, so you can see the template fully populated.
// LUMEN, its number, handle, and prices are all made up — replace every
// field below with your real business details, then open index.html.
// Portfolio/hero photos are free-to-use Unsplash stock images — swap the
// URLs in DEMO_COLLAGE / DEMO_PORTRAITS below with your own work.
// ---------------------------------------------------------------------------

;(function () {
  function u(id, w) {
    return "https://images.unsplash.com/photo-" + id + "?w=" + (w || 1000) + "&q=80&auto=format&fit=crop"
  }

  // Wider/editorial-leaning shots — used in hero side columns & film strip
  var DEMO_COLLAGE = [
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
  var DEMO_PORTRAITS = [
    u("1531427186611-ecfd6d936c79"),
    u("1506794778202-cad84cf45f1d"),
    u("1500648767791-00dcc994a43e"),
    u("1511285560929-80b456fea0bc"),
    u("1519741497674-611481863552"),
    u("1552374196-c4e7ffc6e126"),
  ]

  window.SITE_CONFIG = {
    site: {
      brandName: "LUMEN", // ← replace with your business name
      brandInitials: "LUMEN",
      metaTitle: "LUMEN — Mobile Photographer | Book on WhatsApp",
      metaDescription:
        "LUMEN (@lumen.studio) is a mobile photographer available for portrait and reel shoots. Available to travel. Book a session on WhatsApp: +1 555 010 1234.",
    },

    contact: {
      whatsappNumber: "15550101234", // ← digits only, country code first, e.g. 15551234567
      phoneDisplay: "+1 555 010 1234",
      instagramHandle: "@lumen.studio",
      instagramUrl: "https://instagram.com/lumen.studio",
    },

    defaultBookingMessage:
      "Hi LUMEN! I'd like to book a shoot with you. Could you let me know your availability?",

    navLinks: [
      ["#film-zone", "Work"],
      ["#about", "About"],
      ["#packages", "Pricing"],
      ["#policy", "Booking Policy"],
      ["#faq", "FAQ"],
      ["#contact", "Contact"],
    ],

    hero: {
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
    },

    tickerItems: [
      "Portrait",
      "Reels & Video",
      "Editorial Style",
      "Mobile Photographer",
      "Available to Travel",
      "@lumen.studio",
    ],

    about: {
      headline: "I photograph what light",
      headlineEmphasis: "reveals.",
      body: "LUMEN is a mobile photography studio built around portraits and reels that feel like you — no fixed studio, just good light and an eye for the moment worth keeping.",
      quote: "A photograph is a secret about a secret. The more it tells you, the less you know.",
      images: [DEMO_PORTRAITS[1], DEMO_PORTRAITS[4]],
    },

    demoCollage: DEMO_COLLAGE,
    demoPortraits: DEMO_PORTRAITS,

    frames: [
      { src: DEMO_COLLAGE[0], tag: "Portrait", title: "Golden Hour" },
      { src: DEMO_PORTRAITS[0], tag: "Editorial", title: "Rose Gold" },
      { src: DEMO_COLLAGE[1], tag: "Portrait", title: "Soft Light" },
      { src: DEMO_COLLAGE[2], tag: "Editorial", title: "Quiet Luxury" },
      { src: DEMO_PORTRAITS[1], tag: "Editorial", title: "Evening Slit" },
      { src: DEMO_COLLAGE[3], tag: "Portrait", title: "Still Frame" },
      { src: DEMO_COLLAGE[4], tag: "Reel", title: "In Motion" },
      { src: DEMO_PORTRAITS[2], tag: "Portrait", title: "Night Out" },
      { src: DEMO_COLLAGE[5], tag: "Portrait", title: "Golden Hour" },
      { src: DEMO_PORTRAITS[3], tag: "Editorial", title: "City Lights" },
      { src: DEMO_COLLAGE[6], tag: "Editorial", title: "Off Duty" },
      { src: DEMO_COLLAGE[7], tag: "Portrait", title: "Dreamstate" },
      { src: DEMO_PORTRAITS[4], tag: "Portrait", title: "Crimson" },
      { src: DEMO_COLLAGE[8], tag: "Editorial", title: "New Season" },
      { src: DEMO_PORTRAITS[5], tag: "Portrait", title: "Radiant" },
      { src: DEMO_COLLAGE[9], tag: "Portrait", title: "Untamed" },
    ],
    reelLabel: "REEL 01 · MOBILE · 2026",
    reelLabel2: "REEL 02 · MOBILE · 2026",

    packages: [
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
    ],
    packagesNote: "Extra pictures beyond your package come at a fee of $20 each.",
    currencySymbol: "$",

    policies: [
      "Please kindly note that a shoot is scheduled for an hour — for the sake of my next client(s), kindly keep to time, as a $20 lateness fee will be charged.",
      "LUMEN doesn't offer refunds.",
      "It is advisable to make your bookings in advance.",
      "All shoots end by 10pm — any time after that attracts a fee.",
    ],

    faqs: [
      { q: "Do you have a studio?", a: "No, I am a mobile photographer." },
      { q: "Can I wear more than one outfit for my shoot?", a: "Yes, you can — as long as it doesn't exceed the number of pictures that will be edited." },
      { q: "Are you available to travel?", a: "Yes, I am." },
      { q: "Do you shoot events?", a: "No, I don't." },
      { q: "Do you shoot reels videos?", a: "Yes, I do." },
      { q: "Do you teach, and can you edit outside pictures?", a: "No, I don't." },
    ],

    reviews: [
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
    ],

    contactHeadline: {
      line1: "Your story",
      line2: "is waiting",
      emphasis: "to be told.",
    },
    contactBgImage: DEMO_COLLAGE[6],

    footer: {
      copyright: "© 2026 LUMEN. All rights reserved.",
    },
  }
})()
