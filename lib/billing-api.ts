const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() ?? "http://localhost:4400";

import type { PlanFeatureFlags, PlanLimits } from "@/lib/plan-features.config";

export type OrgPlanUsage = {
  devices: number;
  playlists: number;
  locations: number;
};

export interface BillingStatus {
  clerkOrgId: string;
  license: string | null;
  isActive: boolean;
  status: string;
  planSlug: string | null;
  trialEndsAt: string | null;
  periodEndAt: string | null;
  upgradeUrl: string;
  limits: PlanLimits;
  usage: OrgPlanUsage;
  features: PlanFeatureFlags;
}

export async function fetchBillingStatus(
  token: string,
  options?: { fresh?: boolean },
): Promise<BillingStatus> {
  const url = new URL(`${API_BASE_URL}/billing/status`);
  if (options?.fresh) {
    url.searchParams.set("fresh", "1");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Billing status request failed (${response.status})`);
  }

  return response.json() as Promise<BillingStatus>;
}

export async function fetchBillingPlans(token: string): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/billing/plans`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Billing plans request failed (${response.status})`);
  }

  const payload = (await response.json()) as { slugs: string[] };
  return payload.slugs;
}
