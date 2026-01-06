import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Inventory Management",
  description: "Sign in to your inventory management account to access your dashboard and manage your products.",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
