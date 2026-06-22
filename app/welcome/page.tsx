import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";
import { StoreDownloadButtons } from "@/components/StoreDownloadButtons";
import { ROUTES } from "@/lib/routes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trial started",
  description:
    "Your KAAST free trial has started. Download the app and sign in with the same account.",
};

const appStoreUrl =
  process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || ROUTES.signUp;
const googlePlayUrl =
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim() || ROUTES.signUp;
const storeLinksExternal = Boolean(
  process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() &&
    process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim(),
);

export default function WelcomePage() {
  return (
    <AuthShell
      title="Your trial is ready"
      subtitle="Download the KAAST app and sign in with the same email you used here."
    >
      <div className="w-full max-w-lg space-y-8 text-center">
        <p className="rounded-xl border border-approve/30 bg-approve/10 px-4 py-3 text-sm text-zinc-200">
          Your 30-day organization trial has started. Open the app on your phone to
          manage screens across your locations.
        </p>

        <StoreDownloadButtons
          googlePlayHref={googlePlayUrl}
          appStoreHref={appStoreUrl}
          external={storeLinksExternal}
        />

        {!storeLinksExternal ? (
          <p className="text-xs text-zinc-500">
            App store links will appear here once published. You can still sign in on
            the mobile app with your new account.
          </p>
        ) : null}

        <p className="text-sm text-zinc-400">
          Already subscribed?{" "}
          <Link
            href={ROUTES.signIn}
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
