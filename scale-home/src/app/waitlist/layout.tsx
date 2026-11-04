import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Course Waitlist: Design, Engineer, Lead",
  description:
    "Join the waitlist for the free Scale Enterprises course on how to design, engineer and lead a service business that runs without you.",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
