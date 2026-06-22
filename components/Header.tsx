"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between rounded-full border border-zinc-800 bg-black px-6 shadow-xl">
          <Link href={ROUTES.home} className="flex cursor-pointer items-center gap-2">
            <span className="font-caveat text-lg font-bold tracking-wide text-white">KAAST</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-2 rounded-full bg-zinc-900 px-2 py-1 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-white/85 transition-colors hover:bg-primary/20 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Link
            href={ROUTES.signUp}
            aria-label="Get started with KAAST app"
            className="cursor-pointer rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
