import { TICKER_ITEMS } from "@/lib/siteConfig"

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="relative z-10 overflow-hidden bg-rose py-3">
      <div className="ticker-track flex whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={item + i}
            className="inline-flex items-center gap-[0.6rem] px-8 text-[0.58rem] tracking-[0.15em] uppercase text-ink/55"
          >
            <span className="h-0.75 w-0.75 rounded-full bg-ink/25" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
