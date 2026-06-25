"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUp, useAuth, useOrganizationList } from "@clerk/nextjs";
import { ClerkOrgPricingTable } from "@/components/ClerkOrgPricingTable";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { authButtonClass, authFieldClass } from "@/lib/auth-form-styles";
import { useActiveOrgSubscription } from "@/lib/hooks/use-active-org-subscription";
import { ROUTES, TRIAL_DAYS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const orgNameSchema = z.object({
  orgName: z
    .string()
    .trim()
    .min(1, "Organization name is required")
    .max(100, "Organization name must be 100 characters or less"),
});

type OrgNameFormValues = z.infer<typeof orgNameSchema>;

const POLL_INTERVAL_MS = 15_000;

function PlanSelectionStep() {
  const router = useRouter();
  const {
    hasActivePlan,
    isLoading,
    refetchBillingStatus,
  } = useActiveOrgSubscription();
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    if (hasActivePlan) {
      router.replace(ROUTES.welcome);
    }
  }, [hasActivePlan, router]);

  useEffect(() => {
    if (hasActivePlan) return;

    const interval = setInterval(() => {
      setActivating(true);
      void refetchBillingStatus({ fresh: true }).finally(() =>
        setActivating(false),
      );
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [hasActivePlan, refetchBillingStatus]);

  if (hasActivePlan) {
    return (
      <p className="text-center text-muted-foreground">
        Plan activated — redirecting...
      </p>
    );
  }

  return (
    <div className="w-full space-y-4">
      <p className="text-center text-sm text-zinc-400">
        Select the free plan to start your trial, or complete checkout on a paid
        plan to continue.
      </p>
      {isLoading || activating ? (
        <p className="text-center text-xs text-zinc-500">
          {activating ? "Activating your plan..." : "Loading plans..."}
        </p>
      ) : null}
      <ClerkOrgPricingTable newSubscriptionRedirectUrl={ROUTES.welcome} />
    </div>
  );
}

function OrgSetupStep() {
  const { orgId } = useAuth();
  const { isLoaded, createOrganization, setActive, userMemberships } =
    useOrganizationList({
      userMemberships: { infinite: true },
    });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<OrgNameFormValues>({
    resolver: zodResolver(orgNameSchema),
    defaultValues: { orgName: "" },
  });

  if (orgId) {
    return <PlanSelectionStep />;
  }

  if (!isLoaded) {
    return (
      <p className="text-center text-muted-foreground">Loading your account...</p>
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

  async function handleCreateOrg(values: OrgNameFormValues) {
    if (!createOrganization || !setActive) return;

    setLoading(true);
    setError(null);
    try {
      const org = await createOrganization({ name: values.orgName.trim() });
      await setActive({ organization: org.id });
    } catch {
      setError("Could not create your organization. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (existingOrg) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Continue with your organization</CardTitle>
          <CardDescription>
            Continue with{" "}
            <span className="font-semibold text-foreground">
              {existingOrg.name}
            </span>{" "}
            to choose your plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="mb-4 text-sm text-destructive">{error}</p>
          ) : null}
          <Button
            type="button"
            onClick={activateExistingOrg}
            disabled={loading}
            className={cn("w-full", authButtonClass)}
          >
            {loading ? "Loading..." : "Continue to plans"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Set up your organization</CardTitle>
        <CardDescription>
          Enter your business name to continue to plan selection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleCreateOrg)}>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.orgName}>
              <FieldLabel htmlFor="org-name">Organization name</FieldLabel>
              <Input
                id="org-name"
                placeholder="Your business name"
                className={authFieldClass}
                aria-invalid={!!form.formState.errors.orgName}
                {...form.register("orgName")}
              />
              <FieldError errors={[form.formState.errors.orgName]} />
            </Field>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button
              type="submit"
              disabled={loading || !form.watch("orgName")?.trim()}
              className={cn("w-full", authButtonClass)}
            >
              {loading ? "Creating..." : "Continue to plans"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export default function SignUpPage() {
  const { isLoaded, isSignedIn, orgId } = useAuth();
  const isPlanSelection = isSignedIn && Boolean(orgId);

  return (
    <AuthShell
      title={`Start your ${TRIAL_DAYS}-day free trial`}
      subtitle="Manage media across all your locations — sign up, create your organization, and choose a plan."
      contentMaxWidth={isPlanSelection ? "max-w-7xl" : "max-w-lg"}
    >
      {!isLoaded ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : isSignedIn ? (
        <OrgSetupStep />
      ) : (
        <>
          <SignUp
            routing="path"
            path={ROUTES.signUp}
            signInUrl={ROUTES.signIn}
            appearance={clerkAppearance}
          />
          <p className="mt-4 text-center text-xs text-zinc-500">
            By signing up you agree to our{" "}
            <a href={ROUTES.terms} className="text-primary hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href={ROUTES.privacy} className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </>
      )}
    </AuthShell>
  );
}
