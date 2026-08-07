import { buildWhatsAppLink } from "@/lib/whatsapp"

const PACKAGES = [
  {
    name: "Portraits",
    price: "₦70,000",
    sub: "4 edited pictures",
    features: ["4 final edited images", "1 outfit", "Online delivery"],
    message: "Hi TTMP! I'd like to book the 4 Edited Pictures package (₦70,000).",
  },
  {
    name: "Signature ✦",
    price: "₦120,000",
    sub: "8 edited pictures · 2 looks",
    features: ["8 final edited images", "Up to 2 outfits", "Online delivery"],
    feat: true,
    message:
      "Hi TTMP! I'd like to book the 8 Edited Pictures (2 Looks) package (₦120,000).",
  },
  {
    name: "Reels",
    price: "₦40,000",
    sub: "Edited reel video",
    features: ["Reel-ready video", "Shot on location", "Online delivery"],
    message: "Hi TTMP! I'd like to book the Reels package (₦40,000).",
  },
]

const DELAY = { 1: "d1", 2: "d2", 3: "d3" }

export function Packages() {
  return (
    <section
      id="packages"
      className="relative overflow-hidden bg-background px-(--gap) py-[clamp(4rem,9vw,9rem)]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <div className="mx-auto max-w-(--max)" style={{ "--max": "1260px" }}>
        <p className="sr mb-4 flex items-center gap-[0.7rem] text-[0.55rem] tracking-[0.2em] uppercase text-rose before:block before:h-px before:w-6 before:bg-rose">
          Packages
        </p>
        <h2 className="sr mb-12 font-display text-[clamp(1.8rem,3vw,3rem)] font-bold text-foreground">
          Price list.
        </h2>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.name}
              data-cursor-hover
              className={`sr ${DELAY[i + 1]} rounded-2xl border p-8 transition-[border-color,background-color] duration-250 ${
                pkg.feat
                  ? "border-foreground/40 bg-foreground/6 hover:border-rose"
                  : "border-foreground/6 bg-foreground/3 hover:border-foreground/14"
              }`}
            >
              <div className="mb-[0.9rem] text-[0.52rem] tracking-[0.16em] uppercase text-foreground/28">
                {pkg.name}
              </div>
              <div className="mb-[0.3rem] font-display text-[2.4rem] font-light leading-none text-foreground">
                {pkg.price}
              </div>
              <div className="mb-[1.6rem] text-[0.72rem] text-foreground/24">{pkg.sub}</div>
              <ul className="mb-[1.8rem] list-none p-0">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 border-t border-foreground/5 py-[0.42rem] text-[0.78rem] text-foreground/44 before:h-1 before:w-1 before:flex-shrink-0 before:rounded-full before:bg-rose"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={buildWhatsAppLink(pkg.message)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className={`block rounded-full p-3 text-center font-sans text-[0.6rem] tracking-[0.12em] uppercase no-underline transition-all duration-250 ${
                  pkg.feat
                    ? "bg-rose font-medium text-ink hover:bg-rose-2"
                    : "border border-foreground/15 text-foreground hover:border-foreground/50"
                }`}
              >
                Book now
              </a>
            </div>
          ))}
        </div>
        <p className="sr mt-6 text-center text-[0.72rem] text-foreground/30">
          Extra pictures beyond your package come at a fee of ₦10,000 each.
        </p>
      </div>
    </section>
  )
}
