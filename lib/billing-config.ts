function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

export const billingUrl = requireEnv("NEXT_PUBLIC_BILLING_URL");

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "past_due"]);

/** JWT `pla` claim uses `o:org:starter` while Clerk plan slugs use `org:starter`. */
export function licenseToOrgPlanSlug(license: string | null | undefined): string | null {
  if (!license) return null;
  const match = license.match(/^o:(org:.+)$/);
  return match?.[1] ?? null;
}

export function hasActiveOrgPlanInLicense(license: string | null | undefined): boolean {
  return licenseToOrgPlanSlug(license) !== null;
}

export function isActiveClerkSubscriptionStatus(
  status: string | null | undefined,
): boolean {
  if (!status) return false;
  return ACTIVE_SUBSCRIPTION_STATUSES.has(status);
}

/** Human-readable label from a Clerk org plan slug (e.g. `org:starter` → `Starter`). */
export function formatPlanDisplayName(slug: string | null | undefined): string {
  if (!slug) return 'No plan';
  const name = slug.replace(/^org:/, '');
  if (!name) return 'No plan';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

type HasPlanFn = (params: { plan: string }) => boolean;

/** Check JWT plan entitlement against slugs returned from Clerk (via API or server). */
export function hasAnyOrgPlanFromSlugs(
  has: HasPlanFn | undefined,
  slugs: string[],
): boolean {
  if (!has || slugs.length === 0) return false;
  return slugs.some((slug) => has({ plan: slug }));
}
