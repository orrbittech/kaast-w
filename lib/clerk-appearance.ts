import { shadcn } from "@clerk/ui/themes";
import {
  authButtonClass,
  authErrorClass,
  authFieldClass,
  authSocialButtonClass,
} from "./auth-form-styles";

export const clerkAppearance = {
  theme: shadcn,
  variables: {
    colorPrimary: "hsl(0 72% 52%)",
    borderRadius: "0.5rem",
    fontFamily: "var(--font-urbanist), Urbanist, system-ui, sans-serif",
  },
  elements: {
    formFieldInput: authFieldClass,
    formFieldErrorText: authErrorClass,
    formButtonPrimary: authButtonClass,
    formButtonReset: authButtonClass,
    socialButtonsBlockButton: authSocialButtonClass,
    socialButtonsProviderIcon__apple: "text-foreground [&_svg]:fill-current",
    alternativeMethodsBlockButton: authSocialButtonClass,
    footerActionLink: "text-primary hover:text-primary-muted",
  },
};

/** PricingTable-only appearance: three cards in one row on md+, stacked on mobile. */
export const clerkPricingTableAppearance = {
  ...clerkAppearance,
  elements: {
    ...clerkAppearance.elements,
    pricingTable: "grid w-full grid-cols-1 gap-4 md:grid-cols-3",
    pricingTableCard: "h-full min-w-0 flex flex-col",
    pricingTableCardBody: "flex-1",
  },
};
