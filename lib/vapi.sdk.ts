import Vapi from "@vapi-ai/web";

const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? "";

if (!publicKey && typeof window !== "undefined") {
  console.warn(
    "[Vapi] NEXT_PUBLIC_VAPI_PUBLIC_KEY is not set. Demo call will not work."
  );
}

/** Singleton Vapi client for browser-based voice calls. Null when API key is not configured. */
export const vapi: Vapi | null = publicKey ? new Vapi(publicKey) : null;
