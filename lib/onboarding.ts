/**
 * Onboarding content - mirrored from apk/lib/onboarding.ts.
 * Keep in sync when slides change.
 */
export interface OnboardingSlide {
  title: string;
  /** Optional text to render in primary (red) color, e.g. brand name */
  highlight?: string;
}

/** Onboarding slides - meaningful statements for the landing page. */
export const SLIDES: OnboardingSlide[] = [
  {
    title: "Take full control. Manage every screen from your fingertips",
    highlight: "KAAST",
  },
  { title: "Keep your brand locked in across every display" },
  {
    title: "Run promotions, playlists, and updates on every screen right from your phone",
  },
  {
    title: "Small businesses get fast, simple management that scales across stores and franchises",
  },
  { title: "Take take charge get sarted now", highlight: "KAAST" },
];
