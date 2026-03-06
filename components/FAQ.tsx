"use client";

import { useState } from "react";
import { KaastText } from "@/components/KaastText";

const FAQ_ITEMS = [
  {
    question: "What do I need to use KAAST?",
    answer: "If you can download apps, you can run KAAST.",
  },
  {
    question: "Can I control media and music?",
    answer:
      "Yes. Control images, videos, and music across all your screens from your phone.",
  },
  {
    question: "Does KAAST support scheduling and recurring playlists?",
    answer:
      "Yes. Set up recurring playlists and schedules so content runs automatically.",
  },
  {
    question: "Is there ads revenue or monetization?",
    answer:
      "KAAST focuses on brand control and media management. Contact us to learn about monetization options for your use case.",
  },
  {
    question: "Do I need Android TV or a specific Smart TV?",
    answer:
      "KAAST works with Android TV and most Smart TVs. Check compatibility for your specific device.",
  },
  {
    question: "Is there remote 24/7 support?",
    answer:
      "We offer support to help you get the most out of KAAST. Reach out through the app or our website for assistance.",
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-base py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-700 bg-zinc-900/70 transition-colors hover:border-primary"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="font-semibold text-white">
                  <KaastText>{item.question}</KaastText>
                </span>
                <span
                  className={`ml-4 text-2xl text-zinc-200 transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="border-t border-zinc-700 px-6 py-4"
                >
                  <p className="text-sm text-zinc-200">
                    <KaastText>{item.answer}</KaastText>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
