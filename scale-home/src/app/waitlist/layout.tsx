import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Free Course Waitlist | Scale Enterprises",
  description:
    "Be the first to know when the free course opens. Join the waitlist and Scale Enterprises will email you when it launches.",
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
