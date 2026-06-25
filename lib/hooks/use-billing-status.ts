"use client";

import { useBillingStatusContext } from "@/lib/context/billing-status-provider";

export function useBillingStatus() {
  return useBillingStatusContext();
}
