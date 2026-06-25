"use client";

import { useAuth, useOrganization } from "@clerk/nextjs";
import { ClerkOrgPricingTable } from "@/components/ClerkOrgPricingTable";
import { AuthShell } from "@/components/AuthShell";
import {
  formatPlanDisplayName,
} from "@/lib/billing-config";
import { useActiveOrgSubscription } from "@/lib/hooks/use-active-org-subscription";
import { ROUTES } from "@/lib/routes";

function formatTrialEnd(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString();
}

export default function BillingPage() {
  const { orgId, isLoaded } = useAuth();
  const { membership } = useOrganization();
  const {
    hasActivePlan,
    isLoading: subscriptionLoading,
    billingStatus,
    subscription,
    planSlug,
    refetchBillingStatus,
  } = useActiveOrgSubscription();

  if (!isLoaded) {
    return (
      <AuthShell title="Billing" subtitle="Loading..." contentMaxWidth="max-w-7xl">
        <p className="text-center text-muted-foreground">Loading...</p>
      </AuthShell>
    );
  }

  const isAdmin = membership?.role === "org:admin";
  const planLabel = formatPlanDisplayName(planSlug);
  const trialEndsLabel = formatTrialEnd(billingStatus?.trialEndsAt);
  const statusLabel =
    billingStatus?.status ??
    subscription?.status ??
    (hasActivePlan ? "active" : "none");

  return (
    <AuthShell
      title="Billing"
      subtitle={
        hasActivePlan
          ? `Your organization is on the ${planLabel} plan.`
          : "Choose a plan to start or continue your trial."
      }
      contentMaxWidth="max-w-7xl"
    >
      {!orgId ? (
        <p className="text-center text-muted-foreground">
          Select an organization to manage billing.
        </p>
      ) : !isAdmin ? (
        <div className="space-y-3 text-center">
          {hasActivePlan ? (
            <p className="rounded-xl border border-approve/30 bg-approve/10 px-4 py-3 text-sm text-zinc-200">
              Current plan: <strong>{planLabel}</strong>
              {trialEndsLabel ? ` · Trial ends ${trialEndsLabel}` : null}
            </p>
          ) : null}
          <p className="text-muted-foreground">
            Only organization admins can manage billing. Contact your admin.
          </p>
        </div>
      ) : (
        <>
          {subscriptionLoading ? (
            <p className="mb-4 text-center text-sm text-zinc-500">
              Loading subscription details...
            </p>
          ) : hasActivePlan ? (
            <div className="mb-4 space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-center text-sm text-zinc-300">
              <p>
                Plan: <strong className="text-white">{planLabel}</strong>
              </p>
              <p className="text-zinc-400">
                Status: {statusLabel}
                {trialEndsLabel ? ` · Trial ends ${trialEndsLabel}` : null}
                {billingStatus?.periodEndAt && !trialEndsLabel
                  ? ` · Renews ${formatTrialEnd(billingStatus.periodEndAt)}`
                  : null}
              </p>
            </div>
          ) : subscription ? (
            <p className="mb-4 text-center text-sm text-zinc-400">
              Status: {subscription.status}
              {subscription.nextPayment
                ? ` · Next payment: ${subscription.nextPayment.date.toLocaleDateString()}`
                : null}
            </p>
          ) : null}
          <ClerkOrgPricingTable newSubscriptionRedirectUrl={ROUTES.welcome} />
          {hasActivePlan ? (
            <p className="mt-4 text-center text-xs text-zinc-500">
              <button
                type="button"
                onClick={() => void refetchBillingStatus({ fresh: true })}
                className="text-primary hover:underline"
              >
                Refresh plan status
              </button>
            </p>
          ) : (
            <p className="mt-4 text-center text-xs text-zinc-500">
              Trials are managed by Clerk. Your card is charged automatically
              when the trial ends unless you cancel.
            </p>
          )}
        </>
      )}
    </AuthShell>
  );
}
