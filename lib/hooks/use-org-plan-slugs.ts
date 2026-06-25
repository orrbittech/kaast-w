"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { fetchBillingPlans } from "@/lib/billing-api";

export function useOrgPlanSlugs() {
  const { getToken, isLoaded } = useAuth();
  const [slugs, setSlugs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        setSlugs([]);
        return;
      }
      const planSlugs = await fetchBillingPlans(token);
      setSlugs(planSlugs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load plans"));
      setSlugs([]);
    } finally {
      setIsLoading(false);
    }
  }, [getToken, isLoaded]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { slugs, isLoading: !isLoaded || isLoading, error, refetch };
}
