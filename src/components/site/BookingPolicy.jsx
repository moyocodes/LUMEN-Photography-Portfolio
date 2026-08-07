const POLICIES = [
  "Please kindly note that a shoot is scheduled for an hour — for the sake of my next client(s), kindly keep to time, as a ₦10,000 lateness fee will be charged.",
  "TTMP doesn't offer refunds.",
  "It is advisable to make your bookings in advance.",
  "All shoots end by 10pm — any time after that attracts a fee.",
]

export function BookingPolicy() {
  return (
    <section
      id="policy"
      className="bg-surface px-(--gap) py-[clamp(4rem,9vw,9rem)]"
      style={{ "--gap": "clamp(1.2rem, 3.5vw, 3.5rem)" }}
    >
      <div className="mx-auto max-w-[760px]">
        <p className="sr mb-4 flex items-center gap-[0.7rem] text-[0.55rem] tracking-[0.2em] uppercase text-rose before:block before:h-px before:w-6 before:bg-rose">
          Please read
        </p>
        <h2 className="sr mb-12 font-display text-[clamp(1.8rem,3vw,3rem)] font-bold text-foreground">
          Booking policy.
        </h2>
        <div className="sr d1 rounded-2xl bg-background p-[clamp(2rem,4vw,3.4rem)] text-foreground">
          <div className="mb-[1.6rem] flex items-center justify-between border-b border-foreground/12 pb-[1.6rem]">
            <span className="font-display text-[1.05rem] font-bold">Booking Policy</span>
            <span className="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full border-[1.5px] border-foreground font-serif italic">
              !
            </span>
          </div>
          <ul className="flex list-none flex-col gap-[1.7rem] p-0 text-center">
            {POLICIES.map((policy) => (
              <li key={policy} className="mx-auto max-w-[30rem] text-[0.92rem] leading-[1.75] tracking-[0.01em]">
                {policy}
              </li>
            ))}
          </ul>
          <p className="mt-[2.2rem] text-center text-[0.85rem] leading-[1.7] opacity-[0.68]">
            Please kindly read through before proceeding with your booking.
            Thank you, beautiful people.
          </p>
          <p className="mt-[1.4rem] text-center text-[0.62rem] tracking-[0.2em] uppercase opacity-[0.45]">
            @ttakesmypictures
          </p>
        </div>
      </div>
    </section>
  )
}
