# TTMP Photography

Portfolio and booking site for **TTMP (@ttakesmypictures)**, a mobile
portrait and reel photographer based in Nigeria who is available to travel.
Live at **[ttmp.vercel.app](https://ttmp.vercel.app)**.

Clients browse the work, compare packages, and book a session through a
pre-filled WhatsApp chat. The site has no backend.

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for scroll-driven and entrance animations
- Light/dark theme, remembered in `localStorage`
- SEO: meta description, Open Graph/Twitter cards, and `LocalBusiness`
  JSON-LD in `index.html`

## Features

- Cinematic scroll-driven hero and film-strip portfolio gallery
- Pricing packages, each with a **Book now** button that opens WhatsApp
  with a message pre-filled for that package
- Combined booking policy + FAQ section
- Client testimonials
- Floating WhatsApp button and a rate-card widget for a quick price glance

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
npm run lint      # oxlint
```

## Template

[`template/`](template/) contains **LUMEN**, a reusable photography
portfolio template built from this site, in two identical versions:

- `template/react/` — React 19 + Vite + Tailwind v4
- `template/html/` — plain HTML/CSS/JS, no build step

See [`template/README.md`](template/README.md) for setup and rebranding.

## License

All rights reserved. See [LICENSE](LICENSE).
