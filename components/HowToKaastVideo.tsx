"use client";

import { useState } from "react";

const VIDEO_URL =
  process.env.NEXT_PUBLIC_HOW_TO_KAAST_VIDEO_URL ??
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export function HowToKaastVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideoUrl = Boolean(process.env.NEXT_PUBLIC_HOW_TO_KAAST_VIDEO_URL);

  function handlePlay() {
    if (!VIDEO_URL) return;
    setIsPlaying(true);
  }

  return (
    <section id="how-to-kaast" className="bg-base py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-700 bg-black">
          {isPlaying ? (
            <video
              src={VIDEO_URL}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <span className="font-caveat text-[8rem] font-semibold leading-none text-primary md:text-[10rem]">
                  K
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handlePlay}
                  disabled={!hasVideoUrl && !VIDEO_URL}
                  aria-label="Play How To Kaast video"
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span
                    aria-hidden
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Play
                </button>
              </div>
              {!hasVideoUrl && (
                <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-zinc-500">
                  Set NEXT_PUBLIC_HOW_TO_KAAST_VIDEO_URL to use your video
                </p>
              )}
            </>
          )}
        </div>

        <p className="mt-12 text-center text-sm text-zinc-400">
          The simple, affordable way South African SMEs control their brand.
          Cloud-based. Mobile, Web & TV.
        </p>
      </div>
    </section>
  );
}
