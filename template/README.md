# LUMEN — Photography Portfolio Template

A dark/light, scroll-driven photography portfolio & booking site with a
cinematic scrubbing hero, a horizontal film-strip gallery, pricing,
FAQ/policy, testimonials, and one-tap WhatsApp booking. Comes in two
identical builds — pick whichever fits your stack:

- **`react/`** — React 19 + Vite + Tailwind CSS v4
- **`html/`** — Plain HTML + CSS + vanilla JS, no build step, no dependencies

Both versions are visually and functionally identical. All demo content
("LUMEN", the sample photos, prices, FAQ, etc.) is placeholder — swap it
for your own in one file per version, described below.

## Quick start

### React version
```bash
cd react
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
```

### HTML version
No build step. Open `html/index.html` directly in a browser, or serve the
folder with any static server, e.g.:
```bash
cd html
python3 -m http.server 8080   # http://localhost:8080
```

## Rebranding — the only two files you need to edit

| Version | Edit this file |
|---|---|
| React | `react/src/lib/siteConfig.js` |
| HTML | `html/config.js` |

Everything on the site — brand name, WhatsApp number, prices, package
features, booking policy, FAQ, hero copy, ticker items, footer — is
defined in this one file as plain JS values. Change the value, save,
reload. No other file needs to change for a standard rebrand.

A few fields are also duplicated in the `<head>` of `index.html` (page
title, meta description, Open Graph tags, JSON-LD) because that markup
loads before the config script runs. Each version's `index.html` has a
comment marking where to update these to match.

### What to replace before launch

- **Brand name & initials** — `site.brandName` / `site.brandInitials`
- **WhatsApp number** — `contact.whatsappNumber` (digits only, country
  code first, e.g. `15551234567` — this becomes a `wa.me` link)
- **Phone display & Instagram handle/URL** — `contact.*`
- **Prices & package details** — `packages` array (name, price,
  features, the WhatsApp message pre-fill text)
- **Policies & FAQ** — `policies` / `faqs` arrays
- **Photos** — see below
- **Reviews** — `reviews` array (quote, name, location, star rating,
  headshot photo URL)

Everything else (headlines, section copy, button labels) is example
content you can keep, tweak, or rewrite freely.

## Photos

The template ships with free-to-use stock photography from Unsplash
(hotlinked by URL, not bundled as files) so the demo looks finished out
of the box. These are **not your photos** — replace them before you
launch.

- React: `DEMO_COLLAGE` and `DEMO_PORTRAITS` arrays near the bottom of
  `siteConfig.js`
- HTML: the matching arrays near the top of `config.js`

Each is a flat array of image URLs used across the hero, film strip,
about section, and contact background. Point them at your own images —
either new URLs or local files (e.g. drop files in `react/public/portfolio/`
and reference `/portfolio/your-file.jpg`).

The favicon (`favicon.svg` in both versions) is a simple placeholder
aperture mark — replace it with your own logo.

## Dark mode

Both versions include a light/dark theme toggle (moon/sun icon in the
nav) plus a small toast in the bottom corner suggesting the visitor try
the other theme. The toast reappears on every page load until the
visitor actually picks a theme (via the toast or the nav toggle) — after
that it's remembered in `localStorage` and won't show again. Dismissing
the toast without choosing a theme just hides it for that visit.

## Booking flow

There's no backend — booking works by opening a pre-filled WhatsApp
chat (`wa.me` link) with your number. This covers:
- The nav "Book session" button
- Each pricing card's "Book now" button (message pre-filled per package)
- The contact form (builds a message from name / session type / notes)
- The floating WhatsApp widget (bottom-right, editable message)
- The floating rate-card widget (bottom-left, quick price glance)

If you'd rather use a real contact-form backend or booking system,
replace `buildWhatsAppLink(...)` calls with your own submission logic.

## Optional bonus component

`react/src/components/site/TipsDrawer.jsx` (React only) is a slide-out
panel with categorized tips content — not wired into the page by
default. To use it: import it in `App.jsx`, add an open/close state,
render it, and uncomment the "Tips" nav button in `Nav.jsx` (marked with
a comment). Fill in your own categories/tips or delete the file if you
don't need it.

## Structure

```
react/
  src/
    lib/siteConfig.js       ← edit this to rebrand
    lib/whatsapp.js         ← wa.me link builder
    components/site/        ← one component per section
    hooks/                  ← theme + scroll-reveal hooks
  index.html                ← meta tags (see comment inside)

html/
  config.js                 ← edit this to rebrand
  index.html                ← page markup + meta tags
  styles.css                ← all styling
  script.js                 ← all behavior (no dependencies)
```

## Browser support

Uses modern CSS (`color-mix()`, container-relative units, `dvh`) and
should run on any current version of Chrome, Safari, Firefox, or Edge.
