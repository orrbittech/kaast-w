"use client";

import { useState } from "react";
import {
  PricingTable,
  SignUp,
  useAuth,
  useOrganizationList,
} from "@clerk/nextjs";
import { AuthShell } from "@/components/AuthShell";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { ROUTES } from "@/lib/routes";

const highlightedPlan = process.env.NEXT_PUBLIC_CLERK_HIGHLIGHTED_PLAN;

function OrgSetupStep() {
  const { orgId } = useAuth();
  const { isLoaded, createOrganization, setActive, userMemberships } =
    useOrganizationList({
      userMemberships: { infinite: true },
    });
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (orgId) {
    return (
      <PricingTable
        for="organization"
        appearance={clerkAppearance}
        newSubscriptionRedirectUrl={ROUTES.welcome}
        {...(highlightedPlan ? { highlightedPlan } : {})}
      />
    );
  }

  if (!isLoaded) {
    return (
      <p className="text-center text-zinc-400">Loading your account...</p>
    );
  }

  const existingOrg = userMemberships?.data?.[0]?.organization;

  async function activateExistingOrg() {
    if (!existingOrg || !setActive) return;
    setLoading(true);
    setError(null);
    try {
      await setActive({ organization: existingOrg.id });
    } catch {
      setError("Could not activate your organization. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateOrg(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = orgName.trim();
    if (!trimmed || !createOrganization || !setActive) return;

    setLoading(true);
    setError(null);
    try {
      const org = await createOrganization({ name: trimmed });
      await setActive({ organization: org.id });
    } catch {
      setError("Could not create your organization. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (existingOrg) {
    return (
      <div className="w-full space-y-4">
        <p className="text-center text-zinc-300">
          Continue with <span className="font-semibold text-white">{existingOrg.name}</span> to choose your plan.
        </p>
        {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
        <button
          type="button"
          onClick={activateExistingOrg}
          disabled={loading}
          className="w-full cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-muted disabled:opacity-50"
        >
          {loading ? "Loading..." : "Continue to plans"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleCreateOrg} className="w-full space-y-4">
      <label htmlFor="org-name" className="block text-sm font-medium text-zinc-300">
        Organization name
      </label>
      <input
        id="org-name"
        type="text"
        value={orgName}
        onChange={(event) => setOrgName(event.target.value)}
        placeholder="Your business name"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
        required
      />
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={loading || !orgName.trim()}
        className="w-full cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-muted disabled:opacity-50"
      >
        {loading ? "Creating..." : "Continue to plans"}
      </button>
    </form>
  );
}

export default function SignUpPage() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <AuthShell
      title="Start your 30-day free trial"
      subtitle="Manage media across all your locations — sign up, create your organization, and choose a plan."
    >
      {!isLoaded ? (
        <p className="text-center text-zinc-400">Loading...</p>
      ) : isSignedIn ? (
        <OrgSetupStep />
      ) : (
        <SignUp
          routing="path"
          path={ROUTES.signUp}
          signInUrl={ROUTES.signIn}
          appearance={clerkAppearance}
        />
      )}
    </AuthShell>
  );
}
