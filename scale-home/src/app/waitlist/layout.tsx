import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Get Your Scaling System Built in 30 Days, Free",
  description:
    "Join the waitlist and get the Enterprise Scaling Course, a one-on-one session, the AI Playbook, community access, and a free trial of the Enterprise 360 App.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "Free Course Waitlist: Design, Engineer, Lead",
    description:
      "Join the waitlist for the free Scale Enterprises course on how to design, engineer and lead a service business that runs without you.",
    url: "/waitlist",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Course Waitlist: Design, Engineer, Lead",
    description:
      "Join the waitlist for the free Scale Enterprises course on how to design, engineer and lead a service business that runs without you.",
    images: ["/og.png"],
  },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.scaleenterprises.com/" },
            { "@type": "ListItem", position: 2, name: "Free Course Waitlist", item: "https://www.scaleenterprises.com/waitlist" },
          ],
        }}
      />
      {children}
    </>
  );
}
