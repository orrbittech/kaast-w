"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { AuthShell } from "@/components/AuthShell";
import { StoreDownloadButtons } from "@/components/StoreDownloadButtons";
import { formatPlanDisplayName } from "@/lib/billing-config";
import { useActiveOrgSubscription } from "@/lib/hooks/use-active-org-subscription";
import { ROUTES } from "@/lib/routes";

const appStoreUrl =
  process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || ROUTES.signUp;
const googlePlayUrl =
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim() || ROUTES.signUp;
const storeLinksExternal = Boolean(
  process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() &&
    process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL?.trim(),
);

function formatTrialEnd(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString();
}

export default function WelcomePage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const {
    hasActivePlan,
    isLoading: subscriptionLoading,
    billingStatus,
    planSlug,
  } = useActiveOrgSubscription();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace(ROUTES.signIn);
      return;
    }

    if (!subscriptionLoading && !hasActivePlan) {
      router.replace(ROUTES.signUp);
    }
  }, [
    isLoaded,
    isSignedIn,
    subscriptionLoading,
    hasActivePlan,
    router,
  ]);

  if (!isLoaded || subscriptionLoading || !hasActivePlan) {
    return (
      <AuthShell title="Your trial is ready" subtitle="Loading...">
        <p className="text-center text-muted-foreground">Loading...</p>
      </AuthShell>
    );
  }

  const planLabel = formatPlanDisplayName(planSlug);
  const trialEndsLabel = formatTrialEnd(billingStatus?.trialEndsAt);
  const statusMessage = trialEndsLabel
    ? `Your ${planLabel} trial is active until ${trialEndsLabel}. Open the app on your phone to manage screens across your locations.`
    : `Your ${planLabel} plan is active. Open the app on your phone to manage screens across your locations.`;

  return (
    <AuthShell
      title="Your trial is ready"
      subtitle="Download the KAAST app and sign in with the same email you used here."
    >
      <div className="w-full max-w-lg space-y-8 text-center">
        <p className="rounded-xl border border-approve/30 bg-approve/10 px-4 py-3 text-sm text-zinc-200">
          {statusMessage}
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
