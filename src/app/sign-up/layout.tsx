import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Inventory Management",
  description: "Create a new inventory management account and start managing your products and inventory levels.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
