import { SLIDES } from "@/lib/onboarding";

/** Hero section - headline and sub-headline from onboarding slides. */
export function Hero() {
  return (
    <section id="home" className="relative bg-base pt-24 pb-8">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
          Control every screen{" "}
          <span className="font-caveat inline-block rounded-md bg-primary px-2 py-0.5 text-white">
            from your fingertips
          </span>
          . Keep your brand{" "}
          <span className="font-caveat inline-block rounded-md bg-primary px-2 py-0.5 text-white">
            locked in
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-zinc-200 md:text-xl">
          <span className="font-caveat">KAAST</span> gives small businesses ability to manage media across stores -
          music, images, menus, and more - all from your phone.
        </p>
      </div>
    </section>
  );
}
