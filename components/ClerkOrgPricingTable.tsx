"use client";

import { PricingTable } from "@clerk/nextjs";
import { clerkPricingTableAppearance } from "@/lib/clerk-appearance";
import { ROUTES } from "@/lib/routes";

const highlightedPlan = process.env.NEXT_PUBLIC_CLERK_HIGHLIGHTED_PLAN?.trim();

type ClerkOrgPricingTableProps = {
  newSubscriptionRedirectUrl?: string;
};

export function ClerkOrgPricingTable({
  newSubscriptionRedirectUrl = ROUTES.welcome,
}: ClerkOrgPricingTableProps) {
  return (
    <PricingTable
      for="organization"
      appearance={clerkPricingTableAppearance}
      newSubscriptionRedirectUrl={newSubscriptionRedirectUrl}
      {...(highlightedPlan ? { highlightedPlan } : {})}
    />
  );
}
