import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Your Scaling System Built in 30 Days, Free",
  description:
    "Join the waitlist and get the Enterprise Scaling Course, a one-on-one session, the AI Playbook, community access, and a free trial of the Enterprise 360 App.",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
