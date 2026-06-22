const FEATURE_CARDS = [
  { title: "Take full control of every screen—no more waiting on IT or external vendors" },
  { title: "Update menus instantly. No reprints. No delays. Just tap and go." },
  { title: "One brand, one sound. Deliver a consistent customer experience across every store." },
  { title: "Eliminate brand chaos. One platform. One message. Every location." },
  { title: "Run your business from your pocket. Update content anywhere, anytime." },
  { title: "Your content, your rules. Manage playlists and media from anywhere in seconds." },
  { title: "Change once, update everywhere. Real-time sync across all your locations." },
  { title: "Cut costs and save time—no more expensive signage or manual updates" },
  { title: "Scale effortlessly. Add locations without adding complexity or headcount" },
];

/** Circular positions: 9 cards evenly distributed around the phone mockup */
const RADIUS = 220;
const CARD_POSITIONS = [
  { x: 399, y: -68 }, // 72° top-right
  { x: 369, y: 68 }, // 144° bottom-right
  { x: 309, y: 309 }, // 180° bottom
  { x: -189, y: 178 }, // 216° bottom-left
  { x: -309, y: 18 }, // 252° left
  { x: -159, y: -178 }, // 288° top-left
  { x: 388, y: -209 }, // 324° top-left
  { x: -120, y: 300 }, // 0° top center
  { x: 138, y: -299 }, // 36° top-right
];

/** Main content section - phone mockup and circular feature cards. */
export function Section() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-base py-12"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex min-h-0 items-center justify-center md:min-h-[700px]">
          {/* Central phone mockup */}
          <div className="relative z-10 hidden md:flex">
            <div className="flex h-[520px] w-[280px] flex-col overflow-hidden rounded-[2.5rem] border-4 border-primary/30 bg-zinc-950 shadow-2xl">
              <div className="flex flex-1 items-center justify-center p-4">
                <span className="font-caveat text-4xl font-semibold text-primary">
                  KAAST
                </span>
              </div>
            </div>
          </div>

          {/* Circular feature cards */}
          {FEATURE_CARDS.map((card, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 z-20 hidden w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/30 bg-white/5 backdrop-blur-md p-4 shadow-lg md:block"
              style={{
                transform: `translate(-50%, -50%) translate(${CARD_POSITIONS[i].x}px, ${CARD_POSITIONS[i].y}px)`,
              }}
            >
              <p className="text-sm text-zinc-100">{card.title}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-zinc-400">
          The simple, affordable way South African SMEs control their brand. Cloud-based. Mobile, web & TV.
        </p>
      </div>
    </section>
  );
}
