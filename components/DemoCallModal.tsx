"use client";

import { useEffect, useRef } from "react";
import { useVapi } from "@/hooks/useVapi";

interface DemoCallModalProps {
  open: boolean;
  onClose: () => void;
}

export function DemoCallModal({ open, onClose }: DemoCallModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    isSpeechActive,
    callStatus,
    messages,
    error,
    isConfigured,
    isConnected,
    start,
    stop,
  } = useVapi();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open && isConnected) {
      stop();
    }
  }, [open, isConnected, stop]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-call-title"
      ref={modalRef}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          aria-label="Close demo call"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id="demo-call-title" className="mb-4 pr-8 text-xl font-bold text-white">
          Demo Call
        </h2>

        {!isConfigured ? (
          <p className="text-sm text-zinc-400">
            Demo call is not configured. Add <code className="rounded bg-zinc-800 px-1">NEXT_PUBLIC_VAPI_PUBLIC_KEY</code> and{" "}
            <code className="rounded bg-zinc-800 px-1">NEXT_PUBLIC_VAPI_ASSISTANT_ID</code> to enable.
          </p>
        ) : (
          <>
            {error && (
              <p className="mb-4 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            {!isConnected ? (
              <button
                type="button"
                onClick={start}
                disabled={callStatus === "loading"}
                className="w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
                aria-label="Start demo call with AI support"
              >
                {callStatus === "loading" ? "Connecting…" : "Start Call"}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        isSpeechActive ? "animate-pulse bg-red-500" : "bg-primary"
                      }`}
                      aria-hidden
                    />
                    <span className="text-sm font-medium text-white">
                      {isSpeechActive ? "Assistant speaking…" : "Listening…"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={stop}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                  >
                    End Call
                  </button>
                </div>

                <div className="max-h-48 overflow-y-auto rounded-lg bg-zinc-800 p-3">
                  {messages.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                      Conversation will appear here…
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`${
                            msg.role === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          <span
                            className={`inline-block max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                              msg.role === "user"
                                ? "bg-primary text-white"
                                : "bg-zinc-700 text-zinc-100"
                            }`}
                          >
                            {msg.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
