import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trial started",
  description:
    "Your KAAST free trial has started. Download the app and sign in with the same account.",
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
