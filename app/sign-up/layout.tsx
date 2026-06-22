import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start your free trial",
  description:
    "Sign up for KAAST and start your 30-day free trial. Manage digital media across all your store locations.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
