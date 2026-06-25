"use client";

import { ClerkOrgPricingTable } from "@/components/ClerkOrgPricingTable";
import { ROUTES } from "@/lib/routes";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-base py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-zinc-400">
            Start with a free trial or subscribe to a paid plan — pick what fits
            your organization.
          </p>
        </div>
        <ClerkOrgPricingTable newSubscriptionRedirectUrl={ROUTES.signUp} />
      </div>
    </section>
  );
}
