import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function Footer() {
  return (
    <footer id="download" className="bg-base py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Link
          href={ROUTES.signUp}
          className="inline-block cursor-pointer rounded-full bg-primary px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-primary-muted"
        >
          Start a 30 day free trial
        </Link>
        <p className="mt-6 text-sm text-zinc-300">
          If you can download apps, you can run <span className="font-caveat">KAAST</span>.
        </p>
        <p className="mt-3 text-xs text-zinc-400">
          KAAST is a product of{" "}
          <a
            href="https://www.orrbit.co.za/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer text-primary hover:underline"
          >
            Orrbit Systems
          </a>
          .{" "}
          <a
            href="https://x.com/orrbittech"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer text-primary hover:underline"
          >
            X
          </a>
        </p>
      </div>
    </footer>
  );
}
