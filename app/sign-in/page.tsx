"use client";

import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/AuthShell";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { ROUTES } from "@/lib/routes";

export default function SignInPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your KAAST trial or manage your organization."
    >
      <SignIn
        routing="path"
        path={ROUTES.signIn}
        signUpUrl={ROUTES.signUp}
        appearance={clerkAppearance}
      />
    </AuthShell>
  );
}
