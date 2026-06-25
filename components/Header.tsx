"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { ROUTES } from "@/lib/routes";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#how-to-kaast", label: "How Kaast Works" },
  { href: "#how-it-works", label: "How to Kaast" },
  { href: "#faq", label: "FAQ" },
  { href: "#pricing", label: "Pricing" },
];

export function Header() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-16 items-center justify-between rounded-full border border-border bg-background/95 px-6 shadow-xl backdrop-blur">
          <Link href={ROUTES.home} className="flex cursor-pointer items-center gap-2">
            <span className="font-caveat text-lg font-bold tracking-wide text-foreground">KAAST</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-2 rounded-full bg-muted px-2 py-1 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-primary/20 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link
              href={ROUTES.signUp}
              aria-label="Get started with KAAST app"
              className="cursor-pointer rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
