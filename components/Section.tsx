import { SLIDES } from "@/lib/onboarding";

const FEATURE_CARDS = [
  { title: "One voice, one look, everywhere" },
  { title: "Control every screen from your fingertips" },
  { title: "Eliminate rogue media fast" },
  { title: "Keep your brand locked in" },
];

/** Main content section - phone mockup and floating feature cards. */
export function Section() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-base py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex min-h-[500px] items-center justify-center">
          {/* Central phone mockup */}
          <div className="relative z-10">
            <div className="flex h-[520px] w-[280px] flex-col overflow-hidden rounded-[2.5rem] border-4 border-zinc-700 bg-zinc-950 shadow-2xl">
              <div className="flex items-center justify-center gap-2 border-b border-zinc-800 bg-black px-4 py-3">
                <span className="text-sm font-semibold tracking-wide text-white">
                  KAAST
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {SLIDES.slice(0, 3).map((slide, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-sm"
                    >
                      <p className="font-display text-sm text-white/90">
                        {slide.highlight && (
                          <span className="font-semibold text-primary">
                            {slide.highlight}{" "}
                          </span>
                        )}
                        {slide.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating feature cards */}
          <div className="absolute left-[5%] top-[10%] z-20 hidden w-56 rounded-2xl border border-zinc-700 bg-zinc-900 p-4 shadow-lg md:block">
            <span className="inline-block rounded bg-approve px-2 py-0.5 text-xs font-medium text-white">
              Core
            </span>
            <p className="font-display mt-2 text-sm text-zinc-100">
              {FEATURE_CARDS[0].title}
            </p>
          </div>

          <div className="absolute right-[5%] top-[15%] z-20 hidden w-56 rounded-2xl border border-zinc-700 bg-zinc-900 p-4 shadow-lg md:block">
            <span className="inline-block rounded bg-primary px-2 py-0.5 text-xs font-medium text-white">
              Mobile
            </span>
            <p className="font-display mt-2 text-sm text-zinc-100">
              {FEATURE_CARDS[1].title}
            </p>
          </div>

          <div className="absolute bottom-[20%] left-[8%] z-20 hidden w-56 rounded-2xl border border-zinc-700 bg-zinc-900 p-4 shadow-lg md:block">
            <span className="inline-block rounded bg-primary px-2 py-0.5 text-xs font-medium text-white">
              Control
            </span>
            <p className="font-display mt-2 text-sm text-zinc-100">
              {FEATURE_CARDS[2].title}
            </p>
          </div>

          <div className="absolute bottom-[25%] right-[8%] z-20 hidden w-56 rounded-2xl border border-zinc-700 bg-zinc-900 p-4 shadow-lg md:block">
            <span className="inline-block rounded bg-approve px-2 py-0.5 text-xs font-medium text-white">
              Brand
            </span>
            <p className="font-display mt-2 text-sm text-zinc-100">
              {FEATURE_CARDS[3].title}
            </p>
          </div>
        </div>
        <p className="mt-12 text-center text-sm text-zinc-400">
          Simple, affordable South African solution for SMEs. Cloud-based. Mobile, web & TV.
        </p>
      </div>
    </section>
  );
}
