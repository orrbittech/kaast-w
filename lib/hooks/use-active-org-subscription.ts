"use client";

import { useAuth } from "@clerk/nextjs";
import { useSubscription } from "@clerk/nextjs/experimental";
import {
  hasAnyOrgPlanFromSlugs,
  isActiveClerkSubscriptionStatus,
  licenseToOrgPlanSlug,
} from "@/lib/billing-config";
import { useBillingStatus } from "@/lib/hooks/use-billing-status";
import { useOrgPlanSlugs } from "@/lib/hooks/use-org-plan-slugs";

export function useActiveOrgSubscription() {
  const { isLoaded, orgId, sessionClaims, has } = useAuth();
  const { data: subscription } = useSubscription();
  const {
    data: billingStatus,
    isLoading: billingLoading,
    refetch: refetchBillingStatus,
  } = useBillingStatus();
  const { slugs, isLoading: slugsLoading } = useOrgPlanSlugs();

  const license = (sessionClaims?.pla as string | undefined) ?? null;
  const licensePlanSlug = licenseToOrgPlanSlug(license);
  const licenseMatchesClerkPlan =
    licensePlanSlug !== null && slugs.includes(licensePlanSlug);
  const hasPlanEntitlement = hasAnyOrgPlanFromSlugs(has, slugs);

  const hasActivePlan =
    billingStatus?.isActive === true ||
    licenseMatchesClerkPlan ||
    hasPlanEntitlement ||
    isActiveClerkSubscriptionStatus(subscription?.status);

  const planSlug =
    billingStatus?.planSlug ??
    licensePlanSlug ??
    subscription?.subscriptionItems?.find((item) =>
      item.plan.slug.startsWith("org:"),
    )?.plan.slug ??
    null;

  const isLoading =
    !isLoaded || (Boolean(orgId) && (billingLoading || slugsLoading));

  return {
    hasActivePlan,
    isLoading,
    orgId,
    isLoaded,
    billingStatus,
    subscription,
    planSlug,
    refetchBillingStatus,
  };
}
