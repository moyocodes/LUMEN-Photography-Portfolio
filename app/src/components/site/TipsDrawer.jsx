import { useState } from "react"

const TIPS = {
  light: [
    { t: "Golden Hour", b: "Shoot in the hour after sunrise or before sunset. The low angle creates long shadows and warm, directional light that sculpts faces naturally." },
    { t: "Overcast is underrated", b: "A cloudy sky acts as a giant softbox. Shadows disappear, skin tones soften — ideal for portraits and detail shots." },
    { t: "Window light at 45°", b: "Place your subject at 45° to a window. The shadow side creates depth; a reflector on the opposite fills beautifully." },
    { t: "Avoid midday sun", b: "Harsh overhead light casts unflattering shadows under the eyes. Move to open shade or use a diffuser." },
    { t: "Backlight drama", b: "Position the sun behind your subject for rim lighting. Expose for the face and let the background blow out slightly." },
    { t: "Reflective surfaces", b: "Water, white walls, and light-coloured buildings act as natural reflectors. Scout locations with these in mind." },
  ],
  composition: [
    { t: "Break the rule of thirds", b: "Place it, then deliberately violate it. Centering a subject feels powerful when done with strong symmetry." },
    { t: "Leading lines", b: "Roads, fences, shadows — use them to draw the eye toward your subject. Diagonal lines add energy; horizontal lines calm." },
    { t: "Negative space speaks", b: "Leave empty sky or texture around your subject. It creates breathing room and emphasises what's actually there." },
    { t: "Frame within frame", b: "Doorways, arches, branches — use environmental frames to isolate and draw attention to your subject." },
    { t: "Foreground interest", b: "Include something in the near foreground. It adds depth and a three-dimensional quality to flat scenes." },
    { t: "Change your angle", b: "Get low, get high, tilt. Most photographers shoot from eye level. The unusual angle becomes the memorable shot." },
  ],
  portrait: [
    { t: "Eyes are everything", b: "Ensure tack-sharp focus on the closest eye. If both eyes aren't in the same plane, the near eye takes priority." },
    { t: "Compress with a longer lens", b: "85–135mm flatters facial features. Wide lenses distort — use them intentionally, not by default." },
    { t: "Create genuine expression", b: "Tell a story, ask a question, share a joke. Authentic laughter is impossible to fake. Stop directing; start conversing." },
    { t: "Depth of field control", b: "f/1.8–f/2.8 separates subject from background beautifully. Stop down to f/5.6+ for groups." },
    { t: "Watch the background", b: "Before shooting, consciously scan for distracting elements — poles, bright patches, harsh colour contrast." },
    { t: "Connection over perfection", b: "The imperfect image with real eye contact will always beat the flawlessly lit, emotionally empty frame." },
  ],
  posing: [
    { t: "Weight on the back foot", b: "Shifting weight to the back leg creates a relaxed, confident stance and a pleasing hip angle naturally." },
    { t: "Space between arms and body", b: "Arms pressed flat appear wider. A slight gap slims and adds shape — make it a habit." },
    { t: "Chin forward and down", b: "Chin slightly forward and fractionally down. Defines the jaw, reduces double chins. Classic for a reason." },
    { t: "Hands with purpose", b: "Idle hands look awkward. Give them something to hold, interact with, or a gentle resting place." },
    { t: "45° to camera", b: "A direct front-on stance can feel rigid. Turning the body 45° and looking back toward the lens creates depth." },
    { t: "Movement unlocks authenticity", b: "Ask subjects to walk, turn, laugh on cue — capture mid-motion. Staged stillness reads as staged; movement reads as real." },
  ],
}

const TABS = [
  { key: "light", label: "Light" },
  { key: "composition", label: "Composition" },
  { key: "portrait", label: "Portrait" },
  { key: "posing", label: "Posing" },
]

export function TipsDrawer({ open, onClose }) {
  const [cat, setCat] = useState("light")

  return (
    <>
      <div
        id="dback"
        onClick={onClose}
        className={`fixed inset-0 z-[9050] bg-[rgba(7,7,10,0.65)] backdrop-blur-[5px] transition-opacity duration-400 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="drawer"
        className={`fixed right-0 top-0 bottom-0 z-[9100] flex w-[370px] max-w-[90vw] flex-col border-l border-[rgba(200,185,150,0.09)] bg-[#0f0f14] transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[rgba(200,185,150,0.07)] p-[1.8rem]">
          <span className="font-serif text-[1.2rem] italic text-bone">Photography Tips</span>
          <button
            type="button"
            onClick={onClose}
            data-cursor-hover
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[rgba(200,185,150,0.18)] text-[0.75rem] text-bone/38 transition-all duration-200 hover:border-rose hover:text-rose"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-wrap gap-[0.3rem] border-b border-[rgba(200,185,150,0.06)] p-[0.9rem_1.8rem]">
          {TABS.map((tab) => {
            const on = cat === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setCat(tab.key)}
                data-cursor-hover
                className={`rounded-full border px-[0.8rem] py-[0.35rem] font-sans text-[0.52rem] tracking-[0.1em] uppercase transition-all duration-200 ${
                  on
                    ? "border-rose bg-rose text-ink"
                    : "border-[rgba(200,185,150,0.12)] bg-transparent text-bone/32"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        <div className="flex-1 overflow-y-auto p-[1.2rem_1.8rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TIPS[cat].map((tip, i) => (
            <div
              className="mb-[0.7rem] rounded-[0.6rem] border border-[rgba(200,185,150,0.07)] bg-bone/3 p-[1.1rem] transition-colors duration-200 hover:border-bone/28"
              key={tip.t}
            >
              <div className="mb-[0.4rem] text-[0.46rem] tracking-[0.18em] uppercase text-rose">
                Tip {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mb-[0.45rem] font-serif text-[0.9rem] italic text-bone">{tip.t}</div>
              <div className="text-[0.68rem] leading-[1.85] text-bone/37">{tip.b}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
