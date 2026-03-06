import Image from "next/image";

const GOOGLE_PLAY_URL = "#download";
const APP_STORE_URL = "#download";

export function AppStoreButtons() {
  return (
    <section className="bg-base py-6">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-5 text-lg font-semibold text-zinc-200 md:text-xl">
          Start a 30 day free trial
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={GOOGLE_PLAY_URL}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-white shadow-sm transition-colors hover:border-primary"
          >
            <Image
              src="/icons/google.png"
              alt="Download KAAST on Google Play"
              width={32}
              height={32}
              priority
              sizes="32px"
            />
            <span className="font-semibold">Google Play</span>
          </a>
          <a
            href={APP_STORE_URL}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-black shadow-sm transition-colors hover:border-primary"
          >
            <Image
              src="/icons/apple.png"
              alt="Download KAAST on the App Store"
              width={32}
              height={32}
              priority
              sizes="32px"
            />
            <span className="font-semibold">App Store</span>
          </a>
        </div>
      </div>
    </section>
  );
}
