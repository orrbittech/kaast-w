"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchBillingStatus, type BillingStatus } from "@/lib/billing-api";

const STALE_TIME_MS = 10 * 60 * 1000;

type CacheEntry = {
  data: BillingStatus;
  fetchedAt: number;
};

const orgCache = new Map<string, CacheEntry>();

let inFlightOrgId: string | null = null;
let inFlightPromise: Promise<BillingStatus> | null = null;

interface BillingStatusContextValue {
  data: BillingStatus | null;
  isLoading: boolean;
  error: Error | null;
  refetch: (options?: { fresh?: boolean }) => Promise<void>;
}

const BillingStatusContext =
  createContext<BillingStatusContextValue | null>(null);

export function clearBillingStatusCache(orgId?: string): void {
  if (orgId) {
    orgCache.delete(orgId);
  } else {
    orgCache.clear();
  }
  inFlightOrgId = null;
  inFlightPromise = null;
}

function readCachedStatus(orgId: string): BillingStatus | null {
  const cached = orgCache.get(orgId);
  if (!cached) return null;
  if (Date.now() - cached.fetchedAt >= STALE_TIME_MS) {
    orgCache.delete(orgId);
    return null;
  }
  return cached.data;
}

export function BillingStatusProvider({ children }: { children: ReactNode }) {
  const { getToken, orgId, isLoaded, isSignedIn } = useAuth();
  const [data, setData] = useState<BillingStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const lastOrgRef = useRef<string | null>(null);

  const load = useCallback(
    async (options?: { fresh?: boolean }) => {
      if (!orgId || !isLoaded) {
        setData(null);
        setIsLoading(!isLoaded);
        return;
      }

      if (options?.fresh) {
        clearBillingStatusCache(orgId);
      } else {
        const cached = readCachedStatus(orgId);
        if (cached) {
          setData(cached);
          setError(null);
          setIsLoading(false);
          return;
        }
      }

      if (!options?.fresh && inFlightPromise && inFlightOrgId === orgId) {
        try {
          const status = await inFlightPromise;
          setData(status);
          setError(null);
        } catch (err) {
          setError(
            err instanceof Error ? err : new Error("Billing status failed"),
          );
          setData(null);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      setError(null);

      const fetchPromise = (async () => {
        const token = await getToken();
        if (!token) {
          throw new Error("Missing session token");
        }
        return fetchBillingStatus(token, { fresh: options?.fresh });
      })();

      inFlightOrgId = orgId;
      inFlightPromise = fetchPromise;

      try {
        const status = await fetchPromise;
        orgCache.set(orgId, { data: status, fetchedAt: Date.now() });
        setData(status);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Billing status failed"),
        );
        setData(null);
      } finally {
        setIsLoading(false);
        if (inFlightOrgId === orgId && inFlightPromise === fetchPromise) {
          inFlightOrgId = null;
          inFlightPromise = null;
        }
      }
    },
    [getToken, isLoaded, orgId],
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !orgId) {
      clearBillingStatusCache();
      setData(null);
      setError(null);
      setIsLoading(false);
      lastOrgRef.current = null;
      return;
    }

    const orgChanged = lastOrgRef.current !== orgId;
    lastOrgRef.current = orgId;

    void load(orgChanged ? { fresh: true } : undefined);
  }, [isLoaded, isSignedIn, orgId, load]);

  const refetch = useCallback(
    async (options?: { fresh?: boolean }) => {
      await load(options);
    },
    [load],
  );

  const value = useMemo(
    () => ({
      data,
      isLoading: !isLoaded || isLoading,
      error,
      refetch,
    }),
    [data, error, isLoaded, isLoading, refetch],
  );

  return (
    <BillingStatusContext.Provider value={value}>
      {children}
    </BillingStatusContext.Provider>
  );
}

export function useBillingStatusContext(): BillingStatusContextValue {
  const context = useContext(BillingStatusContext);
  if (!context) {
    throw new Error(
      "useBillingStatus must be used within BillingStatusProvider",
    );
  }
  return context;
}
